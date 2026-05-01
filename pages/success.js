import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Success() {
  const router = useRouter()

  useEffect(() => {
    // Marquer le paiement comme validé
    // Les données du document sont déjà dans sessionStorage (lisible_pending)
    // index.js les récupérera et lancera l'analyse automatiquement
    localStorage.setItem('lisible_paid', '1')
    router.push('/?paid=1')
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      backgroundColor: '#faf9f6',
      gap: '16px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid #e8d5c4',
        borderTop: '4px solid #c0674a',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>
        Paiement confirmé, lancement de l'analyse…
      </p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
