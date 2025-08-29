// ClubsList.tsx

import React, { useEffect } from 'react';
import ClubsListItem from '@/features/clubs_list/ClubsListItem';
import { useClubsListStore } from '@/features/clubs_list/clubsListStore';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import PagingDisplay from '@/features/paging/PagingDisplay';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import type { ClubRecord } from '@/types/ClubRecord';

const CLUBS_PER_PAGE = 10;

const ClubsList: React.FC = () => {
	// Zustand store hooks
	const clubs = useClubsListStore((state) => state.clubsList);
	const page = useClubsListStore((state) => state.page);
	const total = useClubsListStore((state) => state.total);
	const setPage = useClubsListStore((state) => state.setPage);
	const fetchClubsList = useClubsListStore((state) => state.fetchClubsList);

	// Handle page change
	const handleSetPage = async (newPage: number) => {
		setPage(newPage);
		await fetchClubsList(); // pass token if updated store expects it
	};

	// On mount & when page changes
	useEffect(() => {
		fetchClubsList();
	}, [fetchClubsList]);

	const showClubInfo = (id: ClubRecord['ID']) => {
		MakeInfo(id, FRAME_DIV_TARGET.Center, SECTION_KEY.PlayerClubDetails, 1);
	};

	return (
		<section>
			{/* Header */}
			<table className="w-100 cs-0 cp-3">
				<tbody>
					<tr>
						<td className="tableheader highlight">Клубы:</td>
					</tr>
				</tbody>
			</table>
			<div style={{ height: '3px', border: 'none', margin: 0 }} />

			{/* Top Pagination */}
			<PagingDisplay
				currentPage={page}
				totalItems={total}
				itemsOnPage={CLUBS_PER_PAGE}
				onPageChange={handleSetPage}
			/>

			{/* Club List */}
			{clubs.map((item, idx) => (
				<React.Fragment key={item.ID}>
					<ClubsListItem idx={idx + 1} club={item} onInfo={showClubInfo} />
				</React.Fragment>
			))}

			{/* Bottom Pagination */}
			<PagingDisplay
				currentPage={page}
				totalItems={total}
				itemsOnPage={CLUBS_PER_PAGE}
				onPageChange={handleSetPage}
			/>
		</section>
	);
};

export default ClubsList;
