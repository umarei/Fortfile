# FortFile - A Secure File Sharing Platform
FortFile is a secure and robust file-sharing platform designed for efficient file management and sharing across users. Built with Node.js, Express, and MongoDB, it incorporates modern security practices, role-based access control (RBAC), and user-friendly features for a seamless experience.

# Features

## Secure Authentication
- Password hashing using `bcrypt`.
- Token-based session management with `JWT`.

## Role-Based Access Control (RBAC)
- Different user roles with specific permissions:
  - **Admin**
  - **Uploader**
  - **Viewer**

## Subscription-Based File-Sharing Limits
- **Free User**: File size limit up to 300 MB.
- **Basic User**: File size limit up to 1 GB.
- **Premium User**: No file size restrictions.

## File Management
- File upload, sharing, and download functionality.
- Role-based and permission-based file access.

## Error Handling
- Centralized error management for smoother operation.

## Enhanced Security
- Secure HTTP headers using `helmet`.
- Cross-Origin Resource Sharing (CORS) enabled for secure API interaction.
- Sensitive environment variables managed with `.env`.

## Scalability
- Modular architecture with separate controllers, models, and middlewares.
- Clean and organized folder structure for maintainability.



# Project Structure
The project follows a clean and modular folder structure:
```bash
backend/
├── config/                       # Configuration files
│   ├── db.js                     # MongoDB connection
│   ├── dotenv.js                 # Environment variable loader
├── controllers/                  # Business logic
│   ├── authController.js         # Authentication and user management
│   ├── fileController.js         # File upload, download, and sharing
│   ├── roleController.js         # Role and permission management
├── middlewares/                  # Request handlers
│   ├── authMiddleware.js         # JWT authentication middleware
│   ├── roleMiddleware.js         # Role-based access middleware
│   ├── errorHandler.js           # Global error handler
├── models/                       # Database schemas
│   ├── userModel.js              # User schema
│   ├── fileModel.js              # File metadata schema
│   ├── roleModel.js              # Role and permissions schema
├── routes/                       # API endpoints
│   ├── authRoutes.js             # Authentication routes
│   ├── fileRoutes.js             # File management routes
│   ├── roleRoutes.js             # Role management routes
├── uploads/                      # Directory for uploaded files
├── utils/                        # Utility functions
│   ├── logger.js                 # Logging utility
│   ├── token.js                  # JWT utilities
├── .env                          # Environment variables
├── package.json                  # Project metadata and dependencies
├── server.js                     # Entry point of the backend

```



# Getting Started

## 1. Prerequisites

Ensure you have the following installed:

- **Node.js**: v16.0.0 or higher  
- **MongoDB**: A running MongoDB instance  
- **npm**: v7.0.0 or higher  
## 2. Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/fortfile-backend.git
cd fortfile-backend
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/fortfile
JWT_SECRET=supersecretkey
UPLOAD_DIR=backend/uploads
ADMIN_EMAIL=admin@example.com
```

### 4. Start the Development Server
```bash
npm run dev
```
## 3. API Endpoints

### Authentication
| Endpoint                  | Method | Description                      | Access   |
|---------------------------|--------|----------------------------------|----------|
| `/api/auth/register`      | POST   | Register a new user              | Public   |
| `/api/auth/login`         | POST   | Login and get a JWT token        | Public   |
| `/api/auth/toggle-status` | PUT    | Activate or deactivate a user    | Admin    |

### File Management
| Endpoint                       | Method | Description                 | Access         |
|--------------------------------|--------|-----------------------------|----------------|
| `/api/files/upload`            | POST   | Upload a file               | Uploader       |
| `/api/files/list`              | GET    | List all accessible files   | Authenticated  |
| `/api/files/download/:fileId`  | GET    | Download a specific file    | Authenticated  |

### Roles
| Endpoint          | Method | Description           | Access   |
|-------------------|--------|-----------------------|----------|
| `/api/roles/add`  | POST   | Add a new role        | Admin    |
| `/api/roles/list` | GET    | List all available roles | Admin |

## 4. Key Features

### Security
- Password hashing with `bcrypt`.
- JWT-based authentication and session management.
- Role-based permissions for secure access.

### File Management
- Users can upload, share, and download files based on their roles.
- Free, Basic, and Premium users have distinct file size limits.

### RBAC System
- Admins can manage user statuses and roles.
- Role-based restrictions enforced using middlewares.

Thank you for reviewing this project. It's been an exciting learning experience and a step forward in mastering backend development concepts!
