import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app-producer',
  brokers: ['0.0.0.0:9092', '0.0.0.0:2181'] // REPLACE with your Kafka broker addresses
});

const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka producer connected successfully');
  } catch (error) {
    console.error('Error connecting Kafka producer:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const disconnectProducer = async () => {
  try {
    await producer.disconnect();
    console.log('Kafka producer disconnected');
  } catch (error) {
    console.error('Error disconnecting Kafka producer:', error);
  }
};

export { producer, connectProducer, disconnectProducer };