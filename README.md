# Task Management Application

A modern, responsive task management application built with React, TypeScript, and Redux Toolkit. This frontend-only application simulates a complete backend using Mock Service Worker (MSW) for API endpoints and includes user authentication, task CRUD operations, and a clean, mobile-friendly interface with dark mode support.

## 🚀 Features

### Core Functionality
- **User Authentication**: Login page with mocked JWT authentication
- **Task Management**: Complete CRUD operations for tasks
- **Dashboard**: Clean interface displaying all tasks with filtering and search
- **Task Status**: Track tasks as Todo, In Progress, or Completed
- **Real-time Updates**: Immediate UI updates with optimistic loading states

### UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Search & Filter**: Find tasks quickly with search and status filters
- **Loading States**: Professional loading indicators and animations
- **Error Handling**: Comprehensive error states and user feedback
- **Empty States**: Helpful messages when no tasks are available

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Efficient state management with RTK Query patterns
- **Mock Service Worker**: Realistic API simulation with localStorage persistence
- **Protected Routes**: Authentication guards for dashboard access
- **Form Validation**: Client-side validation for all forms

## 🛠 Technologies Used

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: Redux Toolkit with React Redux
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v3 with custom design system
- **HTTP Client**: Axios for API requests
- **API Mocking**: Mock Service Worker (MSW) v2
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript compiler

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # App header with navigation
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   ├── TaskCard.tsx     # Individual task display
│   ├── TaskForm.tsx     # Create/edit task modal
│   └── TaskList.tsx     # Task list with filters
├── pages/               # Page-level components
│   ├── DashboardPage.tsx # Main dashboard
│   └── LoginPage.tsx    # Authentication page
├── store/               # Redux store configuration
│   ├── authSlice.ts     # Authentication state
│   ├── tasksSlice.ts    # Tasks state management
│   └── index.ts         # Store configuration
├── types/               # TypeScript type definitions
│   ├── auth.ts          # Authentication types
│   └── task.ts          # Task-related types
├── mocks/               # MSW mock API
│   ├── handlers.ts      # API endpoint handlers
│   └── browser.ts       # MSW browser setup
├── hooks/               # Custom React hooks
│   └── redux.ts         # Typed Redux hooks
└── utils/               # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with ES2022 support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

Use these credentials to log in:
- **Username**: `test`
- **Password**: `test123`

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎯 API Endpoints (Mocked)

The application simulates the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | User authentication |
| POST | `/api/logout` | User logout |
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update existing task |
| DELETE | `/api/tasks/:id` | Delete task |

### Request/Response Examples

**Login Request:**
```json
{
  "username": "test",
  "password": "test123"
}
```

**Task Object:**
```json
{
  "id": "1",
  "title": "Complete project",
  "description": "Finish the task management application",
  "status": "in-progress",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": "1"
}
```

## 🔒 How Mocking Works

The application uses **Mock Service Worker (MSW)** to intercept network requests and provide realistic API responses:

1. **Service Worker Setup**: MSW installs a service worker that intercepts HTTP requests
2. **Request Handlers**: Custom handlers in `src/mocks/handlers.ts` define API behavior
3. **Data Persistence**: MockTasks are stored in localStorage for persistence across reloads
4. **Realistic Delays**: Simulated network latency for authentic user experience
5. **Error Simulation**: Proper HTTP status codes and error responses

### Key Benefits of MSW:
- **No Backend Required**: Complete frontend development without API dependencies
- **Realistic Testing**: Network requests behave like real API calls
- **Development Speed**: Instant setup without server configuration
- **Production Ready**: Easy to replace with real API endpoints

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS:

### Colors
- **Primary**: Blue color palette for main actions
- **Grays**: Neutral colors for text and backgrounds
- **Semantic**: Red for errors, green for success, blue for info

### Components
- **Buttons**: Primary, secondary, and danger variants
- **Forms**: Consistent input styling with focus states
- **Cards**: Elevated containers with subtle shadows
- **Typography**: Hierarchical text sizing and weights

### Dark Mode
- Automatic system preference detection
- Manual toggle with persistent user preference
- Comprehensive dark color scheme
- Smooth transitions between themes

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile (320px+)**: Optimized touch interface
- **Tablet (768px+)**: Enhanced layout with more content
- **Desktop (1024px+)**: Full-featured interface with sidebars

### Key Responsive Features:
- Flexible grid layouts that adapt to screen size
- Touch-friendly button sizes and spacing
- Collapsible navigation on mobile devices
- Readable typography at all screen sizes

## 🧪 Testing

The application includes comprehensive error handling and loading states:

- **Network Errors**: Graceful fallbacks for failed requests
- **Validation**: Client-side form validation
- **Loading States**: Visual feedback during async operations
- **Empty States**: Helpful messages when no data is available

## 🔮 Future Enhancements

Potential improvements and additional features:

- **Task Categories**: Organize tasks by project or category
- **Due Dates**: Add deadline tracking with notifications
- **Task Assignments**: Multi-user task assignment
- **File Attachments**: Upload and attach files to tasks
- **Activity Timeline**: Track task history and changes
- **Bulk Actions**: Select and modify multiple tasks
- **Keyboard Shortcuts**: Power user productivity features
- **Offline Support**: Service worker for offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the excellent React framework
- **Redux Team** for Redux Toolkit
- **Tailwind Labs** for Tailwind CSS
- **MSW Team** for Mock Service Worker
- **Lucide** for the beautiful icon set

---

**Built with ❤️ using modern web technologies**