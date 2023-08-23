import React, { useContext } from "react";
import Task from "../Task/Task";
import "./column.css";
import { context } from "../../context/BoardContext";

export default function Column({ columnIndex, item }) {
  const { dragging, handleDragEnter } = useContext(context);

  return (
    <div
      className="columnContainer"
      onDragEnter={
        dragging && !item.tasks.length
          ? () => handleDragEnter({ columnIndex, taskIndex: 0 })
          : null
      }
    >
      <h2 className="columnTitle">{item.column}</h2>
      {item.tasks.map((task, index) => (
        <Task
          key={index}
          taskIndex={index}
          columnIndex={columnIndex}
          task={task}
        />
      ))}
    </div>
  );
}
