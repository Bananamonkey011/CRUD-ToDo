import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

function App() {
	const [list, setList] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost:3001/getList").then((response) => {
			setList(response.data);
		});
	}, []);

	return (
		<div className="App">
      <h1> To Do List</h1>
      <hr/>
      <AddItem updateList={setList}/>
      <hr/>
			{list.map((item) => {
        return (
          <div key={item._id} >
            <ListItem item={item} updateList = {setList}/>
          </div>
				);
			})}
		</div>
	);
}

export default App;
