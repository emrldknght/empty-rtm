// RecruitsDisplayHeader.tsx
import type React from 'react';
import { SORT_KEYS } from '@/features/club_summary';

// Props interface
interface RecruitsSortHeaderProps {
	onSort: (param: string) => void;
	sort: string;
	sortOrderDesc: boolean;
}

const RecruitsDisplayHeader: React.FC<RecruitsSortHeaderProps> = ({
	onSort,
}) => {
	const handleClickSort = (e: React.MouseEvent, param: string) => {
		e.preventDefault();
		onSort(param);
		// Legacy: MakeSort(`id`,`centerdiv`,`freefighters`); return false;
		return false;
	};

	return (
		<tr className="head">
			{/* Fighter Name */}
			<td>
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.ID)}
				>
					Боец:
				</button>
			</td>

			{/* Height / Weight / Age */}
			<td className="al-right">
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Height)}
				>
					Рост
				</button>
				/
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Weight)}
				>
					Вес
				</button>
				/
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Age)}
				>
					Возраст:
				</button>
			</td>

			{/* Stats: Strength, Dexterity, Stamina */}
			<td className="al-right">
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Strength)}
				>
					С:
				</button>
			</td>
			<td className="al-right">
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Dexterity)}
				>
					Л:
				</button>
			</td>
			<td className="al-right">
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Stamina)}
				>
					В:
				</button>
			</td>

			{/* Effectiveness */}
			<td className="al-right">
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Effectiveness)}
				>
					Эфф.:
				</button>
			</td>

			{/* Action (no sort) */}
			<td className="al-right">Действие:</td>
		</tr>
	);
};

export default RecruitsDisplayHeader;
