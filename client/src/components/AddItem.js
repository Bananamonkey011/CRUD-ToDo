import axios from "axios";
import React from "react";
import { useState } from "react";

const AddItem = ({ updateList }) => {
	const [toDoItem, settoDoItem] = useState("");
	const [dateDue, setDateDue] = useState(Date.now() + 1000 * 3600 * 24 * 7);

	const handleSubmit = () => {
		axios
			.post("http://localhost:3001/addItem", {
				item: toDoItem,
				dateDue: dateDue,
			})
			.then(() => {
				axios.get("http://localhost:3001/getList").then((response) => {
					updateList(response.data);
				});
			});
	};

	const handleItemChange = (e) => {
		console.log(e.target.value);
		settoDoItem(e.target.value);
	};

	const handleDateChange = (e) => {
        const date = new Date()
        date.setDate(e.target.value.split("-")[2]);
        date.setMonth(e.target.value.split("-")[1] - 1);
        date.setFullYear(e.target.value.split("-")[0]);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
		setDateDue(date.toUTCString());
	};

	return (
		<div style={{width: "80vw", display: "inline-grid", gridTemplateColumns: "8fr 2fr 2fr 1fr 1fr 1fr", justifyItems: "center"}}>
			<input
				type="text"
				placeholder="Item"
				onChange={(e) => {
					handleItemChange(e);
				}}
				style={{
					width: "80%",
                    textAlign: "center",
					border: "none",
					borderBottom: "1px solid black",
				}}
			/>
			<input
				type="date"
				onChange={(e) => {
					handleDateChange(e);
				}}
				style={{
					width: "auto",
					border: "none",
					borderBottom: "1px solid black",
				}}
			/>
			<button onClick={handleSubmit}>Add Item</button>
		</div>
	);
};

export default AddItem;
