# nlxVideoConsent

Example:

    <div style="max-height: 330px; max-width: 560px;">
        <video-provider-consent
            src="https://www.youtube.com/watch?v=<YourId>"
            text="Example Video"
        ></video-provider-consent>
    </div>

The element uses the maximum width and height allowed by its parent element respecting aspect-ratio.

## Attributes

### src (required)
The link to the video. Currently youtube and vimeo links are supported.

    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
    ></video-provider-consent>

### autoplay
Allows to enable or disable autoplay when loading the page.

    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        autoplay="true"
    ></video-provider-consent>

### text
Placeholder text for information when video is not currently loaded.

    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        text="this is example text"
    ></video-provider-consent>

### aspectRatio
The aspect-ratio used for the video and preview.

    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        aspectRatio="16/10"
    ></video-provider-consent>

### autoplayOnConfirm
Enables or disables autoplay when first confirming the consent. This is enabled by default to save clicks.

    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        autoplayOnConfirm="false"
    ></video-provider-consent>

### textOrientation
Changes the orientation of the text to the icon. This is `row` by default and can be any of the following values:
- row
- row-reverse
- column
- column-reverse


    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        textOrientation="row-reverse"
    ></video-provider-consent>

### textSize
Changes the text size. Values are given in `rem`. 1 `rem` is 16 Pixels.

    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        textSize="2"
    ></video-provider-consent>

### showIcon
Shows or hides the video player icon. This can be used if you only want the text to show. This is `true` on default.

    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        showIcon="false"
    ></video-provider-consent>

### darkMode
Changes the text and icon color if set to `true`, to black. This is helpful when using light color backgrounds.

    <video-provider-consent
        src="https://www.youtube.com/watch?v=<YourId>"
        darkMode="true"
    ></video-provider-consent>

