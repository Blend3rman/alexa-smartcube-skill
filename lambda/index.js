
const Alexa = require('ask-sdk-core');
const firebase = require("firebase/app");
// Import the functions you need from the SDKs you need
require('firebase/database');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEcYg9PzkTjkYcMo_NMtKsEpdZqy6cb1s",
    authDomain: "wellnesshome-19826.firebaseapp.com",
    databaseURL: "https://wellnesshome-19826-default-rtdb.firebaseio.com",
    projectId: "wellnesshome-19826",
    storageBucket: "wellnesshome-19826.appspot.com",
    messagingSenderId: "198460061416",
    appId: "1:198460061416:web:6a2392d5841d5c65a67b5d",
    measurementId: "G-QV9KGZ8Q2Y"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome! Smart Cube is online now!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const PowerOnOffIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PowerOnOffIntent';
    },
    async handle(handlerInput) {
        const powerState = Alexa.getSlotValue(handlerInput.requestEnvelope, 'power');
        let speakOutput = '';
        try{
            firebase.database().goOnline();
            await firebase.database().ref('/ACState').update({
                AlexaChangedState : true,
                Power : (powerState === 'on'),
                ACMode: 'Cool',
                FanSpeed : 'Auto'
            })
            firebase.database().goOffline();
            
            if(powerState) {
                let resolution = handlerInput.requestEnvelope.request.intent.slots.power.resolutions.resolutionsPerAuthority[0];
                if (resolution.status.code === "ER_SUCCESS_MATCH") {
                    speakOutput = `Alright, turning ${powerState} the air conditioner`;
                }
            }
            
        }catch(e){
            console.log("Catch logs here: ",e);
            speakOutput = `There was a problem turning the air conditioner ${powerState}`
        }
        console.log("Out of Try Catch");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const TemperatureChangeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TemperatureChangeIntent';
    },
    async handle(handlerInput) {
        const temperature = Alexa.getSlotValue(handlerInput.requestEnvelope, 'temperature');
        let speakOutput = '';
        try{
            firebase.database().goOnline();
            await firebase.database().ref('/ACState').update({
                AlexaChangedState : true,
                Power : true,
                Temperature : parseInt(temperature)
            })
            firebase.database().goOffline();
            
            if(temperature) 
               speakOutput = `Alright, setting the air conditioner to ${temperature} degrees`;
            
        }catch(e){
            console.log("Catch logs here: ",e);
            speakOutput = `There was a problem setting the air conditioner to ${temperature} degrees`
        }
        console.log("Out of Try Catch");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ACModeChangeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ACModeChangeIntent';
    },
    async handle(handlerInput) {
        const acModeVal = Alexa.getSlotValue(handlerInput.requestEnvelope, 'acmode');
        let speakOutput = `Trying to set the air conditioner to ${acModeVal} mode...`;
        try{
            firebase.database().goOnline();
            await firebase.database().ref('/ACState').update({
                AlexaChangedState : true,
                Power : true,
                ACMode: acModeVal
            })
            firebase.database().goOffline();
            
            if(acModeVal) {
                let resolution = handlerInput.requestEnvelope.request.intent.slots.acmode.resolutions.resolutionsPerAuthority[0];
                if (resolution.status.code === "ER_SUCCESS_MATCH") {
                    speakOutput = `Alright, setting the air conditioner to ${acModeVal} mode`;
                }
            }
            
        }catch(e){
            console.log("Catch logs here: ",e);
            speakOutput = `There was a problem setting the air conditioner to ${acModeVal}`
        }
        console.log("Out of Try Catch");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FanSpeedChangeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FanSpeedChangeIntent';
    },
    async handle(handlerInput) {
        const fanSpeedVal = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fanspeed');
        let speakOutput = `Trying to set the air conditioner fan speed to ${fanSpeedVal}...`;
        try{
            firebase.database().goOnline();
            await firebase.database().ref('/ACState').update({
                AlexaChangedState : true,
                Power : true,
                FanSpeed : fanSpeedVal
            })
            firebase.database().goOffline();
            
            if(fanSpeedVal) {
                let resolution = handlerInput.requestEnvelope.request.intent.slots.fanspeed.resolutions.resolutionsPerAuthority[0];
                if (resolution.status.code === "ER_SUCCESS_MATCH") {
                    speakOutput = `Alright, setting the air conditioner fan speed to ${fanSpeedVal}`;
                }
            }
            
        }catch(e){
            console.log("Catch logs here: ",e);
            speakOutput = `There was a problem setting the air conditioner fan speed to ${fanSpeedVal}`
        }
        console.log("Out of Try Catch");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thanks for using Smart Cube!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PowerOnOffIntentHandler,
        TemperatureChangeIntentHandler,
        ACModeChangeIntentHandler,
        FanSpeedChangeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();