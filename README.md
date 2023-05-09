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

If the value of a custom property isn't in the index, the custom property will reamin unchanged.
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
