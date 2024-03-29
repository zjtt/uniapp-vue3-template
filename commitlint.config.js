/**
 * @file commitlint 配置
 * type用于说明 commit 的类别
 * scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等
 * subject是 commit 目的的简短描述，不超过50个字符
 * type（必需）、scope（可选）和subject（必需）
 * commit message: <type>(<scope>): <subject>(注意冒号后面有空格)
 *
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "init", // 初始提交
        "feat", // 新功能（feature）
        "perf", // 性能优化
        "fix", // 修补bug
        "docs", // 文档（documentation）
        "style", // 格式（不影响代码运行的变动）
        "refactor", // 重构（即不是新增功能，也不是修改bug的代码变动）
        "build", // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）'
        "test", // 增加测试
        "revert", // 回滚commit
        "chore" // 其他改动
      ]
    ],
    "type-empty": [2, "never"], // 提交不符合规范时,也可以提交,但是会有警告
    "subject-empty": [2, "never"], // 提交不符合规范时,也可以提交,但是会有警告
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"]
  }
}
