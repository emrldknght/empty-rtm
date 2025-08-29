// DurabilityBar.tsx
import type React from 'react';

// Define item type
type DurabilityItem = {
	durability: number;
	maxdurability: number;
};

type Props = {
	item: DurabilityItem | null | undefined;
};

// Helper to calculate class based on durability percentage
const getDurabilityClass = (item: DurabilityItem): string => {
	const ratio = item.durability / item.maxdurability;

	if (ratio > 0.75) {
		return 'dur-bar--good';
	}
	if (ratio > 0.5) {
		return 'dur-bar--warn';
	}
	if (ratio > 0.25) {
		return 'dur-bar--low';
	}
	return 'dur-bar--critical';
};

const ItemDurability: React.FC<Props> = ({ item }) => {
	// Don't render if no item
	if (!item) {
		return null;
	}

	const { durability, maxdurability } = item;
	const className = `dur-bar ${getDurabilityClass(item)}`;

	return (
		<span className={className} style={{ pointerEvents: 'none' }}>
			{durability}/{maxdurability}
		</span>
	);
};

export default ItemDurability;
