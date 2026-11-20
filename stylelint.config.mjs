/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard'],
  rules: {
    // Kit naming: cx-block, cx-block--modifier, cx-block-part, is-state, tk-token
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      { message: 'Use kebab-case kit classes (cx-block, cx-block--modifier).' },
    ],
    // CSS Modules: :global / composes
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
  },
  ignoreFiles: ['.next/**', 'out/**', 'coverage/**', 'playwright-report/**'],
};

export default config;
