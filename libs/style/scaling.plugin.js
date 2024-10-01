import plugin from "tailwindcss/plugin";

const generateResponsiveScale = (selector) => {
  return `@apply ${selector}-2 sm:${selector}-2 md:${selector}-3 lg:${selector}-4 xl:${selector}-5 2xl:${selector}-6 print:${selector}-1`;
};

export default plugin(function ({ addUtilities }) {
  const selectors = [
    "p",
    "px",
    "py",
    "pl",
    "pr",
    "pt",
    "pb",
    "m",
    "mx",
    "my",
    "ml",
    "mr",
    "mt",
    "mb",
    "gap",
    "gap-x",
    "gap-y",
  ];

  const responsiveScales = selectors.reduce(
    (utilities, selector) => ({
      ...utilities,
      [`.${selector}-scale`] : { [generateResponsiveScale(selector)]: {} },
    }),
    {}
  );

  addUtilities({
    ...responsiveScales
  });
});
