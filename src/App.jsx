import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/LandingPage";
import GuestPage from "./pages/GuestPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SuccessStories from "./pages/SuccessStories";

// Register Page (Correct Import)
import RegisterPage from "./pages/Register/RegisterPage.jsx";

// Dashboard
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import HomePage from "./pages/Dashboard/HomePage";
import MatchesPage from "./pages/Dashboard/MatchesPage";
import SearchPage from "./pages/Dashboard/SearchPage";
import MessagesPage from "./pages/Dashboard/MessagesPage";
import InterestPage from "./pages/Dashboard/InterestPage";
import ProfilePage from "./pages/Dashboard/ProfilePage.jsx"; // 🔴 இதுதான் main காரணம்
import NotificationsPage from "./pages/Dashboard/NotificationsPage";
import AccountPage from "./pages/Dashboard/AccountPage";
import ProfileDetailsPage from "./pages/Dashboard/ProfileDetailsPage.jsx";



function App() {
  return (
    <div className="app-shell">
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* REGISTER PAGE */}
        <Route path="/register" element={<RegisterPage />} />

        {/* DASHBOARD */}
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
          <Route path="profile-details/:id" element={<ProfileDetailsPage />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
