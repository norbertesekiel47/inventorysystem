# InventoryPro - Modern Inventory Management System

<div align="center">
<br />
<div>
<img src="https://img.shields.io/badge/-Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/-TailwindCSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
<img src="https://img.shields.io/badge/-PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</div>
<h3 align="center">A Production-Ready Full-Stack Inventory Management System with Modern UI/UX</h3>
<br />
</div>

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Quick Start](#-quick-start)
5. [Screenshots](#-screenshots)
6. [Deployment](#-deployment)
7. [Course & Channel](#-course--channel)

---

## 🚀 Introduction

**InventoryPro** is a modern, production-ready inventory management system built with the latest web technologies. It features a beautiful, intuitive interface with glassmorphism effects, gradient backgrounds, and smooth animations that provide an exceptional user experience.

This full-stack application demonstrates enterprise-level architecture with:
- ✨ Modern React Server Components architecture
- 🎨 Beautiful UI with Tailwind CSS 4 and custom animations
- 🔒 Secure authentication and user data isolation
- 📊 Real-time analytics and data visualization
- ⚡ Optimized performance with server-side rendering
- 🗄️ Type-safe database operations with Prisma

Perfect for portfolio projects, learning modern web development, or as a foundation for your own business management tools.

---

## ⚙️ Tech Stack

**Frontend:**
- **Next.js 15** – React framework with App Router and Server Components
- **React 19** – Latest React with enhanced performance
- **TypeScript** – Type safety and excellent developer experience
- **Tailwind CSS 4** – Utility-first CSS with custom animations
- **Lucide React** – Beautiful, consistent icon set
- **Recharts** – Interactive data visualization library

**Backend:**
- **Next.js Server Actions** – Type-safe server functions
- **Prisma ORM 6** – Type-safe database toolkit with migrations
- **PostgreSQL** – Robust, scalable relational database
- **Supabase** – Database hosting with connection pooling
- **Zod** – Runtime type validation and schema validation

**Authentication & Security:**
- **Stack Auth** – Modern authentication solution
- **Server-side validation** – Secure data processing
- **User data isolation** – Multi-tenant architecture

**Deployment:**
- **Vercel** – Serverless deployment platform
- **Turbopack** – Next-generation bundler for faster builds

---

## ⚡️ Features

### 🎨 Modern UI/UX
- **Glassmorphism Effects** - Frosted glass aesthetic with backdrop blur
- **Gradient Backgrounds** - Beautiful color transitions (purple, pink, indigo)
- **Smooth Animations** - Hover effects, scale transitions, and blob animations
- **Color-Coded Status** - Visual indicators for stock levels (green, yellow, red)
- **Responsive Design** - Seamless experience across all devices
- **Interactive Elements** - Engaging micro-interactions and visual feedback

### 📊 Dashboard & Analytics
- **Real-Time Metrics** - Live stats for total products, inventory value, and low stock items
- **Interactive Charts** - Weekly product growth visualization with Recharts
- **Stock Health Monitor** - Circular progress indicator with percentage breakdown
- **Recent Products** - Quick view of latest inventory additions
- **Performance KPIs** - Key metrics displayed in beautiful gradient cards

### 📦 Product Management
- **Full CRUD Operations** - Create, Read, Update, and Delete products
- **Smart Search** - Fast product search with real-time filtering
- **Pagination System** - Efficient handling of large product catalogs
- **SKU Tracking** - Unique product identification
- **Price Management** - Track product pricing and total inventory value
- **Low Stock Alerts** - Configurable thresholds for stock warnings

### 🔐 Security & Authentication
- **Secure Authentication** - User registration and login with Stack Auth
- **Data Isolation** - Each user sees only their own inventory
- **Server-Side Validation** - Zod schema validation for data integrity
- **Protected Routes** - Secure access control for authenticated users

### ⚡ Performance
- **Server Components** - Optimized rendering with React Server Components
- **Server Actions** - Type-safe form handling without API routes
- **Database Optimization** - Efficient queries with Prisma ORM
- **Connection Pooling** - Supabase pooler for scalable connections

---

## 👌 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- [PostgreSQL Database](https://www.postgresql.org/) (or use Neon for cloud hosting)

### Clone and Run

```bash
git clone https://github.com/yourusername/nextjs-fullstack-inventory.git
cd nextjs-fullstack-inventory
npm install
```

### Environment Setup

1. **Set up Supabase Database**
   - Go to [Supabase](https://supabase.com/) and create a new project
   - Get your PostgreSQL connection string from Project Settings → Database → Connection pooling
   - Copy the connection string (it should include the pooler URL)

2. **Set up Stack Auth**
   - Go to [Stack Auth](https://stack-auth.com/) and create a new project
   - Get your Project ID, Publishable Key, and Secret Key from the dashboard

3. **Create Environment Files**

Create `.env` file:
```env
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:5432/postgres"
```

Create `.env.local` file:
```env
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:5432/postgres"

NEXT_PUBLIC_STACK_PROJECT_ID="your_stack_project_id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="pck_xxxxxxxxxxxxxxxx"
STACK_SECRET_SERVER_KEY="ssk_xxxxxxxxxxxxxxxx"
```

4. **Initialize Database**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. **Start Development Server**

```bash
npm run dev
```

Your app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Screenshots

> 📸 Add screenshots of your Dashboard, Inventory Management, Add Product form, and Analytics charts here to showcase the application.

---

## ☁️ Deployment on Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already done)**
```bash
git init
git add .
git commit -m "Initial commit: InventoryPro application"
```

2. **Create a GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Don't initialize with README (since you already have one)

3. **Push to GitHub**
```bash
git remote add origin https://github.com/yourusername/inventorypro.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Sign up / Log in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

2. **Import Your Project**
   - Click **"Add New Project"**
   - Select **"Import Git Repository"**
   - Choose your InventoryPro repository
   - Click **"Import"**

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variables**

   Click on **"Environment Variables"** and add the following:

   ```
   DATABASE_URL
   NEXT_PUBLIC_STACK_PROJECT_ID
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
   STACK_SECRET_SERVER_KEY
   ```

   **Important**: Copy the exact values from your `.env.local` file!

   For each variable:
   - Name: (variable name)
   - Value: (your value)
   - Environment: Production, Preview, Development (check all)

5. **Deploy**
   - Click **"Deploy"**
   - Vercel will build and deploy your application (takes 2-3 minutes)

6. **Setup Database**
   - After deployment, run migrations on production:
   - Go to your project dashboard → Settings → Environment Variables
   - Confirm `DATABASE_URL` points to your Supabase production database
   - The migrations should run automatically during build

### Step 3: Configure Custom Domain (Optional)

1. Go to your project **Settings → Domains**
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS
4. SSL certificate will be automatically generated

### Step 4: Post-Deployment

1. **Test Your Application**
   - Visit your deployment URL: `https://your-project.vercel.app`
   - Test authentication (sign up/login)
   - Test product creation, editing, deletion
   - Verify dashboard analytics are working

2. **Monitor Performance**
   - Use Vercel Analytics (Settings → Analytics)
   - Check build logs for any warnings
   - Monitor response times

3. **Enable Automatic Deployments**
   - Every push to `main` branch will auto-deploy to production
   - Pull requests will create preview deployments

### Troubleshooting Deployment Issues

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure all environment variables are set correctly
- Verify `DATABASE_URL` is accessible from Vercel

**Database Connection Issues:**
- Make sure you're using Supabase **connection pooling** URL
- Check that Supabase project is not paused
- Verify connection string includes correct credentials

**Authentication Issues:**
- Confirm Stack Auth environment variables are correct
- Add your Vercel domain to Stack Auth allowed origins
- Check Stack Auth dashboard for any errors

### Production Database Options

Your Supabase database is already production-ready! Alternatives:

- **[Supabase](https://supabase.com/)** ✅ Recommended - What you're using
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL with generous free tier
- **[Railway](https://railway.app/)** - Easy PostgreSQL hosting
- **[Render](https://render.com/)** - Free PostgreSQL database option

---

## 📱 Application Pages

### Landing Page
- Modern glassmorphism design
- Animated gradient background with blob effects
- Feature highlights
- Call-to-action buttons

### Dashboard
- Real-time inventory metrics (Total Products, Total Value, Low Stock)
- Interactive weekly product growth chart
- Stock health circular progress indicator
- Recent products list with status indicators

### Inventory Management
- Searchable product table with pagination
- Color-coded stock status badges
- SKU tracking
- Quick delete functionality

### Add Product
- Clean, modern form design
- Input validation with helpful error messages
- Price input with dollar sign prefix
- Low stock threshold configuration

---

## 🎯 Key Learning Outcomes

This project demonstrates:

✅ **Full-Stack Development** with Next.js 15 App Router
✅ **Server Components** and Server Actions for optimal performance
✅ **Database Design** with Prisma ORM and PostgreSQL
✅ **Modern Authentication** with Stack Auth
✅ **Advanced UI/UX** with Tailwind CSS and custom animations
✅ **Data Visualization** with Recharts library
✅ **Type Safety** with TypeScript and Zod validation
✅ **Production Deployment** on Vercel
✅ **Real-World Application** architecture and best practices

---

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Stack Auth Documentation](https://docs.stack-auth.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [Recharts Documentation](https://recharts.org/)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve InventoryPro:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐️ on GitHub!

---

## 📧 Contact

For questions or feedback:
- Create an issue in the GitHub repository
- Connect with me on [LinkedIn](https://linkedin.com/in/yourprofile)
- Visit my [Portfolio](https://yourportfolio.com)

---

**Built with ❤️ using Next.js 15, React 19, and modern web technologies**

**Happy Coding!** 🚀
