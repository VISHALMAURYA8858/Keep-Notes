import { useState } from "react";
import AllNotes from "./component/AllNotes";
import Notes from "./component/Notes";

export default function App() {

	const [menu, switchMenu] = useState(true)

	return (
		menu ? <Notes switchMenu={switchMenu} />
			: <AllNotes switchMenu={switchMenu} />
	);
}