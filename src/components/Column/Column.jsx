import React from "react";
import Task from "../Task/Task";
import "./column.css";

export default function Column({
  columnIndex,
  item,
  dragging,
  handleDragStart,
  handleDragEnter,
  getStyles,
  handleDeleteTask,
}) {
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
          dragging={dragging}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          getStyles={getStyles}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
}
