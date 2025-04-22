// utils/dateUtils.js

/**
 * Format date string to user-friendly format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  /**
   * Get relative time string (e.g. "2 days ago", "in 3 hours")
   * @param {string} dateString - ISO date string
   * @returns {string} Relative time string
   */
  export const getRelativeTimeString = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const now = new Date();
    const diffMs = date - now;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffDay > 0) {
      return `in ${diffDay} ${diffDay === 1 ? 'day' : 'days'}`;
    } else if (diffDay < 0) {
      return `${Math.abs(diffDay)} ${Math.abs(diffDay) === 1 ? 'day' : 'days'} ago`;
    } else if (diffHour > 0) {
      return `in ${diffHour} ${diffHour === 1 ? 'hour' : 'hours'}`;
    } else if (diffHour < 0) {
      return `${Math.abs(diffHour)} ${Math.abs(diffHour) === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffMin > 0) {
      return `in ${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'}`;
    } else if (diffMin < 0) {
      return `${Math.abs(diffMin)} ${Math.abs(diffMin) === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'just now';
    }
  };
  
  /**
   * Check if a date is in the past
   * @param {string} dateString - ISO date string
   * @returns {boolean} True if date is in the past
   */
  export const isDatePast = (dateString) => {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const now = new Date();
    
    // Set time to beginning of day for both dates
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    return date < now;
  };
  
  /**
   * Get date range for a calendar view
   * @param {Date} date - Center date for the range
   * @param {string} view - View type ('month', 'week', 'day')
   * @returns {Array} Array of date objects in the range
   */
  export const getDateRange = (date, view = 'month') => {
    const result = [];
    const currentDate = new Date(date);
    
    if (view === 'month') {
      // Set to first day of month
      currentDate.setDate(1);
      
      // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
      const firstDayOfWeek = currentDate.getDay();
      
      // Go back to the beginning of the week
      currentDate.setDate(currentDate.getDate() - firstDayOfWeek);
      
      // Generate 6 weeks (42 days) to ensure we cover the full month view
      for (let i = 0; i < 42; i++) {
        result.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (view === 'week') {
      // Set to first day of week (Sunday)
      const dayOfWeek = currentDate.getDay();
      currentDate.setDate(currentDate.getDate() - dayOfWeek);
      
      // Generate 7 days
      for (let i = 0; i < 7; i++) {
        result.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (view === 'day') {
      // Just return the current date
      result.push(new Date(currentDate));
    }
    
    return result;
  };
  
  /**
   * Format a date range for display
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date 
   * @returns {string} Formatted date range
   */
  export const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Same day
    if (start.toDateString() === end.toDateString()) {
      return formatDate(start);
    }
    
    // Same month and year
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.getDate()} - ${formatDate(end)}`;
    }
    
    // Different months or years
    return `${formatDate(start)} - ${formatDate(end)}`;
  };