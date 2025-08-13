import React from 'react';
import AddTaskBox from '../components/Task/AddTaskBox';
import VoiceInputBox from '../components/AI/VoiceInput';

const Dashboard = ({ tasks, onAddTask }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-2xl font-bold text-center mb-6 text-gray-800">
        AI-Powered Todo App 🧠✅
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left - Add Task */}
        <div className="bg-white p-4 rounded shadow-md col-span-1">
          <h2 className="text-lg font-semibold mb-2">Add Task</h2>
          <AddTaskBox />
        </div>

        {/* Center - Voice Input */}
        <div className="bg-white p-4 rounded shadow-md col-span-1">
          <h2 className="text-lg font-semibold mb-2">Voice Input</h2>
          <VoiceInputBox onAddTask={onAddTask} />
        </div>

        {/* Right - AI Response */}
        <div className="bg-white p-4 rounded shadow-md col-span-1">
          <h2 className="text-lg font-semibold mb-2">AI Output</h2>
          {/* Optional: show last AI reply here */}
        </div>
      </div>

      {/* Full width below - Task List */}
      <div className="bg-white p-4 mt-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Your Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="border p-2 mb-2 rounded">
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
