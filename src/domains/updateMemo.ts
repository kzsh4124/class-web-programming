import ky from "ky";
import type Memo from "../types/Memo";
interface Res {
  status: string;
}

export const updateMemo = async (formData: Memo) => {
  if(formData.id == ''){
    console.log("id is empty");
    return;
  }
    console.log("Here is updateMemos");
  const postData = new URLSearchParams();
  Object.entries(formData).forEach((entry) => postData.set(...entry));
  const res: Res = await ky
    .post("https://cgi.u.tsukuba.ac.jp/~s2111609/wp/final/api/update.rb", {
      body: postData,
    })
    .json();
    console.log(res);
  if (res.status !== "ok") {
    throw new Error("API Error");
  }
};
