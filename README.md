# nlxVideoConsent

**Important:**

This javascript needs the usercentrics service, since v3.0.0, to be included and running for it to work correctly. If you want to use usercentrics you can use the Tag v2.2.0.

Example:

```html
<div style="max-height: 330px; max-width: 560px;">
    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        text="Example Video"
    ></video-provider-consent>
</div>
```

The element uses the maximum width and height allowed by its parent element respecting aspect-ratio.

## Global configuration
You can change the configuration for all elements on the Page by either setting the configuration on the `VideoProviderConsent` element class in javascript or by setting the `videoProviderConsentConfiguration` variable on the window object.
The keys of the configuration object are the names of the attributes. If both, configuration and attribute, with the same name are set, the attribute gets priority.
**Caution!:** The values need to be strings in order to preserve value similarity between configuration and attribute values.

```javascript
VideoProviderConsent.configuration = {
    blur: 'true',
    iconSize: '2rem',
};

// OR

window.videoProviderConsentConfiguration = {
    blur: 'true',
    iconSize: '2rem',
};
```

The window method will have better load time, because you don't need to wait for the element javascript to load.

## Attributes

### src (required)
The link to the video. Currently youtube and vimeo links are supported.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
></video-provider-consent>
```

### picture
The thumbnail picture to show if consent was not yet accepted.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    picture="<URL to picture>"
></video-provider-consent>
```

### thumbnail-proxy
A URL to a proxy Server to load thumbnails from. This is needed to show real thumbnails of the videos without giving third parties ip information of the customer.
This URL can contain characters to substitute values needed for fetching the right thumbnail:
- `<<provider>>` which is replaced by the video provider name (`youtube`, `vimeo`)
- `<<videoId>>` which is the video id needed to fetch video information

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    thumbnail-proxy="\<Your thumbnail proxy base url\>\?provider=\<\<provider\>\>\&videoId=\<\<videoId\>\>"
></video-provider-consent>
```

### autoplay
Allows to enable or disable autoplay when loading the page.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    autoplay="true"
></video-provider-consent>
```

### text
Placeholder text for information when video is not currently loaded.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    text="this is example text"
></video-provider-consent>
```

### aspect-ratio
The aspect-ratio used for the video and preview.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    aspect-ratio="16/10"
></video-provider-consent>
```

### autoplay-on-confirm
Enables or disables autoplay when first confirming the consent. This is enabled by default to save clicks.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    autoplay-on-confirm="false"
></video-provider-consent>
```

### text-orientation
Changes the orientation of the text to the icon. This is `row` by default and can be any of the following values:
- row
- row-reverse
- column
- column-reverse

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    text-orientation="row-reverse"
></video-provider-consent>
```

### text-size
Changes the text size. Values are given in `rem`. 1 `rem` is 16 Pixels.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    text-size="2"
></video-provider-consent>
```

### text-align
Changes the text align. Values possible are `left`, `center` and `right`. Default is `left`.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    text-align="center"
></video-provider-consent>
```

### backdrop
Enables or disables the thumbnail backdrop. Values possible are `true` and `false`. Default is `true`.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    backdrop="false"
></video-provider-consent>
```

### backdrop-color
Changes the color of the thumbnail backdrop. Values possible are all available CSS colors (Hex, rgb, rgba etc.). Default is `rgba(102, 102, 102, 0.6)`.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    backdrop-color="rgba(102, 102, 102, 0.2)"
></video-provider-consent>
```

### icon-size
Changes the icon size. Values are given in `rem`. 1 `rem` is 16 Pixels.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    icon-size="5"
></video-provider-consent>
```

### show-icon
Shows or hides the video player icon. This can be used if you only want the text to show. This is `true` on default.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    show-icon="false"
></video-provider-consent>
```

### dark-mode
Changes the text and icon color if set to `true`, to black. This is helpful when using light color backgrounds.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    dark-mode="true"
></video-provider-consent>
```

### blur
Blurs the thumbnail image of the video if set to `true`.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    blur="true"
></video-provider-consent>
```


### blur-strength
Changes strength of the `blur` effect. Values should be given in CSS units e.g. `px`, `rem`, `em` 

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    blur-strength="2px"
></video-provider-consent>
```
