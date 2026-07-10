'use client'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Campaign {
  id: string; title: string; slug: string; description: string;
  category: string; goalAmount?: number; raisedAmount: number; isActive: boolean; isFeatured: boolean;
}

const emptyForm = { title: '', slug: '', description: '', category: 'charitable', goalAmount: '', isActive: true, isFeatured: false }

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const load = () => {
    fetch('/api/admin/campaigns').then(r => r.json()).then(d => setCampaigns(d.campaigns || []))
  }

  useEffect(() => { load() }, [])

  const openNew = () => { setForm(emptyForm); setEditId(null); setShowModal(true) }
  const openEdit = (c: Campaign) => {
    setForm({ title: c.title, slug: c.slug, description: c.description, category: c.category, goalAmount: c.goalAmount ? String(c.goalAmount) : '', isActive: c.isActive, isFeatured: c.isFeatured })
    setEditId(c.id)
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, goalAmount: form.goalAmount ? Number(form.goalAmount) : null }
    const url = editId ? `/api/admin/campaigns/${editId}` : '/api/admin/campaigns'
    await fetch(url, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setShowModal(false); setLoading(false); load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this campaign?')) return
    await fetch(`/api/admin/campaigns/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Campaign
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Raised</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{c.title}</p>
                  <p className="text-gray-400 text-xs">/{c.slug}</p>
                </td>
                <td className="px-4 py-3 text-gray-600 capitalize">{c.category}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">₹{c.raisedAmount.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {c.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(c)} className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors mr-1"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {campaigns.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No campaigns yet</td></tr>}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">{editId ? 'Edit Campaign' : 'New Campaign'}</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Title', key: 'title', type: 'text' },
                  { label: 'Slug (URL)', key: 'slug', type: 'text' },
                  { label: 'Goal Amount (₹)', key: 'goalAmount', type: 'number' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                    <input type={field.type} value={(form as any)[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none">
                    {['charitable', 'festival', 'ekadashi', 'construction', 'other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded" />
                    Active
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} className="rounded" />
                    Featured
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 disabled:opacity-50">
                    {loading ? 'Saving...' : editId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
