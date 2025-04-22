import React from 'react';

const TaskOverviewCard = ({ title, count, icon, color, subtext }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 h-full" style={{ borderLeftColor: color }}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-3xl font-bold mt-2">{count}</p>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-full bg-opacity-20`} style={{ backgroundColor: `${color}30` }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

// Overview cards container component
const TaskOverviewCards = () => {
  // These would come from your context or API
  const overviewData = [
    {
      title: 'Tasks Due Today',
      count: 5,
      subtext: '2 high priority',
      color: '#FF6B6B',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Current Projects',
      count: 3,
      subtext: '1 due this week',
      color: '#4ECDC4',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    },
    {
      title: 'Productivity Score',
      count: '85%',
      subtext: '5% increase from last week',
      color: '#FFD166',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'AI Suggestions',
      count: 3,
      subtext: 'Click to view recommendations',
      color: '#6A0572',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewData.map((card, index) => (
        <TaskOverviewCard
          key={index}
          title={card.title}
          count={card.count}
          subtext={card.subtext}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
};

export default TaskOverviewCards;