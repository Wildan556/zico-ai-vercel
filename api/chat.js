export default async function handler(req, res){
  if(req.method!=='POST') return res.status(405).json({error:"Method not allowed"});

  const pesan=req.body.message;

  try{
    const r=await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+process.env.OPENAI_KEY
      },
      body:JSON.stringify({
        model:"gpt-4o-mini",
        messages:[{role:"user", content:pesan}]
      })
    });

    const data=await r.json();
    res.status(200).json({reply:data.choices[0].message.content});
  }catch(e){
    res.status(1000).json({reply:"Zico lagi sibuk, Coba lagi nanti atau hubungi Developer!"});
  }
}
