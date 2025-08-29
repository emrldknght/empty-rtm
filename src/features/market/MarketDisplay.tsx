// MarketDisplay.tsx
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ConfirmPopup from '@/features/confirm/ConfirmPopup';
import { BuyMarket } from '@/features/eng_old/BuyMarket';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import MarketDisplayItem from '@/features/market/MarketDisplayItem';
import MarketFilters from '@/features/market/MarketFilters';
import PagingDisplay from '@/features/paging/PagingDisplay';
import TooltipItem from '@/features/tooltip/TooltipItem';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { useMarketStore } from '@/store/marketStore';
import type { MarketItem } from '@/types/Market';

/*
import ConfirmPopup from '~/src/feat_static/confirm/ConfirmPopup';
import { FRAME_DIV_TARGET, SECTION_KEY } from '~/src/feat_static/eng_old';
import { BuyMarket } from '~/src/feat_static/eng_old/BuyMarket';
import { MakeInfo } from '~/src/feat_static/eng_old/MakeInfo';
import MarketDisplayItem from '~/src/feat_static/market/MarketDisplayItem';
import MarketFilters from '~/src/feat_static/market/MarketFilters';
import PagingDisplay from '~/src/features/paging/PagingDisplay';
import TooltipItem from '~/src/features/tooltip/TooltipItem';
import { useMarketStore } from '~/src/stores/useMarketStore'; // Zustand store
import type { MarketItem } from '~/src/types/Market';

 */

/*
// Portal container (equivalent to Teleport) - todo - check confirm logic
const ConfirmOverlayContainer = () => {
  const el = document.getElementById('confirm-overlay-container');
  return el ? ReactDOM.createPortal(<ConfirmPopupContent />, el) : null;
};

 */

const MarketDisplay: React.FC = () => {
	const {
		page,
		items,
		count,
		setPage,
		fetchMarketItems,
		// getItems, // getter (optional, you can just use `items`)
	} = useMarketStore();

	const [showConfirm, setShowConfirm] = useState(false);
	const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);

	// On mount: fetch market items
	useEffect(() => {
		fetchMarketItems();
	}, [fetchMarketItems]);

	// Handle page change
	const handleSetPage = async (newPage: number) => {
		console.log('set page', newPage);
		setPage(newPage);

		// Simulate MakeInfo call (adjust as needed)
		await MakeInfo(
			'',
			FRAME_DIV_TARGET.Center,
			SECTION_KEY.Market,
			newPage,
			'2',
		);

		// Fetch updated items (already triggered by filter actions, but not by page change)
		// So we call it here if needed — or ensure `setPage` doesn't auto-fetch
		// Currently, in Zustand store, `setPage` doesn't auto-fetch, so we do it:
		await fetchMarketItems();
	};

	const handleBuy = (item: MarketItem) => {
		setSelectedItem(item);
		setShowConfirm(true);
	};

	const cancelBuy = () => {
		setSelectedItem(null);
		setShowConfirm(false);
	};

	const processBuy = async () => {
		if (!selectedItem) {
			return;
		}

		const { ID, Name, Cost } = selectedItem;
		await BuyMarket(ID, Name, Cost, `mthing${ID}`);

		// Refresh market items after purchase
		await fetchMarketItems();
		cancelBuy(); // close modal
	};

	const confirmContainerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		confirmContainerRef.current = document.getElementById(
			'confirm-overlay-container',
		) as HTMLDivElement | null;
	}, []);

	return (
		<div>
			{/* Tooltip */}
			<TooltipItem />

			{/* Confirm Popup Portal (Teleport equivalent) */}
			{/* <ConfirmOverlayContainer /> */}
			{/* Portal: Confirm Popup */}
			{showConfirm &&
				confirmContainerRef.current &&
				ReactDOM.createPortal(
					<ConfirmPopup
						message={`Приобрести предмет ${selectedItem?.Name} за $${selectedItem?.Cost}?`}
						onConfirm={processBuy}
						onClose={cancelBuy}
					/>,
					confirmContainerRef.current,
				)}

			<div className="w-100 cs-0 cp-2 col">
				<div className="tableheader">
					<b className="highlight">Невидимая рука рынка:</b>
				</div>
				<MarketFilters />
			</div>

			{/* Top Pagination */}
			<PagingDisplay
				currentPage={page}
				totalItems={count}
				itemsOnPage={20}
				onPageChange={handleSetPage}
			/>

			{/* Market Items List */}
			{/* todo - check typings */}
			{items.map((item) => (
				<MarketDisplayItem
					key={item?.id || item.ID}
					item={item}
					onBuy={handleBuy}
				/>
			))}

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

/*
// ConfirmPopupContent — extracted for portal
const ConfirmPopupContent: React.FC = () => {
  const { showConfirm, selectedItem } = useMarketStore(); // assuming you moved showConfirm/selectedItem into Zustand, OR use context/state

  // But since `showConfirm` and `selectedItem` are local UI state, better keep them local
  // So this version assumes you pass them via context or lift state up.
  // For simplicity, we'll assume you manage confirm state in Zustand or via a separate context.
  // Alternatively, render ConfirmPopup directly in DOM (see below alternative).
  return null;
};

 */

export default MarketDisplay;
