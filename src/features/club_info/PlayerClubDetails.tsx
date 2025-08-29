'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { useClubInfoStore } from '@/features/club_info/clubInfoStore';
import { SORT_KEYS } from '@/features/club_summary';
import ClubsListItem from '@/features/clubs_list/ClubsListItem';
import FightersListItem from '@/features/fighters_list/FightersListItem';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { useMainStore } from '@/store/mainStore';
import type { FighterRecord } from '@/types/Fighter';

// Types
type SortKey = 'ID' | 'Effectiveness'; // or use SORT_KEYS type

export const PlayerClubDetails: React.FC<{ playerId?: string | null }> = ({
	playerId,
}) => {
	const { setSection } = useMainStore();
	const { selectedClubInfo, fetchSelectedClubInfo } = useClubInfoStore();

	// Fetch on mount or when playerId changes
	useEffect(() => {
		if (!playerId) {
			return;
		}
		fetchSelectedClubInfo(playerId);
	}, [playerId, fetchSelectedClubInfo]);

	const club = selectedClubInfo;
	const info = club?.info;
	const fighters = club?.fighters || [];

	// Sort state
	const [sort, setSort] = React.useState<SortKey | ''>('');
	const [sortOrderDesc, setSortOrderDesc] = React.useState<boolean>(true);

	// Memoized sorted fighters
	const fightersSorted = useMemo(() => {
		if (!sort) {
			return fighters;
		}

		return [...fighters].sort((a, b) => {
			const aa = a[sort];
			const bb = b[sort];

			if (aa < bb) {
				return sortOrderDesc ? 1 : -1;
			}
			if (aa > bb) {
				return sortOrderDesc ? -1 : 1;
			}
			return 0;
		});
	}, [fighters, sort, sortOrderDesc]);

	const handleSetSort = useCallback(
		// todo - check typings
		(e: React.MouseEvent, param: SortKey | keyof FighterRecord) => {
			e.preventDefault();
			console.log('Sorting by:', param);

			if (param === sort) {
				setSortOrderDesc((prev) => !prev);
			} else {
				setSort(param as SortKey);
				setSortOrderDesc(true);
			}
		},
		[sort],
	);

	const handleReturn = useCallback(() => {
		setSection(FRAME_DIV_TARGET.Center, SECTION_KEY.Clubs);
	}, [setSection]);

	if (!club) {
		return <div>Загрузка информации о клубе...</div>;
	}

	return (
		<div className="player_club_details">
			{/* Club Header */}
			{info && <ClubsListItem idx={0} club={info} />}

			{/* Hidden field (legacy) */}
			<div className="left-location" style={{ display: 'none' }}>
				clubmembers
			</div>

			{/* Fighters Table */}
			<table className="c_remove mark1 w-100" style={{ touchAction: 'none' }}>
				<tbody>
					<tr>
						<td className="head">
							<button
								type="button"
								className="href-button"
								onClick={(e) => handleSetSort(e, SORT_KEYS.ID)}
							>
								Бойцы:
							</button>
						</td>
						<td className="al-right">
							<button
								type="button"
								className="href-button"
								onClick={(e) => handleSetSort(e, SORT_KEYS.Effectiveness)}
							>
								Эфф.:
							</button>
						</td>
					</tr>
					{fightersSorted.map((fighter) => (
						<FightersListItem key={fighter.ID} fighter={fighter} />
					))}
				</tbody>
			</table>

			{/* Back Button */}
			<div style={{ textAlign: 'center', marginTop: '10px' }}>
				<input
					type="button"
					value="К списку клубов"
					className="training"
					onClick={handleReturn}
				/>
			</div>
		</div>
	);
};

export default PlayerClubDetails;
