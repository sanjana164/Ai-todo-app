import React, { useState } from 'react';
import AddTaskBox from '../components/Task/AddTaskBox';
import VoiceInputBox from '../components/AI/VoiceInput';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      {/* Header */}
      <header className="text-3xl font-bold text-center mb-8 text-indigo-800 drop-shadow-lg animate-bounce">
        AI-Powered Todo App 🧠✅
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Task */}
        <div className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">📝 Add Task</h2>
          <AddTaskBox />
        </div>

        {/* Voice Input */}
        <div className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-green-600">🎤 Voice Input</h2>
          <VoiceInputBox tasks={tasks} setTasks={setTasks} />
        </div>

        {/* AI Response */}
        <div className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">🤖 AI Response</h2>
          {/* Optional AI response box */}
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white p-5 mt-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">✅ Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic animate-pulse">
            No tasks yet. Speak or type to add tasks!
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task, i) => (
              <li
                key={i}
                className={`border p-3 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105
                  ${task.toLowerCase().includes('done') ? 'bg-green-100 border-green-400' : 'bg-purple-50 border-indigo-300'}`}
              >
                {task}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
