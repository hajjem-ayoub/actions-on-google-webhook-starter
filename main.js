process.env.DEBUG = 'actions-on-google:*';
const ApiAiApp = require('actions-on-google').ApiAiApp;

exports.requestHandler = (request, response) => {
  const app = new ApiAiApp({ request, response });
  let actionMap = new Map();
  //TODO change action.simple-text with the actions name you specified in API.ai
  actionMap.set('action.simple-text', simpleTextAction);
  actionMap.set('action.custom-payload', customPayloadAction);
  actionMap.set('action.simple-rich-response', simpleRichResponseAction);
  app.handleRequest(actionMap);
};

const simpleRichResponseAction = (app) => {
  app.ask(app.buildRichResponse()
    // Create a basic card and add it to the rich response
    .addSimpleResponse('Look at that pizza')
    .addBasicCard(app.buildBasicCard(`This is a paragraph describing that buitiful pizza.  
    2 spaces on the row means a new line when i just go to new line in the code 
    this is not going to be another new line neither does \n.  you are limited to 10 line limit with an image, 
    15 line limit without an image. `)
      .setTitle('This is the titile of the pizza')
      .addButton('And a button')
      .setImage(`${DOMAIN_URL}/pizza_card.jpg`, 'Image alternate text')
    )
  );
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