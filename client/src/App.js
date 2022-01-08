import { useState, useEffect } from "react";

function App() {
	const [tracks, setTracks] = useState("");

	useEffect(() => {
		const testAPI = async () => {
			const res = await fetch("/api/tracks/top-10?genre=Folk");
			const data = await res.json();
			setTracks(data);
		};

		testAPI();
	}, []);

	return (
		<>
			<h1>Tracks at top 10</h1>
			<div>
				<pre>{JSON.stringify(tracks, null, 2)}</pre>
			</div>
		</>
	);
}

export default App;
