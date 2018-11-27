# MediaBox
> Responsive Lightbox Plugin for Youtube and Vimeo with Vanilla JS

## Demo

View [demo here](https://pinceladasdaweb.github.io/mediabox/example/)

## Install

With npm

```sh
npm install mediabox --save
```

## Download

You can download the latest version or checkout all the releases [here](https://github.com/pinceladasdaweb/mediabox/releases).

## How to use?

Require the package or use the global `mediabox` namespace and include style:

### commonJS
```js
var mediabox = require('mediabox');
```

### ES6
```js
import mediabox from 'mediabox';
```

### Browser
```html
<link rel="stylesheet" type="text/css" href="path/to/mediabox.css">
<script src="path/to/mediabox.js"></script>
<script>
    MediaBox('.mediabox');
    MediaBox('.mediabox', { rel: '0' }); // Additional options
</script>
```

Now add class to links, for example:

```html
<a href="https://www.youtube.com/watch?v=3qyhgV0Zew0" class="mediabox">Youtube</a>
<a href="https://vimeo.com/71495477" class="mediabox">Vimeo</a>
```

## Browser Support

![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 10+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Thanks

Many thanks to [Qassim Alobaidi](https://github.com/QassimHassan/YouTube_PopUp), who originally created the plugin for jQuery.

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/mediabox/releases) for detailed changelog.

## License
[MIT](LICENSE)