const plugin = (options) => {
  const index = options.index || {};
  return {
    postcssPlugin: "add-fallbacks",
    Once(root) {
      root.walkDecls((decl) => {
        const customProperties =
          decl.value.match(/var\((--[\w-]+)(, [^)]+)?\)/g) || [];
        console.log(customProperties, "custom props");

        customProperties.forEach((property) => {
          const [propertyName] = property.replace(/var\(|\)/g, "").split(", ");
          const value = index[propertyName.replace("--", "")] || "";
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
