'use client';
import Link from 'next/link';
import Tabs from './Tabs';

export default function Header() {
  return (
    <header className="container mx-auto px-20 flex items-center justify-between pt-8 pb-5">
      <div>
        <h1 className="text-3xl text-blue-400 font-bold">News Categorizer</h1>
        <p className='text-gray-500 font-bold text-sm opacity-50'>by <Link className='text-blue-500' href='https://github.com/vadim-ghostman/news-categorizer'>vadim-ghostman</Link></p>
      </div>
      <Tabs />
    </header>
  );
}