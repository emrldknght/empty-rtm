// FightersList.tsx
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { SORT_KEYS } from '@/features/club_summary';
import FightersListItem from '@/features/fighters_list/FightersListItem';
import { useFightersListStore } from '@/store/fightersListStore';

// Props for sorting (if you want to expose sorting externally later)
// type FightersListProps = {};

const FightersList = () => {
	const { fightersList, fetchFightersList } = useFightersListStore();

	// Local state for sorting
	const [sort, setSort] = useState<string>('');
	const [sortOrderDesc, setSortOrderDesc] = useState<boolean>(true);

	// Fetch fighters on mount
	useEffect(() => {
		fetchFightersList();
	}, [fetchFightersList]);

	// Handle sort change
	const handleSetSort = (param: string) => {
		if (sort === param) {
			setSortOrderDesc(!sortOrderDesc);
		} else {
			setSort(param);
			setSortOrderDesc(true);
		}
	};

	// Sort handler with preventDefault
	const sortById = (e: React.MouseEvent) => {
		e.preventDefault();
		handleSetSort(SORT_KEYS.ID);
	};

	const sortByEff = (e: React.MouseEvent) => {
		e.preventDefault();
		handleSetSort(SORT_KEYS.Effectiveness);
	};

	// Computed sorted list
	const sortedFighters = useMemo(() => {
		if (!sort) {
			return fightersList;
		}

		return [...fightersList].sort((a, b) => {
			const aa = a[sort as keyof typeof a];
			const bb = b[sort as keyof typeof b];

			if (aa < bb) {
				return sortOrderDesc ? 1 : -1;
			}
			if (aa > bb) {
				return sortOrderDesc ? -1 : 1;
			}
			return 0;
		});
	}, [fightersList, sort, sortOrderDesc]);

	return (
		<table className="c_remove c_mark1 w-100" style={{ touchAction: 'none' }}>
			<tbody>
				<tr>
					<td className="head">
						<button type="button" className="href-button" onClick={sortById}>
							Бойцы:
						</button>
						<span className="fighter-list-counter">
							{fightersList.length}/30
						</span>
					</td>
					<td className="al-right">
						<button type="button" className="href-button" onClick={sortByEff}>
							Эфф.
						</button>
						:
					</td>
				</tr>

				{/* Render sorted fighters */}
				{sortedFighters.map((fighter) => (
					<FightersListItem key={fighter.ID} fighter={fighter} />
				))}
			</tbody>
		</table>
	);
};

export default FightersList;
