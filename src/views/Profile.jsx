import React from "react";
import { useAuth } from "../state/AuthContext.jsx";
import {
  User,
  Mail,
  Shield,
  Calendar,
  BookOpen,
  Settings,
  Edit3,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, role } = useAuth();

  if (!user) return null;

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "badge-error";
      case "student":
        return "badge-primary";
      default:
        return "badge-secondary";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return Shield;
      case "student":
        return BookOpen;
      default:
        return User;
    }
  };

  const RoleIcon = getRoleIcon(role);

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="card p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-secondary-900 truncate">
                {user.name}
              </h1>
              <p className="text-secondary-600 flex items-center gap-2 mt-1 text-sm">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="truncate">{user.email}</span>
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm self-start sm:self-auto">
            <Edit3 className="w-4 h-4 mr-1" />
            Edit Profile
          </button>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary-50 rounded-lg">
            <RoleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-secondary-900">Role</div>
              <span className={`badge ${getRoleColor(role)} mt-1 text-xs`}>
                {role?.charAt(0).toUpperCase() + role?.slice(1) || "User"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary-50 rounded-lg">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-secondary-900">
                Member Since
              </div>
              <div className="text-sm text-secondary-600">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Recently"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary-50 rounded-lg sm:col-span-2 lg:col-span-1">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-secondary-900">
                Status
              </div>
              <div className="text-sm text-secondary-600">Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-primary-100 rounded-lg">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-secondary-900">
                0
              </div>
              <div className="text-sm text-secondary-600">Courses Enrolled</div>
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-success-100 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-secondary-900">
                0
              </div>
              <div className="text-sm text-secondary-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-warning-100 rounded-lg">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-warning-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-secondary-900">
                0
              </div>
              <div className="text-sm text-secondary-600">In Progress</div>
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-secondary-100 rounded-lg">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-secondary-900">
                0
              </div>
              <div className="text-sm text-secondary-600">Certificates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-secondary-900 mb-4 sm:mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary-50 rounded-lg">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BookOpen className="w-4 h-4 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-secondary-900">
                Welcome to EduPlatform!
              </div>
              <div className="text-sm text-secondary-600">
                Your account has been created successfully
              </div>
            </div>
            <div className="text-xs text-secondary-500">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Today"}
            </div>
          </div>

          <div className="text-center py-8 sm:py-12">
            <div className="max-w-sm mx-auto">
              <div className="p-3 sm:p-4 bg-secondary-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-secondary-900 mb-2">
                No activity yet
              </h3>
              <p className="text-secondary-600 text-sm sm:text-base mb-4 sm:mb-6">
                Start exploring courses to see your activity here
              </p>
              <Link to="/" className="btn btn-primary btn-md">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
