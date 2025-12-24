const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai'); // Import dari openai package

const router = express.Router();

// Konfigurasi OpenAI (gunakan API key dari env)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Pastikan env variable sudah di-set
});
const openai = new OpenAIApi(configuration);

// Middleware
router.use(express.json());
router.use(cors());

// Endpoint POST untuk chat
router.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Validasi input
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
    }

    // Panggil OpenAI API
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Ganti ke 'gpt-4' jika mau lebih canggih
      messages: [
        { role: 'system', content: 'Kamu adalah asisten AI yang membantu dan ramah.' }, // Prompt sistem (opsional, sesuaikan)
        { role: 'user', content: message }
      ],
      max_tokens: 150, // Batas token respons (sesuaikan)
      temperature: 0.7, // Kreativitas (0-1)
    });

    // Ambil respons dari OpenAI
    const aiResponse = completion.data.choices[0].message.content.trim();

    // Kirim respons kembali
    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      userId: userId || 'anonymous'
    });

  } catch (error) {
    console.error('Error di /api/chat:', error);
    // Handle error spesifik OpenAI
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error.message });
    } else {
      res.status(500).json({ error: 'Terjadi kesalahan server. Coba lagi nanti.' });
    }
  }
});

module.exports = router;
