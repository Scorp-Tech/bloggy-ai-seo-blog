import React from 'react';
import { motion } from 'framer-motion';
import { Users, Ban, Crown, Download } from 'lucide-react';
import type { User } from '@/types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    subscriptionTier: 'enterprise',
    createdAt: '2024-03-15'
  },
  // Add more mock users as needed
];

export function UserManagement() {
  const [users, setUsers] = React.useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (userId: string, newStatus: 'active' | 'banned') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Subscription', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => 
        [user.name, user.email, user.role, user.status, user.subscriptionTier, user.createdAt].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
          User Management
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{ background: 'var(--bolt-elements-button-primary-background)' }}
        >
          <Download className="w-4 h-4 text-white" />
          <span className="text-white">Export CSV</span>
        </motion.button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
          style={{
            background: 'var(--bolt-elements-bg-depth-1)',
            borderColor: 'var(--bolt-elements-borderColor)',
            color: 'var(--bolt-elements-textPrimary)'
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" style={{ background: 'var(--bolt-elements-bg-depth-2)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--bolt-elements-borderColor)' }}>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Subscription</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ borderBottom: '1px solid var(--bolt-elements-borderColor)' }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--bolt-elements-button-primary-background)' }}>
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--bolt-elements-textPrimary)' }}>{user.name}</p>
                      <p className="text-sm opacity-70" style={{ color: 'var(--bolt-elements-textPrimary)' }}>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {user.role === 'admin' && <Crown className="w-4 h-4 text-yellow-500" />}
                    <span style={{ color: 'var(--bolt-elements-textPrimary)' }}>{user.role}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
                  {user.subscriptionTier}
                </td>
                <td className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'banned' : 'active')}
                    className="p-2 rounded-lg"
                    style={{
                      background: user.status === 'active'
                        ? 'var(--bolt-elements-item-backgroundDanger)'
                        : 'var(--bolt-elements-button-primary-background)'
                    }}
                  >
                    <Ban className="w-4 h-4 text-white" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}