//import Raven from "raven-js";

function init() {
  //Raven.config(
  //  "https://56d8fcab923a43198b4062db95b9103e@o416806.ingest.sentry.io/5313363",
  //  {
  //    release: "1-0-0",
  //    environment: "development-test",
  //  }
  //).install();
}

function log(error) {
  console.log(error);
  //  Raven.captureException(error);
}

export default {
  init,
  log,
};
