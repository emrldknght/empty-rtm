// MastersItem.tsx

import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import ItemInfoGraph from '@/features/items/ItemInfoGraph';
import ItemStatsDisplay from '@/features/items/ItemStatsDisplay'; // Assuming this is a constant object
import type { MasterThingsRecord } from '@/types/Masters';
import { FORGES } from './index';

// Props interface
interface MastersItemProps {
	item: MasterThingsRecord;
	onPurchase: (payload: { id: number; amount: number }) => void;
}

const MastersItem: React.FC<MastersItemProps> = ({ item, onPurchase }) => {
	const [amount, setAmount] = useState<number>(1);

	const handlePurchase = () => {
		onPurchase({
			id: item.ID,
			amount,
		});
	};

	return (
		<tr id={`am_${item.ID}`}>
			{/* Item Image */}
			<td className="al-center" style={{ width: '80px' }}>
				<span title={item.FlaverText}>
					<Image className="inventorything" src={item.Image} alt="thing img" />
					<ItemInfoGraph item={item} />
				</span>
			</td>

			{/* Item Name & Stats */}
			<td className="col v-top" style={{ width: '210px' }}>
				<span className="highlight">{item.Name}</span>
				<br />
				<ItemStatsDisplay item={item} />
				<br />
			</td>

			{/* Spacer */}
			<td style={{ width: '46px' }} />

			{/* Purchase Controls */}
			<td>
				<br />
				Количество: <span id={`amount_${item.ID}`}>{item.Amount}</span> шт.
				<br />
				Производитель: {FORGES[item.Forgery]?.name || 'Неизвестно'}
				<br />
				Стоимость: {item.Cost}
				<br />
				<input
					id={`opt_${item.ID}`}
					type="number"
					min="1"
					max={item.Amount}
					step="1"
					value={amount}
					onChange={(e) => {
						const value = parseInt(e.target.value, 10);
						setAmount(
							Number.isNaN(value)
								? 1
								: Math.max(1, Math.min(value, item.Amount)),
						);
					}}
					className="training"
					style={{ width: '60px' }}
				/>
				<input
					type="button"
					className="training"
					value="Приобрести"
					onClick={handlePurchase}
				/>
			</td>
		</tr>
	);
};

export default MastersItem;
