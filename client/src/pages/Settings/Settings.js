import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    defaultView: 'list',
    notifications: true,
    emailNotifications: false,
    autoSave: true,
    language: 'en',
    taskDefaultDueDays: 7
  });
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('dashboard_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboard_settings', JSON.stringify(settings));
  }, [settings]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleReset = () => {
    // Default settings
    const defaultSettings = {
      theme: 'light',
      defaultView: 'list',
      notifications: true,
      emailNotifications: false,
      autoSave: true,
      language: 'en',
      taskDefaultDueDays: 7
    };
    
    setSettings(defaultSettings);
  };
  
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-section">
        <h2>Appearance</h2>
        <div className="setting-item">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">Use System Setting</option>
          </select>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Dashboard Preferences</h2>
        <div className="setting-item">
          <label htmlFor="defaultView">Default View</label>
          <select
            id="defaultView"
            name="defaultView"
            value={settings.defaultView}
            onChange={handleChange}
          >
            <option value="list">List</option>
            <option value="kanban">Kanban</option>
            <option value="calendar">Calendar</option>
          </select>
        </div>
        
        <div className="setting-item">
          <label htmlFor="taskDefaultDueDays">Default Task Due Date (days from creation)</label>
          <input
            type="number"
            id="taskDefaultDueDays"
            name="taskDefaultDueDays"
            min="1"
            max="30"
            value={settings.taskDefaultDueDays}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="setting-item checkbox">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
          <label htmlFor="notifications">Enable Browser Notifications</label>
        </div>
        
        <div className="setting-item checkbox">
          <input
            type="checkbox"
            id="emailNotifications"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
          />
          <label htmlFor="emailNotifications">Enable Email Notifications</label>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>General</h2>
        <div className="setting-item checkbox">
          <input
            type="checkbox"
            id="autoSave"
            name="autoSave"
            checked={settings.autoSave}
            onChange={handleChange}
          />
          <label htmlFor="autoSave">Auto-save Task Changes</label>
        </div>
        
        <div className="setting-item">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
          </select>
        </div>
      </div>
      
      <div className="settings-actions">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;