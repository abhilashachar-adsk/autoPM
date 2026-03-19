# adp-infra-project-resources-mfe

The adp-infra-project-resources-mfe microfrontend.

## Local Development Setup

### 1. Install Dependencies

Install all the project's dependencies:

```console
yarn install
```

### 2. Get Bearer Token

You need a bearer token to authenticate with Spindle API. You have two options:

#### Option A: Manual Setup

1. Get your token from: https://access-dev.adp.autodesk.com/utility/access-token?continue
2. Create a `.env` file in the project root:
   ```
   LOCAL_TOKEN=your_bearer_token_here
   ```

#### Option B: Use Refresh Token Script (Recommended)

Run the automated refresh token script that will:
- Open the browser to get a new token
- Read the token from your clipboard
- Update the `.env` file
- Start the dev server

```console
yarn refresh-token
```

**Note**: Tokens expire regularly. When you see 401 errors, re-run `yarn refresh-token`.

### 3. Start Development Server

To start your local development environment:

```console
yarn start
```

This will host the page on `https://localhost:3000/` (HTTPS enabled for local development).

#### Access Routes:
- Base: `https://localhost:3000/adp-infra-project-resources`
- Storage: `https://localhost:3000/adp-infra-project-resources/storage`
- Orchestration: `https://localhost:3000/adp-infra-project-resources/orchestration`

**Note**: Your browser will show a security warning about the self-signed SSL certificate. This is expected. Click "Advanced" and proceed to localhost.

## Build

To build the project, run the following command.

```console
yarn build
```

For a development build with no minification, run the following command.

```console
yarn build:dev
```

## Test

To run the tests, run the following command.

```console
yarn test
```

To have the tests re-run every time a file is modified, run the following command.

```console
yarn test:watch
```

## Analyze

To examine the size of your build and to determine which modules are contributing to its size,
run the following command (after having run the `build` script).

```console
yarn analyze
```

To learn more about the Webpack Bundle Analyzer, visit its
[documentation](https://www.npmjs.com/package/webpack-bundle-analyzer).

## Versioning

All CFP compatible microfrontends must use semantic versioning. The CFP MFE pipeline expects microfrontend
developers to use Angular's
[commit message convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
so that the CFP pipeline can automatically determine the next version of the microfrontend based off of the
project's commit messages. Commit messages are automatically formatted by commitizen and git hooks.
Simply run the `git commit` command and follow the cli prompts to successfully commit your changes.

## Production System

For information on the CFP production system, visit the
[CFP pipeline](https://pages.git.autodesk.com/dpe/cfp-docs/reference/pipeline) and
[CFP infrastructure](https://pages.git.autodesk.com/dpe/cfp-docs/reference/infrastructure) documentation.

## Maintenance

This project uses [browserslist](https://github.com/browserslist/browserslist) to determine
which polyfills are needed based on the projects list of targeted browsers (configured in the
`.browserslistrc` file).

To ensure that the project is being polyfilled with the most up to date browser version information
and browser usage statistics, it is important to update browserslist's `caniuse-lite` database
on a regular basis. Do so by running the following command and committing the changes to
your `yarn.lock` file.

```console
npx browserslist@latest --update-db
```

To see what browsers are currently being targeted by the project, run the following command in the root
of the project.

```sh
npx browserslist
```
