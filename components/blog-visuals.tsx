import { ReactNode } from 'react';

interface VisualSectionProps {
  title: string;
  titleEn?: string;
  icon: string;
  children: ReactNode;
  gradient?: string;
}

export function VisualSection({ title, titleEn, icon, children, gradient = "from-pink-50 to-orange-50" }: VisualSectionProps) {
  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 md:p-8 my-8 border-l-4 border-pink-500`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {titleEn && <p className="text-gray-600 text-sm">{titleEn}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  labelEn?: string;
  icon?: string;
  color?: string;
}

export function StatCard({ value, label, labelEn, icon, color = "pink" }: StatCardProps) {
  const colorClasses = {
    pink: "bg-pink-50 border-pink-200 text-pink-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
  };

  return (
    <div className={`border-2 ${colorClasses[color as keyof typeof colorClasses]} p-6 rounded-xl text-center`}>
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium">{label}</div>
      {labelEn && <div className="text-xs opacity-75">{labelEn}</div>}
    </div>
  );
}

interface ComparisonTableProps {
  title: string;
  headers: string[];
  rows: Array<{
    label: string;
    values: (string | number | ReactNode)[];
    highlight?: boolean;
  }>;
}

export function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="overflow-x-auto border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-pink-100">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="p-3 text-left font-semibold text-gray-900">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={row.highlight ? "bg-orange-50" : i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-medium">{row.label}</td>
                {row.values.map((value, j) => (
                  <td key={j} className="p-3 text-sm">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  descriptionEn?: string;
}

export function FeatureCard({ emoji, title, description, descriptionEn }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="text-4xl mb-3">{emoji}</div>
      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-700 text-sm">{description}</p>
      {descriptionEn && <p className="text-gray-500 text-xs mt-2">{descriptionEn}</p>}
    </div>
  );
}

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

export function ProcessStep({ step, title, description, icon }: ProcessStepProps) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
        {step}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          {title}
          {icon && <span>{icon}</span>}
        </h4>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
}

interface UnsplashImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function UnsplashImage({ src, alt, caption, className = "rounded-xl my-6" }: UnsplashImageProps) {
  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto"
        loading="lazy"
      />
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Custom SVG Icons
export const Icons = {
  Chart: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Trending: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Target: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <circle cx="12" cy="12" r="6" strokeWidth={2} />
      <circle cx="12" cy="12" r="2" strokeWidth={2} />
    </svg>
  ),
  Lightbulb: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Video: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
};
