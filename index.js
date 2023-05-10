// const postcss = require("postcss");
const plugin = (options) => {
  const index = options.index || {};
  return {
    postcssPlugin: "add-fallbacks",
    Once(root) {
      root.walkDecls((decl) => {
        const customProperties =
          decl.value.match(/var\((--[\w-]+)(, [^)]+)?\)/g) || [];
        customProperties.forEach((property) => {
          const [propertyName, fallbackValue] = property
            .replace(/var\(|\)/g, "")
            .split(", ");
          const value =
            fallbackValue || index[propertyName.replace("--", "")] || "";
          if (value) {
            decl.value = decl.value.replace(
              property,
              `var(${propertyName}, ${value})`
            );
          }
        });
      });
    },
  };
};
plugin.postcss = true;
module.exports = plugin;
