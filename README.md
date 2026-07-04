&lt;div align="center"&gt;

## 🌍 Live Deployment

&lt;table&gt;
&lt;tr&gt;
&lt;td align="center" width="33%"&gt;

### 👤 User Portal
&lt;a href="https://doctor-appointment-booking-roan.vercel.app/" target="_blank"&gt;
  &lt;img src="https://img.shields.io/badge/Visit%20Website-3b82f6?style=for-the-badge&logo=vercel&logoColor=white" /&gt;
&lt;/a&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;sub&gt;Book appointments,&lt;br /&gt;manage profile&lt;/sub&gt;

&lt;/td&gt;
&lt;td align="center" width="33%"&gt;

### 🛠 Admin Dashboard
&lt;a href="https://doctor-appointment-booking-tx26-git-main-codecsumans-projects.vercel.app" target="_blank"&gt;
  &lt;img src="https://img.shields.io/badge/Open%20Dashboard-22c55e?style=for-the-badge&logo=vercel&logoColor=white" /&gt;
&lt;/a&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;sub&gt;Manage doctors,&lt;br /&gt;view analytics&lt;/sub&gt;

&lt;/td&gt;
&lt;td align="center" width="33%"&gt;

### ⚡ Backend API
&lt;a href="https://your-render-backend-url.onrender.com" target="_blank"&gt;
  &lt;img src="https://img.shields.io/badge/API%20Endpoint-a855f7?style=for-the-badge&logo=render&logoColor=white" /&gt;
&lt;/a&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;sub&gt;REST API powered&lt;br /&gt;by Node & Express&lt;/sub&gt;

&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;

&lt;/div&gt;

---

## 📌 Table of Contents

<details>
<summary>Click to expand</summary>

- [🎯 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🎨 Tech Stack](#-tech-stack)
- [🏗️ Project Architecture](#️-project-architecture)
- [📸 Screenshots](#-screenshots)
- [⚙️ Environment Variables](#️-environment-variables)
- [🚀 Getting Started](#-getting-started)
- [📡 API Endpoints](#-api-endpoints)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

</details>

---

## 🎯 Overview

**Doctor Appointment Booking System** is a complete healthcare management platform where **patients** can discover doctors, book appointments, and manage their medical journey — while **admins** get a powerful dashboard to onboard doctors, monitor bookings, and analyze platform activity.

Built with the **MERN stack** (MongoDB, Express, React, Node.js), enhanced with **Cloudinary** for media, **Stripe & Razorpay** for payments, and deployed on **Vercel + Render**.

> 💡 **Perfect for:** Clinics, hospitals, telemedicine startups, and portfolio projects showcasing full-stack expertise.

---

## ✨ Key Features

<div align="center">

### 🧑‍⚕️ Patient Experience

</div>

| Feature | Description |
| :--- | :--- |
| 🔐 **Secure Auth** | JWT-based signup / login with encrypted passwords |
| 🔍 **Doctor Discovery** | Browse doctors across multiple specialties with filters |
| 📅 **Real-Time Booking** | Check live availability & book slots instantly |
| 💳 **Online Payments** | Pay via **Stripe** or **Razorpay** (test mode enabled) |
| 👤 **Profile Management** | Update personal info, upload photo, view history |
| 📱 **Fully Responsive** | Flawless UX on mobile, tablet, and desktop |

<br />

<div align="center">

### 🛠 Admin Superpowers

</div>

| Feature | Description |
| :--- | :--- |
| 🛡 **Protected Routes** | Admin-only access with credential-based JWT |
| ➕ **Doctor Onboarding** | Add doctors with images, bio, fees, availability |
| 📊 **Live Dashboard** | Track doctors, patients, and appointment stats |
| ✅ **Appointment Control** | Cancel or mark appointments as completed |
| 🖼 **Cloudinary CDN** | All images optimized & served globally |
| 📈 **Analytics Ready** | Data-rich insights for platform growth |

---

## 🎨 Tech Stack

<div align="center">

### 💠 Core Stack

<img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,tailwind,vite,vercel,git,github&perline=9" />

<br /><br />

<table>
<tr>
  <th>Layer</th>
  <th>Technology</th>
  <th>Purpose</th>
</tr>
<tr>
  <td>🎨 <b>Frontend</b></td>
  <td>
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  </td>
  <td>Modern, blazing-fast UI</td>
</tr>
<tr>
  <td>⚙️ <b>Backend</b></td>
  <td>
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" />
  </td>
  <td>REST API & business logic</td>
</tr>
<tr>
  <td>🗄 <b>Database</b></td>
  <td>
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white" />
  </td>
  <td>Cloud database (Atlas)</td>
</tr>
<tr>
  <td>🔐 <b>Auth</b></td>
  <td>
    <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
    <img src="https://img.shields.io/badge/bcrypt-004488?style=flat-square" />
  </td>
  <td>Secure token-based auth</td>
</tr>
<tr>
  <td>☁️ <b>Media</b></td>
  <td>
    <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white" />
    <img src="https://img.shields.io/badge/Multer-FF6C37?style=flat-square" />
  </td>
  <td>Image upload & CDN</td>
</tr>
<tr>
  <td>💳 <b>Payments</b></td>
  <td>
    <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" />
    <img src="https://img.shields.io/badge/Razorpay-02042B?style=flat-square&logo=razorpay&logoColor=white" />
  </td>
  <td>Gateway integrations</td>
</tr>
<tr>
  <td>🚀 <b>Deployment</b></td>
  <td>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
    <img src="https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white" />
  </td>
  <td>Frontend + Backend hosting</td>
</tr>
</table>

</div>

---

## 🏗️ Project Architecture

```
📦 doctor-appointment-booking/
│
├── 🎨 frontend/              → Patient-facing React app (Vite + Tailwind)
│   ├── src/
│   │   ├── components/       → Reusable UI components
│   │   ├── pages/            → Route-level pages
│   │   ├── context/          → Global state (AppContext)
│   │   └── assets/           → Images, icons, static files
│   └── vite.config.js
│
├── 🛠 admin/                 → Admin dashboard (Vite + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/Admin/      → Dashboard, DoctorList, AddDoctor
│   │   ├── pages/Doctor/     → Doctor-specific views
│   │   └── context/          → AdminContext, DoctorContext
│   └── vite.config.js
│
├── ⚙️ backend/               → Node.js + Express REST API
│   ├── config/               → mongodb.js, cloudinary.js
│   ├── controllers/          → Route business logic
│   ├── middlewares/          → authAdmin, authUser, multer
│   ├── models/               → Mongoose schemas
│   ├── routes/               → API endpoints
│   └── server.js
│
└── 📄 README.md              → You are here ✨
```

---

## 📸 Screenshots

<div align="center">

> 💡 *Add your project screenshots here for maximum visual impact*

<table>
<tr>
<td align="center"><b>🏠 Homepage</b><br /><img src="https://via.placeholder.com/400x220/3b82f6/ffffff?text=Homepage" /></td>
<td align="center"><b>👨‍⚕️ Doctors List</b><br /><img src="https://via.placeholder.com/400x220/14b8a6/ffffff?text=Doctors" /></td>
</tr>
<tr>
<td align="center"><b>📅 Book Appointment</b><br /><img src="https://via.placeholder.com/400x220/f97316/ffffff?text=Booking" /></td>
<td align="center"><b>🛠 Admin Dashboard</b><br /><img src="https://via.placeholder.com/400x220/a855f7/ffffff?text=Admin" /></td>
</tr>
</table>

</div>

---

## ⚙️ Environment Variables

<details>
<summary><b>🔵 Backend</b> — <code>backend/.env</code></summary>

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
FRONTEND_URL=https://full-stack-doctor-appointment-booki.vercel.app
ADMIN_URL=https://full-stack-doctor-appointment-booki-eight.vercel.app
```

</details>

<details>
<summary><b>🟣 Frontend</b> — <code>frontend/.env</code></summary>

```env
VITE_BACKEND_URL=https://your-backend.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

</details>

<details>
<summary><b>🔴 Admin</b> — <code>admin/.env</code></summary>

```env
VITE_BACKEND_URL=https://your-backend.onrender.com
```

</details>

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have installed:

![Node](https://img.shields.io/badge/Node.js-≥18.0-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-≥9.0-CB3837?style=flat-square&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-latest-F05032?style=flat-square&logo=git&logoColor=white)

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/full-stack-doctor-appointment-booking.git
cd full-stack-doctor-appointment-booking
```

### 🧩 Install & Run — Step by Step

<table>
<tr>
<th width="33%">⚙️ Backend</th>
<th width="33%">🎨 Frontend</th>
<th width="33%">🛠 Admin</th>
</tr>
<tr>
<td>

```bash
cd backend
npm install
npm run dev
```

Runs on **`:4000`**

</td>
<td>

```bash
cd frontend
npm install
npm run dev
```

Runs on **`:5173`**

</td>
<td>

```bash
cd admin
npm install
npm run dev
```

Runs on **`:5174`**

</td>
</tr>
</table>

> ✅ Make sure your `.env` files are configured in **all three** directories before starting.

---

## 📡 API Endpoints

<details>
<summary><b>👤 User Routes</b> — <code>/api/user</code></summary>

| Method | Endpoint | Description | Auth |
| :---: | :--- | :--- | :---: |
| `POST` | `/register` | Create new user account | ❌ |
| `POST` | `/login` | Authenticate user | ❌ |
| `GET` | `/get-profile` | Fetch user profile | ✅ |
| `POST` | `/update-profile` | Update user data | ✅ |
| `POST` | `/book-appointment` | Book a doctor slot | ✅ |
| `GET` | `/appointments` | List user appointments | ✅ |
| `POST` | `/cancel-appointment` | Cancel appointment | ✅ |
| `POST` | `/payment-stripe` | Stripe checkout | ✅ |
| `POST` | `/payment-razorpay` | Razorpay checkout | ✅ |

</details>

<details>
<summary><b>👨‍⚕️ Doctor Routes</b> — <code>/api/doctor</code></summary>

| Method | Endpoint | Description | Auth |
| :---: | :--- | :--- | :---: |
| `GET` | `/list` | Get all doctors | ❌ |
| `POST` | `/login` | Doctor login | ❌ |
| `GET` | `/appointments` | Doctor's appointments | ✅ |
| `POST` | `/complete-appointment` | Mark completed | ✅ |
| `POST` | `/cancel-appointment` | Cancel appointment | ✅ |
| `GET` | `/dashboard` | Doctor dashboard data | ✅ |

</details>

<details>
<summary><b>🛡 Admin Routes</b> — <code>/api/admin</code></summary>

| Method | Endpoint | Description | Auth |
| :---: | :--- | :--- | :---: |
| `POST` | `/login` | Admin login | ❌ |
| `POST` | `/add-doctor` | Add a new doctor | ✅ |
| `GET` | `/all-doctors` | List all doctors | ✅ |
| `POST` | `/change-availability` | Toggle doctor availability | ✅ |
| `GET` | `/appointments` | All appointments | ✅ |
| `POST` | `/cancel-appointment` | Cancel any appointment | ✅ |
| `GET` | `/dashboard` | Admin dashboard stats | ✅ |

</details>

---

## 🚢 Deployment

<div align="center">

| Service | Platform | Purpose |
| :---: | :---: | :--- |
| 👤 **User App** | [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com) | Static frontend hosting |
| 🛠 **Admin App** | [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com) | Static admin hosting |
| ⚡ **Backend** | [![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render)](https://render.com) | Node.js server runtime |
| 🗄 **Database** | [![MongoDB](https://img.shields.io/badge/Hosted%20on-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas) | Managed MongoDB cluster |
| ☁️ **Media** | [![Cloudinary](https://img.shields.io/badge/Powered%20by-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com) | Image CDN & storage |

</div>

### 🛫 Quick Deploy Steps

1. **MongoDB Atlas** → Create cluster → Copy connection URI
2. **Cloudinary** → Get API credentials from dashboard
3. **Render** → Deploy backend → Set env vars → Auto-deploy on push
4. **Vercel** → Import frontend + admin repos → Configure env vars → Deploy 🚀

---

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions are **greatly appreciated**. 💜

```bash
# 1. Fork the project
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "✨ Add some AmazingFeature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

```
MIT © 2025 — Doctor Appointment Booking System
```

---

## 👨‍💻 Author

<div align="center">

### Built with ❤️ by **Your Name**

<a href="https://github.com/your-username">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>
<a href="https://linkedin.com/in/your-profile">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
<a href="mailto:your.email@example.com">
  <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" />
</a>
<a href="https://twitter.com/your-handle">
  <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" />
</a>

</div>

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

<img src="https://forthebadge.com/images/badges/built-with-love.svg" />
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg" />
<img src="https://forthebadge.com/images/badges/open-source.svg" />

<br /><br />

**[⬆ Back to Top](#-doctor-appointment-booking-system)**

</div>
