import merge from "lodash.merge";

/**
 * @description  App global configuration based on the environemnt it is run. That's why we're going to centralize all the dynamic values of our app that depend on the current env. This way, we only have to change one file to completely change how our app works. Then, for every environment, we'll create a file. Those enviroments are 'local', 'testing', and 'production'. Each of one these files will be used to configure variables for their matching environment. Next, we'll merge the configs together, giving us our final config that we can use anywhere
 */

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig: Record<string, any>;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

const defaultConfig = {
  stage,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  logging: false,
};

export default merge(defaultConfig, envConfig);
