'use client';

interface Props { tokens: string[]; importances: number[]; }

export default function WordImportance({ tokens, importances }: Props) {
  const min = Math.min(...importances);
  const max = Math.max(...importances);
  const normalized = importances.map(i => (i - min) / (max - min || 1));

  return (
    <div className="flex gap-2 transition-all duration-300 text-[18px]">
      <p className="w-full">
        {tokens.map((tok, idx) => {
          const hue = 120 - normalized[idx] * 120; // 120=green 0=red
          const percentage = (importances[idx] * 100).toFixed(1);
          return (
            <span
              key={idx}
              className="rounded-md inline-block cursor-pointer transition-all duration-300 hover:font-bold"
              style={{
                color: `hsl(${hue}, 80%, 40%)`,
              }}
              title={`${percentage}%`}
            >
              {tok}&nbsp;
            </span>
          );
        })}
      </p>
    </div>
  );
}
