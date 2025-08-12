import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import { Link } from "react-router-dom";
import { Empty, ErrorState, Spinner } from "../components/States.jsx";
import {
  Search,
  BookOpen,
  Users,
  Clock,
  Calendar,
  Filter,
  GraduationCap,
  Star,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useAuth } from "../state/AuthContext.jsx";

export default function Courses() {
  const { user, role } = useAuth();
  const [data, setData] = useState({ courses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  async function fetchCourses() {
    const isSearch = q.length > 0;
    if (isSearch) {
      setSearchLoading(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const res = await api.get("/courses", { params: q ? { q } : {} });
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return <Spinner label="Loading courses..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-xl sm:rounded-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-white/90 text-xs sm:text-sm font-medium">
                {user
                  ? `Welcome back, ${user.name}!`
                  : "Welcome to EduPlatform"}
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Discover Amazing Courses
            </h1>
            <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl">
              Expand your knowledge with our curated collection of expert-led
              courses. Learn at your own pace and unlock new opportunities.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">
                  {data.courses?.length || 0} Courses Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Quality Content</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="card p-4 sm:p-6">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-secondary-400" />
            <input
              className="input pl-9 sm:pl-10 pr-4"
              placeholder="Search courses by title, instructor, or topic..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={searchLoading}
              className="btn btn-primary btn-md flex-1 sm:flex-none">
              {searchLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  <span className="hidden sm:inline">Searching...</span>
                  <span className="sm:hidden">Search</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Search</span>
                  <span className="sm:hidden">Search</span>
                </>
              )}
            </button>
            {q && (
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setTimeout(fetchCourses, 100);
                }}
                className="btn btn-secondary btn-md">
                <span className="hidden sm:inline">Clear</span>
                <span className="sm:hidden">×</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results Section */}
      {q && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-secondary-900">
            Search Results for "{q}"
          </h2>
          <span className="text-sm text-secondary-500">
            {data.courses?.length || 0} course
            {data.courses?.length !== 1 ? "s" : ""} found
          </span>
        </div>
      )}

      {/* Courses Grid */}
      {!data.courses?.length ? (
        <Empty
          label={q ? `No courses found for "${q}"` : "No courses available yet"}
        />
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.courses.map((course) => (
            <Link
              key={course._id}
              to={`/courses/${course._id}`}
              className="card-hover group animate-fade-in">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg group-hover:from-primary-200 group-hover:to-primary-300 transition-colors">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="font-semibold text-base sm:text-lg text-secondary-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-secondary-600 text-sm mb-3 sm:mb-4 line-clamp-3">
                  {course.description || "No description available"}
                </p>

                <div className="space-y-2 sm:space-y-3">
                  {course.instructor && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary-500">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                  )}

                  {course.seats && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary-500">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{course.seats} seats available</span>
                    </div>
                  )}

                  {(course.startsAt || course.endsAt) && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary-500">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>
                        {course.startsAt && formatDate(course.startsAt)}
                        {course.startsAt && course.endsAt && " - "}
                        {course.endsAt && formatDate(course.endsAt)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-secondary-100">
                  <div className="flex items-center justify-between">
                    <span className="badge badge-primary text-xs">
                      Available
                    </span>
                    <span className="text-primary-600 font-medium text-xs sm:text-sm group-hover:text-primary-700 transition-colors">
                      <span className="hidden sm:inline">View Details →</span>
                      <span className="sm:hidden">View →</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Call to Action for Admins */}
      {role === "admin" && !data.courses?.length && (
        <div className="text-center py-8 sm:py-12">
          <div className="max-w-md mx-auto">
            <div className="p-3 sm:p-4 bg-primary-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-secondary-900 mb-2">
              Ready to create your first course?
            </h3>
            <p className="text-secondary-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Start building your course catalog and help students learn
              something amazing.
            </p>
            <Link
              to="/admin/courses/new"
              className="btn btn-primary btn-md sm:btn-lg">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Create Your First Course</span>
              <span className="sm:hidden">Create Course</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
