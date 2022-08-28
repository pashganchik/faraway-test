## **About**

React-based application, interacting with api `https://swapi.dev/api`.

## **Requirements/dependencies**

- _React-Bootstrap_ - as common UI library
- _React-Redux_ - as state management library
- _React-Intl_ - as localization library
- _React-Toastify_ - for toast messages
- _React-Icons_ - icon set

## **Getting started**

1. Clone the repository locally
2. Call from the root:
    ```shell
    npm install
    ```
3. In the terminal run `npm run start-app` and then open browser with URL `http://localhost:3000/`

## **Code style requirements**

There are _Prettier_, _ESLint_, _Stylelint_ and _Typescript compilation_ used to check that code is formatted and doesn't contain errors.

If there are some errors - you may run Commands to fix (see table below), or fix errors/warnings manually.

- *How to check all these rules manually:*

  | Check type        | Command to check          | Command to fix          |
    | -----------       | ----------------------    | ----------------------  |
  | Typescript        | `npm run tsc:check`       |  -                      |
  | Prettier          | `npm run prettier:check`  | `npm run prettier:fix`  |
  | ESLint            | `npm run eslint:check`    | `npm run eslint:fix`    |
  | StyleLint         | `npm run stylelint:check` | `npm run stylelint:fix` |
  | _**Everything**_  | _**`npm run all:check`**_ | _**`npm run all:fix`**_ |

- *Pre-commit hook:*

  Please, just find file `.husky/pre-commit`. It contains all necessary commands to check files before commit.
