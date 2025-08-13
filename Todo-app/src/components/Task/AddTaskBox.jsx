// src/components/AddTaskBox.jsx
import React, { useState } from 'react';

const AddTaskBox = () => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (!task.trim()) return;
    console.log('Task to add:', task); // Later, replace with API call
    setTask('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        onClick={handleAdd}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTaskBox;
