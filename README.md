# 🧠 AI-Enhanced Task Management System

An intelligent and user-friendly task management platform that enhances productivity using AI. This application allows users to organize tasks, track time, collaborate with teams, and receive **AI-generated time estimations** based on historical patterns using **TensorFlow**.

---

## 🎯 Objective

To provide a smart, clean, and adaptive system for managing work and personal responsibilities, with features such as:
- AI-driven task prioritization and time estimation
- Real-time updates and drag-and-drop Kanban views
- Collaboration support
- Clean UI with multi-view support (Kanban, List, Calendar)

---

## 🛠️ Tech Stack

### Frontend (Client)
- **React.js** with Hooks
- **Tailwind CSS** – clean, responsive design
- **React DnD** – drag and drop features
- **Context API** – state management
- **React Router** – navigation & routing

### Backend (Server)
- **Node.js** with **Express**
- **MongoDB** – NoSQL database for tasks, users, projects
- **JWT** – Secure authentication
- **Socket.IO** – Real-time task updates
- **MVC Architecture** – Modular and scalable

### AI & Machine Learning
- **TensorFlow.js** – Predicts estimated task duration based on task attributes and historical data

---

## 🧠 TensorFlow Integration

This application integrates **TensorFlow.js** to provide smart **time predictions** when a user creates a new task.

---
## 🤖 AI Tools Used

To enhance development speed, code quality, and logic accuracy, I actively integrated various AI tools throughout the project:

- **Claude AI**  
  Acted as a coding companion. I gave prompts (crafted using ChatGPT) to Claude to generate **efficient, reusable code blocks**, especially for **TensorFlow integration** and **complex backend logic**.

- **GitHub Copilot (VS Code Extension)**  
  Seamlessly integrated within **Visual Studio Code**. Copilot helped me with **intelligent autocomplete suggestions**, writing boilerplate code, and speeding up repetitive logic during task creation and state management.

- **Trea IDE (with Claude Plugin)**  
  Used **Træ IDE** along with **Claude AI integration** to focus on AI-related functionalities and predictive logic. This made it easier to work on the **TensorFlow-based time estimation module** by testing and refining code inside the AI-powered IDE itself.

> 💡 These tools not only enhanced productivity but also supported **faster debugging**, **cleaner code**, and **creative feature ideation**.

---

### 🔍 How It Works:
- User provides:  
  - Task Name  
  - Task Description  
  - Deadline (Date & Time)  
  - Priority (Low/Medium/High)
- TensorFlow analyzes this input using a trained model based on previous tasks.
- The system **predicts estimated hours/minutes** required to complete the task.
- The predicted time is shown beside the task input for better planning.

> 🚧 Future scope includes training the model on user-specific data for personalized estimations.

---

## 📋 Features

- ✅ **Kanban View**  
  Drag-and-drop tasks between:  
  - To Do  
  - In Progress  
  - Done

- 📃 **List View**  
  View tasks in a detailed table format.

- 🧷 **Subtasks**  
  Add and manage subtasks inside main tasks:
  - Create
  - View
  - Update
  - Delete

- 📅 **Calendar & Timeline View**  
  *(Future Implementation)*  
  - View tasks by date and track deadlines visually.

- 🔒 **Secure Auth System**  
  - JWT-based auth
  - Route protection
  - Token-based sessions

- 🔍 **Smart Task Estimation**  
  - Powered by TensorFlow
  - Predicts task duration based on priority and description

- 🧠 **State Management**  
  - Auth & task data maintained using Context API


---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud - MongoDB Atlas)

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/22CB006/AI_Enhanced_Task_Management_System.git
cd ai-enhanced-task-manager

# Backend setup
cd server
npm install
npm start

# Frontend setup
cd ../client
npm install
npm start
```

## 🚀 Future Scope

-  Global collaboration via workspace sharing
-  Full Calendar and Timeline functionality
-  Dark mode and customizable themes
-  Email reminders & task status reports
-  Dashboard analytics for productivity

---
## 🙋‍♀️ About the Developer

**Arya Lakshmi M**  
🎓 B.Tech – Computer Science and Business Systems  
🏫 Sri Eshwar College of Engineering, Coimbatore 
