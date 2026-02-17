'use client';

export default function AnalyticsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">📊</span>
      <h2 className="text-xl font-bold text-text-primary mb-2">データがありません</h2>
      <p className="text-text-secondary max-w-md">
        まだアクティビティデータが記録されていません。
        クエストを完了したり、タイピングゲームをプレイすると、ここに統計が表示されます。
      </p>
    </div>
  );
}
