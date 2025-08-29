// MarketDisplayItem.tsx

import Image from 'next/image';
import type React from 'react';
import ItemInfoGraph from '@/features/items/ItemInfoGraph';
import ItemStatsDisplay from '@/features/items/ItemStatsDisplay';
import useTooltip from '@/features/tooltip/useTooltip';
import type { MarketItem } from '@/types/Market';
import { WButton } from '@/ui/WButton';

// Props definition
interface MarketDisplayItemProps {
	item: MarketItem;
	onBuy: (item: MarketItem) => void;
}

const MarketDisplayItem: React.FC<MarketDisplayItemProps> = ({
	item,
	onBuy,
}) => {
	const { handleMouseOver, handleMouseOut, handleMouseMove } = useTooltip();

	const handleClickBuy = () => {
		onBuy(item);
	};

	return (
		<div id={`mthing${item.ID}`} className="w-100 cs-0 cp-2">
			{/* Seller Info */}
			<div className="tableheader">
				{item.UserName} [{item.UserClub}]
			</div>

			{/* Item Row */}
			<div id={`amount_${item.ID}`} className="row">
				{/* Item Image + Flavor Text Tooltip */}
				<div className="al-center" style={{ width: '80px' }}>
					<span
						data-title={item.FlaverText}
						role="img"
						aria-label={`Предмет: ${item.Name}. ${item.FlaverText}`}
						onMouseOver={() => handleMouseOver(item.FlaverText)}
						onFocus={() => handleMouseOver(item.FlaverText)}
						onMouseMove={handleMouseMove}
						onMouseOut={handleMouseOut}
						onBlur={handleMouseOut}
					>
						<Image
							className="inventorything"
							src={item.Image}
							alt="thing image"
						/>
						<ItemInfoGraph item={item} />
					</span>
				</div>

				{/* Item Name and Stats */}
				<div className="col v-top market-display-item--summary">
					<span className="highlight">{item.Name}</span>
					<ItemStatsDisplay item={item} /> {/* Fixed: was string "item" */}
				</div>

				{/* Spacer */}
				<div style={{ width: '46px' }}>&nbsp;</div>

				{/* Buy Section */}
				<div className="col" style={{ gap: '1em' }}>
					<div>Стоимость: {item.SellCost}</div>
					<WButton
						type="button"
						className="training"
						label="Приобрести"
						onClick={handleClickBuy}
					/>
				</div>
			</div>

			{/* Spacer */}
			<div>&nbsp;</div>
		</div>
	);
};

export default MarketDisplayItem;
