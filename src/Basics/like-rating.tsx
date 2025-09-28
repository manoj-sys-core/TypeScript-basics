import { useState } from "react"

type liketype={
    head:string,
    content:string
}

export default function Likes({head , content}:liketype){
    const [like,setlike] = useState<number>(0);
    return(
        <>
        <h1>{head}</h1>
        <p>{content}</p>
        <button onClick={()=>setlike(like+1)}>Likes {like}</button>
        </>
    )

}