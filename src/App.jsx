import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Chatbot from "./components/chatbot/chatbot";
import HomePage from "./pages/home-page";
import AboutPage from "./pages/about-page";
import ServicePage from "./pages/service-page";
import ServiceDetailPage from "./pages/service-detail-page";
import AppointmentPage from "./pages/appointment-page";
import BlogPage from "./pages/blog-page";
import BlogDetailPage from "./pages/blog-detail-page";
import ContactPage from "./pages/contact-page";
import SignInPage from "./pages/signin-page";
import SignUpPage from "./pages/signup-page";

import ProfilePage from "./pages/profile-page";
import AdminLayout from "./pages/admin/admin-layout";
import DashboardOverview from "./pages/admin/dashboard-overview";
import AppointmentManager from "./pages/admin/appointment-manager";
import ServiceManager from "./pages/admin/service-manager";
import TherapistManager from "./pages/admin/therapist-manager";
import UserManager from "./pages/admin/user-manager";
import ContentManager from "./pages/admin/content-manager";
import ReviewManager from "./pages/admin/review-manager";
import MessageManager from "./pages/admin/message-manager";
import Settings from "./pages/admin/settings";

import { ToastProvider } from "./context/toast-context";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const hideHeaderFooter = location.pathname.startsWith('/admin') || location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <ToastProvider>
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <Chatbot />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="appointments" element={<AppointmentManager />} />
          <Route path="services" element={<ServiceManager />} />
          <Route path="therapists" element={<TherapistManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="messages" element={<MessageManager />} />
          <Route path="reviews" element={<ReviewManager />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </ToastProvider>
  )
}

export default App


