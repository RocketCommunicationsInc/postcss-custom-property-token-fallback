const postcss = require("postcss");

const plugin = require("./");

const dummy = {
  foo: "#123456",
  bar: "10px",
  "fi-fo": "5px",
  complicated: "10px 20px 5px 30px",
};
async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("Adds fallback value to a single custom prop", async () => {
  await run("background: var(--foo)", "background: var(--foo, #123456)", {
    index: dummy,
  });
});
it("Adds fallbacks to multiple custom props in the same declaration", async () => {
  await run(
    "padding: var(--bar) var(--fi-fo)",
    "padding: var(--bar, 10px) var(--fi-fo, 5px)",
    { index: dummy }
  );
});
it("Adds fallback value correctly to calc values", async () => {
  await run(
    "padding: calc(var(--bar) + var(--fi-fo))",
    "padding: calc(var(--bar, 10px) + var(--fi-fo, 5px))",
    {
      index: dummy,
    }
  );
});
it("Does not modify CSS if the property is not in the provided index", async () => {
  await run("color: var(--not-here)", "color: var(--not-here)", {
    index: dummy,
  });
});
it("If custom prop is declared with a fallback, that fallback will be overwritten by the fallback within the index file", async () => {
  await run("color: var(--foo, #ffffff)", "color: var(--foo, #123456)", {
    index: dummy,
  });
});
