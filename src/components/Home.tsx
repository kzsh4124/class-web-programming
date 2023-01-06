import React, { useState } from "react";
import Titles from "./Titles";
import Post from "./Post";
import type Memo from "../types/Memo";
import type StateMemo from "../types/StateMemo";

const Home: React.FC<StateMemo> = ({memos, setMemos, searchWord, setSearchWord}) => {


  return (
    <div>
      <Post
        memos={memos}
        setMemos={setMemos}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      <Titles
        memos={memos}
        setMemos={setMemos}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
    </div>
  );
};

export default Home;
