'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#ec4899', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

interface UserDemographicsProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
}

export function UserDemographicsChart({ data }: UserDemographicsProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">User Demographics / 用户画像</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: any) => `${entry.name} ${((entry.value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PlatformComparisonProps {
  data: Array<{
    metric: string;
    xiaohongshu: number;
    douyin: number;
  }>;
}

export function PlatformComparisonChart({ data }: PlatformComparisonProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Platform Metrics Comparison / 平台数据对比</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="xiaohongshu" fill="#ec4899" name="Xiaohongshu" />
          <Bar dataKey="douyin" fill="#3b82f6" name="Douyin" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface GrowthTrendProps {
  data: Array<{
    month: string;
    users: number;
    engagement: number;
  }>;
}

export function GrowthTrendChart({ data }: GrowthTrendProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Growth Trend / 增长趋势</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#ec4899" strokeWidth={2} name="Users (M)" />
          <Line type="monotone" dataKey="engagement" stroke="#f97316" strokeWidth={2} name="Engagement (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface AlgorithmMetricsProps {
  data: Array<{
    name: string;
    value: number;
    benchmark: number;
  }>;
}

export function AlgorithmMetricsChart({ data }: AlgorithmMetricsProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Algorithm Key Metrics / 算法关键指标</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="value" fill="#ec4899" name="Your Content" />
          <Bar dataKey="benchmark" fill="#94a3b8" name="Benchmark" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
