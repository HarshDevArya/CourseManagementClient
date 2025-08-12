import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../utils/api.js";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  BookOpen,
  User,
  Users,
  Calendar,
} from "lucide-react";

export default function CourseForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit";
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    seats: 0,
    startsAt: "",
    endsAt: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isEdit && id) {
      (async () => {
        try {
          const res = await api.get(`/courses/${id}`);
          const c = res.data.course;
          setForm({
            title: c.title || "",
            description: c.description || "",
            instructor: c.instructor || "",
            seats: c.seats || 0,
            startsAt: c.startsAt ? c.startsAt.slice(0, 10) : "",
            endsAt: c.endsAt ? c.endsAt.slice(0, 10) : "",
          });
        } catch (e) {
          setError(e.response?.data?.message || "Failed to load course");
        }
      })();
    }
  }, [isEdit, id]);

  const validateField = (name, value) => {
    const errors = { ...fieldErrors };

    switch (name) {
      case "title":
        if (!value.trim()) {
          errors.title = "Course title is required";
        } else if (value.length < 3) {
          errors.title = "Title must be at least 3 characters";
        } else {
          delete errors.title;
        }
        break;
      case "instructor":
        if (!value.trim()) {
          errors.instructor = "Instructor name is required";
        } else {
          delete errors.instructor;
        }
        break;
      case "seats":
        if (value < 1) {
          errors.seats = "Must have at least 1 seat available";
        } else {
          delete errors.seats;
        }
        break;
      case "startsAt":
        if (value && form.endsAt && new Date(value) >= new Date(form.endsAt)) {
          errors.startsAt = "Start date must be before end date";
        } else {
          delete errors.startsAt;
          delete errors.endsAt; // Clear end date error if it was about date order
        }
        break;
      case "endsAt":
        if (
          value &&
          form.startsAt &&
          new Date(value) <= new Date(form.startsAt)
        ) {
          errors.endsAt = "End date must be after start date";
        } else {
          delete errors.endsAt;
          delete errors.startsAt; // Clear start date error if it was about date order
        }
        break;
    }

    setFieldErrors(errors);
    return !errors[name];
  };

  const handleFieldChange = (name, value) => {
    setForm({ ...form, [name]: value });

    // Clear general error when user starts typing
    if (error) setError("");

    // Validate field
    if (value !== "" || fieldErrors[name]) {
      validateField(name, value);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    // Validate all fields
    const titleValid = validateField("title", form.title);
    const instructorValid = validateField("instructor", form.instructor);
    const seatsValid = validateField("seats", form.seats);
    const startDateValid =
      !form.startsAt || validateField("startsAt", form.startsAt);
    const endDateValid = !form.endsAt || validateField("endsAt", form.endsAt);

    if (
      !titleValid ||
      !instructorValid ||
      !seatsValid ||
      !startDateValid ||
      !endDateValid
    ) {
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await api.patch(`/courses/${id}`, normalize(form));
      } else {
        await api.post("/courses", normalize(form));
      }
      navigate("/");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to save course");
    } finally {
      setSaving(false);
    }
  }

  function normalize(f) {
    const data = { ...f, seats: Number(f.seats) };
    if (!data.startsAt) delete data.startsAt;
    if (!data.endsAt) delete data.endsAt;
    return data;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Link to="/" className="btn btn-secondary btn-sm">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span className="hidden sm:inline">Back</span>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-900 truncate">
            {isEdit ? "Edit Course" : "Create New Course"}
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="card p-4 sm:p-6 lg:p-8">
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-error-50 border border-error-200 flex items-start gap-3 animate-slide-up">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-error-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-error-800">
                {isEdit ? "Update failed" : "Creation failed"}
              </h3>
              <p className="text-sm text-error-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
          {/* Course Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-secondary-700 mb-2">
              Course Title *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
              </div>
              <input
                id="title"
                name="title"
                type="text"
                required
                className={`input pl-9 sm:pl-10 ${
                  fieldErrors.title
                    ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                    : ""
                }`}
                placeholder="Enter course title"
                value={form.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                onBlur={(e) => validateField("title", e.target.value)}
              />
            </div>
            {fieldErrors.title && (
              <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                {fieldErrors.title}
              </p>
            )}
          </div>

          {/* Course Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-secondary-700 mb-2">
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="input resize-none"
              placeholder="Describe what students will learn in this course..."
              value={form.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
            />
          </div>

          {/* Instructor */}
          <div>
            <label
              htmlFor="instructor"
              className="block text-sm font-medium text-secondary-700 mb-2">
              Instructor Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
              </div>
              <input
                id="instructor"
                name="instructor"
                type="text"
                required
                className={`input pl-9 sm:pl-10 ${
                  fieldErrors.instructor
                    ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                    : ""
                }`}
                placeholder="Enter instructor name"
                value={form.instructor}
                onChange={(e) =>
                  handleFieldChange("instructor", e.target.value)
                }
                onBlur={(e) => validateField("instructor", e.target.value)}
              />
            </div>
            {fieldErrors.instructor && (
              <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                {fieldErrors.instructor}
              </p>
            )}
          </div>

          {/* Seats */}
          <div>
            <label
              htmlFor="seats"
              className="block text-sm font-medium text-secondary-700 mb-2">
              Available Seats *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
              </div>
              <input
                id="seats"
                name="seats"
                type="number"
                min="1"
                required
                className={`input pl-9 sm:pl-10 ${
                  fieldErrors.seats
                    ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                    : ""
                }`}
                placeholder="Enter number of available seats"
                value={form.seats}
                onChange={(e) =>
                  handleFieldChange("seats", parseInt(e.target.value) || 0)
                }
                onBlur={(e) =>
                  validateField("seats", parseInt(e.target.value) || 0)
                }
              />
            </div>
            {fieldErrors.seats && (
              <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                {fieldErrors.seats}
              </p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="startsAt"
                className="block text-sm font-medium text-secondary-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
                </div>
                <input
                  id="startsAt"
                  name="startsAt"
                  type="date"
                  className={`input pl-9 sm:pl-10 ${
                    fieldErrors.startsAt
                      ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                      : ""
                  }`}
                  value={form.startsAt}
                  onChange={(e) =>
                    handleFieldChange("startsAt", e.target.value)
                  }
                  onBlur={(e) => validateField("startsAt", e.target.value)}
                />
              </div>
              {fieldErrors.startsAt && (
                <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {fieldErrors.startsAt}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="endsAt"
                className="block text-sm font-medium text-secondary-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-400" />
                </div>
                <input
                  id="endsAt"
                  name="endsAt"
                  type="date"
                  className={`input pl-9 sm:pl-10 ${
                    fieldErrors.endsAt
                      ? "border-error-300 focus:border-error-500 focus:ring-error-500"
                      : ""
                  }`}
                  value={form.endsAt}
                  onChange={(e) => handleFieldChange("endsAt", e.target.value)}
                  onBlur={(e) => validateField("endsAt", e.target.value)}
                />
              </div>
              {fieldErrors.endsAt && (
                <p className="mt-2 text-sm text-error-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {fieldErrors.endsAt}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 btn btn-primary btn-md sm:btn-lg">
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {isEdit ? "Update Course" : "Create Course"}
                </>
              )}
            </button>
            <Link to="/" className="btn btn-secondary btn-md sm:btn-lg">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
