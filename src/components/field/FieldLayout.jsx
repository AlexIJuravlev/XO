import styles from './styles.module.css'

export default function FieldLayout({ text, onClick }) {
	return (
		<>
			<button className={styles.fieldButton} onClick={onClick}>
				{text}
			</button>
		</>
	);
}

