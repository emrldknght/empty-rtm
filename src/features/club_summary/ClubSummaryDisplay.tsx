// ClubSummaryDisplay.tsx
import React, { useEffect, useState } from 'react';
import { myClubReviewGet } from '@/api/myClubReviewGet';
import ClubSummaryHeader from '@/features/club_summary/ClubSummaryHeader';
import ClubSummaryItem from '@/features/club_summary/ClubSummaryItem';
import { useMainStore } from '@/store/mainStore';
import type { FighterRecord } from '@/types/Fighter';

const ClubSummaryDisplay: React.FC = () => {
	const { authToken } = useMainStore();
	const [fighters, setFighters] = useState<FighterRecord[]>([]);

	const [sort, setSort] = useState<string>('');
	const [sortOrderDesc, setSortOrderDesc] = useState<boolean>(true);

	// if (!authToken) { return <div>no auth...</div>;	}

	// Fetch data on mount
	useEffect(() => {
		const fetchFighters = async () => {
			if (!authToken) {
				return;
			}
			try {
				const res = await myClubReviewGet(authToken);
				console.log('Fetched fighters:', res);
				setFighters(res.data);
			} catch (error) {
				console.error('Failed to fetch club review:', error);
				setFighters([]);
			}
		};

		fetchFighters();
	}, [authToken]);

	// Sorted fighters
	const sortedFighters = React.useMemo(() => {
		if (!sort) {
			return fighters;
		}

		return [...fighters].sort((a, b) => {
			const aa = a[sort as keyof FighterRecord];
			const bb = b[sort as keyof FighterRecord];

			if (aa < bb) {
				return sortOrderDesc ? 1 : -1;
			}
			if (aa > bb) {
				return sortOrderDesc ? -1 : 1;
			}
			return 0;
		});
	}, [fighters, sort, sortOrderDesc]);

	// Handle sort change
	const handleSort = (param: string) => {
		if (sort === param) {
			setSortOrderDesc((prev) => !prev);
		} else {
			setSort(param);
			setSortOrderDesc(true);
		}
	};

	if (!authToken) {
		return <div>no auth...</div>;
	}

	return (
		<table
			className="mark1 w-100"
			style={{ touchAction: 'none', fontSize: '14px' }}
		>
			<tbody>
				<ClubSummaryHeader
					sort={sort}
					sortOrderDesc={sortOrderDesc}
					onSort={handleSort}
				/>
				{sortedFighters.map((fighter) => (
					<ClubSummaryItem key={fighter.ID} fighter={fighter} />
				))}
			</tbody>
		</table>
	);
};

export default ClubSummaryDisplay;
