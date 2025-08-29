'use client';

// components/ClubName.tsx
import type React from 'react';
import type { IUserRecord } from '@/types/IUserRecord';

interface ClubNameProps {
	user: IUserRecord;
}

export const ClubName: React.FC<ClubNameProps> = ({ user }) => {
	return (
		<div className="club_name w-100 row" style={styles.container}>
			<div style={styles.left}>
				<span>Клуб: «{user.Club}»</span>
				<span>({user.Name})</span>
			</div>

			<div className="al-right rubles" style={styles.rubles}>
				₽{' '}
				<span data-id="rubles" className="rubles">
					{user.Roubles}
				</span>
				&nbsp;
			</div>

			<div className="al-right money" style={styles.money}>
				${' '}
				<span data-id="money" className="money">
					{user.Money}
				</span>
				&nbsp;
			</div>
		</div>
	);
};

// Optional: Inline styles (you can use CSS modules or Tailwind instead)
const styles = {
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '8px 12px',
		backgroundColor: '#f5f5f5',
		borderRadius: '4px',
		fontSize: '14px',
		fontWeight: 'normal',
	} as const,
	left: {
		display: 'flex',
		gap: '8px',
	} as const,
	rubles: {
		color: 'green',
		fontWeight: 'bold',
		marginLeft: 'auto',
		textAlign: 'right' as const,
	},
	money: {
		color: 'blue',
		fontWeight: 'bold',
		marginLeft: '16px',
		textAlign: 'right' as const,
	},
};
