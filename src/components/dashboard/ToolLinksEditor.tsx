'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { DEFAULT_TOOL_LINKS, ToolLink } from '@/data/tool-links';

interface ToolLinksEditorProps {
  isOpen: boolean;
  onClose: () => void;
  toolLinks: ToolLink[];
  onSave: (urls: Record<string, string>) => void;
  onReset: () => void;
}

export default function ToolLinksEditor({
  isOpen,
  onClose,
  toolLinks,
  onSave,
  onReset,
}: ToolLinksEditorProps) {
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      const current: Record<string, string> = {};
      toolLinks.forEach((tool) => {
        current[tool.name] = tool.url;
      });
      setUrls(current);
    }
  }, [isOpen, toolLinks]);

  const handleSave = () => {
    // Only store URLs that differ from defaults
    const customUrls: Record<string, string> = {};
    DEFAULT_TOOL_LINKS.forEach((defaultTool) => {
      const newUrl = urls[defaultTool.name]?.trim();
      if (newUrl && newUrl !== defaultTool.url) {
        customUrls[defaultTool.name] = newUrl;
      }
    });
    onSave(customUrls);
    onClose();
  };

  const handleReset = () => {
    const defaults: Record<string, string> = {};
    DEFAULT_TOOL_LINKS.forEach((tool) => {
      defaults[tool.name] = tool.url;
    });
    setUrls(defaults);
    onReset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ツールリンクを編集">
      <div className="space-y-4">
        {DEFAULT_TOOL_LINKS.map((tool) => (
          <div key={tool.name}>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {tool.emoji} {tool.name}
            </label>
            <input
              type="url"
              value={urls[tool.name] || ''}
              onChange={(e) =>
                setUrls((prev) => ({ ...prev, [tool.name]: e.target.value }))
              }
              placeholder={tool.url}
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" size="sm" onClick={handleReset}>
          デフォルトに戻す
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            キャンセル
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            保存
          </Button>
        </div>
      </div>
    </Modal>
  );
}
