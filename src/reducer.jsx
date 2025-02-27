const initialStore = {
	currentPlayer: "X",
	isGameEnded: false,
	isDraw: false,
	field: Array(9).fill(null)
};

export const appReducer = (state = initialStore, action) => {

	switch (action.type) {
		case "SET_CURRENT_PLAYER":
			return {
				...state,
				currentPlayer: action.payload,
			};
		case "SET_FIELD":
			return {
				...state,
				field: action.payload,
			};
		case "IS_DROW":
			return {
				...state,
				isDraw: action.payload,
			};
		case "IS_GAME_ENDED":
			return {
				...state,
				isGameEnded: action.payload,
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
