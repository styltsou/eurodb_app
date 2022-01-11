import { useState, useEffect } from "react";

function App() {
	let genre = "Electronic";

	const [tracks, setTracks] = useState("");

	useEffect(() => {
		const testAPI = async () => {
			const res = await fetch(`/api/contests/2014`);
			const data = await res.json();
			setTracks(data);
		};

		testAPI();
	}, []);

	return (
		<>
			<h1>Hello</h1>
			<div>
				<pre>{JSON.stringify(tracks, null, 2)}</pre>
			</div>
		</>
	);
}

export default App;
