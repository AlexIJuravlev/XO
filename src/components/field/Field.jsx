import { store } from "../../store";
import FieldLayout from "./FieldLayout";

export default function Field({ click }) {

	const { field } = store.getState()

	return (
		<>
			{field.map((item, i) => (
				<FieldLayout key={i} text={item} onClick={() => click(i)} />
			))}
		</>
	);
}
