// RepairDisplay.tsx
import type React from 'react';
import { useEffect } from 'react';

import { LoaderComponent } from '@/features/loader/LoaderComponent';
import PagingDisplay from '@/features/paging/PagingDisplay';
import RepairItem from '@/features/repair/RepairItem';
import { useRepairStore } from '@/features/repair/repairStore'; // Zustand store

const RepairDisplay: React.FC = () => {
	const { items, count, page, loading, setPage, fetchRepairItems } =
		useRepairStore();

	// Load items on mount
	useEffect(() => {
		fetchRepairItems();
	}, [fetchRepairItems]);

	const handleSetPage = async (newPage: number) => {
		setPage(newPage);
		await fetchRepairItems(); // Fetch items for new page
	};

	return (
		<div>
			{/* Top Pagination */}
			<PagingDisplay
				currentPage={page}
				totalItems={count}
				itemsOnPage={20}
				onPageChange={handleSetPage}
			/>

			{/* Loader */}
			{loading && <LoaderComponent />}

			{/* Items Table */}
			{!loading && (
				<table className="mark1 w-100 cs-0 cp-2">
					<tbody>
						{items.map((item) => (
							<RepairItem key={item.ID} item={item} />
						))}
					</tbody>
				</table>
			)}

			{/* Bottom Pagination */}
			<PagingDisplay
				currentPage={page}
				totalItems={count}
				itemsOnPage={20}
				onPageChange={handleSetPage}
			/>
		</div>
	);
};

export default RepairDisplay;
