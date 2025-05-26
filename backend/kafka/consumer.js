import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['127.0.0.1:9092'] // Replace with your Kafka broker address(es)
});

const consumer = kafka.consumer({ groupId: 'MyGroup' }); // Use a meaningful group ID

var runConsumer = async function() {
  try {
    await consumer.connect();
    // console.log('Kafka consumer connected.'); // Optional: less verbose startup

    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
          topic: topic,
//          partition: partition, // Optional: can remove if not needed
        });
      },
    });

    console.log('Kafka consumer started and listening...');

  } catch (error) {
    console.error('Error in Kafka consumer:', error);
    // Consider more sophisticated error handling and reconnection strategies if this is a critical consumer
  }
};
