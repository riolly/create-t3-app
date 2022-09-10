# Enhanced create-T3-app

More tools to enhance your experience while develop your app.

## Lint & Format

Detect error by enforcing some rule & beautifully format it.

_Confuse about plugin and config?_

- Read [this](https://stackoverflow.com/questions/44690308/whats-the-difference-between-prettier-eslint-eslint-plugin-prettier-and-eslint) and
- Read [this](https://stackoverflow.com/questions/53189200/whats-the-difference-between-plugins-and-extends-in-eslint)

### 1. Install prettier with config for eslint & plugin for tailwind

`npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-tailwindcss`

### 2. Add prettier config file

`prettier.config.cjs`

```js
module.exports = {
	trailingComma: 'es5',
	useTabs: true,
	tabWidth: 2,
	semi: false,
	singleQuote: true,
	bracketSpacing: false,
	jsxSingleQuote: true,
	plugins: [require('prettier-plugin-tailwindcss')],
	tailwindConfig: './tailwind.config.cjs',
}
```

### 3. Extend prettier on eslint config file `.eslint.json`

```diff
{
- "plugins": ["@typescript-eslint"],
+ "plugins": ["@typescript-eslint", "prettier"],
	"extends": [
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended",
+		"prettier"
	],
+	"rules": {
+		"prettier/prettier": "warn"
+	}
}
```

### 4. Add more plugin when you needed

I personally love [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

### 5. Lint & format all of your file

`npx prettier --write .`
`npx eslint .`
