'use client';

interface Props { data: Record<string, number>; topK: number; }

export default function CategoriesGrid({ data, topK }: Props) {
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-gray-400">No category data available.</div>;
  }
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(topK);
  return (
    <div className="grid grid-cols-4 gap-4 w-full shrink grow text-sm">
      {entries.map(([name, value]) => {
        const percento = (value * 100).toFixed(1);
        const isZero = Number(percento) === 0;
        return (
            <div
              key={name}
              className={`flex flex-col items-center px-1 py-4 bg-gray-800 rounded-lg ${isZero ? '' : 'shadow-lg'}`}
              style={isZero ? { opacity: 0.5, boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.6)' } : undefined}
            >
              <span className="font-semibold text-blue-300">{name}</span>
              <span className="float-right" style={{ color: isZero ? 'orangered' : 'white' }}>{percento}%</span>
            </div>
        );
      })}
    </div>
  );
}