import { useState } from "react";
import "./style.css";

const CATEGORIES = [
	{ name: "technology", color: "#3b82f6" },
	{ name: "science", color: "#16a34a" },
	{ name: "finance", color: "#ef4444" },
	{ name: "society", color: "#eab308" },
	{ name: "entertainment", color: "#db2777" },
	{ name: "health", color: "#14b8a6" },
	{ name: "history", color: "#f97316" },
	{ name: "news", color: "#8b5cf6" },
];

const initialFacts = [
	{
		id: 1,
		text: "React is being developed by Meta (formerly facebook)",
		source: "https://opensource.fb.com/",
		category: "technology",
		votesInteresting: 24,
		votesMindblowing: 9,
		votesFalse: 4,
		createdIn: 2021,
	},
	{
		id: 2,
		text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
		source:
			"https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
		category: "society",
		votesInteresting: 11,
		votesMindblowing: 2,
		votesFalse: 0,
		createdIn: 2019,
	},
	{
		id: 3,
		text: "Lisbon is the capital of Portugal",
		source: "https://en.wikipedia.org/wiki/Lisbon",
		category: "society",
		votesInteresting: 8,
		votesMindblowing: 3,
		votesFalse: 1,
		createdIn: 2015,
	},
];

function App() {
	//->1.Define state variable
	const [showForm, setShowForm] = useState(false); //showForm is the name of the state, setShowForm is the executing function / useState(value) --> value is the default value for the setShowForm()

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
				<button
					className="btn btn-large btn-open"
					// ->#3.Update state variable
					onClick={() => setShowForm((show) => !show)}
				>
					Share a fact
				</button>
			</header>
			{/*//->2.Use state variable */}
			{/* FACTFORM - with on/off state */}
			{showForm ? <NewFactForm /> : null}
			<main className="main">
				{/* SIDEBAR */}
				<CategoryFilter />
				{/* FACTLIST */}
				<FactList />
			</main>
		</>
	);
}

// FACTFORM COMPONENT
function NewFactForm() {
	return <form className="fact-form">Fact Form</form>;
}

// CATEGORY SIDEBAR COMPONENT
function CategoryFilter() {
	return (
		<aside>
			<ul>
				<li className="category">
					<button className="btn btn-all-categories">All</button>
				</li>
				{CATEGORIES.map((category) => (
					<li key={category.name} className="category">
						<button
							className="btn btn-category"
							style={{ backgroundColor: category.color }}
						>
							{category.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}

// FACTLIST COMPONENT
function FactList() {
	const facts = initialFacts;

	return (
		<section>
			<ul className="facts-list">
				{facts.map((fact) => (
					<Fact key={fact.id} factObj={fact} /> //React keyid on each component needs to be declared the moment they were created not in the Fact function body
				))}
			</ul>
		</section>
	);
}

function Fact({ factObj }) {
	// .function Fact(props) {
	// console.log(props);
	// const { factObj } = props;

	return (
		<li className="fact">
			<p>
				{factObj.text}
				<a
					className="source"
					rel="noreferrer"
					href={factObj.source}
					target="_blank"
				>
					(Source)
				</a>
			</p>
			<span
				className="tag"
				style={{
					backgroundColor: CATEGORIES.find(
						(cat) => cat.name === factObj.category,
					).color,
				}}
			>
				{factObj.category}
			</span>
			<div className="vote-buttons">
				<button>👍 {factObj.votesInteresting}</button>
				<button>🤯 {factObj.votesMindblowing}</button>
				<button>⛔️ {factObj.votesFalse}</button>
			</div>
		</li>
	);
}

export default App;
