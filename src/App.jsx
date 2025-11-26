import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addNotification } from "./store/slices/notificationsSlice";

// Public Pages
import LandingPage from "./pages/LandingPage";
import GuestPage from "./pages/GuestPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SuccessStories from "./pages/SuccessStories";
import TermsPage from "./pages/TermsPage"; 

// Register Page
import RegisterPage from "./pages/Register/RegisterPage.jsx";

// Dashboard Pages
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import HomePage from "./pages/Dashboard/HomePage";
import MatchesPage from "./pages/Dashboard/MatchesPage";
import SearchPage from "./pages/Dashboard/SearchPage";
import MessagesPage from "./pages/Dashboard/MessagesPage";
import InterestPage from "./pages/Dashboard/InterestPage";
import ProfilePage from "./pages/Dashboard/ProfilePage.jsx";
import NotificationsPage from "./pages/Dashboard/NotificationsPage";
import AccountPage from "./pages/Dashboard/AccountPage";
import ProfileDetailsPage from "./pages/Dashboard/ProfileDetailsPage.jsx";
import PremiumPage from "./pages/Dashboard/PremiumPage";

// ⭐ NEW PAYMENT PAGE
import PaymentPage from "./pages/Dashboard/PaymentPage";

function App() {
  const dispatch = useDispatch();
  const existingNotifications = useSelector((s) => s.notifications.items);

  // Seed sample notifications
  useEffect(() => {
    if (existingNotifications.length > 0) return;

    dispatch(
      addNotification({
        id: 1001,
        type: "match",
        title: "New Interest Received",
        message: "Someone expressed interest in your profile.",
        actionUrl: "/app/interest",
        isRead: false,
        createdAt: "2025-11-25T06:05:00",
      })
    );

    dispatch(
      addNotification({
        id: 1002,
        type: "chat",
        title: "New Message",
        message: "You received a new message.",
        actionUrl: "/app/messages",
        isRead: false,
        createdAt: "2025-11-25T05:45:00",
      })
    );

    dispatch(
      addNotification({
        id: 1003,
        type: "verify",
        title: "Profile Verified",
        message: "Your profile has been successfully verified.",
        actionUrl: "/app/profile",
        isRead: false,
        createdAt: "2025-11-24T21:30:00",
      })
    );

    dispatch(
      addNotification({
        id: 1004,
        type: "payment",
        title: "Premium Discount Activated",
        message: "Gold Premium is now available at 30% discount for the next 5 days.",
        actionUrl: "/app/premium",
        isRead: false,
        createdAt: "2025-11-25T09:15:00",
      })
    );
  }, [dispatch, existingNotifications.length]);

  return (
    <div className="app-shell">
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* REGISTER PAGE */}
        <Route path="/register" element={<RegisterPage />} />

        {/* DASHBOARD ROUTES */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="interest" element={<InterestPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="premium" element={<PremiumPage />} />

          {/* ⭐ NEW PAYMENT PAGE ROUTE */}
          <Route path="payment" element={<PaymentPage />} />

          <Route path="profile-details/:id" element={<ProfileDetailsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
