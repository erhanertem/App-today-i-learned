import "./style.css";

function App() {
	const appTitle = "Today I Learned ";

	return (
		<>
			{/* FRAGMENT OPENER TAG */}
			{/* HEADER */}
			<header className="header">
				<div className="logo">
					<img src="logo.png" alt="Today I Learned App logo" />
					<h1>{appTitle}</h1>
				</div>
				<button className="btn btn-large btn-open">Share a fact</button>
			</header>

			<main className="main">
				{/* FACTFORM */}
				<NewFactForm />
				{/* SIDEBAR */}
				<CategoryFilter />
			</main>

			{/* FACTLIST */}
			<FactList />
		</>
	);
}

// FACTFORM COMPONENT
function NewFactForm() {
	return <form className="fact-form hidden">Fact Form</form>;
}

// CATEGORY SIDEBAR COMPONENT
function CategoryFilter() {
	return <aside>Category Filter</aside>;
}

// FACTLIST COMPONENT
function FactList() {
	return <section>Fact List</section>;
}

export default App;
