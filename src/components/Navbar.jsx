import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BookOpenText,
  LogOut,
  UserRound,
  Plus,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../state/AuthContext.jsx";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-secondary-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl text-secondary-900 hover:text-primary-600 transition-colors">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg text-white shadow-sm">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="hidden sm:block">EduPlatform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-primary-100 text-primary-700"
                  : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50"
              }`}>
              Courses
            </Link>

            {role === "admin" && (
              <Link
                to="/admin/courses/new"
                className="btn btn-primary btn-sm ml-2">
                <Plus className="w-4 h-4 mr-1" />
                New Course
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {/* Role Indicator */}
                {role && (
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      role === "admin"
                        ? "bg-error-100 text-error-700 border border-error-200"
                        : role === "student"
                        ? "bg-primary-100 text-primary-700 border border-primary-200"
                        : "bg-secondary-100 text-secondary-700 border border-secondary-200"
                    }`}>
                    {role === "admin"
                      ? "👑 Admin"
                      : role === "student"
                      ? "🎓 Student"
                      : role}
                  </div>
                )}

                <Link
                  to="/profile"
                  className={`btn btn-secondary btn-sm ${
                    isActive("/profile")
                      ? "bg-primary-50 border-primary-200 text-primary-700"
                      : ""
                  }`}>
                  <UserRound className="w-4 h-4 mr-1" />
                  <span className="hidden lg:inline">{user.name}</span>
                  <span className="lg:hidden">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm text-error-600 hover:text-error-700 hover:bg-error-50 hover:border-error-200">
                  <LogOut className="w-4 h-4 mr-1" />
                  <span className="hidden lg:inline">Logout</span>
                  <span className="lg:hidden">Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  <span className="hidden lg:inline">Get Started</span>
                  <span className="lg:hidden">Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 transition-colors">
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-primary-100 text-primary-700"
                    : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50"
                }`}>
                Courses
              </Link>

              {role === "admin" && (
                <Link
                  to="/admin/courses/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors">
                  <Plus className="w-4 h-4 mr-1 inline" />
                  New Course
                </Link>
              )}

              <div className="pt-2 mt-2 border-t border-secondary-200">
                {user ? (
                  <>
                    {/* Mobile Role Indicator */}
                    {role && (
                      <div className="px-3 py-2 mb-2">
                        <div
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            role === "admin"
                              ? "bg-error-100 text-error-700 border border-error-200"
                              : role === "student"
                              ? "bg-primary-100 text-primary-700 border border-primary-200"
                              : "bg-secondary-100 text-secondary-700 border border-secondary-200"
                          }`}>
                          {role === "admin"
                            ? "👑 Admin"
                            : role === "student"
                            ? "🎓 Student"
                            : role}
                        </div>
                      </div>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                        isActive("/profile")
                          ? "bg-primary-100 text-primary-700"
                          : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50"
                      }`}>
                      <UserRound className="w-4 h-4 mr-2" />
                      {user.name}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-error-600 hover:text-error-700 hover:bg-error-50 transition-colors flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 transition-colors">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
