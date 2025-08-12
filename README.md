# Client - React Frontend

This is the frontend application built with React, Vite, and Tailwind CSS for the MERN stack course management system.

## 🚀 Features

- **Modern React**: Built with React 18 and functional components
- **Fast Development**: Vite for lightning-fast development and build times
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router for client-side navigation
- **State Management**: Context API for global state management
- **Authentication**: Protected routes and user authentication
- **Responsive Design**: Mobile-first responsive design

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ConfirmDialog.jsx
│   │   ├── Guest.jsx
│   │   ├── Navbar.jsx
│   │   ├── Protected.jsx
│   │   └── States.jsx
│   ├── state/              # Global state management
│   │   ├── AuthBinder.jsx
│   │   └── AuthContext.jsx
│   ├── utils/              # Utility functions
│   │   ├── api.js
│   │   └── bindAuthEffect.js
│   ├── views/              # Page components
│   │   ├── CourseDetail.jsx
│   │   ├── CourseForm.jsx
│   │   ├── Courses.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   ├── router.jsx          # Route definitions
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── vercel.json             # Vercel deployment configuration
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Axios** - HTTP client for API calls

## 📦 Installation

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp client_env.example .env
   ```

   Edit the `.env` file with your configuration:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Vite Configuration

The project uses Vite for fast development and optimized builds. Configuration is in `vite.config.js`.

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.js` with custom theme extensions.

## 🚀 Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the deployment configuration.

## 📱 Features

### Authentication

- User registration and login
- Protected routes
- JWT token management
- Automatic token refresh

### Course Management

- View all courses
- Course details
- Create new courses (admin only)
- Course enrollment

### User Profile

- View and edit user profile
- Manage enrollments
- Account settings

## 🔒 Security

- Protected routes for authenticated users
- JWT token validation
- Secure API communication
- Input validation and sanitization

## 🤝 Contributing

1. Follow the existing code style
2. Use functional components with hooks
3. Implement proper error handling
4. Add appropriate loading states
5. Ensure responsive design

## 📄 License

This project is part of a MERN stack course management system.
