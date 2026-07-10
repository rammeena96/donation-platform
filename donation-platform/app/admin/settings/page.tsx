'use client'
import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'

const fields = [
  { key: 'site_name', label: 'Site Name', placeholder: 'Divine Temple Trust' },
  { key: 'contact_phone', label: 'Contact Phone', placeholder: '+91-9876543210' },
  { key: 'contact_email', label: 'Contact Email', placeholder: 'info@temple.org' },
  { key: 'contact_address', label: 'Address', placeholder: 'City, State - PIN' },
  { key: 'upi_id', label: 'UPI ID', placeholder: 'temple@upi' },
  { key: 'bank_name', label: 'Bank Name', placeholder: 'Bank Name' },
  { key: 'bank_account', label: 'Account Number', placeholder: 'XXXX XXXX XXXX' },
  { key: 'bank_ifsc', label: 'IFSC Code', placeholder: 'XXXX0000000' },
  { key: 'facebook_url', label: 'Facebook URL', placeholder: 'https://facebook.com/' },
  { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/' },
  { key: 'youtube_url', label: 'YouTube URL', placeholder: 'https://youtube.com/' },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(setSettings)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage site configuration</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type="text"
              value={settings[field.key] || ''}
              onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
        <strong>Note:</strong> Razorpay keys must be configured as environment variables (<code>RAZORPAY_KEY_ID</code>, <code>RAZORPAY_KEY_SECRET</code>) for security reasons and cannot be changed from here.
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  )
}
