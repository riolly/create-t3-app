# [create-T3-app](https://github.com/t3-oss/create-t3-app) with extra tools/config out of the box

create-t3-app is one of the fastest and easiest way to scaffold fullstack app.<br/>
create-t3-extended make it even **faster for my case (and maybe yours).** 🏃💨<br/>

Made with create-t3-extended:<br/>
[Transparency app](https://transparency.vercel.app)

Tools & config included:

- 🧹 [Linting & Formatting](#linting--formatting-)
- ⛓️ [Git hooks](#git-hooks-️)
  - [Pre-commit](#-pre-commit)
  - [Commit message](#-commit-message)
  - [Commit emoji](#-commit-emoji)
  - [Pre-push](#️-pre-push)
- 📈 [Optimization](#optimization-)
  - [Bundle size](#-bundle-analyzer)
  - [CSS](#-css)
- 🚀 [Deployment](#going-live-)
  - [MySQL on PlanetScale](#-mysql-on-planetscale)
  - [Google OAuth](#-google-oauth)
  - [Vercel](#-vercel)
- 🪛 [Others](#other-helpful-things-)
  - [Fonts](#🅵-fonts)
  - [Favicon](#-favicon)
  - [Animation](#-animation)
  - [SASS](#-sass)
  - [Tailwind config](#-tailwind-config)
  - [Path aliases](#-path-aliases)
    <br/>

Interesting Discussion

- 🗡️ [Bleeding edge tech](#️-bleeding-edge-tech)
  - [ORM replacement](#orm-replacement)
  - [DB replacement](#db-replacement)

This documentation below show _how I modify the original code base_ into what you'll find in this repo & also some _useful tips & trick_.

- _If your case same with mine/ you agree with all my opinion_, **just use it & start**.
- _If your case is different than mine/ agree only some of my opinion_, **use create-t3-app & add the tools/ config you need.**

⚠️ **I personally encourage the second point.**

If you find it helpful, feel free to use. :smiley:<br/>
If you have opinion that you think better, feel free to discuss. 🥰 <br/>
If you find bug, let's fix it. 🤔 <br/>
_I'm not consider myself an expert. Just learn & share_. 🤓 <br/>
Hopefully one day I will make a CLI for this. How smooth that will be?</br>

<br />

#### Note

This instruction is using npm, but you can use yarn or pnpm :facepunch:

## Linting & Formatting 🧹

> better code [^1] without the frustration of config.

##### Install prettier with the config & plugin for eslint & tailwind

##### npm

```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-tailwindcss
```

&emsp; _Confuse about plugin vs config?_ Read [this](https://stackoverflow.com/questions/44690308/whats-the-difference-between-prettier-eslint-eslint-plugin-prettier-and-eslint) and [this](https://stackoverflow.com/questions/53189200/whats-the-difference-between-plugins-and-extends-in-eslint).

&emsp; _Why don't we use stylelint also?_<br/>
&emsp; **Tailwind is more than enough.** [Use arbitrary value & custom style.](https://tailwindcss.com/docs/adding-custom-styles#customizing-your-theme)

Here is my experience:<br/>
I make component animation on css and realize that you can move it to tailwind custom style.
I use scss on svg animation and realize css is not for this kind of job. You will screw up really fast (sarah drasner said). I move using animation library instead ([more below](#animation-🌟)).

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
+   "prettier"
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

```bash
npx prettier --write .
```

```bash
npx eslint .
```

<br />

## Git hooks ⛓️

> better [^1] and more exciting git experience

#### 🧹 Pre-commit

&emsp; _Make sure everything is clean before commit it._

Add husky to the project<br/>

##### npm

```bash
npx husky-init && npm i
```

Install lint-staged<br/>

##### npm

```bash
npm i -D lint-staged
```

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

##### npm

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

Add config file<br/>
`commitlint.config.cjs`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

Add to commit-message hook<br/>

```bash
npx husky add .husky/commit-msg "npx commitlint --edit \"\$1\""
```

Test by making a commit<br/>

```bash
git commit -m "foo: bar"
```

#### 🤯 Commit emoji

&emsp; _Who don't like emoji??_

Install [gitmoji](https://github.com/carloscuesta/gitmoji)<br/>

##### npm

```bash
npm i -g gitmoji-cli
```

Install gitmoji config for commitlint<br/>

##### npm

```bash
npm i -D commitlint-config-gitmoji
```

Update commitlint config file

```diff
module.exports = {
- extends: ['@commitlint/config-conventional'],
+ extends: ['gitmoji'],
+ rules: {
+   'header-max-length': [0, 'always', 100],
+   'scope-case': [0, 'always', 'pascal-case'],
+ },
}
```

Commit using gitmoji<br/>

```bash
gitmoji -c
```

#### 🏗️ Pre-push

&emsp; _Clean doesn't mean it's not break_

```bash
npx husky add .husky/pre-push "npm run build"
```

Hosting provider usually charge money if you exceed the build time limit. It can save you some time.

<br />

## Optimization 📈

> Don't bring unnecessary thing in your baggage

#### 📦 Bundle Analyzer

&emsp; _Consider package bundle size before add it to your arsenal._

Install bundle analyzer<br/>

##### npm

```bash
npm -i -D @next/bundle-analyzer
```

Edit next.config.cjs

```diff
+ import bundleAnalyzer from '@next/bundle-analyzer'

+ const withBundleAnalyzer = bundleAnalyzer({
+   enabled: process.env.ANALYZE === 'true',
+ })

function defineNextConfig(config) {
- return config
+ return withBundleAnalyzer(config)
}
```

Add bundle analyzer build script

```diff
+ "build-stats": "ANALYZE=true npm run build"
```

Run build with bundle analyzer

##### npm

```bash
npm run build-stats
```

You can also check using bundle size using [bundlephobia](https://bundlephobia.com/).

#### 🧰 CSS

&emsp; _Optimize [tailwind on production](https://tailwindcss.com/docs/optimizing-for-production)_

Minify CSS using cssnano<br/>

##### npm

```bash
npm -i -D cssnano
```

Edit `postcss.config.cjs`

```diff
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
+   ...(process.env.NODE_ENV === 'production' ? {cssnano: {}} : {}),
  },
}
```

<br/>

## Going Live 🚀

> Why wait so long to go to the moon?

#### 🪐 MySQL on PlanetScale

&emsp; _Sit with ease in case your app suddenly become a startup_. Watch this [interview](https://www.youtube.com/watch?v=MCz_19KUZ2s&ab_channel=Theo-ping%E2%80%A4gg)

I use both local database & PlanetScale branch database for development. Depend on your need. <br/>
For local I use `prisma migrate dev`<br/>
For remote I use `prima db push`<br/>
Read this for the [differences](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate).

##### Local MySQL server

Go to prisma.schema and there will be instruction about what to do.

For MySQL installation follow [guide](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04).

Set database url on `.env`<br/>
`DATABASE_URL=mysql://user:password@localhost:3306/database_name`

Migrate local database (_better wait after planet scale setup_)<br/>

```bash
npx prisma migrate dev
```

##### PlanetScale setup

Ignore prisma migration file in `.gitignore` <br/>
`/prisma/migrations/*`

Follow this [instruction](https://PlanetScale.com/docs/tutorials/prisma-quickstart) and you are good to go.

Code mods:<br/>
`prisma.schema`

```diff
generator client {
  provider        = "prisma-client-js"
+ previewFeatures = ["referentialIntegrity"]
}

datasource db {
  url                  = env("DATABASE_URL")
+ referentialIntegrity = "prisma"
}
```

Replace your DATABASE_URL on `.env` with url that you get from PlanetScale

#### 🔎 Google OAuth

&emsp; _Who doesn't have google account?_

Setup credential at [google console](https://console.cloud.google.com).<br/>
Create new project > configure consent screen<br />
Go to "APIs & Services" > "Credentials" > "Create credentials" > "OAuth Client ID" <br/>

Add "Authorized JavaScript origins" with base url

```
http://localhost:3000
https://your-domain.vercel.app
```

Add "Authorized redirect URIs" with callback url

```
http://localhost:3000/api/auth/callback/google
https://your-domain.vercel.app/api/auth/callback/google
```

Add google credential to `.env`

```diff
+ GOOGLE_CLIENT_ID = 'Your Client ID'
+ GOOGLE_CLIENT_SECRET = 'Your Client Secret'
```

Add google env to `schema.mjs`

```diff
export const serverSchema = z.object({
  ...
+ GOOGLE_CLIENT_ID: z.string(),
+ GOOGLE_CLIENT_SECRET: z.string(),
})
```

Add Google provider & enable jwt on `[..nextauth].ts`

```diff
+ import GoogleProvider from 'next-auth/providers/google'

  callbacks: {
    session({session, user}) {
      ...
    },
+   async jwt({token}) {
+     return token
+   },
  },

  providers: [
+   GoogleProvider({
+     clientId: env.GOOGLE_CLIENT_ID,
+     clientSecret: env.GOOGLE_CLIENT_SECRET,
+   }),
    ...
  ],
```

Enable jwt callback (required)

```diff
callbacks: {
  session({session, user}) {
    ...
  },
+ async jwt({token}) {
+   return token
+ },
},
```

#### 🔺 Vercel

&emsp; _Except you like to complicate things_

Just add the env & deploy

Add your live url as next auth url on `.env`

```diff
+ NEXTAUTH_URL=https://your-domain.vercel.app
```

<br/>

## Other helpful things 🪛

> Trivially important

#### 📄 NextJS custom `Document`

Create [custom document](https://nextjs.org/docs/advanced-features/custom-document) `_document.tsx` on pages directory

```js
import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

#### 🅵 Fonts

&emsp; _There are a lot of curated font pairing ready to pick._

Pick font pairing from two of the most useful collection from [heyreliable.com](https://heyreliable.com/ultimate-google-font-pairings/) and [pagecloud.com](https://www.pagecloud.com/blog/best-google-fonts-pairings).
You can also filter by the style that match your app.

💡 Steal font combo from your favorite website.

Go to [google font](https://fonts.google.com/) and search those fonts.

Select the specimen that you will use. Remember about performance!
I recommend pick three font weight and the italic version of each weight.

Add the font link inside `<Head>` component on `_document.tsx`

```diff
+ <head>
+   <link rel="preconnect" href="https://fonts.googleapis.com" />
+   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
+   <link
+     href="https://fonts.googleapis.com/css2?family=Hind:wght@400;600&family=Montserrat:ital,wght@0,400;0,600;0,800;1,400;1,600;1,800&display=swap"
+     rel="stylesheet"
+   />
    ...
+ </head>
```

Extend tailwind config with the font family

```js
  theme: {
    extend: {
      fontFamily: {
+       heading: ['Montserrat', 'sans-serif'],
+       body: ['Hind', 'sans-serif'],
      },
    },
  },
```

You can apply it directly to the tag if needed by changing `styles/global.css`

```css
@layer base {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-heading;
  }

  p {
    @apply font-body;
  }
}
```

#### ⭐ Favicon

&emsp; _Just get it correctly._

Prepare your svg icon

Go to [realfavicongenerator.net](`https://realfavicongenerator.net/`)

Adjust & generate favicon

Download & put on public directory

Copy generated link to head on `_document.tsx`

```diff
  <head>
+   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
+   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
+   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
+   <link rel="manifest" href="/site.webmanifest" />
+   <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
+   <meta name="msapplication-TileColor" content="#2d89ef" />
+   <meta name="theme-color" content="#ffffff" />
  <head />
```

#### 🌟 Animation

&emsp; _Steal user attention & help them navigate._

These css animation collection very useful to make your website stand out

- [animate.css](https://animate.style/)
- [magic](https://www.minimamente.com/project/magic/)
- [hover](https://github.com/IanLunn/Hover)

[Auto animate](https://github.com/formkit/auto-animate) also really helpful for element transition.

For svg animation use [GSAP](https://github.com/greensock/GSAP). [Sarah Drasner](https://github.com/sdras) and other pro recommend it because it's the most mature and reliable library.

#### 💨 Tailwind config

&emsp; _Small details fixes._

Additional default override. For what? [read this](https://css-tricks.com/custom-tailwind-css/)

```css
@layer base {
  html {
    -webkit-tap-highlight-color: transparent;
  }
}

@layer utilities {
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

#### 👓 SASS

&emsp; _Managing keyframe will ruin your entire day._

You will mess up very quickly if you don't use variables for handling keyframe. But we don't want JS yet for this simple animation.

- Attention seeker & Transition > SASS
- Interaction & complex SVG > JS library

Install sass

##### npm

```bash
npm i -D sass
```

Add script to watch & debug sass

```diff
"scripts": {
  ...
+ "sass-watch": "sass --watch src/styles:css"
},
```

Ignore output file

```diff
+ # sass watch output
+ /css
```

Add [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules#visual-studio-code) for autocompletion<br />

##### npm

```bash
npm i -D typescript-plugin-css-modules
```

Update `tsconfig`

```diff
"compilerOptions": {
+ "plugins": [{ "name": "typescript-plugin-css-modules" }]
}
```

Add to vscode config

```diff
+ "typescript.tsserver.pluginPaths": ["typescript-plugin-css-modules"]
```

#### 🛣 Path Aliases

&emsp; _Stop playing guess game while importing module_

Add base path & path aliases on `tsconfig.json`

```diff
+ "baseUrl": "src",
+ "paths": {
+   "@components/*": ["components/*"],
+   "@api/*": ["pages/api/*"],
+   "@pages/*": ["pages/*"],
+   "@animation/*": ["styles/animation/*"],
+   "@styles/*": ["styles/*"],
+   "@utils/*": ["utils/*"],
+   "@server/*": ["server/*"],
+   "@images/*": ["../public/images/*"]
+ },
```

<br />

<br/>

## 🗡️ ~~Bleeding~~ edge tech

> Cool tech should not make you bleeding

These is only for exploration & discussion.

#### ORM Replacement

[Kysely](https://github.com/koskimas/kysely) provide end-to-end type-safety but also edge-first approach to ORM replacement

#### DB Replacement

I have been trying [EdgeDB](https://edgedb.com/) and it's **SUPER COOL!**
But I think [SurrealDB](https://surrealdb.com/) will be the real one.

<br/>

## Next to cover

- vscode extension
- nextjs
- svg

[^1]: more readable & manageable also prevent error
