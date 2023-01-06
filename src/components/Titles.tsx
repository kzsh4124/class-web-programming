import { FC, useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import ky from "ky";
import type Memo from "../types/Memo";
import type StateMemo from "../types/StateMemo";
import { getMemos } from "../domains/getMemos";
import Title from "./Title";


const Titles: FC<StateMemo> = ({memos, setMemos, searchWord, setSearchWord}) => {
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
        <input type="submit" value="検索" />
      </form>
      {memos.map((memo) => (
        <Title {...memo} key={memo.id} />
      ))}
    </div>
  );
};

export default Titles;
