import styles from './info.module.css'


export default function Info({ walk, drow, winO }) {
	return (
		<>
			<div className={styles.main}>
				<h1>Крестики нолики</h1>
				<div className={styles.walk}>{walk}</div>
				<div className={styles.walk}>{drow}</div>
				<div className={styles.walk}>{winO}</div>
			</div>
		</>
	);
}
