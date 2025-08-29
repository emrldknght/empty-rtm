// DonateItem.tsx

import Image from 'next/image';
import type React from 'react';
import { API_PATH } from '@/api/const';
import type { DonationRecord } from '@/types/DonationRecord';

// Props interface
interface DonateItemProps {
	item: DonationRecord;
	onPurchase: (id: DonationRecord['ID']) => void;
}

const DonateItem: React.FC<DonateItemProps> = ({ item, onPurchase }) => {
	const handlePurchase = () => {
		onPurchase(item.ID);
	};

	return (
		<>
			{/* Item Image */}
			<td style={{ width: '80px' }}>
				<span title={item.FlaverText}>
					{/* todo - convert to Image component */}
					<Image
						className="inventorything"
						src={`${API_PATH}${item.Image}`}
						alt="thing img"
					/>
				</span>
			</td>

			{/* Item Info & Buy Button */}
			<td className="v-top">
				<span className="highlight">{item.Name}</span>
				<br />
				Цена: ₽{item.Cost}
				<br />
				<br />
				<input
					type="button"
					className="training"
					value="Купить"
					onClick={handlePurchase}
				/>
			</td>
		</>
	);
};

export default DonateItem;
