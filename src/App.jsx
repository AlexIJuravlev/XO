
import Field from './components/field/field';
import InfoLayout from './components/Information/infoLayout';
import styles from "./App.module.css";
import { useEffect, useState } from 'react';
import { store } from './store';

function App() {
	const [ current, setCurrent ] = useState(store.getState().currentPlayer);
	const [ fieldNow, setFieldNow ] = useState(store.getState().field);
	const winnerGame = winner(fieldNow);


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

	useEffect(() => {
			const unsubscribe = store.subscribe(() =>{
				setCurrent(store.getState().currentPlayer)
				setFieldNow(store.getState().field);
			store.getState()
			});
		return () => unsubscribe()
	}, [])





	const newCurrent = current === "X" ? "O" : "X";

	const choice = (i) => {
		const FIELD_ARR = fieldNow
		if (winnerGame){
			store.dispatch({ type: "IS_GAME_ENDED", payload: true });
			store.dispatch({
				type: "SET_CURRENT_PLAYER",
				payload: newCurrent,
			});
			return null
		}
		if (!winnerGame && FIELD_ARR[i]) {
			store.dispatch({ type: "IS_DROW", payload: true });
			return null;
		}
		setFieldNow(FIELD_ARR);
		FIELD_ARR[i] = current
		store.dispatch({
				type: "SET_CURRENT_PLAYER",
				payload: newCurrent,
			});

		console.log(store.getState().currentPlayer);

		console.log(FIELD_ARR);

	}

	const newGame = () => {
		// setCurrentPlayer('X');
		// setIsDraw(false)
		// setIsGameEnded(false)
		// setFieldNow(Array(9).fill(null));
		store.dispatch({ type: 'RESTART_GAME' });

	}

	return (
		<>
			<InfoLayout />
			<div className={styles.field}>
				{<Field click={choice} />}
				<button className={styles.newGame} onClick={newGame}>Начать сначала</button>
			</div>
		</>
	);
}

export default App;
