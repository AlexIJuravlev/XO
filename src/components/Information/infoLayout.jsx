import { useSelector } from 'react-redux';
import styles from './info.module.css'
import { SelectCurrent, SelectEnded, SelectIsDrow } from '../selectors';


export default function Info() {

	const isDraw = useSelector(SelectIsDrow);
	const isGameEnded = useSelector(SelectEnded);
	const currentPlayer = useSelector(SelectCurrent);

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
