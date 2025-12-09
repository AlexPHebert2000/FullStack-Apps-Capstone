import { useState } from "react"
import axios from "axios";
const TagCreator = ({venueID, handleAddTag}) => {
  const [input, setInput]= useState("");

  return (
    <div style={{display: "flex", flexDirection:"row"}}>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new tag" />
      <div 
        style={{margin:"0px 5px", background: "#0004", width: 25, height: 25, borderRadius: 13, display: "flex", justifyContent:"center", alignItems: "center"}}
        onClick={() => {handleAddTag(venueID, input)}}
      >
        <span style={{fontWeight: 700}}>+</span>
      </div>
    </div>
  )
}

export default TagCreator