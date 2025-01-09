
import Field from './components/field/field';
import InfoLayout from './components/Information/infoLayout';
import styles from "./App.module.css";
import { useState } from 'react';

function App() {
	const [ currentPlayer, setCurrentPlayer ] = useState('X');
	const [ isGameEnded, setIsGameEnded] = useState(false);
	const [ isDraw, setIsDraw] = useState(false);
	const [ field, setField ] = useState(Array(9).fill(null));
	const winnerGame = winner(field)


	function winner(arr){
			const WIN_PATTERNS = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8], // Варианты побед по горизонтали
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8], // Варианты побед по вертикали
				[0, 4, 8],
				[2, 4, 6], // Варианты побед по диагонали
			];
			for (let index = 0; index < WIN_PATTERNS.length; index++) {
				const [a, b, c] = WIN_PATTERNS[index];
				if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
					return arr[a];
				}
			}
	}


	const walk = (isDraw === false && isGameEnded === false ? `Ход: ${currentPlayer}` : "");
	const drow = (isDraw === false ? "" : "Ничья");
	const win = (isDraw === false && isGameEnded === true ? `Победил: ${currentPlayer}`: "");

	const choice = (i) => {
		const FIELD_ARR = [...field]
		if (winnerGame){
			setIsGameEnded(true);
			setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
			return null
		}
		if (!winnerGame && FIELD_ARR[i]) {
			setIsDraw(true);
			return null;
		}
		setField(FIELD_ARR)
		FIELD_ARR[i] = currentPlayer;
		setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

		console.log(FIELD_ARR);
	}

	const newGame = () => {
		setCurrentPlayer('X');
		setIsDraw(false)
		setIsGameEnded(false)
		setField(Array(9).fill(null));
	}

	return (
		<>
			<InfoLayout walk={walk} drow={drow} winO={win} />
			<div className={styles.field}>
				{<Field arr={field} click={choice} />}
				<button className={styles.newGame} onClick={newGame}>Начать сначала</button>
			</div>
		</>
	);
}

export default App;
