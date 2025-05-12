'use client';

import { useState } from 'react';
import CategoryHistogram from '../components/CategoryHistogram';
import CategoriesGrid from '../components/CategoriesGrid';
import WordImportance from '../components/WordImportance';

interface ApiResponse {
  probs: Record<string, number>;
  tokens: string[];
  importances: number[];
}

export default function TestPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  async function handlePredict() {
    setLoading(true);
    setData(null);
    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const json: ApiResponse = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-7">
      <textarea
        className="w-full h-32 p-4 bg-gray-800 border border-gray-700 rounded-lg placeholder:italic text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Enter news description..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={handlePredict}
        disabled={!text || loading}
        className="px-6 py-3 bg-blue-400 font-bold text-white rounded-md disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Predict Category'}
      </button>

      {loading && <div className="mt-4">Loading...</div>}

      {data && (
        <section className="space-y-8">
          <div className='flex w-full gap-6'>
            <div className='flex flex-col w-full gap-8'>
              <div className='flex flex-col w-full'>
                <h2 className="text-xl mb-2 font-bold">Top 5 Categories</h2>
                <CategoryHistogram data={data.probs} />
              </div>

              <div className='flex flex-col w-full'>
                <h2 className="text-xl mb-2 font-bold">Word Importances</h2>
                <WordImportance tokens={data.tokens} importances={data.importances} />
              </div>
            </div>

            <div className='flex flex-col w-full'>
              <h2 className="text-xl mb-2 font-bold">Other Categories</h2>
              <CategoriesGrid data={data.probs} topK={5} />
            </div>
          </div>

        </section>
      )}
    </div>
  );
}