# E-commerce Admin Dashboard(SSR)

## Overview
Server-side rendered admin dashboard for managing e-commerce products.SSR rendering ensures fast load times, improved SEO, and reliable data fetching.
Administrators can create, update, delete, and analyze products using a clean and responsive interface.

## Features
- SSR using Next.js App Router
- Product CRUD operations
- Image upload(Cloudinary)
- Form validation(Zod)
- Admin analytics dashboard with charts
- MongoDB Atlas integration

## Tech Stack
- Next.js
- MongoDB+Mongoose
- Zod
- Cloudinary
- Recharts
- Tailwind CSS

## Setup Instructions
1. Clone repository
2. Install dependencies: `npm install`
3. Create `.env.local`
MONGODB_URI=your_mongodb_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_EMAIL=abc@example.com
ADMIN_PASSWORD=abc123

5. Run `npm run dev`

## Live Demo
https://ecommerce-admin-dashboard-kappa.vercel.app/

## Demo Video
https://drive.google.com/file/d/1FNpuSNaq8UUH2xT_jFbVD7Pys9b5GD6R/view?usp=drive_link
