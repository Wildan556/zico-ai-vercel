export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const pesan = req.body.message;

  try {
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `
Kamu adalah AI bernama ZICO.
Gaya bicara santai, ramah, bahasa Indonesia gaul.
Jawab singkat tapi jelas.

Pesan user:
${pesan}
`
            }]
          }]
        })
      }
    );

    const data = await r.json();

    res.status(200).json({
      reply: data.candidates[0].content.parts[0].text
    });

  } catch (e) {
    res.status(500).json({ reply: "AI error 😢" });
  }
}
