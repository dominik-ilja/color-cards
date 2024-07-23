import plugin from "tailwindcss/plugin";

const selectorPlugin = plugin(({ addVariant }) => {
  // ghf - group hover or focus (visible)
  addVariant("ghf", [
    ":merge(.group):hover &",
    ":merge(.group):focus-visible &",
  ]);
  // ghfw - group hover or focus within
  addVariant("ghfw", [
    ":merge(.group):hover &",
    ":merge(.group):focus-within &",
  ]);
  // hf - hover or focus (visible)
  addVariant("hf", ["&:hover", "&:focus-visible"]);
  // hfw - hover or focus within
  addVariant("hfw", ["&:hover", "&:focus-within"]);
  addVariant("not-last-child", "&:not(:last-child)");
  addVariant("nth-odd", "&:nth-child(odd)");
  addVariant("nth-even", "&:nth-child(even)");
});

export default selectorPlugin;
