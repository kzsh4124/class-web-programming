import React from "react";
import type Memo from "../types/Memo"
import { Link } from "react-router-dom";


const Title = (props:Memo) =>{
    //console.log("Title: ",props);

    return (
        <>
        <Link to={{pathname:`/memo/${props.id}`}} state={{id: props.id}}>
            <h3>{props.title}</h3>
            </Link>
            <p>有効期限: {props.expireDate ? props.expireDate : '無期限'}</p>
        </>

    );
}

export default Title;