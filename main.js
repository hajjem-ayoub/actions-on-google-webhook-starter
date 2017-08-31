process.env.DEBUG = 'actions-on-google:*';
const ApiAiApp = require('actions-on-google').ApiAiApp;

exports.requestHandler = (request, response) => {
  const app = new ApiAiApp({ request, response });
  let actionMap = new Map();
  //TODO change action.simple-text with the actions name you specified in API.ai
  actionMap.set('action.simple-text', simpleTextAction);
  actionMap.set('action.custom-payload', customPayloadAction);
  actionMap.set('action.surface-capability', surfaceCapabilityAction);
  actionMap.set('action.simple-rich-response', simpleRichResponseAction);
  actionMap.set('action.say-ssml', saySSMLAction); //SSML: Speech Synthesis Markup Language 
  app.handleRequest(actionMap);
};

const surfaceCapabilityAction = (app) => {
  let hasScreen =
    app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
  let hasAudio =
    app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);
  if (hasScreen && hasAudio){
    app.ask('this is a response for screen and audio devices');
  } else if (hasScreen){
    app.ask('this is a response for no audio devices');
  } else {
    app.ask('this is a response for no screen devices');
  }
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

const saySSMLAction = (app) => {
  let text_to_speech = '<speak>'
    + 'Here are abreviations <say-as interpret-as="characters">IOT</say-as> samples. '
    + 'I can pause for 3 sec <break time="3" />. '
    + `I can play a sound <audio src="${DOMAIN_URL}/cow.mp3">could not read mp3</audio>. `
    + 'I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. '
    + 'Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. '
    + 'Or I can even speak in digits. Your position in line is <say-as interpret-as="digits">10</say-as>. '
    + 'I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>. '
    + 'Finally, I can speak a paragraph with two sentences. '
    + '<p><s>This is sentence one.</s><s>This is sentence two.</s></p>'
    + '</speak>'
  app.tell(text_to_speech);
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