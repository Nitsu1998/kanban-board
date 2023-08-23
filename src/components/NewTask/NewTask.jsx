import React, { useState } from "react";
import "./newTask.css";

export default function NewTask({ addNewTask }) {
  const [newTask, setNewTask] = useState("");

  const handleNewTask = () => {
    addNewTask(newTask);
    setNewTask("");
  };

  return (
    <div className="newTaskContainer">
      <input
        type="text"
        placeholder="New Task..."
        value={newTask}
        onChange={(evt) => setNewTask(evt.target.value)}
        className="inputTask"
      />
      <button onClick={handleNewTask} className="buttonNewTask">Add +</button>
    </div>
  );
}
