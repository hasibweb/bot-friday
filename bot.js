const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"] });
// Adds the utterances and intents for the NLP
manager.addDocument("en", "goodbye for now", "greetings.bye");
manager.addDocument("en", "bye bye take care", "greetings.bye");
manager.addDocument("en", "okay see you later", "greetings.bye");
manager.addDocument("en", "bye for now", "greetings.bye");
manager.addDocument("en", "i must go", "greetings.bye");
manager.addDocument("en", "hello", "greetings.hello");
manager.addDocument("en", "hi", "greetings.hello");
manager.addDocument("en", "hey", "greetings.hello");

// Train also the NLG
manager.addAnswer("en", "greetings.bye", "Till next time");
manager.addAnswer("en", "greetings.bye", "see you soon!");
manager.addAnswer("en", "greetings.hello", "Hey there!");
manager.addAnswer("en", "greetings.hello", "Hi, How are you?");
manager.addAnswer("en", "greetings.hello", "Hello sir!");
manager.addAnswer("en", "greetings.hello", "hey, what's up");

// Train and save the model.
(async () => {
  await manager.train();
  manager.save();
})();

module.exports = async (command, callback) => {
  const response = await manager.process("en", command);
  callback(response);
};
