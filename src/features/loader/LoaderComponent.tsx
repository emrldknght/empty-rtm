import type React from 'react';
import styles from './LoaderComponent.module.css';

export const LoaderComponent: React.FC = () => {
	return (
		<div className={styles.loaderWrapper}>
			<div className={styles.loader} />
		</div>
	);
};
