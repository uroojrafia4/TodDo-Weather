 import React, { useState, useEffect } from 'react';



 export default function Counter(props){
    let [count , setCount] = useState(0)

function inc(){
    
    
  let padded = String(count).padStart(2 , '0');
  setCount(Number(padded) + 1)
}
 return(
    <div><h1>{String(count).padStart(2, '0')}</h1>
     <button >{props.name}</button>
    <button onClick={inc} >Increment</button></div>
 )

};