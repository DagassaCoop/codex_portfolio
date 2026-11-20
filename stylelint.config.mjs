/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard'],
  rules: {
    // Kit naming: cx-block, cx-block--modifier, cx-block-part, is-state, tk-token
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      { message: 'Use kebab-case kit classes (cx-block, cx-block--modifier).' },
    ],
    // Keep the kit's colour notation (rgba(35, 27, 19, .45)) so values diff 1:1 against codex.css
    'color-function-notation': null,
    'color-function-alias-notation': null,
    'alpha-value-notation': null,
    // The kit relies on rule order (hover before disabled, group overrides after items), as codex.css does
    'no-descending-specificity': null,
    // CSS Modules: :global / composes
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
  },
  overrides: [
    {
      // CSS Modules are imported as JS objects: camelCase class names (styles.specimenRow)
      files: ['**/*.module.css'],
      rules: {
        'selector-class-pattern': [
          '^[a-z][a-zA-Z0-9]*$',
          { message: 'Use camelCase class names in CSS Modules.' },
        ],
      },
    },
  ],
  ignoreFiles: ['.next/**', 'out/**', 'coverage/**', 'playwright-report/**', 'storybook-static/**'],
};

export default config;
