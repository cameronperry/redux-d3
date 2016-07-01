# Overview

This is a React.js Redux D3 example showing a few different ways D3 can be used with Redux.

The following core technologies are used:

* React.js
* Redux
* React Router
* PostCSS with PreCSS plugin
* Webpack with many plugins
* D3 for visualizations

This code breaks a lot of the best practices established around Redux in order to correctly handle manipulating the state tree when debugging. This code focuses only on the D3/Redux interactions themselves and the various ways to hook the two together, so the reducers and actions were coded in a way to simplify that.

To view a live example of the release, go to the following URL: <http://cameronperry.com/examples/redux-d3/>

# Getting Started

Hopefully at this point you have Node / NPM installed.

1. Clone the project, and run and install all local dependencies:

  ```
npm install
```

2. Once you install the dependencies you can go ahead and run the live reload coding environment. This will live reload any JS or CSS changes you make so you can quickly develop without refreshing the browser. Running this command does take a few seconds. You will be able to see the app at `http://localhost:8080/`

  ```
npm run dev
```

3. If you want to do a production release you can run the following command to get a full set of files outputted to the `release` directory.

  ```
npm run prod
```

  This command will export a HTML, JS, and CSS file to the `release` directory. You can then open that in your browser directly to confirm that it works.

4. There is also a command to clean up the release directory.

  ```
npm run clean
```

# Conclusion

This demonstrates the various ways one can use D3 in a Redux application, using either D3 or Redux to render and animate the nodes.

Please be aware that this is not production ready as the Redux reducers and actions are not coded in a way to support a large application.

Let me know if you run into any issues.
