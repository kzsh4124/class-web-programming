import React from "react";
import type Memo from "../types/Memo"


const Title = (props:Memo) =>{
    console.log("Title: ",props);
    return (
        <div key={props.id}>
            <p>{props.title}</p>
            <p>{props.expire_date}</p>
        </div>

    );
}

export default Title;