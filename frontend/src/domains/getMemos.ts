import ky from 'ky';
import type Memo from '../types/Memo'
interface Response{
    status: string
    data: Memo[]
}

export const getMemos =async (q:string = '') => {
    console.log("Here is getMemos");
    const res:Response = await ky
    .get('https://cgi.u.tsukuba.ac.jp/~s2111609/wp/final/api/memos.rb',{
        searchParams:{
            q: q
        }
    })
    .json()
    
    if(res.status !== 'ok'){
        throw new Error('API Error');
    }
    return res.data;
}