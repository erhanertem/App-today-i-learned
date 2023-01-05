import { useState } from "react";
import supabase from "./supabase";

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
	const [showForm, setShowForm] = useState(false); //showForm is the name of the used current state value, setShowForm is the executing/updater function of the state value / useState(default_value) //IMPORTANT! Moved to the parent (here) so that both Header and App
	const [facts, setFacts] = useState(initialFacts); //facts is the name of the used current state value, setFacts is the executing/updater function of the state value / useState(default_value) //IMPORTANT! Moved to the parent (here) so that both FactList and NewFactForm can share setFacts()

	return (
		<>
			{/* FRAGMENT OPENER TAG */}
			{/* HEADER - Note: We would need access to showForm & setShowForm in the Header component so we pass them as a react prop*/}
			<Header showForm={showForm} setShowForm={setShowForm} />
			{/*//->2.Use state variable */}
			{/* FACTFORM - with on/off state */}
			{showForm ? (
				<NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
			) : null}
			<main className="main">
				{/* SIDEBAR */}
				<CategoryFilter />
				{/* FACTLIST */}
				<FactList facts={facts} />
			</main>
		</>
	);
}

// HEADER COMPONENT
function Header({ showForm, setShowForm }) {
	const appTitle = "Today I Learned ";

	return (
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
				{showForm ? "Close" : "Share a fact"}
			</button>
		</header>
	);
}

// FACTFORM COMPONENT
function NewFactForm({ setShowForm, setFacts }) {
	const [text, setText] = useState(""); //set text data - create a text named state with setText function with a initial value of ''
	const [source, setSource] = useState("https://www.udemy.com/course/"); //set source data - TEMPORARILY SET THIS FOR QUICK POSTING
	const [category, setCategory] = useState(""); // set category data

	function isValidURL(urlString) {
		// //#1.WEB URL API & REGEX HYBRID
		// let url;
		// const multiUrlPattern = new RegExp(
		// 	"^((http|https)?:\\/\\/)?" + // protocol
		// 		"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
		// 		"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
		// 		"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
		// 		"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
		// 		"(\\#[-a-z\\d_]*)?$", // fragment locator
		// 	"i",
		// );
		// try {
		// 	url = new URL(urlString);
		// 	// NOTE: When you pass a valid URL string to the URL constructor, it returns a new URL object. When you pass an invalid URL string to the URL constructor, it returns a TypeError. That is why we use TRY..CATCH (ref: https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/)
		// 	return (
		// 		(url.protocol === "http:" || url.protocol === "https:") &&
		// 		multiUrlPattern.test(urlString)
		// 	); //filter if urls start with http or https://
		// } catch (err) {
		// 	alert("Type in correct URI ");
		// 	return false;
		// }
		//#2.NPM PACKAGES
		// NOTE: npm package to resolve URLs : is-url package, is-http-url package, valid-url package
		//#4.REGEX SOLUTION
		// const anyUrlPattern = new RegExp(
		// 	"^([a-zA-Z]+:\\/\\/)?" + // protocol
		// 		"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
		// 		"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
		// 		"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
		// 		"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
		// 		"(\\#[-a-z\\d_]*)?$", // fragment locator
		// 	"i",
		// );
		// const httpsUrlPattern = new RegExp(
		// 	"^(https?:\\/\\/)?" + // protocol
		// 		"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
		// 		"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
		// 		"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
		// 		"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
		// 		"(\\#[-a-z\\d_]*)?$", // fragment locator
		// 	"i",
		// );
		// const multiUrlPattern = new RegExp(
		// 	"^((ft|htt)ps?:\\/\\/)?" + // protocol
		// 		"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
		// 		"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
		// 		"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
		// 		"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
		// 		"(\\#[-a-z\\d_]*)?$", // fragment locator
		// 	"i",
		// );
		const multiUrlPattern = new RegExp(
			"^((http|https):\\/\\/)" + // protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
				"(\\#[-a-z\\d_]*)?$", // fragment locator
			"i",
		);
		return multiUrlPattern.test(urlString);
	}

	function handleSubmit(e) {
		//#1.Prevent the browser reload
		e.preventDefault();
		console.log(text, source, category);
		//#2.Check if data is valid, if so, create a new fact
		// if (text && isValidURL(source) && category && text.length <= 200)
		//Note: (this stage renders useless if the form input items are marked required in the HTML and text.length surpassing 200 is avoided via controller previously)
		if (isValidURL(source)) {
			console.log("there is a data");
			//#3.Create a new fact object
			const newFact = {
				id: Math.round(Math.random() * 100000000),
				text, // text: text, //ES6
				source, // source: source, //ES6
				category, // category: category, //ES6
				votesInteresting: 24,
				votesMindblowing: 9,
				votesFalse: 4,
				createdIn: new Date().getFullYear(),
			};
			//#4.Add the new fact to the UI: add the fact to react state
			setFacts((facts) => [newFact, ...facts]);
			//#5.Reset input fields to empty
			setText("");
			setSource("");
			setCategory("");
			//#6.Close the form
			setShowForm(false);
		}
	}

	return (
		<form className="fact-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Share a fact with the world..."
				required
				value={text}
				onChange={(event) => {
					if (text.length === 200) return;
					setText(event.target.value);
				}}
			/>
			<span>{200 - text.length}</span>
			<input
				type="text"
				placeholder="Trustworthy source..."
				required
				value={source}
				onChange={(event) => setSource(event.target.value)}
			/>
			<select
				name="category"
				required
				value={category}
				onChange={(event) => setCategory(event.target.value)}
			>
				<option value="">Choose category:</option>
				{CATEGORIES.map((category) => (
					<option key={category.name} value={category.name}>
						{category.name.toUpperCase()}
					</option>
				))}
			</select>
			<button className="btn btn-large">Post</button>
		</form>
	);
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
function FactList({ facts }) {
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
