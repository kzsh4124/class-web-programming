import ky from "ky";
import type Memo from "../types/Memo";
interface Res {
  status: string;
  data: Memo[];
}

export const getMemos = async (q: string = "") => {
  console.log("Here is getMemos");
  const res: Res = await ky
    .get("https://cgi.u.tsukuba.ac.jp/~s2111609/wp/final/api/memos.rb", {
      searchParams: {
        q: q,
      },
    })
    .json();
    console.log(res);
  if (res.status !== "ok") {
    throw new Error("API Error");
  }
  return res.data;
};
