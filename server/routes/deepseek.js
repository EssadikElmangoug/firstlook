const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { OpenAI } = require('openai');
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});

// @route   POST /api/deepseek/generate
// @desc    Generate Response
// @access  Private
router.post(
  '/generate',
  auth,
  [
    body('query', 'Query is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { query, chatId } = req.body;
    
    let chat = await Chat.findOne({ id: chatId });
    if (!chat) {
        chat = new Chat({
            id: chatId,
            messages: [
                { role: "assistant", content: "Hello, I'm your AI health assistant. I can provide general health information and guidance. How may I assist you today?" }
            ],
            createdAt: new Date()
        });
        await chat.save();
    }

    try {
        const messages = [ { role: "system", content: "You are **First Look**, an AI doctor assistant providing accurate and professional medical guidance. Given a medical question and chat history, you must answer based on your knowledge while ensuring continuity by considering past interactions. Your responses should be clear, concise, and medically sound, offering general advice while reminding users to consult a healthcare professional for diagnosis or treatment. Maintain an empathetic and professional tone, prioritizing user reassurance and scientific accuracy. If a question lacks details, politely ask for clarification before responding." }, ...chat.messages, { role: "user", content: query }];
        const response = await openai.chat.completions.create({
            messages: messages,
            model: "deepseek-chat",
        });

        const message = response.choices[0].message.content;

        chat.messages.push({ role: "user", content: query });
        chat.messages.push({ role: "assistant", content: message });
        await chat.save();

        res.json({message: message});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  }
);

// @route   GET /api/deepseek/chats/:id
// @desc    Get All Chats
// @access  Private
router.get('/chats/:id', auth, async (req, res) => {
    const chat = await Chat.findOne({ id: req.params.id });
    if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(chat);
});

module.exports = router; 