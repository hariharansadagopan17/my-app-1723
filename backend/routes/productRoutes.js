import express from 'express';
import Product from '../models/Product.js';
import { connectProducer, producer } from '../kafka/producer.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/send-message', async (req, res) => {
    try {
        await connectProducer();
        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: 'Hello Kafka from Eggshell Powder App!' },
            ],
        });
        await producer.disconnect();
        res.status(200).json({ message: 'Test message sent to Kafka' });
    } catch (error) {
        console.error('Error sending Kafka message:', error);
        res.status(500).json({ message: 'Error sending Kafka message', error: error.message });
    }
});

export default router;