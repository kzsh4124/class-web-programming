import React from "react";
import Memo from "./Memo";

interface StateMemo{
    setMemos: React.Dispatch<React.SetStateAction<[] | Memo[]>>;
    memos: [] | Memo[];
    searchWord: string;
    setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  }
  export default StateMemo;