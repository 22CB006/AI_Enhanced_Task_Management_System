// src/pages/Dashboard/views/KanbanView.jsx
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanView = ({ tasks, onTaskClick, onAddSubtask, onToggleSubtask }) => {
  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  // Render a task card with all its details
  const renderTaskCard = (task, index) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow mb-4 p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onTaskClick(task)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-800">{task.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-600' : 
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
              'bg-green-100 text-green-600'
            }`}>
              {task.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          {task.dueDate && (
            <div className="text-xs text-gray-500 mb-2">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">
                Subtasks ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
              </p>
              <div className="space-y-1">
                {task.subtasks.map(subtask => (
                  <div key={subtask.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => onToggleSubtask(task.id, subtask.id)}
                      className="mr-2"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`text-xs ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
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
                  onAddSubtask(task.id, input.value.trim());
                  input.value = '';
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
        <span className="ml-2 text-gray-500 text-sm">({taskList.length})</span>
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
      {renderColumn('To Do', todoTasks, 'todo', 'bg-red-500')}
      {renderColumn('In Progress', inProgressTasks, 'in-progress', 'bg-yellow-500')}
      {renderColumn('Done', doneTasks, 'done', 'bg-green-500')}
    </div>
  );
};

export default KanbanView;