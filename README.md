# nlxVideoConsent

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
You can change the configuration for all elements on the Page by settings the configuration on the `VideoProviderConsent` element class in javascript.
The keys of the configuration object are the names of the attributes. If both, configuration and attribute, with the same name are set, the attribute gets priority.
**Caution!:** The values need to be strings in order to preserve value similarity between configuration and attribute values.

```javascript
VideoProviderConsent.configuration = {
    blur: 'true',
    iconSize: '2rem',
};
```

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

### thumbnailProxy
A URL to a proxy Server to load thumbnails from. This is needed to show real thumbnails of the videos without giving third parties ip information of the customer.
This URL can contain characters to substitute values needed for fetching the right thumbnail:
- `<<provider>>` which is replaced by the video provider name (`youtube`, `vimeo`)
- `<<videoId>>` which is the video id needed to fetch video information

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    thumbnailProxy="\<Your thumbnail proxy base url\>\?provider=\<\<provider\>\>\&videoId=\<\<videoId\>\>"
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

### aspectRatio
The aspect-ratio used for the video and preview.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    aspectRatio="16/10"
></video-provider-consent>
```

### autoplayOnConfirm
Enables or disables autoplay when first confirming the consent. This is enabled by default to save clicks.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    autoplayOnConfirm="false"
></video-provider-consent>
```

### textOrientation
Changes the orientation of the text to the icon. This is `row` by default and can be any of the following values:
- row
- row-reverse
- column
- column-reverse

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    textOrientation="row-reverse"
></video-provider-consent>
```

### textSize
Changes the text size. Values are given in `rem`. 1 `rem` is 16 Pixels.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    textSize="2"
></video-provider-consent>
```

### iconSize
Changes the icon size. Values are given in `rem`. 1 `rem` is 16 Pixels.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    iconSize="5"
></video-provider-consent>
```

### showIcon
Shows or hides the video player icon. This can be used if you only want the text to show. This is `true` on default.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    showIcon="false"
></video-provider-consent>
```

### darkMode
Changes the text and icon color if set to `true`, to black. This is helpful when using light color backgrounds.

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    darkMode="true"
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


### blurStrength
Changes strength of the `blur` effect. Values should be given in CSS units e.g. `px`, `rem`, `em` 

```html
<video-provider-consent
    src="https://www.youtube.com/watch?v=<YourId>"
    blurStrength="2px"
></video-provider-consent>
```
