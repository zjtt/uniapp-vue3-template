const { defineStylelintConfig } = require('@ttou/define-config')

module.exports = defineStylelintConfig({
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'block-no-empty': null,
    'unit-no-unknown': null,
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': null,
    'no-descending-specificity': null,
    'keyframe-selector-notation': null,
    'annotation-no-unknown': null
  }
})
