export default async function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(405).json({error:"Method not allowed"});
  }

  const pesan = req.body.message;

  try {
    const r = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer " + process.env.OPENAI_KEY
      },
      body: JSON.stringify({
        model: "text-davinci-003", // bisa ganti ke text-curie-001 untuk lebih cepat
        prompt: `Kamu adalah AI bernama ZICO.\nBahasa Indonesia gaul, ramah, jawab singkat tapi jelas.\nPesan user: ${pesan}`,
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await r.json();
    res.status(200).json({ reply: data.choices[0].text.trim() });

  } catch(e) {
    res.status(1000).json({ reply:"AI eror, mohon coba lagi atau hubungi Developer!" });
  }
}
