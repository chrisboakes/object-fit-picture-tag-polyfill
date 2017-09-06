# Object Fit Picture Tag Polyfill [![badge-size]](#no-link) [![npm version][badge-version]][link-npm]

[badge-size]: http://img.badgesize.io/chrisboakes/object-fit-picture-tag-polyfill/master/dist/object-fit-picture-tag-polyfill.min.js
[badge-version]: https://img.shields.io/npm/v/object-fit-picture-tag-polyfill.svg
[link-npm]: https://www.npmjs.com/package/object-fit-picture-tag-polyfill

> Cross browser CSS object-fit support for picture tags

- Fast and lightweight
- No framework dependencies
- Works with both <picture> and <img> tags

## Installation
However you like:
```html
<script src="dist/object-fit-picture-tag-polyfill.min.js"></script>
```

```sh
npm install --save object-fit-picture-tag-polyfill
```

## Usage
1. Append your <picture> tags with either ```data-object-fit-cover``` or ```data-object-fit-contain```

2. Import the plugin
    ```js
        import objectFitPolyfill from 'object-fit-picture-tag-polyfill';
    ```
3. Instantiate the class and pass it any options
    ```js
        new objectFitPolyfill({
            fitPosition: 'center center'
        });
    ```

## Parameters
### `(fitPosition)`

<table>
    <tr>
        <th>parameter</th>
        <th>description</th>
    </tr>
    <tr>
        <th><code>fitPosition</code></th>
        <td>
            Type: <code>string</code><br>
            Default: <code>'center center'</code><br><br>
            The background-position of background-image
        </td>
    </tr>
</table>

MIT © [Chris Boakes](https://twitter.com/cboakes)
