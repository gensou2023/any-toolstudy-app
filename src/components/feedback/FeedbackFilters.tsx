'use client';

interface FeedbackFiltersProps {
  typeFilter: 'all' | 'quest' | 'general';
  ratingFilter: number | null;
  searchQuery: string;
  onTypeChange: (type: 'all' | 'quest' | 'general') => void;
  onRatingChange: (rating: number | null) => void;
  onSearchChange: (query: string) => void;
}

export default function FeedbackFilters({
  typeFilter,
  ratingFilter,
  searchQuery,
  onTypeChange,
  onRatingChange,
  onSearchChange,
}: FeedbackFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="コメントやユーザー名で検索..."
          className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Type filter */}
      <div className="flex gap-1">
        {([
          { value: 'all', label: '全て' },
          { value: 'quest', label: '📖 クエスト' },
          { value: 'general', label: '💬 一般' },
        ] as const).map((opt) => (
          <button
            key={opt.value}
            onClick={() => onTypeChange(opt.value)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              typeFilter === opt.value
                ? 'bg-primary text-white'
                : 'bg-surface-hover text-text-secondary hover:text-text-primary'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Rating filter */}
      <select
        value={ratingFilter ?? ''}
        onChange={(e) => onRatingChange(e.target.value ? Number(e.target.value) : null)}
        className="px-3 py-2 rounded-lg border border-border bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        <option value="">全評価</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐☆</option>
        <option value="3">⭐⭐⭐☆☆</option>
        <option value="2">⭐⭐☆☆☆</option>
        <option value="1">⭐☆☆☆☆</option>
      </select>
    </div>
  );
}
