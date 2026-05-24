'use client';
import Link from 'next/link';

export default function Terms() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0ece4',
      color: '#1a1a1a',
      padding: '80px 20px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <Link href="/" style={{ color: '#8b7355', textDecoration: 'none', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#8b7355' }}>Terms and Conditions</h1>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          Last updated: May 24, 2026
        </p>
        
        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>1. Terms</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>2. Use License</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          Permission is granted to temporarily download one copy of the materials (information or software) on Saif&apos;s Portfolio website for personal, non-commercial transitory viewing only.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>3. Disclaimer</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          The materials on this website are provided on an &apos;as is&apos; basis. Saif makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>4. Limitations</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          In no event shall Saif or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
        </p>
      </div>
    </div>
  );
}
