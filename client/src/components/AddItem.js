import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const AddItem = ({updateList}) => {
    const [toDoItem, settoDoItem] = useState("");
    const [dateDue, setDateDue] = useState(Date.now()+(1000*3600*24*7));

    const handleSubmit = () => {
        axios.post("http://localhost:3001/addItem", 
        {
            item: toDoItem,
            dateDue: dateDue,
        }).then(() => {
            axios.get("http://localhost:3001/getList").then((response) => {
			updateList(response.data);
		});
        })
    }

    const handleItemChange = (e) => {
        console.log(e.target.value);
        settoDoItem(e.target.value);
    }

    const handleDateChange = (e) => {
        console.log(e.target.value);
        setDateDue(e.target.value);
    }

  return (
    <div>
        <input type="text" placeholder="Item" onChange={e => {handleItemChange(e)}}/>
        <input type="Date" onChange={e => {handleDateChange(e)}}/>
        <button onClick={handleSubmit}>Add Item</button>
    </div>
  );
}

export default AddItem