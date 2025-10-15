import { useEffect, useState } from 'react';
import { testSupabaseConnection } from '../services/testConnection';

export default function TestConnectionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const ok = await testSupabaseConnection();
      setResult(ok);
    } catch (err: any) {
      setError(String(err ?? 'Unknown error'));
      setResult(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Supabase Connection Test</h1>
      {loading && <div>Testing connection...</div>}
      {error && (
        <div className="text-red-600">Error: {error}</div>
      )}
      {result !== null && !loading && !error && (
        <div className="text-green-600">Connection successful: {String(result)}</div>
      )}
      <div className="mt-4">
        <button
          onClick={runTest}
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
          disabled={loading}
        >
          {loading ? 'Running...' : 'Run Test Again'}
        </button>
      </div>
    </div>
  );
}
