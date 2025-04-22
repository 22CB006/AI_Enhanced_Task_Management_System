/**
 * Utility functions for AI features in the task management system.
 * In a real application, these might call external AI APIs.
 * For this demo, we'll use dummy implementations.
 */

/**
 * Analyze task to suggest priority level
 * @param {Object} task - The task to analyze
 * @return {string} - Suggested priority (low, medium, high)
 */
export const suggestTaskPriority = (task) => {
    // In a real app, this would use NLP to analyze task title and description
    // For the demo, we'll use some simple heuristics
    
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'critical', 'crucial'];
    const lowPriorityKeywords = ['whenever', 'eventually', 'someday', 'if time'];
    
    const taskText = `${task.title} ${task.description}`.toLowerCase();
    
    if (urgentKeywords.some(keyword => taskText.includes(keyword))) {
      return 'high';
    }
    
    if (lowPriorityKeywords.some(keyword => taskText.includes(keyword))) {
      return 'low';
    }
    
    // Look for deadline indicators
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilDue <= 1) {
        return 'high';
      } else if (daysUntilDue <= 3) {
        return 'medium';
      }
    }
    
    return 'medium'; // Default priority
  };
  
  /**
   * Suggest time estimate for a task
   * @param {Object} task - The task to analyze
   * @return {number} - Estimated time in minutes
   */
  export const suggestTimeEstimate = (task) => {
    // In a real app, this would use ML to predict based on similar tasks
    // For now, we'll use simple heuristics
    
    const complexityKeywords = ['complex', 'difficult', 'challenging', 'research', 'analyze', 'develop'];
    const simpleTasks = ['email', 'call', 'review', 'check', 'read', 'reply'];
    
    const taskText = `${task.title} ${task.description}`.toLowerCase();
    
    // Base time for various types of tasks
    if (simpleTasks.some(keyword => taskText.includes(keyword))) {
      return 15; // 15 minutes for simple tasks
    }
    
    if (complexityKeywords.some(keyword => taskText.includes(keyword))) {
      return 60; // 1 hour for complex tasks
    }
    
    // Look at description length to estimate complexity
    if (task.description && task.description.length > 200) {
      return 45; // Longer descriptions might indicate more complex tasks
    }
    
    return 30; // Default to 30 minutes
  };
  
  /**
   * Calculate productivity score based on task completion history
   * @param {Array} tasks - List of all tasks
   * @param {Object} user - User information
   * @return {Object} - Productivity metrics and suggestions
   */
  export const calculateProductivityMetrics = (tasks, user) => {
    const completedTasks = tasks.filter(task => task.completed);
    const totalTasks = tasks.length;
    
    // Basic completion rate
    const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;
    
    // High priority completion rate
    const highPriorityTasks = tasks.filter(task => task.priority === 'high');
    const completedHighPriorityTasks = highPriorityTasks.filter(task => task.completed);
    const highPriorityCompletionRate = highPriorityTasks.length > 0 ? 
      (completedHighPriorityTasks.length / highPriorityTasks.length) * 100 : 0;
    
    // Calculate recent productivity trend (last 7 days)
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Count tasks completed in the last week
    const recentlyCompletedTasks = completedTasks.filter(task => {
      const completedDate = new Date(task.completedAt);
      return completedDate >= oneWeekAgo;
    });
    
    // Overall productivity score (weighted calculation)
    let productivityScore = completionRate * 0.4
      + highPriorityCompletionRate * 0.4
      + Math.min(100, recentlyCompletedTasks.length * 10) * 0.2;
    
    // Round to nearest whole number
    productivityScore = Math.round(productivityScore);
    
    // Generate suggestions based on productivity
    let suggestions = [];
    
    if (highPriorityCompletionRate < 70) {
      suggestions.push('Focus on completing high-priority tasks first');
    }
    
    if (recentlyCompletedTasks.length < 3) {
      suggestions.push('Try to complete at least 3 tasks per week to maintain momentum');
    }
    
    if (productivityScore < 60) {
      suggestions.push('Consider breaking down large tasks into smaller, more manageable subtasks');
    }
    
    return {
      score: productivityScore,
      completionRate,
      highPriorityCompletionRate,
      recentlyCompletedCount: recentlyCompletedTasks.length,
      suggestions
    };
  };
  
  /**
   * Suggest task tags based on content
   * @param {Object} task - The task to analyze
   * @return {Array} - Suggested tags
   */
  export const suggestTaskTags = (task) => {
    // In a real app, this would use NLP to extract key concepts
    const categoryKeywords = {
      'design': ['design', 'ui', 'ux', 'mockup', 'wireframe', 'prototype'],
      'development': ['code', 'programming', 'develop', 'implementation', 'debug', 'test'],
      'meeting': ['meeting', 'call', 'discussion', 'conference', 'talk', 'chat'],
      'research': ['research', 'analyze', 'investigate', 'explore', 'study'],
      'planning': ['plan', 'strategy', 'roadmap', 'outline', 'schedule'],
      'content': ['write', 'content', 'blog', 'article', 'post', 'document']
    };
    
    const taskText = `${task.title} ${task.description}`.toLowerCase();
    const suggestedTags = [];
    
    // Check for category keywords
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => taskText.includes(keyword))) {
        suggestedTags.push(category);
      }
    }
    
    return suggestedTags;
  };