import React, { useState } from 'react';

function VerifyEmailModal({ email, setShowVerifyModal }) {
  const [code, setCode] = useState('');
  
  const verifyCode = async () => {
    const response = await fetch('http://localhost:9000/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nume: email, code: code })
    });

    if (response.ok) {
      alert('Contul a fost activat cu succes!');
      setShowVerifyModal(false);
    } else {
      alert('Cod incorect!');
    }
  };

  return (
    <div>
      <h2>Verifică E-mailul</h2>
      <input type="text" value={code} onChange={e => setCode(e.target.value)} />
      <button onClick={verifyCode}>Verifică</button>
    </div>
  );
}


export default VerifyEmailModal;