import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  UserPlus,
} from "lucide-react";

export default function Register() {
  const { register, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value, confirmValue = null) => {
    const errors = { ...fieldErrors };

    switch (name) {
      case "name":
        if (!value) {
          errors.name = "Name is required";
        } else if (value.length < 2) {
          errors.name = "Name must be at least 2 characters";
        } else {
          delete errors.name;
        }
        break;
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
        } else if (value.length < 8) {
          errors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          errors.password =
            "Password must contain uppercase, lowercase, and number";
        } else {
          delete errors.password;
        }
        // Re-validate confirm password if it exists
        if (confirmValue && value !== confirmValue) {
          errors.confirmPassword = "Passwords do not match";
        } else if (confirmValue) {
          delete errors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (!value) {
          errors.confirmPassword = "Please confirm your password";
        } else if (value !== password) {
          errors.confirmPassword = "Passwords do not match";
        } else {
          delete errors.confirmPassword;
        }
        break;
    }

    setFieldErrors(errors);
    return !errors[name];
  };

  const handleFieldChange = (name, value) => {
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);

    // Clear general error when user starts typing
    if (error) setError("");

    // Validate on change for better UX
    if (value || fieldErrors[name]) {
      if (name === "password") {
        validateField(name, value, confirmPassword);
      } else if (name === "confirmPassword") {
        validateField(name, value);
      } else {
        validateField(name, value);
      }
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 2) return "bg-error-500";
    if (strength === 3) return "bg-warning-500";
    return "bg-success-500";
  };

  const getStrengthText = (strength) => {
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Good";
    return "Strong";
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    // Validate all fields
    const nameValid = validateField("name", name);
    const emailValid = validateField("email", email);
    const passwordValid = validateField("password", password, confirmPassword);
    const confirmPasswordValid = validateField(
      "confirmPassword",
      confirmPassword
    );

    if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid) {
      return;
    }

    const res = await register(name, email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  }

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-6 sm:py-12 px-4">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
            <UserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Join EduPlatform and start your learning journey
          </p>
        </div>

        {/* Form */}
        <div className="card p-6 sm:p-8">
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-error-50 border border-error-200 flex items-start gap-3 animate-slide-up">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-error-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-error-800">
                  Registration failed
                </h3>
                <p className="text-sm text-error-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-secondary-700 mb-2">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={`input pl-9 sm:pl-10 ${
                    fieldErrors.name
                      ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                      : ""
                  }`}
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  onBlur={(e) => validateField("name", e.target.value)}
                />
                {!fieldErrors.name && name && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success-500" />
                  </div>
                )}
              </div>
              {fieldErrors.name && (
                <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

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
                  autoComplete="new-password"
                  required
                  className={`input pl-9 sm:pl-10 pr-10 ${
                    fieldErrors.password
                      ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                      : ""
                  }`}
                  placeholder="Create a strong password"
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-secondary-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`input pl-9 sm:pl-10 pr-10 ${
                    fieldErrors.confirmPassword
                      ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                      : ""
                  }`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    handleFieldChange("confirmPassword", e.target.value)
                  }
                  onBlur={(e) =>
                    validateField("confirmPassword", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400 hover:text-secondary-600" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400 hover:text-secondary-600" />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {fieldErrors.confirmPassword}
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
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
