import axios from "axios";
import React from "react";
import { useState } from "react";

const ListItem = ({ item, updateList, setUpdating }) => {
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
		await axios
			.delete("http://localhost:3001/removeTask", { data: item })
			.then(() => {
				axios.get("http://localhost:3001/getList").then((response) => {
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
			<div
				style={{
					width: "100%",
					display: "inline-grid",
					gridTemplateColumns: "8fr 2fr 2fr 1fr 1fr 1fr",
					alignItems: "center",
					justifyItems: "center",
				}}
			>
				<h2 style={{ textAlign: "left" }}>{item.item}</h2>
				<h5 style={{ display: "inline-block" }}>
					{due > 0 && due.toLocaleDateString()}
				</h5>
				<h5 style={{ display: "inline-block" }}>
					{" "}
					{created.toLocaleDateString()}
				</h5>
				<input
					style={{ display: "inline-block" }}
					type="checkbox"
					checked={isDone}
					onChange={handleChange}
				/>
				<button
					onClick={deleteItem}
					style={{ display: "inline-block" }}
				>
					delete
				</button>
				<button
					onClick={updateItem}
					style={{ display: "inline-block" }}
				>
					Update
				</button>
				{/* <button
					onClick={deleteItem}
					style={{ display: "inline-block" }}
				>
					update
				</button> */}
			</div>
			{/* <hr /> */}
		</>
	);
};

export default ListItem;
