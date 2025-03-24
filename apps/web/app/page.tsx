'use client';
import { useEffect } from 'react';
import { callHelloAPI } from './services/test';

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const data = await callHelloAPI();
      console.log(data);
    }
    fetchData();
  }, []);
  return (
    <main className={''}>
      <div className="text-blue-400">Hi</div>
    </main>
  );
}
