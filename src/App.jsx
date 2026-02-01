import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border border-secondary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 h-full w-[2px] bg-primary animate-[loading-bar_1.5s_infinite]"></div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary/40 animate-pulse">
            Establishing Protocol
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border border-secondary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 h-full w-[2px] bg-primary animate-[loading-bar_1.5s_infinite]"></div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary/40 animate-pulse">
            Establishing Protocol
          </span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Home Page - Public landing page */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="reports" element={<Reports />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Legacy routes - redirect to /app/* */}
      <Route
        path="/dashboard"
        element={<Navigate to="/app/dashboard" replace />}
      />
      <Route
        path="/transactions"
        element={<Navigate to="/app/transactions" replace />}
      />
      <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
      <Route
        path="/accounts"
        element={<Navigate to="/app/accounts" replace />}
      />
      <Route
        path="/settings"
        element={<Navigate to="/app/settings" replace />}
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
