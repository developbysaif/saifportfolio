'use client';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#e8e4dc',
      color: '#1a1a1a',
      padding: '80px 20px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <Link href="/" style={{ color: '#8b7355', textDecoration: 'none', fontWeight: '600', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#8b7355' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          Last updated: May 24, 2026
        </p>
        
        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>1. Introduction</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          Welcome to Saif&apos;s Portfolio. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>2. Data We Collect</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          When you use our contact form or subscribe to our newsletter via WhatsApp, we collect the information you provide, which may include your name, email address, and phone number.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>3. How We Use Your Data</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          We use your data primarily to communicate with you regarding your project inquiries or to send you relevant updates if you have subscribed to our newsletter.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>4. Third-Party Services</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#4a4540' }}>
          Our website uses WhatsApp for direct communication. By using these features, you acknowledge that your data will be handled by WhatsApp according to their own privacy policies.
        </p>
      </div>
    </div>
  );
}
