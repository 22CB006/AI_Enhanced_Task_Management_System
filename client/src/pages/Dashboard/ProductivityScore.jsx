import React from 'react'; 
import { FaTrophy, FaChartLine, FaCheckCircle, FaClipboardCheck } from 'react-icons/fa';
import { useTaskContext } from '../../../src/context/TaskContext';

const ProductivityScore = () => {
  const { tasks } = useTaskContext();
  
  // Calculate productivity metrics
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // AI productivity score with slight randomness
  const productivityScore = Math.min(100, Math.round(completionRate + Math.random() * 20));
  
  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Motivational message
  const getMessage = (score) => {
    if (score >= 80) return 'Excellent productivity! Keep up the great work.';
    if (score >= 60) return 'Good progress! Stay focused to improve further.';
    return 'You can do better! Try to complete more priority tasks.';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FaChartLine className="mr-2 text-blue-500" />
        AI Productivity Insights
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Productivity Score */}
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
          <div className={`text-3xl font-bold ${getScoreColor(productivityScore)}`}>
            {productivityScore}%
          </div>
          <div className="text-sm text-gray-500 mt-1">Productivity Score</div>
          <FaTrophy className={`mt-2 ${getScoreColor(productivityScore)}`} size={24} />
        </div>

        {/* Tasks Completed */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-500">{completedTasks}/{totalTasks}</div>
          <div className="text-sm text-gray-500">Tasks Completed</div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
        
        {/* High Priority Tasks */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-500">
            {tasks.filter(t => t.priority === 'high' && t.completed).length}/
            {tasks.filter(t => t.priority === 'high').length}
          </div>
          <div className="text-sm text-gray-500">High Priority Completed</div>
          <FaCheckCircle className="mt-2 text-purple-500" size={20} />
        </div>
        
        {/* AI Message */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-xl font-medium">{getMessage(productivityScore)}</div>
          <div className="text-sm text-gray-500 mt-1">AI Recommendation</div>
          <FaClipboardCheck className="mt-2 text-green-500" size={20} />
        </div>
      </div>
    </div>
  );
};

export default ProductivityScore;
