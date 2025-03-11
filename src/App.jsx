
import Field from './components/field/field';
import InfoLayout from './components/Information/infoLayout';
import styles from "./App.module.css";
import { connect, useDispatch, useSelector } from 'react-redux';
import {
	SelectCurrent,
	SelectField,
} from "./components/selectors";
import { RESTART_GAME, IS_GAME_ENDED, SetCurrentPlayer, IS_DROW } from "./components/action";
import { Component } from 'react';

function App() {

	const filids = useSelector(SelectField);
	const current = useSelector(SelectCurrent)
	const dispatch = useDispatch()
	const winnerGame = winner(filids);

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

	const newCurrent = current === "X" ? "O" : "X";

	const choice = (i) => {
		if (winnerGame){
			dispatch(IS_GAME_ENDED);
			return null
		}
		if (!winnerGame && filids[i]) {
			dispatch(IS_DROW);
			return null;
		}
		if(!winnerGame){
		dispatch(SetCurrentPlayer(newCurrent));
		}
		filids[i] = current;

	}

	const newGame = () => {
		dispatch(RESTART_GAME);
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

export class OldApp extends Component {
	constructor(props){
		super(props)


		this.choice = this.choice.bind(this)
		this.winner = this.winner.bind(this)
		this.newGame = this.newGame.bind(this)
	}

	winner(arr){
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

	dispatchOldApp = (dispatch) => ({
		winner: () => dispatch(IS_GAME_ENDED),
		drowN: () => dispatch(IS_DROW),
		current: () => dispatch(SetCurrentPlayer(this.curent)),
		newG: () => dispatch(RESTART_GAME)
	})

	choice(i){
				if (this.props.winnerGame) {
					this.winner()

					return null;
				}
				if (!this.props.winnerGame && this.props.field[i]) {
					this.drowN();

					return null;
				}
				if (!this.props.winnerGame) {
					this.current();
				}
				this.props.field[i] = this.state.current;

				connect(null, this.dispatchOldApp)(OldApp)
	}

	newGame(){
		this.newG()
	}

	render(){
				return <>
					<InfoLayout />
					<div className={styles.field}>
						{<Field click={this.choice} />}
						<button className={styles.newGame} onClick={this.newGame}>
							Начать сначала
						</button>
					</div>
				</>;
	}
}
