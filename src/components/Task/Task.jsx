import React from "react";
import "./task.css";

export default function Task({
  taskIndex,
  columnIndex,
  task,
  dragging,
  handleDragStart,
  handleDragEnter,
  getStyles,
}) {
  return (
    <div
      draggable
      onDragStart={(evt) => handleDragStart(evt, { columnIndex, taskIndex })}
      onDragEnter={
        dragging
          ? () => {
              handleDragEnter({ columnIndex, taskIndex });
            }
          : null
      }
      onDragOver={(evt) => evt.preventDefault()}
      className={
        dragging ? getStyles({ columnIndex, taskIndex }) : "taskContainer"
      }
    >
      {task}
    </div>
  );
}
