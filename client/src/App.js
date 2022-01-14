import { useState, useEffect } from "react";

function App() {
	const [contest, setContest] = useState("");

	useEffect(() => {
		const testAPI = async () => {
			const res = await fetch(`/api/contests/2014`);
			const data = await res.json();
			setContest(data);
		};

		testAPI();
	}, []);

	return (
		<>
			<h1>EuroDB</h1>
			<div>
				<pre>{JSON.stringify(contest, null, 2)}</pre>
			</div>
		</>
	);
}

export default App;
