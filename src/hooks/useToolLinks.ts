'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_TOOL_LINKS, ToolLink } from '@/data/tool-links';

const STORAGE_KEY = 'cursor-dojo-tool-links';

export function useToolLinks() {
  const [customUrls, setCustomUrls] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCustomUrls(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setMounted(true);
  }, []);

  const toolLinks: ToolLink[] = DEFAULT_TOOL_LINKS.map((tool) => ({
    ...tool,
    url: customUrls[tool.name] || tool.url,
  }));

  const updateToolLinks = useCallback((urls: Record<string, string>) => {
    setCustomUrls(urls);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const resetToolLinks = useCallback(() => {
    setCustomUrls({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return { toolLinks, customUrls, updateToolLinks, resetToolLinks, mounted };
}
