# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Workflow for a ReactTS app

### Setup and run
1. Setup app as described here: https://reactjs.org/docs/static-type-checking.html#typescript
   - `npx create-react-app name-of-app --template typescript`
   - N.B. thier package.json and tsconfig.json

2. Use `.ts` files for plain TS and `.tsx` files for TS yielding JSX elements.

3. Use `npm run start` to run development server

### Deploy
##### General
Use `npm run build` to transpile TS to JS for production.
   - The outut `build/dist` can be deployed, e.g. using serve. See [Deployment](https://create-react-app.dev/docs/deployment/) and [Create a Production Build](https://create-react-app.dev/docs/production-build)
   - No output means success! When using VS Code, errors will be shown before.

##### Heroku
The Heroku `Node.js` buildpack runs build and start automatically.
Build is the same npm script in this case, but we need to tell it to start the transpiled JS files.

```json
   "start": "node build/dist/index.js",
   "start-dev": "react-scripts start",
   "build": "tsc",
```

### Using bundles
Some bundles come with type declarations in `index.d.ts` files. If not, get declarations from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).
E.g. React doesn't have it, but can be added.