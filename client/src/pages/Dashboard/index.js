// client\src\pages\Dashboard\index.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "../../pages/Tasks/TaskModal";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("kanban");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Set axios default headers
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  }

  // API base URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    // Load tasks and projects from API
    const fetchData = async () => {
      try {
        const [tasksRes, projectsRes] = await Promise.all([
          axios
            .get(`${API_URL}/tasks`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => res.data),
          axios.get(`${API_URL}/projects`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);

        setTasks(tasksRes.data || []); // Add fallback empty array
        setProjects(projectsRes.data || []); // Add fallback empty array
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        // Initialize with empty arrays in case of error
        setTasks([]);
        setProjects([]);
      }
    };

    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [token, navigate, API_URL]);

  const addTask = async (newTask) => {
    try {
      const res = await axios.post(`${API_URL}/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const res = await axios.put(`${API_URL}/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleOpenTaskModal = (task = null) => {
    setCurrentTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Drop outside a droppable area
    if (!destination) return;

    // Drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task being dragged
    const taskToMove = tasks.find((task) => task._id === draggableId);
    if (!taskToMove) return; // Guard against undefined task

    // Update the status based on the destination column
    const updatedTask = {
      ...taskToMove,
      status: destination.droppableId,
    };

    // Update in the UI immediately for better UX
    const updatedTasks = tasks.filter((task) => task._id !== draggableId);
    updatedTasks.splice(destination.index, 0, updatedTask);
    setTasks(updatedTasks);

    // Update in the database
    try {
      await axios.put(`${API_URL}/tasks/${draggableId}`, {
        status: destination.droppableId,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      // Revert to original state on error
      setTasks([...tasks]);
    }
  };

  const handleAddSubtask = async (taskId, subtaskTitle) => {
    try {
      const res = await axios.post(`${API_URL}/tasks/${taskId}/subtask`, {
        title: subtaskTitle,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (error) {
      console.error("Error adding subtask:", error);
    }
  };

  const handleToggleSubtask = async (taskId, subtaskId, e) => {
    // Stop propagation to prevent task modal from opening
    if (e) {
      e.stopPropagation();
    }

    // Find the task and subtask
    const task = tasks.find((t) => t._id === taskId);
    if (!task || !task.subtasks) return; // Guard against undefined
    
    const subtask = task.subtasks.find((s) => s._id === subtaskId);
    if (!subtask) return; // Guard against undefined

    // Update UI immediately for better UX
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        const updatedSubtasks = task.subtasks.map((subtask) => {
          if (subtask._id === subtaskId) {
            return { ...subtask, completed: !subtask.completed };
          }
          return subtask;
        });
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Update in database
    try {
      await axios.put(`${API_URL}/tasks/${taskId}/subtask/${subtaskId}`, {
        completed: !subtask.completed,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error toggling subtask:", error);
      // Revert to original state on error
      setTasks([...tasks]);
    }
  };

  // KanbanView component with defensive checks
  const KanbanView = () => {
    // Ensure tasks is not undefined before filtering
    if (!tasks) {
      return <div>No tasks available.</div>;
    }

    // Filter tasks by status with guards
    const todoTasks = tasks.filter((task) => task.status === "todo");
    const inProgressTasks = tasks.filter(
      (task) => task.status === "in-progress"
    );
    const doneTasks = tasks.filter((task) => task.status === "done");

    // Render a task card with all its details
const renderTaskCard = (task, index) => (
  <Draggable key={task._id} draggableId={task._id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-white rounded-lg shadow mb-4 p-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleOpenTaskModal(task)}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-800">{task.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              task.priority === "high"
                ? "bg-red-100 text-red-600"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {task.priority}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
        <div className="flex justify-between items-center">
          {task.dueDate && (
            <div className="text-xs text-gray-500 mb-2">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium mb-2">
            Estimated time: {Math.floor(Math.random() * 8) + 1} hrs
          </div>
        </div>

        {task.project && (
          <div className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded inline-block mb-2">
            {projects.find((p) => p._id === task.project)?.name ||
              "Project"}
          </div>
        )}

        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">
              Subtasks ({task.subtasks.filter((st) => st.completed).length}/
              {task.subtasks.length})
            </p>
            <div className="space-y-1">
              {task.subtasks.map((subtask) => (
                <div key={subtask._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={(e) =>
                      handleToggleSubtask(task._id, subtask._id, e)
                    }
                    className="mr-2"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span
                    className={`text-xs ${
                      subtask.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const input = e.target.elements.subtask;
              if (input.value.trim()) {
                handleAddSubtask(task._id, input.value.trim());
                input.value = "";
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              name="subtask"
              placeholder="Add subtask..."
              className="w-full text-sm px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </form>
        </div>
      </div>
    )}
  </Draggable>
);

    // Create a column for each status
    const renderColumn = (title, taskList, status, color) => (
      <div className="flex-1 mx-2 min-w-[300px]">
        <div className="mb-4 flex items-center">
          <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
          <h2 className="font-semibold text-lg">{title}</h2>
          <span className="ml-2 text-gray-500 text-sm">
            ({taskList.length})
          </span>
        </div>

        <Droppable droppableId={status}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-gray-50 rounded-lg p-3 min-h-[500px]"
            >
              {taskList.map((task, index) => renderTaskCard(task, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );

    return (
      <div className="flex overflow-x-auto pb-4">
        {renderColumn("To Do", todoTasks, "todo", "bg-red-500")}
        {renderColumn(
          "In Progress",
          inProgressTasks,
          "in-progress",
          "bg-yellow-500"
        )}
        {renderColumn("Done", doneTasks, "done", "bg-green-500")}
      </div>
    );
  };

  // Simple List View implementation
  const ListView = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3">Title</th>
            <th className="text-left py-2 px-3">Status</th>
            <th className="text-left py-2 px-3">Priority</th>
            <th className="text-left py-2 px-3">Due Date</th>
            <th className="text-left py-2 px-3">Project</th>
            <th className="text-left py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.map((task) => (
            <tr key={task._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-3">{task.title}</td>
              <td className="py-3 px-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    task.status === "todo"
                      ? "bg-gray-100"
                      : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.status === "todo"
                    ? "To Do"
                    : task.status === "in-progress"
                    ? "In Progress"
                    : "Done"}
                </span>
              </td>
              <td className="py-3 px-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-3 px-3">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : ""}
              </td>
              <td className="py-3 px-3">
                {task.project
                  ? projects.find((p) => p._id === task.project)?.name || ""
                  : ""}
              </td>
              <td className="py-3 px-3">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handleOpenTaskModal(task)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Other views remain the same...
  const CalendarView = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
      <p>Calendar view is coming soon...</p>
    </div>
  );

  const TimelineView = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Timeline View</h2>
      <p>Timeline view is coming soon...</p>
    </div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      case "list":
        return <ListView />;
      case "calendar":
        return <CalendarView />;
      case "timeline":
        return <TimelineView />;
      case "kanban":
      default:
        return (
          <DragDropContext onDragEnd={handleDragEnd}>
            <KanbanView />
          </DragDropContext>
        );
    }
  };

  if (!token) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Task Manager</h2>
          <p className="text-sm text-gray-600">
            Welcome, {user.name || "User"}
          </p>
        </div>
        <nav className="mt-6">
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 font-medium"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/tasks")}
          >
            Tasks
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/calendar")}
          >
            Calendar
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/settings")}
          >
            Settings
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <div className="mt-2 flex space-x-4">
                <button
                  className={`px-3 py-1 rounded ${
                    activeView === "kanban"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveView("kanban")}
                >
                  Kanban
                </button>
                <button
                  className={`px-3 py-1 rounded ${
                    activeView === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveView("list")}
                >
                  List
                </button>
                <button
                  className={`px-3 py-1 rounded ${
                    activeView === "calendar"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveView("calendar")}
                >
                  Calendar
                </button>
                <button
                  className={`px-3 py-1 rounded ${
                    activeView === "timeline"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveView("timeline")}
                >
                  Timeline
                </button>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleOpenTaskModal()}
            >
              Add Task
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading tasks...</p>
            </div>
          ) : (
            renderActiveView()
          )}
        </main>
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <TaskModal
          task={currentTask}
          projects={projects}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={(task) => {
            if (task._id) {
              updateTask(task._id, task);
            } else {
              addTask(task);
            }
            setIsTaskModalOpen(false);
          }}
          onDelete={(id) => {
            deleteTask(id);
            setIsTaskModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;