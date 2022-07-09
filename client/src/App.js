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
      {/* <hr/> */}
      <div style={{width: "80vw", margin: "auto"}}>
			<div style = {{ width: "100%", display: "inline-grid", gridTemplateColumns: "8fr 2fr 2fr 1fr 1fr 1fr", alignItems: "center", justifyItems: "center"}}>
				<h4 style = {{}}>ITEM</h4>
				<h4 style = {{}}>DUE</h4>
				<h4 style = {{}}>CREATED ON</h4>
				<h4 style = {{}}>DONE?</h4>
				<h4 style = {{}}>DELETE</h4>
				<h4 style = {{}}>UPDATE</h4>
			</div>
			{/* <hr /> */}
		</div>


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
