// CombatListItem.tsx
import type React from 'react';
import './CombatListItem.css';
import { ShowCombat } from '@/features/eng_old/ShowCombat';
import type { UserCombatRecord } from '@/types/UserCombatRecord';

type Props = {
	item: UserCombatRecord;
};

const CombatListItem: React.FC<Props> = ({ item }) => {
	const getClass = () => {
		if (item.Result === 'win' && item.Status === 'finished') {
			return 'combat-list-item--id combat-list-item--id-win';
		}
		if (item.Result === 'lose' && item.Status === 'finished') {
			return 'combat-list-item--id combat-list-item--id-lose';
		}
		return '';
	};

	const getClassLetter = () => {
		switch (item.Class) {
			case 'frendlycombats':
				return 'Д';
			case 'festival':
				return 'Ф';
			case 'championship':
				return 'Ч';
			default:
				return '';
		}
	};

	const getStatus = () => {
		return item.Status === 'finished'
			? 'Закончен'
			: item.Status === 'active'
				? 'Идет'
				: '';
	};

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		// Simulate: Clear combat log, set ID, show combat
		// $('#combatlog').html('');
		// $('#combatid').text(item.CombatId);
		// $('#cmblast').text(0);
		ShowCombat(item.CombatId, 0);
		// $('#combatsshow').toggle(10);
	};

	return (
		<tr id={`lscmb_${item.CombatId}`}>
			{/* Combat ID + Status + Date */}
			<td>
				№&nbsp;
				<button
					type="button"
					className={`href-button ${getClass()}`}
					onClick={handleClick}
				>
					{item.CombatId}&nbsp;
				</button>
				<span style={{ fontSize: '12px' }}>{getStatus()}</span>
				&nbsp;
				{item.Date && <span style={{ fontSize: '12px' }}>{item.Date}</span>}
			</td>

			{/* Combat Type Letter */}
			<td width="20">
				<span title="Д - дружеский, Ф - фестивальный, Ч - чемпионат">
					{getClassLetter()}
				</span>
			</td>
		</tr>
	);
};

export default CombatListItem;
