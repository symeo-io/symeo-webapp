# symeo-audit-webapp

Frontend for the symeo audit tools.

## Table of Contents

- [Installation](#installation)
    - [Minimum requirements](#minimum-requirements)
    - [Install the application locally](#install-the-application-locally)
- [Development](#development)
    - [Git Flow](#git-workflow)
    - [Coding conventions](#coding-conventions)
- [Architectures](#architectures)
    - [Framework](#framework)
    - [Frontend architecture](#frontend-architecture)
    - [Components architecture](#components-architecture)
    - [Components library](#components-library)
    - [Components styling](#components-styling)
    - [Config](#config)
    - [Routing](#routing)
    - [Authentication](#authentication)
- [Infrastructure](#infrastructure)
- [Continuous Integration](#continuous-integration)
- [Continuous Delivery](#continuous-delivery)

## Installation

### Minimum requirements

- [NodeJS](https://nodejs.org/en/) 16.15.1 (You can use [nvm](https://github.com/nvm-sh/nvm))
- [Yarn](https://classic.yarnpkg.com/en/docs/install) 1.22.19
- [Docker](https://docs.docker.com/install/) 20.10.17
- [Docker Compose](https://docs.docker.com/compose/install/) 1.29.2

### Install the application locally

- Run `git clone git@github.com:symeo-io/symeo-webapp.git` or `git clone https://github.com/symeo-io/symeo-webapp.git` to clone the repository
- Run `cd symeo-webapp` to navigate to the code folder
- Run `yarn` to install node dependencies
- Run `cp .env.staging .env` to copy the staging dot env file
- If you want to use a local backend, edit the created `.env` file with the relevant variable values
- Run `yarn start` to start the application on the 5173 port

## Development

### Git workflow

The project uses [Github Flow](https://guides.github.com/introduction/flow/).

The project has 3 main branches:

- staging
- demo
- main

Each of them is synchronised with the corresponding environment (See [Continuous Delivery](#continuous-delivery) for more details).

When starting a new feature, create a new branch `feature/short-description-of-the-feature` from the `staging` branch. When development is over, open a pull request on `staging` branch and ask other developers to review the code. When the code review is done, your branch can then be merged. Note that merging into `staging`, `demo` or `main` will build and deploy automatically. Nothing more than merging is needed to deploy the frontend.

### Coding conventions

The coding conventions and style are enforced by the [eslint](https://eslint.org/) linter and the [prettier](https://prettier.io/) formatter. The configuration can be found in the [.eslintrc](./.eslintrc) file. Your IDE should be configured to use this configuration.

To check linting error in command line, run `yarn lint`.

To fix automatically format errors, run `yarn lint:fix`.


## Architectures

Insert an architecture schema here.

### Framework

The web application is build on top of the [React](https://reactjs.org/) framework, with the [TypeScript](https://www.typescriptlang.org/) language.

### Frontend architecture

The project is structured as follows:

- `src/components`: React components (reusable pieces of the application, such as a button).
- `src/constants`: Common constants used in the application.
- `src/hoc`: Custom [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html).
- `src/hooks`: Custom [React hooks](https://fr.reactjs.org/docs/hooks-intro.html).
- `src/providers`: Providers used to make functionalities available to any nested components of the app (such as [React Context](https://fr.reactjs.org/docs/context.html)).
- `src/redux/api`: The API querying system, implement using [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- `src/services`: Custom services used in the application.
- `src/theme`: Custom [Mui Theme](https://mui.com/material-ui/customization/theming/).
- `src/translations`: Translation files used by [react-intl](https://formatjs.io/docs/react-intl/).
- `src/types`: Common typescript types used by the application.

### Components architecture

Components are split and organized using the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/). The `scr/components` reflects this methodology with the folders:

- `scr/components/atoms`
- `scr/components/molecules`
- `scr/components/organisms`
- `scr/components/pages`
- `scr/components/templates`

### Components library

The app makes heavy use of [Material UI](https://mui.com/) components.

### Components styling

The components should be style using the [sx prop](https://mui.com/system/getting-started/the-sx-prop/) provided by Material UI. To ensure that all components can be styled the same way, all custom components props type should inherit the [PropsWithSx](./src/types/PropsWithSx.tsx) type and pass the sx prop to its root component:

```typescript jsx
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type CustomComponentProps = PropsWithSx & {
  title: string;
}

function CustomComponent({ title, sx }) {
  return <Box sx={{ ...sx }}>{title}</Box>;
}

export default CustomComponent;
```

### Config

Environment specific config is performed using .env files:

- `.env.local` for local development
- `.env.staging` for staging environment
- `.env.demo` for demo environment
- `.env.production` for production environment

Config is then centralized in the [config.ts](./src/config.ts) file. Env variables should be loaded only in the file, and component should only use this file to get config values.

### Routing

Routing is implemented using the [react-router](https://reactrouter.com/en/main) library. All routes are declared in the [routing.tsx](./src/routing.tsx) file with relevant config for each file. Those routes are then added to the app in the [RoutesWrapper](./src/RoutesWrapper.tsx) component.

Navigation between pages should be performed using the [useNavigate](./src/hooks/useNavigate.tsx) custom hook, which is made to use routes declared in the routing.tsx file.

### Authentication

Authentication is made using [auth0](https://auth0.com/) and the [@auth0/auth0-react](https://github.com/auth0/auth0-react) SDK. The library is configured in the [App.tsx](./src/App.tsx) file using the `<Auth0Provider />`.

The [useCurrentUser](./src/hooks/useCurrentUser.tsx) hook is then use to provide all the logged in related data to any nested component.

And the [withCurrentUserLoader](./src/hoc/withCurrentUserLoader.tsx) hoc is used to only show the application once the currentUser data are fetched from the api.

Routes that should only be accessed by logged-in users should have a flag `isSecured: true` in the [routing.tsx](./src/routing.tsx) file. Those routes are then wrapped in the [AuthenticatedRoute](./src/components/atoms/AuthenticatedRoute) which manage all auth redirections.

## Infrastructure

Frontend is served using an OVH DNS, AWS Cloudfront CDN and an AWS S3 bucket:

![](./documentation/infrastructure.png)

### Create a new environment

Follow [this documentation](./documentation/new-environment.md).

### Infrastructure as code

The infrastructure is created and deployed using the [AWS CloudFormation](https://aws.amazon.com/fr/cloudformation/) IaC framework. Scripts are located in the [.aws](./.aws) folder.

To update an environment infrastructure, update the cloudformation templates, and then tag the new version using these patterns:

- `infrastructure-staging-01-01-1970-1` for staging
- `infrastructure-demo-01-01-1970-1` for demo
- `infrastructure-production-01-01-1970-1` for production

This will trigger the circleci job that will update the infrastructure.

## Continuous Integration

Continuous integration is run using [circleci](https://circleci.com/). Configuration for the pipeline can be found in the [.circleci/config.yml](./.circleci/config.yml) file.
For each open pull requests, this pipeline executes the linter.

## Continuous Delivery

When merging on branch `staging`, `demo` or `production`, the circleci pipeline runs the deploy job to send the new built files to the corresponding S3 bucket that serves the frontend. This deploy job is describe in the same file than the CI one [.circleci/config.yml](./.circleci/config.yml).

- `staging` is deployed on https://app-staging.symeo.io
- `demo` is deployed on https://app-demo.symeo.io
- `production` is deployed on https://app.symeo.io