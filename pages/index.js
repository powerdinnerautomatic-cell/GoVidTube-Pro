import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';

export default function Home() {
  const [saldo, setSaldo] = useState(0);
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState("Berhenti");

  useEffect(() => {
    let interval;
    if (status === "Menonton") {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    if (timer >= 60) {
      setSaldo(s => s + 500); // Bonus Rp 500 tiap 60 detik
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [status, timer]);

  return (
    <div style={{ background: '#111', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', borderBottom: '2px solid #facc15', paddingBottom: '10px' }}>
        <h1 style={{ color: '#facc15' }}>GoVidTube 💰</h1>
        <div style={{ background: '#222', padding: '10px', borderRadius: '10px' }}>
          <h2>Saldo: Rp {saldo.toLocaleString()}</h2>
          <p>Misi: {timer} / 60 detik (Tonton untuk Cuan)</p>
        </div>
      </header>

      <main style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <YouTube 
          videoId="7P_E8E6I20A" 
          onStateChange={(e) => setStatus(e.data === 1 ? "Menonton" : "Berhenti")}
        />
        
        <button 
          onClick={() => alert("Menghubungkan ke Penarikan DANA...")}
          style={{ marginTop: '20px', padding: '15px 30px', background: '#22c55e', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>
          TARIK UANG (Otomatis)
        </button>
      </main>

      <section style={{ marginTop: '40px', background: '#333', padding: '15px', borderRadius: '10px' }}>
        <h3>🎁 Daftar Hadiah:</h3>
        <ul>
          <li>Misi Nonton: +Rp 500 / menit</li>
          <li>Undang Teman: +Rp 2.000</li>
          <li>Login Harian: +Rp 1.000</li>
        </ul>
      </section>
    </div>
  );
        }
    
