'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, TrendingUp, Calendar, DollarSign } from 'lucide-react'

interface Stats {
  totalAmount: number; totalCount: number; totalDonors: number;
  todayAmount: number; todayCount: number; campaigns: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(data => { setStats(data); setLoading(false) })
  }, [])

  const cards = stats ? [
    { label: 'Total Donations', value: `₹${stats.totalAmount.toLocaleString('en-IN')}`, sub: `${stats.totalCount} transactions`, icon: Heart, color: 'from-amber-500 to-amber-600' },
    { label: 'Total Donors', value: stats.totalDonors.toLocaleString('en-IN'), sub: 'Unique donors', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: "Today's Donations", value: `₹${stats.todayAmount.toLocaleString('en-IN')}`, sub: `${stats.todayCount} today`, icon: Calendar, color: 'from-green-500 to-green-600' },
    { label: 'Active Campaigns', value: stats.campaigns.length.toString(), sub: 'Running campaigns', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  ] : []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${card.color} text-white rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/80 text-sm font-medium">{card.label}</p>
                <card.icon className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-white/70 text-xs mt-1">{card.sub}</p>
            </motion.div>
          ))}
        </div>
      )}

      {stats && stats.campaigns.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Campaign Performance</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Campaign</th>
                  <th className="px-4 py-3 text-right">Raised</th>
                  <th className="px-4 py-3 text-right">Goal</th>
                  <th className="px-4 py-3 text-right">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.campaigns.map((c: any) => (
                  <tr key={c.id} className="hover:bg-gray-50 text-sm">
                    <td className="px-4 py-3 font-medium text-gray-900">{c.title}</td>
                    <td className="px-4 py-3 text-right text-green-600 font-semibold">₹{c.raisedAmount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-right text-gray-500">{c.goalAmount ? `₹${c.goalAmount.toLocaleString('en-IN')}` : '—'}</td>
                    <td className="px-4 py-3 text-right">
                      {c.goalAmount ? (
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div style={{ width: `${Math.min((c.raisedAmount / c.goalAmount) * 100, 100)}%` }} className="h-full bg-amber-500 rounded-full" />
                          </div>
                          <span className="text-xs text-gray-600">{((c.raisedAmount / c.goalAmount) * 100).toFixed(1)}%</span>
                        </div>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
