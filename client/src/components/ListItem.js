import React from "react";
import { useState } from "react";
import DisplayListItem from "./DisplayListItem";
import UpdateForm from "./UpdateForm";

const ListItem = ({ item, updateList }) => {
	const [updating, setUpdating] = useState(false);

	if (updating) {
		return (
			<div className="list-item-container-container">
				<UpdateForm
					item={item}
					updateList={updateList}
					setUpdating={setUpdating}
				/>
			</div>
		);
	} else {
		return (
			<div className="list-item-container-container">
				<DisplayListItem
					item={item}
					updateList={updateList}
					setUpdating={setUpdating}
				/>
			</div>
		);
	}
};

export default ListItem;
