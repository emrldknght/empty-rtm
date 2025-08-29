// BaseInventoryItem.tsx
import type React from 'react';
import { BuyInventory } from '@/features/eng_old/BuyInventory';

// Props interface
interface BaseInventoryItemProps {
	itemKey: string;
	label: string;
	amount: number;
	maxAmount: number;
	cost: number;
	isCurrent: boolean;
}

const BaseInventoryItem: React.FC<BaseInventoryItemProps> = ({
	itemKey,
	label,
	amount,
	maxAmount,
	cost,
	isCurrent,
}) => {
	const handleBuy = (e: React.MouseEvent) => {
		e.preventDefault();
		BuyInventory(itemKey);
	};

	// Don't render if maxAmount is 0 or falsy
	if (!maxAmount) {
		return null;
	}

	return (
		<div className="row">
			<div style={{ width: '200px' }}>{label}</div>
			<div style={{ whiteSpace: 'nowrap' }}>
				{amount} / {maxAmount}
			</div>
			<div style={{ width: '130px', whiteSpace: 'nowrap' }} className="al-left">
				&nbsp;
				{amount < maxAmount && isCurrent && (
					<button type="button" className="href-button" onClick={handleBuy}>
						Купить (${cost})
					</button>
				)}
			</div>
		</div>
	);
};

export default BaseInventoryItem;
