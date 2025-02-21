import { store } from '../../store';
import styles from './info.module.css'


export default function Info() {

	const { isDraw, isGameEnded, currentPlayer} = store.getState()

		const walk =
			isDraw === false &&
			isGameEnded === false
				? `Ход: ${currentPlayer}`
				: "";
		const drow = isDraw === false ? "" : "Ничья";
		const win =
			isDraw === false && isGameEnded === true
				? `Победил: ${currentPlayer}`
				: "";
				
	return (
		<>
			<div className={styles.main}>
				<h1>Крестики нолики</h1>
				<div className={styles.walk}>{walk || drow || win}</div>
			</div>
		</>
	);
}
