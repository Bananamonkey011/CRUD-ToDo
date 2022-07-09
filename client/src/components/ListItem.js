import axios from "axios";
import React from "react";
import { useState } from "react";
import DisplayListItem from "./DisplayListItem";
import UpdateForm from "./UpdateForm";

const ListItem = ({ item, updateList }) => {
	const [updating, setUpdating] = useState(false);

	if (updating) {
		return (
			<div
				style={{
					width: "80vw",
					border: "1px solid black",
					margin: "auto",
				}}
			>
					<UpdateForm item={item} updateList={updateList} setUpdating={setUpdating} />
			</div>
		);
	} else {
		return (
			<div
				style={{
					width: "80vw",
					border: "1px solid black",
					margin: "auto",
				}}
			>
					<DisplayListItem item={item} updateList={updateList} setUpdating={setUpdating}/>
			</div>
		);
	}
};

export default ListItem;
