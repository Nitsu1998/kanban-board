import React, { useContext } from "react";
import Column from "../Column/Column";
import "./board.css";
import NewTask from "../NewTask/NewTask";
import { context } from "../../context/BoardContext";

export default function Board() {
  const { board } = useContext(context);

  return (
    <div className="container">
      <NewTask />
      <div className="boardContainer">
        {board.map((item, index) => (
          <Column key={index} columnIndex={index} item={item} />
        ))}
      </div>
    </div>
  );
}
