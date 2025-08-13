import { useState } from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard';

function App() {
  const [tasks, setTasks] = useState([]);

  // Called from VoiceInputBox
  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div>
      <Dashboard tasks={tasks} onAddTask={addTask} />
    </div>
  );
}

export default App;
