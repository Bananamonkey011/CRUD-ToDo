import axios from "axios";
import React from "react";
import { useState } from "react";

const ListItem = ({ item, updateList, setUpdating }) => {
	// console.log(item);
	const [isDone, setIsDone] = useState(item.done);

	const handleChange = async () => {
		// console.log("checked");
		item.done = !isDone;
		await axios.put("https://manan-to-do-list.herokuapp.com/update", item);
		setIsDone(!isDone);
	};

	const deleteItem = async () => {
		console.log(item);
		await axios
			.delete("https://manan-to-do-list.herokuapp.com/removeTask", {
				data: item,
			})
			.then(() => {
				axios
					.get("https://manan-to-do-list.herokuapp.com/getList")
					.then((response) => {
						updateList(response.data);
					});
			});
	};

	const updateItem = () => {
		setUpdating(true);
	};

	const created = new Date(item.dateCreated);
	const due = new Date(item.dateDue);
	return (
		<>
			<div className="list-item-container" style={{}}>
				<h2 className={"item"}>{item.item}</h2>

				<div>
					<label for="due" className="label">Due:</label>
					<h5 name="due" id="due" className={"date"}>
						{due > 0 && due.toLocaleDateString()}
					</h5>
				</div>

				<div>
					<label for="created" className="label">Created:</label>
					<h5 name="created" id="created"className={"date"}> {created.toLocaleDateString()}</h5>
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
						checked={isDone}
						onChange={handleChange}
					/>
				</div>

				<button className="btn btn-delete" onClick={deleteItem}>
					delete
				</button>
				
				<button className="btn btn-update" onClick={updateItem}>
					Update
				</button>
			</div>
		</>
	);
};

export default ListItem;
