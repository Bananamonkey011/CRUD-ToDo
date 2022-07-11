import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

function App() {
	const [list, setList] = useState([]);

	useEffect(() => {
		Axios.get("https://manan-to-do-list.herokuapp.com/getList").then(
			(response) => {
				setList(response.data);
			}
		);
	}, []);

	return (
		<div className="App">
			<h1> To Do List</h1>
			<hr />
			<AddItem updateList={setList} />
			<hr />
			<div
				className="header-container"
			>
				<h4 className="header">ITEM</h4>
				<h4 className="header">DUE</h4>
				<h4 className="header">ADDED ON</h4>
				<h4 className="header">DONE?</h4>
				<h4 className="header">DELETE</h4>
				<h4 className="header">UPDATE</h4>
			</div>

			{list.map((item) => {
				return (
					<div key={item._id}>
						<ListItem item={item} updateList={setList} />
					</div>
				);
			})}
		</div>
	);
}

export default App;
