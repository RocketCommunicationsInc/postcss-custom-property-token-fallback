# postcss-custom-property-token-fallback

[PostCSS] postcss-custom-property-token-fallback

[PostCSS]: https://github.com/postcss/postcss

## Examples

### Input Example

```css
.foo {
  color: var(--color-text-default);
}
```

### Output Example

```css
.foo {
  color: var(--color-text-default, #ffffff);
}
```

### What it does

This plugin will search through your CSS and update all custom-properties to have their fallback value included.
This fallback value comes from the given index file, which should be an object with all CSS custom property declarations. For example,

```js
{
    'foo': '#123456',
    'bar': '10px',
    'fi-fo': '5px',
}
```

This plugin also works for instances where multiple CSS custom props are used. For example,

```css
padding: var(--spacing-1) var(--spacing-2);
margin: calc(var(--spacing-1) + var(--spacing-2));
```

becomes

```css
padding: var(--spacing-1, 4px) var(--spacing-2, 8px);
margin: calc(var(--spacing-1, 4px) + var(--spacing-2. 8px));
```

If a custom property isn't in the index, the custom property will reamin unchanged.
If a custom prop is being used with a fallback already, and that fallback doesn't match the value given in the index file, then the custom property value will be overwritten with the value from the index file.
For example, if the current CSS looks like:

```css
color: var(--my-color, #ffffff);
```

and the index file also has a `my-color` custom prop with a different value, such as `#000000`, then the output would be:

```css
color: var(--my-color, #000000);
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-custom-property-token-fallback
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-custom-property-token-fallback({index: yourIndexFile })'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
