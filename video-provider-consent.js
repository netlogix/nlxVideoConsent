class VideoProviderConsent extends HTMLElement {
    #id = '';
    #justConfirmed = false;
    #elementId = '';

    static vimeoRegExpr = /^.*(vimeo\.com\/)((video\/)|(channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    static youtubeRegExpr = /^.*(youtu\.be\/|\/v\/|\/embed\/|\/watch\?v=|\&v=)([^#\&\?\/]*).*/;
    static #configuration = {};
    static #rerenderEventName = 'VideoProviderConsentRerender';
    static #userCentricsConsentInformation = {
        'YouTube Video': false,
        'Vimeo': false
    }

    constructor () {
        super();

        this.id = this.#elementId = this.generateUniqueID();
        if (window.videoProviderConsentConfiguration) {
            VideoProviderConsent.#configuration = window.videoProviderConsentConfiguration;
        }

        window.addEventListener('ucEvent', (event) => {
            for (let key in VideoProviderConsent.#userCentricsConsentInformation) {
                VideoProviderConsent.#userCentricsConsentInformation[key] = event.detail[key];
            }

            VideoProviderConsent.rerender();
        });

        document.addEventListener(VideoProviderConsent.#rerenderEventName, () => {
            this.connectedCallback();
        })
    }

    static set configuration(configuration) {
        VideoProviderConsent.#configuration = configuration;
        VideoProviderConsent.rerender();
    }

    static rerender() {
        document.dispatchEvent(
            new Event(VideoProviderConsent.#rerenderEventName)
        );
    }

    getAttribute(name) {
        const value = super.getAttribute(name);
        if (value !== null) {
            return value;
        }

        if (typeof VideoProviderConsent.#configuration[name] !== 'undefined') {
            return VideoProviderConsent.#configuration[name];
        }

        return null;
    }

    parseValueToBool(value, defaultValue) {
        if (value === null) {
            return defaultValue;
        }

        if (typeof value === 'boolean') {
            return value;
        } else if (typeof value === 'string') {
            return !!JSON.parse(value.toLowerCase());
        } else {
            return !!JSON.parse(value);
        }
    }

    get src() {
        return this.getAttribute("src") ?? '';
    }

    get text() {
        return this.getAttribute("text") ?? '';
    }

    get textAlign() {
        return this.getAttribute("text-align") ?? 'left';
    }

    get picture() {
        let picture = this.getAttribute("picture") ?? '';
        if (!picture && this.thumbnailProxy) {
            picture = this.generateThumbnailProxyUrl();
        }

        return picture;
    }

    get autoplay() {
        return this.parseValueToBool(this.getAttribute("autoplay"), false);
    }

    get hasConsent() {
        return VideoProviderConsent.#userCentricsConsentInformation[this.videoProvider];
    }

    get aspectRatio() {
        return this.getAttribute('aspect-ratio') ?? '16/9';
    }

    get textOrientation() {
        return this.getAttribute('text-orientation') ?? 'row';
    }

    get textSize() {
        const fontSize = parseFloat(this.getAttribute('text-size'));
        return !Number.isNaN(fontSize) ? fontSize : 1.5;
    }

    get iconSize() {
        const iconSize = parseFloat(this.getAttribute('icon-size'));
        return !Number.isNaN(iconSize) ? iconSize : 3;
    }

    get showIcon() {
        return this.parseValueToBool(this.getAttribute("show-icon"), true);
    }

    get blur() {
        return this.parseValueToBool(this.getAttribute("blur"), true);
    }

    get blurStrength() {
        return this.getAttribute('blur-strength') ?? '1px';
    }

    get autoplayOnConfirm() {
        return this.parseValueToBool(this.getAttribute("autoplay-on-confirm"), true);
    }

    get darkMode() {
        return this.parseValueToBool(this.getAttribute("dark-mode"), false);
    }

    get videoProvider() {
        return VideoProviderConsent.parseVideoProvider(this.src)
    }

    get thumbnailProxy() {
        return this.getAttribute("thumbnail-proxy")
    }

    get backdrop() {
        return this.parseValueToBool(this.getAttribute("backdrop"), true);
    }

    get backdropColor() {
        return this.getAttribute("backdrop-color") ?? 'rgba(102, 102, 102, 0.6)';
    }

    static get observedAttributes() {
        return ['src', 'autoplay', 'text', 'aspect-ratio', 'autoplay-on-confirm', 'text-orientation', 'text-size', 'show-icon', 'dark-mode'];
    }


    static parseVideoProvider(videoUrl = '') {
        if (this.youtubeRegExpr.test(videoUrl)) {
            return 'YouTube Video';
        }

        if (this.vimeoRegExpr.test(videoUrl)) {
            return 'Vimeo';
        }
    }

    static parseVideoId(videoUrl = '') {
        let regex = '';
        const videoProvider = this.parseVideoProvider(videoUrl);
        if (videoProvider === 'YouTube Video') {
            regex = this.youtubeRegExpr;
        }

        if (videoProvider === 'Vimeo') {
            regex = this.vimeoRegExpr;
        }

        const match = videoUrl.match(regex);
        switch (videoProvider) {
            case 'YouTube Video':
                return (match && match[2].length === 11) ? match[2] : '';
            case 'Vimeo':
                return (match && match[6].length) ? match[6] : '';
        }

        return '';
    }

    generateUniqueID() {
        return String(
            Date.now().toString(32) +
            Math.random().toString(16)
        ).replace(/\./g, '');
    }

    generateThumbnailProxyUrl() {
        return this.thumbnailProxy
            .replace('<<videoId>>', this.#id)
            .replace('<<provider>>', this.videoProvider.replace('YouTube Video', 'youtube').toLowerCase());
    }

    connectedCallback() {
        this.onSrcChanged();
        this.render();
    }

    onSrcChanged() {
        this.#id = VideoProviderConsent.parseVideoId(this.src);

        if (!this.#id) {
            this.hidePlayer();
        }
    }

    hidePlayer() {
        this.style.display = 'none';
    }

    get userCentricsServiceInformation() {
        return UC_UI.getServicesBaseInfo().filter(service => service.name.includes(VideoProviderConsent.parseVideoProvider(this.src))).shift();
    }

    confirmConsent(event) {
        event.stopPropagation();
        if (event.target.tagName.toLowerCase() === 'a') {
            return;
        }

        event.preventDefault();

        UC_UI.acceptService(this.userCentricsServiceInformation?.id).then(() => {
            if (this.autoplayOnConfirm) {
                this.#justConfirmed = true;
            }

            VideoProviderConsent.#userCentricsConsentInformation[this.videoProvider] = true;
            VideoProviderConsent.rerender();
        });
    }

    get cssElementSelector() {
        return `video-provider-consent[id='${this.#elementId}']` + ' ';
    }

    render() {
        this.innerHTML = this.stylesheet;

        if (false === this.hasConsent) {
            this.innerHTML += this.notConfirmedHtml;
            return;
        }
        const props = {
            allow: `accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture`,
            allowfullscreen: '',
            frameborder: '0',
            id: '',
            src: '',
            webkitallowfullscreen: '',
            mozallowfullscreen: '',
        };

        if ('' !== this.#id) {
            props.id = `player-${this.#id}`;

            switch (this.videoProvider) {
                case 'YouTube Video':
                    props.src = `https:\/\/www.youtube-nocookie.com/embed/${this.#id}?rel=0&amp;enablejsapi=1&amp;origin=${window.location.protocol}%2F%2F${window.location.host}${this.autoplay || this.#justConfirmed ? '&amp;autoplay=1' : ''}${this.autoplay ? '&amp;mute=1' : ''}`;
                    break;
                case 'Vimeo':
                    props.src = `https:\/\/player.vimeo.com/video/${this.#id}?${this.autoplay || this.#justConfirmed ? 'autoplay=1' : ''}${this.autoplay ? '&background=1' : ''}`;
                    break;
            }
        }

        this.innerHTML += this.confirmedHtml;

        const iframe = this.querySelector('iframe');
        Object.entries(props).forEach(([attribute, value]) => {
            iframe.setAttribute(attribute, value)
        });
    }

    get stylesheet() {
        return `
            <style>
                ${this.cssElementSelector} {
                    display: block;
                    position: relative;
                    cursor: pointer;
                    height: 100%;
                    width: 100%;
                    aspect-ratio: ${this.aspectRatio};
                }

                ${this.cssElementSelector} .nlx-video-controls {
                    display: flex;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    align-items: center;
                    flex-direction: ${this.textOrientation};
                    z-index: 200;
                    width: 100%;
                }

                ${this.cssElementSelector} .nlx-video-container,
                ${this.cssElementSelector} .nlx-video-container iframe {
                    height: 100%;
                    width: 100%;
                }

                ${this.cssElementSelector} .nlx-video-container {
                    position: relative;
                }

                ${this.cssElementSelector} span {
                    text-align: ${this.textAlign};
                    font-size: ${this.textSize}rem;
                    margin-top: 0.3rem;
                    color: ${this.darkMode ? '#000' : '#fff'};
                    overflow-x: hidden;
                    overflow-wrap: anywhere;
                    white-space: normal;
                }

                ${this.cssElementSelector} .nlx-video-container:after {
                    background: ${this.picture ? "url(" + this.picture + ")" : '#666'};
                    ${this.blur ? `filter: blur(${this.blurStrength});` : ''};
                    z-index: 100;
                }

                ${this.cssElementSelector} .nlx-video-container:before {
                    ${this.backdrop ? '': 'display: none;'}
                    background: ${this.backdropColor};
                    z-index: 150;
                }

                ${this.cssElementSelector} .nlx-video-container:before,
                ${this.cssElementSelector} .nlx-video-container:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-size: cover;
                }

                ${this.cssElementSelector} .nlx-video-container.nlx-video-consent-accepted:before,
                ${this.cssElementSelector} .nlx-video-container.nlx-video-consent-accepted:after {
                    display: none;
                }

                ${this.cssElementSelector} svg {
                    width: ${this.iconSize}rem;
                    height: ${this.iconSize}rem;
                    display: ${this.showIcon ? 'block' : 'none'};
                    fill: ${this.darkMode ? '#000' : '#fff'};
                }
            </style>
        `;
    }

    get notConfirmedHtml() {
        return `
            <div class="nlx-video-container" onClick="this.parentElement.confirmConsent(event)">
                <div class="nlx-video-controls">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                    </svg>
                    <span>${this.text}</span>
                </div>
            </div>
        `;
    }

    get confirmedHtml() {
        return `
            <div class="nlx-video-container nlx-video-consent-accepted" onClick="this.parentElement.confirmConsent()">
                <iframe />
            </div>
        `;
    }
}

if ('customElements' in window) {
    customElements.define('video-provider-consent', VideoProviderConsent);
}
