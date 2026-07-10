# 🕉️ Divine Temple Trust — Donation Platform

A production-ready Next.js 15 donation platform with Razorpay integration, admin dashboard, and full campaign management.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Fill in all required values
```

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
# OR for production:
npx prisma migrate deploy
```

### 4. Seed Data
```bash
npx tsx scripts/seed-admin.ts      # Creates admin user
npx tsx scripts/seed-campaigns.ts  # Seeds default campaigns
```

Default admin: admin@divinemission.org / Admin@123! (CHANGE IMMEDIATELY)

### 5. Run
```bash
npm run dev        # Development
npm run build && npm start  # Production
```

---

## 🏗️ Project Structure

```
app/
├── admin/              # Admin dashboard (login, dashboard, donations, campaigns, settings)
├── api/                # API routes (create-order, verify-payment, admin CRUD)
├── campaign/[slug]/    # Individual campaign pages (dynamic)
├── campaigns/          # All campaigns listing
├── donate/             # Donation form page
├── thank-you/          # Post-payment success page
├── about/ contact/ privacy/ terms/
├── sitemap.ts          # Auto sitemap
└── robots.ts           # robots.txt

components/
├── home/               # 12 homepage sections
├── campaign/           # Campaign detail component
├── donation/           # DonationForm (Razorpay integrated)
└── layout/             # Header + Footer

lib/
├── auth.ts             # NextAuth v5
├── prisma.ts           # Prisma client
├── razorpay.ts         # Payment integration
├── email.ts            # Nodemailer receipts
└── utils.ts            # Helpers

scripts/
├── seed-admin.ts       # Create admin user
└── seed-campaigns.ts   # Seed campaigns
```

---

## 💳 Razorpay Payment Flow

```
DonationForm → POST /api/donations/create-order
  → Razorpay order created
  → Pending donation saved to DB

Razorpay Checkout (client) → Payment

POST /api/donations/verify-payment
  → HMAC signature verified
  → Donation marked 'completed'
  → Campaign raisedAmount incremented
  → Receipt created
  → Email sent

→ /thank-you page
```

---

## 👤 Admin Panel

URL: /admin/login

- **Dashboard** — Stats cards, campaign performance table
- **Donations** — Search, filter, paginate, CSV export
- **Campaigns** — Full CRUD with modal form
- **Settings** — Site info, bank/UPI details, social links

---

## 📧 Email Setup (Gmail)

1. Gmail → Security → 2FA → App Passwords → Generate
2. Set SMTP_HOST=smtp.gmail.com, SMTP_PORT=587, SMTP_USER/SMTP_PASS in .env

---

## 🚀 Deploy to Vercel

```bash
npm i -g vercel && vercel --prod
```

Set all env vars in Vercel dashboard. Add PostgreSQL (Neon/Supabase recommended).

---

## 🔒 Security

- Server-side Razorpay signature verification
- NextAuth session-protected admin routes
- Zod input validation on all APIs
- No hardcoded credentials
- Prisma ORM (SQL injection prevention)
