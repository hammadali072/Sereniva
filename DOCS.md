# Sereniva: Premium Spa & Wellness Management System

## Table of Contents
1. [Introduction](#introduction)
2. [Key Features & Functionalities](#key-features--functionalities)
    - [For Clients](#for-clients)
    - [For Administrators](#for-administrators)
3. [Technology Stack](#technology-stack)
4. [Project Directory Structure](#project-directory-structure)
5. [Complete A-Z Workflow](#complete-a-z-workflow)
    - [1. Discovery & Authentication](#1-discovery--authentication)
    - [2. Service Selection & Booking](#2-service-selection--booking)
    - [3. User Experience & Social Engagement](#3-user-experience--social-engagement)
    - [4. Administrative Control](#4-administrative-control)
6. [Installation & Setup](#installation--setup)
7. [Environment Variables](#environment-variables)

---

## Introduction
**Sereniva** is a sophisticated, full-stack web application designed for modern spa and wellness centers. It provides a seamless bridge between high-end relaxation services and digital convenience. Building on high-performance technologies, Sereniva offers a premium user experience characterized by smooth animations, intuitive navigation, and robust backend management.

The project isn't just a website; it's a complete business management tool that handles everything from the first customer touchpoint to the final service completion and feedback loop.

---

## Key Features & Functionalities

### For Clients
- **Interactive Service Catalog**: Browse through categorized services like Massage Therapy, Body Treatments, and Facial Care with detailed descriptions and benefits.
- **Dynamic Appointment Booking**: A multi-step booking system where users can choose their preferred service, specific therapists, and available time slots.
- **Personalized Profile Dashboard**: 
    - Manage personal information and profile pictures.
    - View upcoming and past appointment history with real-time status updates (Pending, Confirmed, Completed, Cancelled).
    - **Review System**: Clients can leave star ratings and detailed feedback for services they have experienced.
- **Wellness Blog**: An integrated blog platform featuring wellness tips, professional guides, and interactive comment sections.
- **Secure Authentication**: Robust Sign-in and Sign-up system powered by Firebase, ensuring user data privacy.
- **Real-time Notifications**: Toast notifications for successful bookings, profile updates, and authentication events.

### For Administrators
- **Comprehensive Dashboard**: Real-time statistics including total appointments, active services, total users, and revenue overview.
- **Appointment Management**: Global view of all bookings with the ability to update statuses and manage therapist assignments.
- **Service & Therapist CRUD**: Complete Control over the service catalog and team members, including image uploads via Firebase Storage.
- **User Management**: Monitor registered users and their activities.
- **Content Management System (CMS)**: Add, edit, or delete blog posts and manage global site content through the admin interface.
- **Review & Message Center**: Moderate customer reviews and respond to inquiries sent via the contact form.

---

## Technology Stack

- **Frontend**: 
    - **React 19**: Modern UI development with functional components and hooks.
    - **Vite**: Ultra-fast build tool and development server.
    - **Tailwind CSS**: Utility-first styling for a clean, responsive, and professional design.
    - **GSAP & Framer Motion**: High-end animations and transitions.
    - **Swiper.js**: Modern touch-enabled sliders for testimonials and product showcases.
    - **React Router 7**: Sophisticated client-side routing.
    - **Phosphor Icons**: A flexible and consistent icon library.

- **Backend & Database**:
    - **Firebase Authentication**: Secure user management and OAuth.
    - **Firebase Realtime Database**: NoSQL database for real-time synchronization of appointments and content.
    - **Firebase Storage**: Secure hosting for user profile pictures, service images, and blog assets.

- **Integrations**:
    - **Stripe**: (Infrastructure Ready) Integrated for secure payment processing.
    - **Cloudinary**: (Infrastructure Ready) For advanced image optimization and management.

---

## Project Directory Structure

```text
Sereniva/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, videos, and local media
│   ├── components/         # Reusable UI components (Header, Footer, Chatbot, etc.)
│   ├── context/            # Global state management (Toast, Auth, etc.)
│   ├── data/               # Static configuration and theme data
│   ├── pages/
│   │   ├── admin/          # Admin Dashboard and Management pages
│   │   ├── profile-page/   # User Profile and Settings
│   │   └── ...             # Public pages (Home, Services, Blog, etc.)
│   ├── utils/              # Helper functions and constants
│   ├── App.jsx             # Main routing and layout configuration
│   ├── firebase.jsx        # Firebase SDK initialization
│   ├── index.css           # Global styles and Tailwind directives
│   └── main.jsx            # Project entry point
├── .env                    # Environment variables (API Keys)
├── tailwind.config.js      # Tailwind customization
└── vite.config.js          # Vite optimization settings
```

---

## Complete A-Z Workflow

### 1. Discovery & Authentication
Everything starts with a premium landing page. New users can explore services and blog posts. To book an appointment or interact with the community, users sign up via the **SignUpPage**. Authentication is handled securely by Firebase, and user data is initialized in the Database.

### 2. Service Selection & Booking
A user navigates to the **Services** section, reads about the "Signature Journey" in detail, and decides to book. They are redirected to the **AppointmentPage**.
- **The Logic**: The user selects a Service -> selects a Therapist (filtered by expertise) -> selects Date -> selects Time. 
- Upon submission, a new entry is created in the Firebase `appointments` node with status `Pending`.

### 3. User Experience & Social Engagement
Once booked, the appointment appears in the user's **Profile**. After the session is marked as `Completed` by an admin, the user gets the option to leave a **Review**. They can also join discussions in the **Blog** section by leaving comments on wellness articles.

### 4. Administrative Control
The admin logs into the **Admin Dashboard**.
- They see a new `Pending` appointment.
- They check the **TherapistManager** for availability and update the appointment to `Confirmed`.
- They can use the **ContentManager** to write a new blog post about "Spring Detox," which immediately reflects on the frontend.
- They monitor the **MessageManager** for any direct inquiries from the contact page.

---

## Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd Sereniva
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   Create a project on [Firebase Console](https://console.firebase.google.com/), enable Auth, Realtime Database, and Storage.

4. **Environment Setup**:
   Create a `.env` file in the root (see [Environment Variables](#environment-variables)).

5. **Run Locally**:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Ensure your `.env` file contains the following keys for full functionality:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

---

*Generated by Sereniva Dev Team - January 2026*
