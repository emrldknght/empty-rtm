// RepairItem.tsx

import Image from 'next/image';
import type React from 'react';
import { RepairThing } from '@/features/eng_old/RepairThing';
import ItemStatsDisplay from '@/features/items/ItemStatsDisplay';
import type { ItemRecord } from '@/types/Item';

// Extend ItemRecord with repair-specific fields
export interface RepairItemRecord extends ItemRecord {
	RepairCost: number;
	DressedBy: string;
}

// Props interface
interface RepairItemProps {
	item: RepairItemRecord;
}

const RepairItem: React.FC<RepairItemProps> = ({ item }) => {
	const handleRepair = () => {
		// Call legacy global function
		RepairThing(item.ID, item.Name, '');
	};

	return (
		<tr id={`amount_${item.ID}`} className="repair-item">
			{/* Item Image */}
			<td className="al-center" style={{ width: '80px' }}>
				<span title={item.FlaverText}>
					<Image
						className="inventorything"
						src={item.Image}
						alt="thing img"
						width={80}
						height={80}
					/>
				</span>
			</td>

			{/* Item Name & Stats */}
			<td className="col v-top">
				<span className="highlight">{item.Name}</span>
				<ItemStatsDisplay item={item} />
			</td>

			{/* Spacer */}
			<td style={{ width: '46px' }} />

			{/* Repair Info & Action */}
			<td>
				<span>
					Надета:
					<br />
					{item.DressedBy}
				</span>
				<br />
				<br />
				Цена ремонта: {item.RepairCost}
				<br />
				<br />
				<input
					type="button"
					className="training"
					value="Починить"
					onClick={handleRepair}
				/>
			</td>
		</tr>
	);
};

export default RepairItem;
