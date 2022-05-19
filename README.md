# UW Cribs

**Description**:  Finding and selling short term rentals is a universal pain amongst postsecondary students. This repository contains the code for UW Cribs, a product serving the Waterloo postsecondary student community by providing a centralized filterable interface for housing posts made on Facebook groups. This project is still in its infancy but we hope from Day One to provide an enjoyable experience for students finding housing.

Other things to include:

  - **Technology stack**: This repository contains code for a Turborepo monorepo, using Yarn as a package manager. It contains both `apps` and `packages`:
  * `apps`
    * `web`
      * A [Next.js](https://nextjs.org) web application written in TypeScript. It serves as the user-facing frontend interface allowing users to filter through housing posts.
    * `server`
      * A [Node.js](https://nodejs.org/en/) server written in TypeScript. It serves as an API queried by the `web` app, performing CRUD operations on housing data.
    * `parser`
      * A [Node.js](https://nodejs.org/en/) server written in JavaScript. It serves as a web scraper + data analyzer, scraping posts off of Facebook groups, categorizing posts into various data fields using `nlp.js`, and performing the appropriate CRUD operations on housing data.
  * `packages`
    * `ui`
      * A custom React UI library providing reusable components for the frontend applications of the monorepo.
    * `config`
      * Contains configuration files for various tools used in the monorepo, such as Jest, ESLint, and TailwindCSS.
    * `tsconfig`
      * Contains configuration files for using TypeScript in the applications written in TypeScript
   
  - **Status**:  This project has been recently launched for public use (v1)
  - **Links to production or demo instances**: The production link is https://uwcribs.com/

<img width="620" alt="image" src="https://user-images.githubusercontent.com/41309709/169167437-5980bf6f-d9c9-47a1-b9ad-55b5fe310331.png">



### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Installation

Clone the repository locally to run any of the individual applications.
Then (at the root), run:
```
yarn install
husky install
```

To run any of the applications, navigate to the directory of each and then run:
```
yarn run dev
```
## Configuration

Each application contains an `.env.example` which provide the environment variables required to be placed into `.env` files (at the same directory level). Some values are up to the developer's personal usage, for others - contact a contributor to this repo.

## Getting involved

We'd love to get help from you on this project! If you have a specific issue, feel free to open up a GitHub issue for this project. If you'd like to directly contribute, contact a contributor to this project and let them know you'd like to help!


----

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
- 
## Open source licensing info
MIT License
