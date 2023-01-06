import { useState, useEffect, FC, SyntheticEvent, ChangeEvent, MouseEvent } from "react";
import type Memo from "../types/Memo";
import type StateMemo from "../types/StateMemo";
import { updateMemo } from "../domains/updateMemo";
import { getMemos } from "../domains/getMemos";
import { deleteMemo } from "../domains/deleteMemo";
import { useLocation, useNavigate } from "react-router-dom";

interface State{
  id: string;
}

const getMemoById = (memos:Memo[], id:string) =>{
  const res = memos.filter((memo)=>(memo.id === id));
  return res[0]
}

const ShowMemo: FC<StateMemo> = ({
  memos,
  setMemos,
  searchWord,
  setSearchWord,

}) => {
  // 遷移でid を受け取ってmemosから抽出
  const location = useLocation();
  const state = location.state as State;
  const memo = getMemoById(memos, state.id);

  const [formData, setFormData] = useState<Memo>(memo);
  const [expireCode, setExpireCode] = useState("");
  const Navigate = useNavigate();

  // form handling (submit)
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (formData.title == "") {
      window.alert("titleは必須です。");
      return;
    }

    //updateの実装
    const update = async (formData: Memo) => {
      console.log(formData);
      try {
        void (await updateMemo(formData));
        window.alert("メモを更新しました");
      } catch (err) {
        console.error(err);
        throw new Error();
      }
    };
    void update({...formData, expireDate:expireCode});

    //getしてmemosを更新
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
    setFormData(getMemoById(memos, state.id));
    Navigate("/");
  };

  // form handling (dom control)
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = event.target;
    const value =
      event.target.type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : event.target.value;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) =>{
    const value = event.target.value;
    setExpireCode(value);
  }

  const handleDelete = (
    event: MouseEvent<HTMLElement>
  ) =>{
    event.preventDefault();
    event.stopPropagation();
    
    const del = async(id:string) =>{
      try{
        if (!window.confirm("本当に削除しますか？")) return;

      void await deleteMemo(id);
      window.alert("メモを削除しました。")
      Navigate("/");
      } catch(err){
        console.error(err);
        throw new Error();
      }
    }
    del(formData.id);
  }
  // TODO: returnを書く、無期限延長は'inf'を返す、Routingする
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title" > タイトル: 
      <input type="text" name="title" id="title" placeholder="タイトル" value={formData.title} onChange={handleChange} />
      </label>
      <input type="submit" value="更新" />
      <p>有効期限:{formData.expireDate ? `${formData.expireDate}まで`: "なし"}
      <select name="expireDate" value={expireCode} onChange={handleSelectChange}>
      <option value="">{"変更する"}</option>
      <option value="inf">無期限</option>
      <option value="0-0-1">現在を基準に1日</option>
      <option value="0-0-2">現在を基準に2日</option>
      <option value="0-0-3">現在を基準に3日</option>
      <option value="0-1-0">現在を基準に1週間</option>
      <option value="0-2-0">現在を基準に2週間</option>
      <option value="0-3-0">現在を基準に3週間</option>
      <option value="1-0-0">現在を基準に1ヶ月</option>
      <option value="2-0-0">現在を基準に2ヶ月</option>
      <option value="3-0-0">現在を基準に3ヶ月</option>
      <option value="6-0-0">現在を基準に6ヶ月</option>
      </select>
      </p>
      <br/>
      <textarea name="content" value={formData.content} cols={100} rows={30} onChange={handleChange}></textarea>
      
    </form>
    <button onClick={handleDelete}>このメモを削除</button>
    </div>
  );
};
export default ShowMemo;
