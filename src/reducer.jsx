const initialStore = {
	currentPlayer: "X",
	isGameEnded: false,
	isDraw: false,
	field: Array(9).fill(null)
};

export const appReducer = (state = initialStore, { type, payload }) => {

	switch (type) {
		case "SET_CURRENT_PLAYER":
			return {
				...state,
				currentPlayer: payload,
			};
		case "SET_FIELD":
			return {
				...state,
				field: payload,
			};
		case "IS_DROW":
			return {
				...state,
				isDraw: payload,
			};
		case "IS_GAME_ENDED":
			return {
				...state,
				isGameEnded: payload,
			};
		case "RESTART_GAME":
			return {
				currentPlayer: "X",
				isGameEnded: false,
				isDraw: false,
				field: Array(9).fill(null),
			};
		default:
			return state;
	}
};
