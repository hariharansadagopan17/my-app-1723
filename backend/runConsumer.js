import { runConsumer } from './kafka/consumer.js';

runConsumer().catch(e => console.error(`[Consumer] ${e.message}`, e));