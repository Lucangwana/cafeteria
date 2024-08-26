// app/pages.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to My Login App</h1>
      <p>Click the link below to go to the login page:</p>
      <Link href="/login">
        {/* <a style={{ color: '#0070f3', textDecoration: 'underline' }}>Go to Login Page</a> */}
      </Link>
      <p style={{ marginTop: '20px' }}>Or go to the:</p>
      <Link href="/dashboard">
        {/* <a style={{ color: '#0070f3', textDecoration: 'underline' }}>Dashboard</a> */}
      </Link>
    </div>
  );
}

