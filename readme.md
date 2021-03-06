## <img src="http://webulla.ru/static/logo-60x60.png" width="22px" height="22px" style="vertical-align: middle;" /> RDSFront&Home - a landing page for rds frontend team

An example of usage following technologies:
* [react.js](https://facebook.github.io/react/) - as main technology;
* [webpack](https://webpack.github.io/) - for assets compilation;
* [babel](https://babeljs.io/) - js compiler;
* [stylus](http://stylus-lang.com/) - for css styles;
* [css modules](https://github.com/css-modules/css-modules) - for stylus modules;
* [yarn](https://yarnpkg.com/) - packages manager;
* [nvm](https://github.com/creationix/nvm) - node version manger;

Also you can find interested next technics for **youtube videos**:
* video as background;
* repeating video;
* programmatically video trimming.

And look at **deploy.sh** script if you want to understand how to deploy static files of your project to the remote server.


### Launch the application locally
First we need to clone the repo:
```bash
git clone git@github.com:gustarus/rdsfrontend.git
```

Go to the cloned repo:
```bash
cd rdsfrontend
```

Install packages via yarn:
```bash
yarn
```

Run the webpack dev server on 8080 port:
```bash
npm run start
```

Open in the browser [http://localhost:8080/](http://localhost:8080/) and who-a-la!
