// CombatList.tsx
import type React from 'react';
import { useEffect } from 'react';
import CombatListItem from '@/features/combat_list/CombatListItem';
import { MakeDiv } from '@/features/eng_old/MakeDiv';
import { useMainStore } from '@/store/mainStore';

const CombatList: React.FC = () => {
	const { fetchCombatList, combatList } = useMainStore();

	// Fetch on mount
	useEffect(() => {
		fetchCombatList();
	}, [fetchCombatList]);

	// Computed: list from store
	const list = combatList; // assuming it's already an array

	return (
		<div data-id="combat-list-wrapper">
			{/* Header */}
			<table className="w-100 cs-0">
				<tbody>
					<tr className="tableheader">
						<td>
							<b>&nbsp;Ваши бои:</b>
						</td>
					</tr>
				</tbody>
			</table>

			{/* Combat List */}
			<table className="w-100 cs-0">
				<tbody>
					{list.map((item) => (
						<CombatListItem key={item.CombatId} item={item} />
					))}
				</tbody>
			</table>

			<br />

			{/* Navigation Button */}
			<div className="center">
				<input
					type="button"
					className="training"
					value="Перейти к списку бойцов"
					onClick={() => MakeDiv('leftdiv', 'clubmembers')}
				/>
			</div>
		</div>
	);
};

export default CombatList;
