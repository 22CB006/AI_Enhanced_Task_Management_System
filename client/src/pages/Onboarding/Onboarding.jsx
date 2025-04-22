import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Clock, Users, BarChart2 } from 'lucide-react';

export default function Onboarding() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: <Check className="h-5 w-5" />, text: "Smart task verification with proof" },
    { icon: <Clock className="h-5 w-5" />, text: "Intelligent scheduling & reminders" },
    { icon: <Users className="h-5 w-5" />, text: "Role-based access control" },
    { icon: <BarChart2 className="h-5 w-5" />, text: "AI-driven performance insights" }
  ];

  const steps = [
    { number: 1, title: "Create & assign", description: "Design task workflows and assign to your team members" },
    { number: 2, title: "Track & verify", description: "Monitor progress with photo/video/document verification" },
    { number: 3, title: "Analyze & improve", description: "Get AI-powered insights to optimize operations" },
    { number: 4, title: "Grow confidently", description: "Scale your business with automated task management" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className={`w-full lg:w-1/2 space-y-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="space-y-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                <span className="mr-1 h-2 w-2 rounded-full bg-indigo-400"></span>
                <span>Powered by AI</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Organize Smarter.<br />Work Faster.<br /><span className="text-indigo-600">Live Better.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              An AI-enhanced task manager that learns from you, adapts to your workflow, and helps you focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => window.location.href = '/register'}
                className="group px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => window.location.href = '/login'}
                className="px-6 py-3 bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 rounded-lg font-medium transition-all duration-300">
                Login
              </button>
            </div>
            <div className="pt-8">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-gray-${200 + i * 100}`}></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Join <span className="font-semibold">10,000+</span> teams transforming their operations
                </p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative bg-white p-4 rounded-xl shadow-xl">
              <div className="absolute -top-2 left-4 flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mt-4 bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-semibold text-lg">Your AI Workspace</h3>
                    <p className="text-sm text-gray-500">Personalized for you</p>
                  </div>
                  <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">AI</div>
                </div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm mb-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`h-4 w-4 rounded-full ${['bg-green-400', 'bg-yellow-400', 'bg-blue-400'][i]}`}></div>
                      <span className="ml-3 text-gray-800">Example Task {i + 1}</span>
                    </div>
                    <div className="text-xs text-gray-500">Priority {i + 1}</div>
                  </div>
                ))}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mt-6">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">AI</div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">
                        I noticed you have 3 high-priority tasks due today. Would you like me to recommend a schedule?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Running a business means juggling 1000 tasks at once</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              You can work around the clock and still have tasks <span className="font-bold text-indigo-600">Unmanaged. Unsupervised. Unfinished!</span>
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everyday task management simplified for all!</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Delegate Tasks. Verify Completion. Improve Efficiency.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="h-12 w-12 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                  {step.number}
                </div>
                <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}