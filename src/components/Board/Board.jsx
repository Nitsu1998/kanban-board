import React, { useEffect, useRef, useState } from "react";
import Column from "../Column/Column";
import "./board.css";
import NewTask from "../NewTask/NewTask";

export default function Board() {
  const [board, setBoard] = useState([
    { column: "To Do", tasks: ["Comer", "Tomar", "Dormir"] },
    { column: "Doing", tasks: ["Jugar"] },
    { column: "Done", tasks: [] },
  ]);
  const [dragging, setDragging] = useState(false);
  const dragTask = useRef();
  const dragTaskNode = useRef();

  // Check the local storage if there is a board with tasks
  useEffect(() => {
    if (localStorage.getItem("board")) {
      setBoard(JSON.parse(localStorage.getItem("board")));
    }
  }, []);

  // When a component start dragging
  const handleDragStart = (evt, task) => {
    dragTaskNode.current = evt.target;
    dragTaskNode.current.addEventListener("dragend", handleDragEnd);
    dragTask.current = task;
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  // When a component dragging enter an other component
  const handleDragEnter = (targetTask) => {
    if (dragTaskNode.current) {
      const newBoard = [...board];
      const sourceColumnIndex = dragTask.current.columnIndex;
      const targetColumnIndex = targetTask.columnIndex;

      const sourceColumn = newBoard[sourceColumnIndex];
      const targetColumn = newBoard[targetColumnIndex];

      // Remove the task from the source column
      const task = sourceColumn.tasks.splice(dragTask.current.taskIndex, 1)[0];

      // Add the task to the target column
      targetColumn.tasks.splice(targetTask.taskIndex, 0, task);
      dragTask.current = targetTask;
      localStorage.setItem("board", JSON.stringify(newBoard));
      setBoard(newBoard);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragTask.current = null;
    dragTaskNode.current.removeEventListener("dragend", handleDragEnd);
    dragTaskNode.current = null;
  };

  const getStyles = (task) => {
    if (
      dragTask.current.columnIndex === task.columnIndex &&
      dragTask.current.taskIndex === task.taskIndex
    ) {
      return "taskContainer current";
    }
    return "taskContainer";
  };

  const addNewTask = (newTask) => {
    if (newTask) {
      const newBoard = [...board];
      newBoard[0].tasks.push(newTask);
      localStorage.setItem("board", JSON.stringify(newBoard));
      setBoard(newBoard);
    }
  };

  return (
    <div className="container">
      <NewTask addNewTask={addNewTask} />
      <div className="boardContainer">
        {board.map((item, index) => (
          <Column
            key={index}
            columnIndex={index}
            item={item}
            dragging={dragging}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            getStyles={getStyles}
          />
        ))}
      </div>
    </div>
  );
}
