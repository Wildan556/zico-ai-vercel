// api/chat.js

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
  }

  try {
    // API KEY kamu sudah dimasukkan langsung di bawah ini
    const API_KEY = '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';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Kamu adalah asisten AI yang ramah.' },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    // Cek jika ada error dari OpenAI
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const aiResponse = data.choices[0].message.content;
    return res.status(200).json({ reply: aiResponse });

  } catch (error) {
    return res.status(500).json({ error: 'Terjadi kesalahan koneksi', details: error.message });
  }
}
