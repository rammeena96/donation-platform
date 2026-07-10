'use client'
import { useEffect, useState } from 'react'
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DonationsPage() {
  const [donations, setDonations] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const limit = 20

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search, status })
    fetch(`/api/admin/donations?${params}`).then(r => r.json()).then(data => {
      setDonations(data.donations || [])
      setTotal(data.total || 0)
      setLoading(false)
    })
  }, [page, search, status])

  const exportCSV = async () => {
    const res = await fetch('/api/admin/donations?limit=10000')
    const data = await res.json()
    const rows = data.donations.map((d: any) => [d.donorName, d.donorEmail, d.donorPhone, d.amount, d.status, d.receiptNumber || '', d.createdAt])
    const csv = [['Name', 'Email', 'Phone', 'Amount', 'Status', 'Receipt', 'Date'], ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'donations.csv'; a.click()
  }

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = { completed: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', failed: 'bg-red-100 text-red-700' }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[s] || 'bg-gray-100 text-gray-700'}`}>{s}</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
          <p className="text-gray-500 text-sm">{total} total records</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} placeholder="Search by name, email..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400" />
          </div>
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Donor</th>
                <th className="px-4 py-3 text-left">Campaign</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-left">Receipt</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-4 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td></tr>
                ))
              ) : donations.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No donations found</td></tr>
              ) : (
                donations.map((d: any) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{d.donorName}</p>
                      <p className="text-gray-500 text-xs">{d.donorEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{d.campaign?.title || 'General'}</td>
                    <td className="px-4 py-3 text-right font-semibold text-amber-700">₹{d.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-center">{statusBadge(d.status)}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{d.receiptNumber || '—'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{new Date(d.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {total > limit && (
          <div className="p-4 border-t flex items-center justify-between text-sm">
            <p className="text-gray-500">Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setPage(p => p + 1)} disabled={page * limit >= total}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-40"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
