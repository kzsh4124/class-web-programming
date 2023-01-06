import ky from "ky";
import type FormData from "../types/FormData";

interface Res {
  status: string;
}

export const postMemo = async (formData: FormData) => {
  console.log("Here is postMemos");
  const postData = new URLSearchParams();
  Object.entries(formData).forEach((entry) => postData.set(...entry));
  const res: Res = await ky
    .post("https://cgi.u.tsukuba.ac.jp/~s2111609/wp/final/api/post.rb", {
      body: postData,
    })
    .json();
  if (res.status !== "ok") {
    throw new Error("API Error");
  }
};
