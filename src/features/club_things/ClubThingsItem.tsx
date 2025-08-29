// InventoryItem.tsx

import Image from 'next/image';
import type React from 'react';
import { ClearParts } from '@/features/eng_old/ClearParts';
import { Dress } from '@/features/eng_old/Dress';
import { DropThing } from '@/features/eng_old/DropThing';
import { HighlightParts } from '@/features/eng_old/HighlightParts';
import { MarketSell } from '@/features/eng_old/MarketSell';
import type { ItemRecord } from '@/types/Item';

type Props = {
	item: ItemRecord;
};

const ClubThingsItem: React.FC<Props> = ({ item }) => {
	const {
		ID,
		Name,
		Durability,
		MaxDurability,
		Weight,
		Authentic,
		Beauty,
		Image: ItemImage,
	} = item;

	// Generate HTML tooltip content
	const getTitle = () => `
    <b>${Name}</b><br>
    Закрывает: <br>
    Прочность: ${Durability}/${MaxDurability}<br>
    Вес: ${Weight} кг<br>
    Аутентичность: ${Authentic}<br>
    Внешний вид: ${Beauty}<br>
  `;

	// Legacy handlers (assumed to be global JS functions)
	const handleSell = (e: React.MouseEvent) => {
		e.preventDefault();
		MarketSell(ID, Name);
	};

	const handleDrop = (e: React.MouseEvent) => {
		e.preventDefault();
		DropThing(ID, Name, `invcell_${ID}`);
	};

	const handleDress = (e: React.MouseEvent) => {
		e.preventDefault();
		Dress(ID, '');
	};

	const handleMouseOver = () => {
		HighlightParts('', ItemImage);
	};

	const handleMouseOut = () => {
		ClearParts();
	};

	return (
		<td
			style={{ width: '62px' }}
			align="center"
			className="invcell"
			valign="top"
		>
			<br />
			<div id={`invcell_${ID}`} className="ordinary">
				{/* Item Image with Tooltip */}
				<span title={getTitle()} data-html="true">
					<Image
						id={`ithing_${ID}`}
						className="inventorything"
						src={ItemImage}
						alt={Name}
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
						onClick={handleDress}
						style={{ cursor: 'pointer' }}
					/>
				</span>

				{/* Actions */}
				<div className="center">
					<button
						type="button"
						className="href-button invmenu"
						onClick={handleSell}
					>
						Продать
					</button>
					<br />
					<button
						type="button"
						className="href-button invmenu"
						onClick={handleDrop}
					>
						Выкинуть
					</button>
				</div>
			</div>
		</td>
	);
};

export default ClubThingsItem;
