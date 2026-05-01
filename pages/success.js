import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    if (session_id) {
      // Ajouter 1 crédit en localStorage
      const current = parseInt(localStorage.getItem('lisible_credits') || '0');
      const newTotal = current + 1;
      localStorage.setItem('lisible_credits', newTotal.toString());
      setCredits(newTotal);
    }
  }, [session_id]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      backgroundColor: '#faf9f6'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '48px',
        textAlign: 'center',
        maxWidth: '480px',
        boxShadow: '0 2px 24px rgba(0,0,0,0.08)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#1a1a1a' }}>
          Paiement confirmé
        </h1>
        <p style={{ color: '#666', marginBottom: '8px' }}>
          Votre analyse est disponible.
        </p>
        {credits !== null && (
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '32px' }}>
            Crédits disponibles : <strong>{credits}</strong>
          </p>
        )}
        <button
          onClick={() => router.push('/')}
          style={{
            background: '#c0674a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 32px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Analyser mon document
        </button>
      </div>
    </div>
  );
}