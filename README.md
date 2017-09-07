# Object Fit Picture Tag Polyfill [![badge-size]](#no-link) [![npm version][badge-version]][link-npm]

[badge-size]: http://img.badgesize.io/chrisboakes/object-fit-picture-tag-polyfill/master/dist/object-fit-picture-tag-polyfill.min.js
[badge-version]: https://img.shields.io/npm/v/object-fit-picture-tag-polyfill.svg
[link-npm]: https://www.npmjs.com/package/object-fit-picture-tag-polyfill

> Cross browser CSS object-fit support for picture tags

- Fast and lightweight
- No framework dependencies
- Works with both ```<picture>``` and ```<img>``` tags

## Installation
However you like:
```html
<script src="dist/object-fit-picture-tag-polyfill.min.js"></script>
```

```sh
npm install --save object-fit-picture-tag-polyfill
```

## Usage
1. Append your ```<picture>``` tags with either ```data-object-fit-cover``` or ```data-object-fit-contain```

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
4. (optional) if you want to reinitialise the script you can call the ```init()``` method directly (after the class has been initialised)
    ```js
        let polyfill = new objectFitPolyfill();

        polyfill.init();
    ```

## Parameters
### `(fitPosition, addContainer)`

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
    <tr>
        <th><code>addContainer</code></th>
        <td>
            Type: <code>boolean</code><br>
            Default: <code>true</code><br><br>
            If set to true, the div which has your background-image will be wrapped in a parent div with relative positioning. The parent div will keep the class and id of your picture tag. If set to false, there will be no wrapping div and your background-image div will keep the class and id of your picture tag.
        </td>
    </tr>
</table>

MIT © [Chris Boakes](https://twitter.com/cboakes)
