export const dummyTasks = [
    {
      id: 'task-1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups for the new product landing page',
      status: 'in-progress',
      priority: 'high',
      projectId: 'project-2',
      timeEstimate: 180, // minutes
      dueDate: '2025-04-25T23:59:59Z',
      tags: ['design', 'marketing'],
      assignee: 'user-1',
      subtasks: [
        { id: 'subtask-1-1', title: 'Research competitor sites', completed: true },
        { id: 'subtask-1-2', title: 'Create wireframes', completed: true },
        { id: 'subtask-1-3', title: 'Design mockups', completed: false },
      ]
    },
    {
      id: 'task-2',
      title: 'Implement authentication system',
      description: 'Build user login, registration, and password reset functionality',
      status: 'todo',
      priority: 'high',
      projectId: 'project-2',
      timeEstimate: 240,
      dueDate: '2025-04-28T23:59:59Z',
      tags: ['development', 'security'],
      assignee: 'user-2',
      subtasks: [
        { id: 'subtask-2-1', title: 'Set up authentication API', completed: false },
        { id: 'subtask-2-2', title: 'Create login form', completed: false },
        { id: 'subtask-2-3', title: 'Implement password reset', completed: false },
      ]
    },
    {
      id: 'task-3',
      title: 'Prepare marketing content',
      description: 'Write and review copy for social media campaign',
      status: 'completed',
      priority: 'medium',
      projectId: 'project-1',
      timeEstimate: 120,
      dueDate: '2025-04-22T23:59:59Z',
      tags: ['marketing', 'content'],
      assignee: 'user-3',
      subtasks: [
        { id: 'subtask-3-1', title: 'Draft initial copy', completed: true },
        { id: 'subtask-3-2', title: 'Get team feedback', completed: true },
        { id: 'subtask-3-3', title: 'Finalize content', completed: true },
      ]
    },
    {
      id: 'task-4',
      title: 'Finalize product pricing',
      description: 'Review competitor pricing and determine optimal price points',
      status: 'todo',
      priority: 'high',
      projectId: 'project-3',
      timeEstimate: 90,
      dueDate: '2025-04-23T23:59:59Z',
      tags: ['business', 'strategy'],
      assignee: 'user-1',
      subtasks: [
        { id: 'subtask-4-1', title: 'Gather competitor data', completed: false },
        { id: 'subtask-4-2', title: 'Analyze profit margins', completed: false },
      ]
    },
    {
      id: 'task-5',
      title: 'Update API documentation',
      description: 'Document new endpoints and update existing documentation',
      status: 'in-progress',
      priority: 'low',
      projectId: 'project-2',
      timeEstimate: 120,
      dueDate: '2025-04-27T23:59:59Z',
      tags: ['development', 'documentation'],
      assignee: 'user-2',
      subtasks: [
        { id: 'subtask-5-1', title: 'Document new endpoints', completed: true },
        { id: 'subtask-5-2', title: 'Update existing docs', completed: false },
        { id: 'subtask-5-3', title: 'Review with team', completed: false },
      ]
    },
    {
      id: 'task-6',
      title: 'User testing for new features',
      description: 'Conduct user testing sessions to gather feedback on new features',
      status: 'todo',
      priority: 'medium',
      projectId: 'project-1',
      timeEstimate: 180,
      dueDate: '2025-04-30T23:59:59Z',
      tags: ['testing', 'user-experience'],
      assignee: 'user-3',
      subtasks: [
        { id: 'subtask-6-1', title: 'Recruit test participants', completed: false },
        { id: 'subtask-6-2', title: 'Prepare testing scenarios', completed: false },
        { id: 'subtask-6-3', title: 'Conduct testing sessions', completed: false },
        { id: 'subtask-6-4', title: 'Analyze results', completed: false },
      ]
    }
  ];
  
  export const dummyProjects = [
    {
      id: 'project-1',
      name: 'Marketing Campaign',
      color: 'green',
      description: 'Q2 2025 Product Marketing Campaign',
      progress: 65,
    },
    {
      id: 'project-2',
      name: 'Website Redesign',
      color: 'purple',
      description: 'Redesign company website for better user experience',
      progress: 30,
    },
    {
      id: 'project-3',
      name: 'Product Launch',
      color: 'yellow',
      description: 'Launch new product line by end of Q2',
      progress: 10,
    }
  ];
  
  export const dummyUsers = [
    {
      id: 'user-1',
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=12',
      email: 'alex@example.com',
      role: 'Product Manager'
    },
    {
      id: 'user-2',
      name: 'Sam Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=67',
      email: 'sam@example.com',
      role: 'Developer'
    },
    {
      id: 'user-3',
      name: 'Taylor Kim',
      avatar: 'https://i.pravatar.cc/150?img=44',
      email: 'taylor@example.com',
      role: 'Marketing Specialist'
    }
  ];