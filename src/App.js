import "./App.css";
import Board from "./components/Board/Board";
import BoardContextProvider from "./context/BoardContext";

function App() {
  return (
    <BoardContextProvider>
      <Board />
    </BoardContextProvider>
  );
}

export default App;
