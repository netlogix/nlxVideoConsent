class YoutubeVideo extends HTMLElement {
    #id = '';
    #justConfirmed = false;

    constructor () {
        super();
    }

    get cookieName() {
        return 'youtube-video-consent';
    }

    get regExpr() {
        return /^.*(youtu\.be\/|\/v\/|\/embed\/|\/watch\?v=|\&v=)([^#\&\?\/]*).*/;
    }

    get src() {
        return this.getAttribute("src") ?? '';
    }

    get alt() {
        return this.getAttribute("alt") ?? '';
    }

    get picture() {
        return this.getAttribute("picture") ?? '';
    }

    get autoplay() {
        return this.getAttribute("autoplay") === 'true';
    }

    get hasConsent() {
        return this.getCookie();
    }

    set hasConsent(value) {
        this.setCookie(value);
    }

    get aspectRatio() {
        return this.getAttribute('aspectRatio') ?? '16/9';
    }

    get textOrientation() {
        return this.getAttribute('textOrientation') ?? 'row';
    }

    get textSize() {
        const fontSize = parseFloat(this.getAttribute('textSize'));
        return !Number.isNaN(fontSize) ? fontSize : 1.5;
    }

    get showIcon() {
        const showIcon = this.getAttribute("showIcon");
        if (showIcon === null) {
            return true;
        }
        return showIcon === 'true';
    }

    get autoplayOnConfirm() {
        const autoplayOnConfirm = this.getAttribute("autoplayOnConfirm");
        if (autoplayOnConfirm === null) {
            return true;
        }
        return autoplayOnConfirm === 'true';
    }

    get darkMode() {
        return this.getAttribute("darkMode") === 'true';
    }

    static get observedAttributes() {
        return ['src', 'autoplay', 'alt', 'aspectRatio', 'autoplayOnConfirm', 'textOrientation', 'textSize', 'showIcon', 'darkMode'];
    }

    connectedCallback() {
        this.onSrcChanged();
        this.render();
    }

    onSrcChanged() {
        const match = (this.src || '').match(this.regExpr);
        this.#id = (match && match[2].length === 11) ? match[2] : '';
    }

    confirmConsent() {
        if (event.target.tagName.toLowerCase() === 'a') {
            return;
        }
        this.hasConsent = true;

        if (this.autoplayOnConfirm) {
            this.#justConfirmed = true;
        }

        this.render();
    }

    setCookie(value) {
        const date = new Date();
        date.setTime(date.getTime() + (14 * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + date.toUTCString();
        document.cookie = this.cookieName + '=' + value + ';' + expires + ';path=/';
    }

    getCookie() {
        const value = `; ${document.cookie}`;
        const parts = value.split('; ' + this.cookieName + '=');
        return (parts.length === 2) ? parts.pop().split(';').shift() : false;
    }

    render() {
        this.innerHTML = this.style;

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
            props.src = `https:\/\/www.youtube-nocookie.com/embed/${this.#id}?rel=0&amp;enablejsapi=1&amp;origin=${window.location.protocol}%2F%2F${window.location.host}${this.autoplay || this.#justConfirmed ? '&amp;autoplay=1&amp;mute=1' : ''}`;
        }

        this.innerHTML += this.confirmedHtml;

        const iframe = this.getElementsByTagName('iframe')[0];
        Object.keys(props).forEach(attribute => {
            iframe.setAttribute(attribute, props[attribute]);
        });
    }

    get style() {
        return `
            <style>
                youtube-video {
                    display: block;
                    position: relative;
                    background: ${this.picture ? "url(" + this.picture + ")": '#666'};
                    background-size: cover;
                    cursor: pointer;
                    height: 100%;
                    width: 100%;
                    aspect-ratio: ${this.aspectRatio};
                }

                .nlx-video-container {
                    display: flex;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    align-items: center;
                    flex-direction: ${this.textOrientation};
                }

                youtube-video span {
                    font-size: ${this.textSize}rem;
                    margin-left: 0.3rem;
                    color: ${this.darkMode ? '#000': '#fff'};
                }

                youtube-video svg {
                    display: ${this.showIcon ? 'block' : 'none'};
                    fill: ${this.darkMode ? '#000': '#fff'};
                }
            </style>
        `;
    }

    get notConfirmedHtml() {
        return `
            <div class="nlx-video-container" onClick="this.parentElement.confirmConsent()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="48" height="48">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                </svg>
                <span>${this.alt}</span>
            </div>
        `;
    }

    get confirmedHtml() {
        return `
            <div class="nlx-video-container" onClick="this.parentElement.confirmConsent()">
                <iframe width="560" height="315" />
            </div>
        `;
    }
}

if ('customElements' in window) {
    customElements.define('youtube-video', YoutubeVideo);
}