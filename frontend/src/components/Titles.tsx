import { FC, useState, useEffect } from "react";
import ky from "ky";
import type Memo from "../types/Memo";
import { getMemos } from "../domains/getMemos";
import Title from "./Title";

const Titles: FC = () => {
  const [memos, setMemos] = useState<Memo[] | []>([]);
  const [searchWord, setSearchWord] = useState("");
  // APIを叩く
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMemos();
        setMemos(data);
      } catch (err) {
        console.error(err);
        throw new Error();
      }
      load();
    };
  }, []);
  return (
    <div>
      <h2>メモ一覧</h2>
      <form></form>
      {memos.map((memo)=>(<Title {...memo} />))}
    </div>
  );
};

export default Titles;
