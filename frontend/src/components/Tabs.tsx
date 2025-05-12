'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Tabs() {
  const path = usePathname();
  const tabs = [
    { name: 'Prediction', href: '/' },
    { name: 'Model info', href: '/info' },
  ];

  return (
    <nav>
      <ul className="flex space-x-4">
        {tabs.map(tab => {
          const active = path === tab.href;
          return (
            <li key={tab.name}>
              <Link
                href={tab.href}
                className={
                  `px-5 py-2 rounded-md ${active ? 'bg-blue-500 text-white font-bold shadow' : 'text-blue-300 font-medium hover:bg-gray-800'}`
                }
              >
                {tab.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}