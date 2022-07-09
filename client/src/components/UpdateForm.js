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
		setDue(e.target.value);
	};

    const handleCancel = () => {
        setUpdating(false);
    };

    const handleUpdate = async () => {
        item.item = name;
        item.dateDue = due;
        await axios.put("http://localhost:3001/update", item);
        setUpdating(false);
    };

	return (
		<>
			<div
				style={{
					width: "100%",
					minHeight: "4.2em",
					display: "inline-grid",
					gridTemplateColumns: "8fr 2fr 2fr 1fr 1fr 1fr",
					alignItems: "center",
					justifyItems: "center",
				}}
			>
				<input
					type="text"
					onChange={(e) => handleNameChange(e)}
					defaultValue={name}
					style={{
                        width: "80%",
                        textAlign: "center",
						border: "none",
						borderBottom: "1px solid black",
					}}
				/>
				<input
					type="date"
					onChange={(e) => handleDueChange(e)}
					defaultValue={due && due.substring(0, 10)}
                    style={{
						width: "auto",
						border: "none",
						borderBottom: "1px solid black",
					}}
				/>
                <div/>
                <div/>
                <button onClick={handleCancel}>cancel</button>
                <button onClick={handleUpdate}>update</button>
			</div>
		</>
	);
};

export default UpdateForm;
