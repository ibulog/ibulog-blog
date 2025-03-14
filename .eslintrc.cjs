module.exports = {
  extends: ["plugin:astro/recommended"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
    {
      files: ["*.mdx", "*.md"],
      parser: "eslint-plugin-mdx/parser",
      plugins: ["mdx"],
      rules: {
        // MDXファイル内のリンクに関するルールを無効化
        "mdx/remark": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
