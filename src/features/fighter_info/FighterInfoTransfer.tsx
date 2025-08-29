// FighterInfoTransfer.tsx
import type React from 'react';
import { useState } from 'react';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import { TransferSell } from '@/features/eng_old/TransferSell';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import type { FighterRecord } from '@/types/Fighter';

interface FighterInfoTransferProps {
	id: FighterRecord['ID'];
}

const FighterInfoTransfer: React.FC<FighterInfoTransferProps> = ({ id }) => {
	const [price, setPrice] = useState<number | string>(9.5);

	const handleTransfer = () => {
		// Ensure price is a number
		const numPrice = typeof price === 'string' ? parseFloat(price) : price;

		if (Number.isNaN(numPrice) || numPrice < 0) {
			alert('Please enter a valid price.');
			return;
		}

		// Call legacy functions
		TransferSell(id, numPrice);
		MakeInfo(id, FRAME_DIV_TARGET.Left, SECTION_KEY.FighterInfo);
		MakeInfo('', FRAME_DIV_TARGET.Center, SECTION_KEY.Transfer);
	};

	return (
		<div className="center">
			Трансфер: $
			<input
				type="number"
				step="0.01"
				min="0"
				value={price}
				onChange={(e) =>
					setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))
				}
				className="fightercost training"
				style={{ maxWidth: '70px' }}
				size={4}
			/>
			{/* todo - convert to Button component */}
			<input
				type="button"
				className="training"
				value="Разместить"
				onClick={handleTransfer}
			/>
		</div>
	);
};

export default FighterInfoTransfer;
