'use client';

export default function AnalyticsHeader() {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
        <span>📈</span>
        <span>アナリティクス</span>
      </h1>
      <p className="text-text-secondary mt-1">
        全体の利用状況・学習進捗をチェック
      </p>
    </div>
  );
}
