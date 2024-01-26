import React, {useState} from "react";

function ClickMe() {

    const [charCount, setCharCount] = useState(0)
    const [formText, setFormText] = useState("")

    function handleChange(e){
        setFormText(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        let charLength = formText.length
        setCharCount((prevAmount) => prevAmount + charLength)
        setFormText("")
    }

  return (
    <div>

    <form onSubmit={handleSubmit}>
        <input 
        type="text"
        name="word"
        placeholder="Write something..."
        value={formText}
        onChange={handleChange}
        />

        <button>
        Submit
        </button>
    </form>
      
    <h1>Char Count: {charCount}</h1>
    </div>
  );
}

export default ClickMe;
