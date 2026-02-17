import { RoleInfo } from '@/types';

export const roles: RoleInfo[] = [
  {
    id: 'frontend-engineer',
    label: 'フロントエンドエンジニア',
    emoji: '🎨',
    description: 'React, Vue, CSSなどフロントエンド開発がメイン',
    color: 'bg-blue-500',
  },
  {
    id: 'backend-engineer',
    label: 'バックエンドエンジニア',
    emoji: '⚙️',
    description: 'API, DB, サーバーサイド開発がメイン',
    color: 'bg-green-500',
  },
  {
    id: 'web-designer',
    label: 'Webデザイナー',
    emoji: '✏️',
    description: 'UI/UXデザイン、HTMLコーディングがメイン',
    color: 'bg-purple-500',
  },
  {
    id: 'director',
    label: 'ディレクター',
    emoji: '📋',
    description: '企画・進行管理・クライアント対応がメイン',
    color: 'bg-orange-500',
  },
  {
    id: 'non-engineer',
    label: '非エンジニア',
    emoji: '💼',
    description: '営業・経理・人事など技術職以外',
    color: 'bg-pink-500',
  },
  {
    id: 'student-intern',
    label: '学生インターン',
    emoji: '🎓',
    description: 'インターンシップ中の学生向け基礎コース',
    color: 'bg-teal-500',
  },
];

export function getRoleById(id: string): RoleInfo | undefined {
  return roles.find(r => r.id === id);
}
