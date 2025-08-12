import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../utils/api.js";
import { useAuth } from "../state/AuthContext.jsx";
import { Spinner, ErrorState } from "../components/States.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  Edit3,
  Trash2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  User,
  CalendarDays,
} from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.course);
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function enroll() {
    setEnrolling(true);
    setMessage("");
    try {
      await api.post("/enroll", { courseId: id });
      setMessage("Enrolled successfully! Welcome to the course.");
    } catch (e) {
      setMessage(e.response?.data?.message || "Failed to enroll in course");
    } finally {
      setEnrolling(false);
    }
  }

  async function onDeleteConfirm() {
    setDeleting(true);
    setMessage("");
    try {
      await api.delete(`/courses/${id}`);
      navigate("/", { replace: true });
    } catch (e) {
      setMessage(e.response?.data?.message || "Failed to delete course");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <Spinner label="Loading course details..." />;
  if (error)
    return (
      <ErrorState message={error} onRetry={() => window.location.reload()} />
    );
  if (!course) return null;

  const full = course.seats === 0;
  const isSuccess = message.includes("success");

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary btn-sm">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-900 truncate">
            {course.title}
          </h1>
        </div>
        {role === "admin" && (
          <div className="flex gap-2">
            <Link
              to={`/admin/courses/${id}/edit`}
              className="btn btn-secondary btn-sm">
              <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
            <button
              onClick={() => setConfirmOpen(true)}
              className="btn btn-danger btn-sm">
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Course Card */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold text-secondary-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-secondary-600 text-sm sm:text-base">
                  {course.description || "No description available"}
                </p>
              </div>
            </div>

            {/* Course Details */}
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {course.instructor && (
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">
                    <span className="font-medium">Instructor:</span>{" "}
                    {course.instructor}
                  </span>
                </div>
              )}

              {course.seats !== undefined && (
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Seats:</span> {course.seats}{" "}
                    available
                  </span>
                </div>
              )}

              {course.startsAt && (
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Starts:</span>{" "}
                    {formatDate(course.startsAt)}
                  </span>
                </div>
              )}

              {course.endsAt && (
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <CalendarDays className="w-4 h-4 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Ends:</span>{" "}
                    {formatDate(course.endsAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 sm:p-4 rounded-lg border flex items-start gap-3 animate-slide-up ${
                isSuccess
                  ? "bg-success-50 border-success-200"
                  : "bg-error-50 border-error-200"
              }`}>
              {isSuccess ? (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-error-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3
                  className={`text-sm font-medium ${
                    isSuccess ? "text-success-800" : "text-error-800"
                  }`}>
                  {isSuccess ? "Success!" : "Error"}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    isSuccess ? "text-success-700" : "text-error-700"
                  }`}>
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Enrollment Card */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Course Enrollment
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-600">Status:</span>
                <span
                  className={`badge ${full ? "badge-error" : "badge-success"}`}>
                  {full ? "Full" : "Available"}
                </span>
              </div>

              {course.seats !== undefined && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-600">Available Seats:</span>
                  <span className="font-medium text-secondary-900">
                    {course.seats}
                  </span>
                </div>
              )}

              {course.startsAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-600">Start Date:</span>
                  <span className="font-medium text-secondary-900">
                    {formatDate(course.startsAt)}
                  </span>
                </div>
              )}
            </div>

            {role === "student" && (
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={enroll}
                  disabled={enrolling || full}
                  className={`w-full btn btn-md sm:btn-lg ${
                    full
                      ? "btn-secondary cursor-not-allowed opacity-50"
                      : "btn-primary"
                  }`}>
                  {enrolling ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Enrolling...
                    </>
                  ) : full ? (
                    "Course Full"
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Enroll Now
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Course Stats */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Course Information
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <BookOpen className="w-4 h-4" />
                <span>Course Type: Standard</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <Clock className="w-4 h-4" />
                <span>Duration: Self-paced</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <Users className="w-4 h-4" />
                <span>Format: Instructor-led</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onDeleteConfirm}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete Course"
        confirmVariant="danger"
        loading={deleting}
      />
    </div>
  );
}
