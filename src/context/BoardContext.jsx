import { createContext, useEffect, useRef, useState } from "react";
export const context = createContext();
const { Provider } = context;

export default function BoardContextProvider({ children }) {
  const [board, setBoard] = useState([
    { column: "TO DO", tasks: ["Tarea 1", "Tarea 4"] },
    { column: "DOING", tasks: ["Tarea 3"] },
    { column: "DONE", tasks: ["Tarea 2"] },
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
      // Make a copy
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

  // When a component stop draggin
  const handleDragEnd = () => {
    setDragging(false);
    dragTask.current = null;
    dragTaskNode.current.removeEventListener("dragend", handleDragEnd);
    dragTaskNode.current = null;
  };

  // Style for the actual draggin component
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
      newBoard[0].tasks.unshift(newTask);
      localStorage.setItem("board", JSON.stringify(newBoard));
      setBoard(newBoard);
    }
  };

  const handleDeleteTask = (columnIndex, taskIndex) => {
    const newBoard = [...board];
    newBoard[columnIndex].tasks.splice(taskIndex, 1);
    localStorage.setItem("board", JSON.stringify(newBoard));
    setBoard(newBoard);
  };

  const boardContext = {
    board,
    dragging,
    handleDragStart,
    handleDragEnter,
    getStyles,
    addNewTask,
    handleDeleteTask,
  };

  return <Provider value={boardContext}>{children}</Provider>;
}
