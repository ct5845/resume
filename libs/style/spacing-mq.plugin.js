import plugin from "tailwindcss/plugin";

/**
 * @typedef {Object} SpacingMq
 * @property {string | null } mq
 * @property {number} value
 */


const selectors = Object.freeze([
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
]);

/**
 * @param {string} selector
 * @param {string | null} mq
 * @param {number} value
 */
const generateSpacingMq = (selector, mq, value) => {
  if (mq) {
    return `${mq}:${selector}-${value}`;
  } else {
    return `${selector}-${value}`;
  }
};

/**
 * @param {string} selector
 * @param {SpacingMq[]} mediaQueries
 */
const generateSpacingMqs = (selector, mediaQueries) => {
  const mqs = mediaQueries.map(({ mq, value }) => generateSpacingMq(selector, mq, value));

  return `@apply ${mqs.join(' ')}`;
};

export default plugin(
  function ({ addUtilities, theme, variants }) {
    const options = theme("spacingMq");
    const mq = options.mq;

    const spacingMq = selectors.reduce(
      (utilities, selector) => ({
        ...utilities,
        [`.${selector}-mq`]: { [generateSpacingMqs(selector, mq)]: {} },
      }),
      {}
    );

    addUtilities({
      ...spacingMq,
    });
  },
  {
    theme: {
      spacingMq: {
        mq: [
          { mq: null, value: 1 },
          { mq: "sm", value: 2 },
          { mq: "md", value: 3 },
          { mq: "lg", value: 4 },
          { mq: "xl", value: 5 },
          { mq: "2xl", value: 6 },
          { mq: 'print', value: 1 }
        ],
      },
    },
  }
);
