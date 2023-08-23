import React, { useContext } from "react";
import "./task.css";
import { context } from "../../context/BoardContext";

export default function Task({ taskIndex, columnIndex, task }) {
  const {
    dragging,
    handleDragStart,
    handleDragEnter,
    getStyles,
    handleDeleteTask,
  } = useContext(context);

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
      <p
        onClick={() => handleDeleteTask(columnIndex, taskIndex)}
        className="trashIcon"
      >
        X
      </p>
      <p>{task}</p>
    </div>
  );
}
