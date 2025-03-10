import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertTriangle } from 'lucide-react';
import type { Article } from '@/types';

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in Content Creation',
    content: 'Lorem ipsum...',
    status: 'pending',
    author: 'john@example.com',
    createdAt: '2024-03-15',
    aiScore: 0.85,
    toxicityScore: 0.12,
    plagiarismScore: 0.05
  },
  // Add more mock articles as needed
];

export function ArticleList({ articles = mockArticles }: { articles?: Article[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg overflow-hidden"
      style={{ background: 'var(--bolt-elements-bg-depth-2)' }}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
          Recent Articles
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--bolt-elements-borderColor)' }}>
              <th className="p-4 text-left" style={{ color: 'var(--bolt-elements-textPrimary)' }}>Title</th>
              <th className="p-4 text-left" style={{ color: 'var(--bolt-elements-textPrimary)' }}>Author</th>
              <th className="p-4 text-left" style={{ color: 'var(--bolt-elements-textPrimary)' }}>Status</th>
              <th className="p-4 text-left" style={{ color: 'var(--bolt-elements-textPrimary)' }}>AI Score</th>
              <th className="p-4 text-left" style={{ color: 'var(--bolt-elements-textPrimary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <motion.tr
                key={article.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ borderBottom: '1px solid var(--bolt-elements-borderColor)' }}
              >
                <td className="p-4" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
                  {article.title}
                </td>
                <td className="p-4" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
                  {article.author}
                </td>
                <td className="p-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      background: article.status === 'pending'
                        ? 'var(--bolt-elements-item-contentAccent)'
                        : article.status === 'approved'
                        ? 'var(--bolt-elements-item-contentActive)'
                        : 'var(--bolt-elements-item-backgroundDanger)',
                      color: '#fff'
                    }}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="p-4" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
                  {(article.aiScore * 100).toFixed(0)}%
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full"
                      style={{ background: 'var(--bolt-elements-button-primary-background)' }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full"
                      style={{ background: 'var(--bolt-elements-item-backgroundDanger)' }}
                    >
                      <X className="w-4 h-4 text-white" />
                    </motion.button>
                    {article.toxicityScore > 0.5 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full bg-yellow-500"
                      >
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </motion.button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}