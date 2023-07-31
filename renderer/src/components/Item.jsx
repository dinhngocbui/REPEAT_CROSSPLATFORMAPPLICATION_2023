import { useAppReducer } from "../AppContext.jsx";
import styles from "./Item.module.css";

function Item({ item }) {
	const dispatch = useAppReducer();
	let title = item.text;
	let isPending = item.status === "paused";
	let isDone = item.status === "completed";

	function remove() {
		dispatch({ type: "_REMOVE_", item });
	}

	function peding() {
		const pausedItem = { ...item, status: "paused" };
		dispatch({ type: "_UPDATE_", item: pausedItem });
	}

	function resume() {
		const pendingItem = { ...item, status: "pending" };
		dispatch({ type: "_UPDATE_", item: pendingItem });
	}

	function completeItem() {
		const completedItem = { ...item, status: "completed" };
		dispatch({ type: "_UPDATE_", item: completedItem });
	}

	return (
		<div className={styles.item} tabIndex="0">
			<div className={styles.itemname}>{title}</div>
			<div
				className={`${styles.buttons} ${
					isDone ? styles.completedButtons : ""
				}`}
			>
				{isDone && <button className={styles.empty} tabIndex="0"></button>}
				<button
					className={styles.delete}
					onClick={remove}
					tabIndex="0"
				></button>
				{!isPending && !isDone && (
					<button
						className={styles.pause}
						onClick={peding}
						tabIndex="0"
					></button>
				)}
				{(isPending || isDone) && (
					<button
						className={styles.resume}
						onClick={resume}
						tabIndex="0"
					></button>
				)}
				{!isDone && (
					<button
						className={styles.complete}
						onClick={completeItem}
						tabIndex="0"
					></button>
				)}
			</div>
		</div>
	);
}

export default Item;
