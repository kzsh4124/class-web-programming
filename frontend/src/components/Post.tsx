import { useState, FC, SyntheticEvent, ChangeEvent } from "react";
import { getMemos } from "../domains/getMemos";
import { postMemo } from "../domains/postMemo";
import type StateMemo from "../types/StateMemo";
import type FormData from "../types/FormData";

const Post: FC<StateMemo> = ({ setMemos, searchWord }) => {
  const defaultFormData = {
    title: "",
    expireDate: "",
    content: "",
  };
  // 新規メモのstate
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  // form handling (submit)
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (formData.title == "") {
      window.alert("titleは必須です。");
      return;
    }

    //TODO: POSTの実装
    const post = async (formData: FormData) => {
      try {
        void await postMemo(formData);
        setFormData(defaultFormData);
      } catch (err) {
        console.error(err);
        throw new Error();
      }
    };
    void post(formData);

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

  return (
    <div>
      <h2>メモ追加</h2>
      <form onSubmit={handleSubmit}>
        <p><input
          type="text"
          name="title"
          placeholder="タイトルを入力"
          value={formData.title}
          onChange={handleChange}
        />
        <select
          name="expireDate"
          onChange={handleChange}
          value={formData.expireDate}
        >
          <option value="">無期限</option>
          <option value="0-0-1">1日</option>
          <option value="0-0-2">2日</option>
          <option value="0-0-3">3日</option>
          <option value="0-1-0">1週間</option>
          <option value="0-2-0">2週間</option>
          <option value="0-3-0">3週間</option>
          <option value="1-0-0">1ヶ月</option>
          <option value="2-0-0">2ヶ月</option>
          <option value="3-0-0">3ヶ月</option>
          <option value="6-0-0">6ヶ月</option>
        </select>
        </p>
        <textarea
          rows={10}
          cols={50}
          name="content"
          placeholder="内容を入力"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <input type="submit" value="送信" />
      </form>
    </div>
  );
};
export default Post;
