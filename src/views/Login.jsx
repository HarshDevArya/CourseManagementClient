import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  LogIn,
} from "lucide-react";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validateField = (name, value) => {
    const errors = { ...fieldErrors };

    switch (name) {
      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Please enter a valid email address";
        } else {
          delete errors.email;
        }
        break;
      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 6) {
          errors.password = "Password must be at least 6 characters";
        } else {
          delete errors.password;
        }
        break;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (name, value) => {
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    // Clear error when user starts typing
    if (error) setError("");

    // Validate on blur or when field has content
    if (value) {
      validateField(name, value);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    // Validate all fields
    const emailValid = validateField("email", email);
    const passwordValid = validateField("password", password);

    if (!emailValid || !passwordValid) {
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-6 sm:py-12 px-4">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
            <LogIn className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Sign in to your account to continue learning
          </p>
        </div>

        {/* Form */}
        <div className="card p-6 sm:p-8">
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-error-50 border border-error-200 flex items-start gap-3 animate-slide-up">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-error-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-error-800">
                  Sign in failed
                </h3>
                <p className="text-sm text-error-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`input pl-9 sm:pl-10 ${
                    fieldErrors.email
                      ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onBlur={(e) => validateField("email", e.target.value)}
                />
                {!fieldErrors.email && email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success-500" />
                  </div>
                )}
              </div>
              {fieldErrors.email && (
                <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`input pl-9 sm:pl-10 pr-10 ${
                    fieldErrors.password
                      ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  onBlur={(e) => validateField("password", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400 hover:text-secondary-600" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400 hover:text-secondary-600" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary btn-md sm:btn-lg">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
