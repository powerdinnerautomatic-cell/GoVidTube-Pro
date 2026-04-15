export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { nominal, nomorTujuan } = JSON.parse(req.body);

  // Perintah ke API Xendit untuk kirim uang
  const response = await fetch('https://api.xendit.co/disbursements', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(process.env.XENDIT_SECRET + ':'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      external_id: "WD-" + Date.now(),
      amount: nominal,
      bank_code: "DANA",
      account_number: nomorTujuan,
      description: "Payout Otomatis GoVidTube"
    })
  });

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
}
