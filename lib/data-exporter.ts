/**
 * Data Exporter - Export analysis data in multiple formats
 */

import { AnalysisHistoryItem } from './analysis-history';

export interface ExportOptions {
  format: 'json' | 'csv' | 'excel' | 'pdf';
  includeMetadata?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * Export to JSON format
 */
export function exportToJSON(data: AnalysisHistoryItem[]): string {
  return JSON.stringify(
    {
      exportDate: new Date().toISOString(),
      totalRecords: data.length,
      data,
    },
    null,
    2
  );
}

/**
 * Export to CSV format
 */
export function exportToCSV(data: AnalysisHistoryItem[]): string {
  if (data.length === 0) return '';

  const headers = [
    '分析ID',
    '分析時間',
    '標題',
    '作者',
    '分類',
    '點贊',
    '評論',
    '分享',
    '互動率(%)',
    '情感傾向',
    '熱度評分',
    '變現潛力',
    '關鍵詞',
    '鏈接',
  ];

  const rows = data.map(item => [
    item.id,
    new Date(item.analyzed_at).toLocaleString('zh-CN'),
    `"${item.title.replace(/"/g, '""')}"`,
    item.author,
    item.category,
    item.likes,
    item.comments,
    item.shares,
    item.engagement_rate.toFixed(2),
    item.sentiment,
    item.trend_score,
    item.monetization_potential,
    `"${item.keywords.join(', ')}"`,
    item.url,
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

/**
 * Export to Excel-compatible format (TSV)
 */
export function exportToExcel(data: AnalysisHistoryItem[]): string {
  if (data.length === 0) return '';

  const headers = [
    '分析ID',
    '分析時間',
    '標題',
    '作者',
    '分類',
    '點贊',
    '評論',
    '分享',
    '互動率',
    '情感傾向',
    '熱度評分',
    '變現潛力',
    '關鍵詞',
  ];

  const rows = data.map(item => [
    item.id,
    new Date(item.analyzed_at).toLocaleString('zh-CN'),
    item.title,
    item.author,
    item.category,
    item.likes,
    item.comments,
    item.shares,
    item.engagement_rate.toFixed(2),
    item.sentiment,
    item.trend_score,
    item.monetization_potential,
    item.keywords.join('; '),
  ]);

  return [headers.join('\t'), ...rows.map(row => row.join('\t'))].join('\n');
}

/**
 * Generate download link and trigger download
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  if (typeof window === 'undefined') return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export with options
 */
export function exportData(
  data: AnalysisHistoryItem[],
  options: ExportOptions
): string {
  let filtered = data;

  // Filter by date range if provided
  if (options.dateRange) {
    filtered = data.filter(item => {
      const date = new Date(item.analyzed_at);
      return date >= options.dateRange!.start && date <= options.dateRange!.end;
    });
  }

  switch (options.format) {
    case 'json':
      return exportToJSON(filtered);
    case 'csv':
      return exportToCSV(filtered);
    case 'excel':
      return exportToExcel(filtered);
    default:
      return exportToJSON(filtered);
  }
}
