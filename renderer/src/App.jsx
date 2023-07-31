import ItemList from "./components/ItemList.jsx";
import { AppStateProvider, useAppState } from "./AppContext.jsx";
import "./index.css";

function HeaderDate() {
	const { date } = useAppState();
	return (
		<div className="date">
			<div className="calendar">
				<div className="day">{date.dayDisplay}</div>
				<div className="my">
					<div className="month">{date.monthDisplay}</div>
					<div className="year">{date.year}</div>
				</div>
			</div>
			<div className="today">{date.weekday}</div>
		</div>
	);
}

function App() {
	return (
		<AppStateProvider>
			<HeaderDate />
			<ItemList />
		</AppStateProvider>
	);
}

export default App;
