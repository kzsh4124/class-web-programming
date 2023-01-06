import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Home from "./components/Home";
import ShowMemo from "./components/ShowMemo";
import type Memo from "./types/Memo";

import './App.scss'

function App() {
  const [memos, setMemos] = useState<Memo[] | []>([]);
  const [searchWord, setSearchWord] = useState("");
  const Navigate = useNavigate();

  return (
    <div className="App">
      <h1 onClick={() => Navigate("/")}>一時メモ帳システム</h1>
      <Routes>
        <Route path="memo">
          <Route
            path=":id"
            element={
              <ShowMemo
                memos={memos}
                setMemos={setMemos}
                searchWord={searchWord}
                setSearchWord={setSearchWord}
              />
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <Home
              memos={memos}
              setMemos={setMemos}
              searchWord={searchWord}
              setSearchWord={setSearchWord}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
