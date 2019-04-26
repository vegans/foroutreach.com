module.exports = {
  "extends": [
    "plugin:prettier/recommended",
    "prettier/react",
    "plugin:react/recommended",
    "standard",
    "prettier/standard",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/prop-types": 0,
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        bracketSpacing: false,
        jsxBracketSameLine: true,
        semi: false
      }
],
  },
  "env": {
    "browser": true,
    "node": true
  }
};
