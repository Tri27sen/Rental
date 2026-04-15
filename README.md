This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

DEMO : https://drive.google.com/drive/folders/1TR772ZwL2AxYdpVjlMNhbkP-e1mNxkW1

---

# 🌍 Travel Booking Platform

A full-stack travel booking web application that allows users to explore destinations, filter stays based on preferences, and get personalized travel recommendations. The platform supports secure authentication, image uploads, and smart itinerary planning.

---

## 🚀 Features

### 🔐 Authentication

* Secure user authentication using OAuth
* Login / Signup functionality
* Session management for protected routes

### 🔍 Advanced Search & Filters

* Filter stays based on:

  * Budget 💰
  * Location 📍
  * Amenities 🏨
* Dynamic search results with real-time updates

### 🧠 Smart Recommendations

* Personalized travel suggestions based on:

  * Budget
  * Preferred destinations
  * Travel interests
* Helps users discover relevant places easily

### 🗺️ Itinerary Planning

* Generate travel itineraries
* Organize trips efficiently
* Plan multi-day travel schedules

### ☁️ Image Uploads (Cloudinary)

* Upload and manage property/travel images
* Optimized image delivery using Cloudinary
* Fast and scalable media handling

### 🏡 Listings Management

* Add, edit, and delete travel listings
* Upload images for listings
* Manage property details

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

### Backend

* **Next.js API Routes**
* **Prisma ORM**

### Database

* **PostgreSQL / MongoDB** (depending on your setup)

### Authentication

* **NextAuth.js (OAuth)**

### Cloud Services

* **Cloudinary** (Image Upload & Storage)

---

## 📂 Project Structure

```
/pages/api/auth     → Authentication routes
/prisma             → Database schema & config
/public             → Static assets
/src                → Core application logic
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Tri27sen/Rental.git
cd Rental
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file and add:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4️⃣ Setup Prisma

```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Run the development server

```bash
npm run dev
```

---

## 🌐 Deployment

* Can be deployed on **Vercel**
* Configure environment variables in deployment settings
* Ensure database and Cloudinary are properly connected



---

## 📌 Future Improvements

* AI-based travel recommendations 🤖
* Real-time booking system
* Payment gateway integration 💳
* Reviews & ratings system ⭐
* Map integration (Google Maps)

---



---

