const { runConsumer } = require('./kafka/consumer.js');
runConsumer().catch(e => console.error(`[Consumer] ${e.message}`, e));