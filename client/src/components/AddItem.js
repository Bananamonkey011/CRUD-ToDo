import axios from "axios";
import React from "react";
import { useState } from "react";

const AddItem = ({ updateList }) => {
	const [toDoItem, settoDoItem] = useState("");
	const [dateDue, setDateDue] = useState(Date.now() + 1000 * 3600 * 24 * 7);

	const handleSubmit = () => {
		axios
			.post("https://manan-to-do-list.herokuapp.com/addItem", {
				item: toDoItem,
				dateDue: dateDue,
			})
			.then(() => {
				axios
					.get("https://manan-to-do-list.herokuapp.com/getList")
					.then((response) => {
						updateList(response.data);
					});
			});
	};

	const handleItemChange = (e) => {
		console.log(e.target.value);
		settoDoItem(e.target.value);
	};

	const handleDateChange = (e) => {
		const date = new Date();
		date.setDate(e.target.value.split("-")[2]);
		date.setMonth(e.target.value.split("-")[1] - 1);
		date.setFullYear(e.target.value.split("-")[0]);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		setDateDue(date.toUTCString());
	};

	return (
		<div>
			<div className="add-item-container">
				<input
					className="input add-item-input"
					type="text"
					placeholder="Item"
					onChange={(e) => {
						handleItemChange(e);
					}}
				/>
				<div>
					<label for="due" className="label">
						Due:
					</label>
					<input
						name="due"
						id="due"
						className="input add-date-input"
						type="date"
						onChange={(e) => {
							handleDateChange(e);
						}}
					/>
				</div>
				<button className="btn btn-submit" onClick={handleSubmit}>
					Add Item
				</button>
			</div>
		</div>
	);
};

export default AddItem;
