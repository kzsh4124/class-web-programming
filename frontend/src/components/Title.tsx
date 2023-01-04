import React from "react";
import type Memo from "../types/Memo"


const Title = (props:Memo) =>{
    //console.log("Title: ",props);
    return (
        <div key={props.id}>
            <h3>{props.title}</h3>
            <p>有効期限: {props.expire_date ? props.expire_date : '無期限'}</p>
        </div>

    );
}

export default Title;