// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import VoiceInputBox from '../components/AI/VoiceInput';
import AIResponseBox from '../components/AI/AIResponseBox';

const colors = ['bg-pink-100', 'bg-purple-100', 'bg-indigo-100', 'bg-yellow-100', 'bg-green-100'];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [aiResponse, setAIResponse] = useState('');

  const handleAddTask = (task) => {
    setTasks((prev) => [task, ...prev]);
    setAIResponse(`Task added: ${task}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-pink-200 via-purple-200 to-indigo-200 animate-gradient-background -z-10"></div>

      <div id="root">
        {/* Header */}
        <header className="text-5xl font-extrabold mb-12 text-indigo-800 animate-pulse hover:scale-105 transition-transform duration-500">
          🧠 AI Voice Todo App
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Voice Input */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-pink-700 flex items-center gap-2">
              🎤 Speak Your Task
            </h2>
            <VoiceInputBox onAddTask={handleAddTask} />
          </div>

          {/* AI Response */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
              🤖 AI Response
            </h2>
            <AIResponseBox response={aiResponse} />
          </div>

          {/* Task List */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
              📝 Your Tasks
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`p-3 rounded-xl shadow-md cursor-pointer transform transition duration-300
                              hover:scale-105 hover:rotate-1 hover:shadow-2xl
                              ${colors[index % colors.length]} animate-fade-in`}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
