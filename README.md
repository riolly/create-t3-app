# [create-T3-app](https://github.com/t3-oss/create-t3-app) with extra tools out of the box

create-t3-app is one of the fastest and easiest way to scaffold fullstack app.<br/>
create-t3-extended make it even **faster for my case.** 🏃💨<br/>
Make sure you understand create-t3-app first. ⚠️<br/>

:smiley: If you find it helpful, feel free to use. <br/>
🥰 If you have opinion that you think better, feel free to discuss.<br/>
🤓 _I'm not consider myself an expert. Just learn & share_.<br/>

<br />

## Linting & Formatting 🧹

> better code [^1] without the frustration of config.

##### Install prettier with the config & plugin for eslint & tailwind

`npm i -D prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-tailwindcss`

&emsp; _Confuse about plugin vs config?_ Read [this](https://stackoverflow.com/questions/44690308/whats-the-difference-between-prettier-eslint-eslint-plugin-prettier-and-eslint) and [this](https://stackoverflow.com/questions/53189200/whats-the-difference-between-plugins-and-extends-in-eslint).

&emsp; _Why don't we use stylelint also?_<br/>
&emsp; **Tailwind is more than enough.** [Use arbitrary value & custom style.](https://tailwindcss.com/docs/adding-custom-styles#customizing-your-theme)

Here is my experience:<br/>
I make component animation on css and realize that you can move it to tailwind custom style.
I use scss on svg animation and realize css is not for this kind of job. You will screw up really fast (sarah drasnes said). I move using animation library instead ([more below](#animation-🌟)).

##### Add prettier config file `prettier.config.cjs`

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

##### Extend eslint config `.eslint.json`

```diff
{
- "plugins": ["@typescript-eslint"],
+ "plugins": ["@typescript-eslint", "prettier"],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
+ "prettier"
  ],
+ "rules": {
+   "prettier/prettier": "warn"
+ }
}
```

You can use prettier only on formatting or also give linting error/ warning. For my chase warn me.

##### Add more plugin if you need it

I personally love [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) plugin.

##### Lint & format all of your file

`npx prettier --write .`<br/>
`npx eslint .`

<br />

## Git hooks ⛓️

> better [^1] and more exciting git experience

#### 🧹 Pre-commit

&emsp; _Make sure everything is clean before commit it._

Add husky to the project<br/>
`npx husky-init && npm i`

Install lint-staged<br/>
`npm i -D lint-staged`

Add config file `.lintstagedrc`

```json
{
	"*.{js,jsx,cjs,ts,tsx}": "eslint --fix",
	"*.{md,json}": "prettier --write"
}
```

Run lint-staged on pre-commit hook

```diff
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

- npm test
+ npx lint-staged
```

If the log message doesn't show correctly, see this [issue](https://github.com/typicode/husky/issues/968#issuecomment-1176848345)

#### 📨 Commit message

&emsp; _Give clear message by following the [convention][1]_

[1]: https://www.conventionalcommits.org/en/v1.0.0/

Install commitlint<br/>
`npm install -D @commitlint/cli @commitlint/config-conventional`

Add config file<br/>
`commitlint.config.cjs`

```json
module.exports = {
	extends: ['@commitlint/config-conventional'],
}
```

Add to commit-message hook<br/>
`npx husky add .husky/commit-msg "npx commitlint --edit \"\$1\""`

Test by making a commit<br/>
`git commit -m "foo: bar"`

#### 🤯 Commit emoji

&emsp; _Who don't like emoji??_

Install [gitmoji](https://github.com/carloscuesta/gitmoji)<br/>
`npm i -g gitmoji-cli`

Install gitmoji config for commitlint<br/>
`npm i -D commitlint-config-gitmoji`

Update commitlint config file

```diff
module.exports = {
-	extends: ['@commitlint/config-conventional'],
+	extends: ['gitmoji'],
+	rules: {
+		'header-max-length': [0, 'always', 100],
+		'scope-case': [0, 'always', 'pascal-case']
+ 	}
}
```

Commit using gitmoji<br/>
`gitmoji -c`

#### 🏗️ Pre-push

&emsp; _Clean doesn't mean it's not break_

`npx husky add .husky/pre-push "npm run build" `

Hosting provider usually charge money if you exceed the build time limit. It can save you some time.

<br />

## Optimization/ Perf 📈

> Don't bring unnecessary thing in your baggage

#### 📦 Bundle Analyzer

&emsp; _Consider package bundle size before add it to your arsenal._

Install bundle analyzer<br/>
`npm -i -D @next/bundle-analyzer`

Edit next.config.cjs

```diff
+ import bundleAnalyzer from '@next/bundle-analyzer'

+ const withBundleAnalyzer = bundleAnalyzer({
+ 	enabled: process.env.ANALYZE === 'true',
+ })

function defineNextConfig(config) {
-	return config
+	return withBundleAnalyzer(config)
}
```

Add bundle analyzer build script

```diff
+	"build-stats": "ANALYZE=true npm run build"
```

Run build with bundle analyzer
`npm run build-stats`

You can also check using bundle size using [bundlephobia](https://bundlephobia.com/).

#### 🧰 CSS

&emsp; _Optimize [tailwind on production](https://tailwindcss.com/docs/optimizing-for-production)_

Minify CSS using cssnano<br/>

`npm -i -D cssnano`

Edit `postcss.config.cjs`

```diff
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
+		...(process.env.NODE_ENV === 'production' ? {cssnano: {}} : {}),
	},
}
```

<br/>

## Styling 💅

> You are beautiful and special

#### 🌟 Animation

&emsp; _Steal user attention & help them navigate._

These css animation collection very useful to make your website stand out

- [animate.css](https://animate.style/)
- [magic](https://www.minimamente.com/project/magic/)
- [hover](https://github.com/IanLunn/Hover)

[Auto animate](https://github.com/formkit/auto-animate) also really helpful for element transition.

For svg animation use [GSAP](https://github.com/greensock/GSAP). [Sarah Drasnes](https://github.com/sdras) and other pro recommend it because it's the most mature and reliable library.

<br />

## Next to cover

- vscode extension
- nextjs
- favicon
- svg
- form

[^1]: more readable & manageable also prevent error
