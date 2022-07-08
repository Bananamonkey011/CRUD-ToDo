import axios from "axios";
import React from "react";
import { useState } from "react";

const ListItem = ({ item, updateList}) => {
	// console.log(item);
	const [isDone, setIsDone] = useState(item.done);
	const handleChange = async () => {
		// console.log("checked");
		item.done = !isDone;
		await axios.put("http://localhost:3001/update", item);
		setIsDone(!isDone);
	};

  const deleteItem = async () => {
    console.log(item);
    await axios.delete("http://localhost:3001/removeTask", {data: item}).then(() => {
      axios.get("http://localhost:3001/getList").then((response) => {
  updateList(response.data);
});
  })
  };

	const created = new Date(item.dateCreated);
	const due = new Date(item.dateDue);
	return (
		<div style={{width: "80vw", border: "1px solid black", margin: "auto"}}>
			<div style = {{ display: "inline"}}>
				<h2 style = {{ width: "40%", display: "inline-block", textAlign: "left" }}>{item.item}</h2>
				<h4 style = {{ width: "10%", display: "inline-block"}}>{due > 0 && due.toLocaleDateString()}</h4>
				<h6 style = {{ width: "10%", display: "inline-block"}}> {created.toLocaleDateString()}</h6>
				<input
          style = {{ width: "5%", display: "inline-block"}}
					type="checkbox"
					checked={isDone}
					onChange={handleChange}
				/>
        <button onClick = {deleteItem} style = {{ width: "5%", display: "inline-block"}}> delete</button>
			</div>
			{/* <hr /> */}
		</div>
	);
};

export default ListItem;
