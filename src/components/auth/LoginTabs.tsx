'use client';

import { useState } from 'react';

type TabId = 'quick' | 'email' | 'register';

interface LoginTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function LoginTabs({ activeTab, onTabChange }: LoginTabsProps) {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'quick', label: 'クイックログイン' },
    { id: 'email', label: 'メールログイン' },
    { id: 'register', label: '新規登録' },
  ];

  return (
    <div className="flex rounded-xl bg-surface-hover p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === tab.id
              ? 'bg-surface text-text-primary shadow-sm'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
