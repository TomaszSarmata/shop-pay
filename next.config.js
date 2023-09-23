/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //here we are going to include some sass options to make our sass variables available for the entire app. Without changing next.js config, we would have to import manually (@import "./base.scss";) our base.scss at the top of each file in our components where the variable is used. So better solution is to configure our next.js in a way that our program includes the import statement automatically for each scss file in styles folder, rather than us doing it manually for each file. So basically we are going to configure our next.js so that each file will have this import from saas - (@import "./base.scss";). And you do it through sassOptions
  sassOptions: {
    //first option are the paths we are going to get our files from
    includePaths: [path.join(__dirname), "styles"], // to use that we have to declare our path at the top of this file cont path = require("path") and then we can use it as [path.join()] and we are passing two parameters _dirname and styles and that will create a path for each file in styles
    prependData: `@import "./base.scss";`, //and then we are going to include this statement for each file so that the import is done automatically. Now that variable from our base.scss should be available in the entire styles folder
  },
};

module.exports = nextConfig;
