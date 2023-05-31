// eslint负责校验代码，prettier负责统一代码风格，editconfig保证编辑器基本设置一致
module.exports = {
  globals: {
    uni: "readonly",
    wx: "readonly",
    UniApp: "readonly"
  },
  env: {
    // 环境，针对哪些环境的语法
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    // 集成了哪些规则，别人写好的规则直接拿来用
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended", // typescript 规则
    "@vue/prettier"
  ],
  overrides: [],
  // "parser": "@typescript-eslint/parser",
  parser: "vue-eslint-parser", // 解析.vue文件
  parserOptions: {
    parser: "@typescript-eslint/parser", // 解析.ts文件
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // 我们自定义的规则写在这里
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // 使用单引号
        semi: false, // 末尾添加分号
        tabWidth: 2,
        trailingComma: "none",
        useTabs: false,
        endOfLine: "auto"
      }
    ],
    "@typescript-eslint/no-explicit-any": 1, // any报错
    "vue/multi-word-component-names": "warn",
    "@typescript-eslint/no-unused-vars": 0
  }
}
