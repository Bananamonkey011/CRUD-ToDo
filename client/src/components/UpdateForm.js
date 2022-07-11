import axios from "axios";
import React from "react";
import { useState } from "react";

const UpdateForm = ({ item, updateList, setUpdating }) => {
	const [name, setName] = useState(item.item);
	const [due, setDue] = useState(item.dateDue);

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleDueChange = (e) => {
		const date = new Date();
		date.setDate(e.target.value.split("-")[2]);
		date.setMonth(e.target.value.split("-")[1] - 1);
		date.setFullYear(e.target.value.split("-")[0]);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		// console.log(date)
		setDue(date.toUTCString());
	};

	const handleCancel = () => {
		setUpdating(false);
	};

	const handleUpdate = async () => {
		item.item = name;
		item.dateDue = due;
		await axios.put("https://manan-to-do-list.herokuapp.com/update", item);
		setUpdating(false);
	};
	// console.log(new Date(new Date(item.dateDue).toLocaleDateString()).toISOString());
	const created = new Date(item.dateCreated);
	return (
		<>
			<div className="list-item-container">
				<input
					className="input item-input"
					type="text"
					onChange={(e) => handleNameChange(e)}
					defaultValue={name}
				/>

				<div>
					<label for="due" className="label">
						Due:
					</label>
					<input
						name="due"
						id="due"
						className="input date-input"
						type="date"
						onChange={(e) => handleDueChange(e)}
						defaultValue={new Date(
							new Date(item.dateDue).toLocaleDateString()
						)
							.toISOString()
							.substring(0, 10)}
					/>
				</div>
				<div>
					<label for="created" className="label">
						Created:
					</label>
					<h5 name="created" id="created" className={"date"}>
						{" "}
						{created.toLocaleDateString()}
					</h5>
				</div>

				<div>
					<label className="label" for="checkbox">
						{" "}
						Done:
					</label>
					<input
						className="checkbox"
						name="checkbox"
						id="checkbox"
						type="checkbox"
						disabled
					/>
				</div>

				<button className="btn btn-delete" onClick={handleCancel}>
					cancel
				</button>
				<button className="btn btn-update" onClick={handleUpdate}>
					update
				</button>
			</div>
		</>
	);
};

export default UpdateForm;
