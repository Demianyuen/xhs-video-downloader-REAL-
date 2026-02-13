'use client';

import { AFFILIATE_PROGRAMS } from '@/lib/config/affiliate-config';
import { trackAffiliateClick } from '@/lib/utils/ad-utils';

interface AffiliateLinkProps {
  className?: string;
}

export function AffiliateLinks({ className = '' }: AffiliateLinkProps) {
  const handleClick = (program: string, url: string) => {
    trackAffiliateClick(program, url);
  };

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <p className="text-sm font-semibold text-blue-900 mb-3">
        ⚡ Recommended Tools
      </p>
      <div className="space-y-2">
        {Object.entries(AFFILIATE_PROGRAMS.vpn).map(([key, vpn]) => (
          vpn.enabled && (
            <a
              key={key}
              href={vpn.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleClick('vpn', vpn.url)}
              className="block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              → {vpn.label}
            </a>
          )
        ))}
        {Object.entries(AFFILIATE_PROGRAMS.tools).map(([key, tool]) => (
          tool.enabled && (
            <a
              key={key}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleClick('tools', tool.url)}
              className="block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              → {tool.label}
            </a>
          )
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        💡 We may earn a commission from these links at no extra cost to you.
      </p>
    </div>
  );
}
