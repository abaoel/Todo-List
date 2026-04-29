# Next.js 16 Todo List App

A modern, high-performance Todo List application built with Next.js 16 (App Router), React 19, and MongoDB. The app provides user authentication, individual task management, and an intuitive drag-and-drop interface for task reordering.

## Features

- **User Authentication**: Secure sign-up, sign-in, and session management using [Better Auth](https://better-auth.com/).
- **Task Management**: Create, update, toggle completion, and delete your tasks.
- **Drag-and-Drop Reordering**: Seamlessly reorder tasks using `@dnd-kit`.
- **Fractional Indexing**: Highly efficient reordering operations powered by a robust indexing strategy, capable of handling large lists with sub-second database operations.
- **Modern UI**: Designed with Tailwind CSS, Radix UI, Lucide icons, and sleek glassmorphism aesthetics for a premium user experience.
- **Data Isolation**: Strict scoping ensures users can only view and manage their own tasks.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) via Mongoose
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & shadcn/ui
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v20 or higher) and `npm` installed. You will also need a MongoDB database (e.g., MongoDB Atlas).

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
# Your MongoDB Connection String
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/todo-db"

# Better Auth Configuration (Generate a strong secret key)
BETTER_AUTH_SECRET="your-random-secure-secret-key"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Optional: Set to true to use a memory DB instead of MongoDB for Auth during development
AUTH_DEV_MEMORY_DB=false
```

### 4. Run the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Project Structure

- `app/`: Next.js App Router pages and API routes (`/api/todos`, `/api/auth`).
- `components/`: Reusable React components (UI elements, `navbar`, `footer`, `todo-list`).
- `lib/`: Core utilities, database connection logic (`db.ts`), authentication handlers (`auth.ts`), and Mongoose models (`models/todo.ts`).

## Developer

Developed by **Emmanuel L. Abao**.
