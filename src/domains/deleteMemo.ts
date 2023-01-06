import ky from "ky";
import type FormData from "../types/FormData";

interface Res {
  status: string;
}

export const deleteMemo = async (id: string) => {
  console.log("Here is deleteMemos");
  const postData = new URLSearchParams();
  postData.set('id', id);
  const res: Res = await ky
    .post("https://cgi.u.tsukuba.ac.jp/~s2111609/wp/final/api/delete.rb", {
      body: postData,
    })
    .json();
  if (res.status !== "ok") {
    throw new Error("API Error");
  }
};