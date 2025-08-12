import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Courses from "./views/Courses.jsx";
import CourseDetail from "./views/CourseDetail.jsx";
import CourseForm from "./views/CourseForm.jsx";
import Profile from "./views/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import Guest from "./components/Guest.jsx";
import Protected from "./components/Protected.jsx";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Courses /> },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },
      { path: "/courses/:id", element: <CourseDetail /> },
      {
        path: "/admin/courses/new",
        element: (
          <Protected role="admin">
            <CourseForm mode="create" />
          </Protected>
        ),
      },
      {
        path: "/admin/courses/:id/edit",
        element: (
          <Protected role="admin">
            <CourseForm mode="edit" />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
    ],
  },
]);

export default router;
