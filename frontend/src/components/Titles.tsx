import { FC, useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import ky from "ky";
import type Memo from "../types/Memo";
import { getMemos } from "../domains/getMemos";
import Title from "./Title";

const Titles: FC = () => {
  const [memos, setMemos] = useState<Memo[] | []>([]);
  //console.log(memos);
  // APIを叩く
  useEffect(() => {
    console.log("here is useEffect");
    const load = async () => {
      try {
        const data = await getMemos();
        //console.log("data: ",data);
        setMemos(data);
      } catch (err) {
        console.error(err);
        throw new Error();
      }
    };
    void load();
  }, []);

  // 検索ワードのロジック
  const [searchWord, setSearchWord] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const search = async () => {
      try {
        const data = await getMemos(searchWord);
        //console.log("data: ",data);
        setMemos(data);
      } catch (err) {
        console.error(err);
        throw new Error();
      }
    };
    void search();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    //const {name} = event.target;
    const value = event.target.value;
    setSearchWord(value);
  }

  return (
    <div>
      <h2>メモ一覧</h2>
      <form onSubmit={handleSubmit}>
        <input name="q" type="text" value={searchWord} onChange={handleChange}/>
        <input type="submit"/>
      </form>
      {memos.map((memo) => (
        <Title {...memo} />
      ))}
    </div>
  );
};

export default Titles;
