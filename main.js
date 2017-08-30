process.env.DEBUG = 'actions-on-google:*';
const ApiAiApp = require('actions-on-google').ApiAiApp;

exports.requestHandler = (request, response) => {
  const app = new ApiAiApp({ request, response });
  let actionMap = new Map();
  //TODO change action.simple-text with the actions name you specified in API.ai
  actionMap.set('action.simple-text', simpleTextAction);
  actionMap.set('action.custom-payload', customPayloadAction);
  app.handleRequest(actionMap);
};

const simpleTextAction = (app) => {
  app.ask("Hello from simple text action");
};

const customPayloadAction = (app) => {
  app.response_.send(
    { 
      "speech": "Hello from custom text action",
      // "followupEvent": {
      //   "name": "event-custom",
      //   "data": {
      //      "param":"my-value"
      //   }
      // }
    }
  );
};