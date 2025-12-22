import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HomePage from "./pages/home-page";
import AboutPage from "./pages/about-page";
import ServicePage from "./pages/service-page";
import BlogPage from "./pages/blog-page";
import ContactPage from "./pages/contact-page";
import SignInPage from "./pages/signin-page";
import SignUpPage from "./pages/signup-page";

import ProfilePage from "./pages/profile-page";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardOverview from "./pages/admin/DashboardOverview";
import AppointmentManager from "./pages/admin/AppointmentManager";
import ServiceManager from "./pages/admin/ServiceManager";
import TherapistManager from "./pages/admin/TherapistManager";
import UserManager from "./pages/admin/UserManager";
import ContentManager from "./pages/admin/ContentManager";
import ReviewManager from "./pages/admin/ReviewManager";
import MessageManager from "./pages/admin/MessageManager";
import Settings from "./pages/admin/Settings";

import { ToastProvider } from "./context/toast-context";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <ToastProvider>
      {!location.pathname.startsWith('/admin') && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin Routes */}
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
      {!location.pathname.startsWith('/admin') && <Footer />}
    </ToastProvider>
  )
}

export default App
