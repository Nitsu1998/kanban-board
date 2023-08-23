import React, { useContext, useState } from "react";
import "./newTask.css";
import { context } from "../../context/BoardContext";

export default function NewTask() {
  const { addNewTask } = useContext(context);
  const [newTask, setNewTask] = useState("");

  const handleNewTask = () => {
    addNewTask(newTask);
    setNewTask("");
  };

  return (
    <div className="newTaskContainer">
      <div className="newTask">
        <input
          type="text"
          placeholder="New Task..."
          value={newTask}
          onChange={(evt) => setNewTask(evt.target.value)}
          className="inputTask"
        />
        <button onClick={handleNewTask} className="buttonNewTask">
          Add +
        </button>
      </div>
    </div>
  );
}
