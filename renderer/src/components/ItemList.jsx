import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import { useItems, useAppState, useAppReducer } from "../AppContext.jsx";
import Item from "./Item.jsx";
import styles from "./ItemList.module.css";
import arrow from "../img/arrow.svg";
import { useRef } from "react";

function AddItemForm() {
	const dispatch = useAppReducer();
	let inputRef = useRef();

	function newAdd(e) {
		const itemObj = {
			text: inputRef.current.value,
			key: Date.now(),
			status: "pending",
		};
		if (itemObj.text.trim()) {
			dispatch({ type: "_ADD_", item: itemObj });
		}
		e.preventDefault();
		inputRef.current.value = "";
		inputRef.current.focus();
	}

	return (
		<form className={styles.form} onSubmit={newAdd}>
			<input ref={inputRef} placeholder="Add new item" autoFocus />
			<button type="submit" />
		</form>
	);
}

function Progress() {
	const tmp = useAppState().items.length;
	const { paused, completed } = useItems();
	const done = completed.length;
	const pam = paused.length;

	let perdone = done / tmp;
	let perhault = pam / tmp + perdone;

	if (isNaN(perdone)) {
		perdone = 0;
	}

	if (isNaN(perhault)) {
		perhault = 0;
	}

	return (
		<div className={styles.progress}>
			<div
				className={`${styles.progressbar} ${styles.paused}`}
				style={{ width: `${perhault * 100}%` }}
			></div>
			<div
				className={`${styles.progressbar} ${styles.completed}`}
				style={{ width: `${perdone * 100}%` }}
			></div>
		</div>
	);
}

function ItemList() {
	const dispatch = useAppReducer();
	const { pending, paused, completed } = useItems();

	return (
		<div className="item-list">
			<Progress />
			<AddItemForm />
			{pending.length > 0 ? (
				<>
					{pending.map((item) => {
						return <Item item={item} key={item.key} />;
					})}
				</>
			) : null}
			<Accordion collapsible multiple>
				{paused.length > 0 && (
					<AccordionItem>
						<AccordionButton className={styles.toggle}>
							<img src={arrow} alt="Do Later Toggle" />
							<span>Do Later</span>
						</AccordionButton>
						<AccordionPanel className={styles.panel}>
							{paused &&
								paused.map((item) => {
									return <Item item={item} key={item.key} />;
								})}
						</AccordionPanel>
					</AccordionItem>
				)}
				{completed.length > 0 && (
					<AccordionItem>
						<AccordionButton className={styles.toggle}>
							<img src={arrow} alt="Completed Toggle" /> <span>Completed</span>
						</AccordionButton>
						<AccordionPanel className={styles.panel}>
							{completed &&
								completed.map((item) => {
									return <Item item={item} key={item.key} />;
								})}
						</AccordionPanel>
					</AccordionItem>
				)}
			</Accordion>

			{(completed.length > 0 || paused.length > 0) && (
				<div className={styles.reset}>
					<button
						onClick={() => {
							dispatch({ type: "_RESET_" });
						}}
						style={{ color: "yellow" }}
					>
						RESET PROGRESS
					</button>
				</div>
			)}
		</div>
	);
}

export default ItemList;
