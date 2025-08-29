// FighterInfoClothesSlot.tsx

import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import { Dress } from '@/features/eng_old/Dress';
import useTooltip from '@/features/tooltip/useTooltip';
import type { ItemRecord } from '@/types/Item';

interface FighterInfoClothesSlotProps {
	id?: string;
	name: string;
	item: ItemRecord | undefined;
	className?: string;
}

const FighterInfoClothesSlot: React.FC<FighterInfoClothesSlotProps> = ({
	id,
	name,
	item,
	className,
}) => {
	const { handleMouseOver, handleMouseOut, handleMouseMove } = useTooltip();
	const [_isHovered, setIsHovered] = useState(false);

	const getTitle = (): string => {
		if (!item) {
			return '';
		}

		const {
			Name,
			Defence,
			Damage,
			Speed,
			Length,
			Trauma,
			DamageType,
			Hands,
			Durability,
			MaxDurability,
			Weight,
			Authentic,
			Beauty,
		} = item;

		let ttl = '';
		ttl += `<b>${Name}</b><br/>`;
		if (Defence) {
			ttl += `Защита: ${Defence}%<br/>`;
		}
		if (Damage) {
			ttl += `Сила удара: ${Damage}<br/>`;
		}
		if (Speed) {
			ttl += `Скорость: ${Speed}<br/>`;
		}
		if (Length) {
			ttl += `Длина: ${Length} м<br/>`;
		}
		if (Trauma) {
			ttl += `Травматичность: ${Trauma}<br/>`;
		}
		if (DamageType) {
			ttl += `Тип: ${DamageType}<br/>`;
		}
		if (Hands) {
			ttl += `Хват: ${Hands}<br/>`;
		}
		ttl += `Прочность: ${Durability}/${MaxDurability}<br/>`;
		ttl += `Вес: ${Weight} кг<br/>`;
		ttl += `Аутентичность: ${Authentic}<br/>`;
		ttl += `Внешний вид: ${Beauty}<br/>`;

		return ttl;
	};

	const tooltipTitle = getTitle();

	return (
		<div id={id} className={`cloththing ${className}`}>
			{item ? (
				<>
					<div className="dressed">
						<button
							type="button"
							className="href-button"
							data-title={tooltipTitle}
							onMouseOver={(_e) => {
								handleMouseOver(tooltipTitle);
								setIsHovered(true);
							}}
							onFocus={(_e) => {
								handleMouseOver(tooltipTitle);
								setIsHovered(true);
							}}
							onMouseMove={handleMouseMove}
							onMouseOut={(_e) => {
								handleMouseOut();
								setIsHovered(false);
							}}
							onBlur={(_e) => {
								handleMouseOut();
								setIsHovered(false);
							}}
							onClick={() => Dress(item.ID, 'off')}
						>
							<Image
								id={`ithing_${item.ID}`}
								className="dressed"
								src={item.Image}
								alt="thing image"
							/>
						</button>
					</div>

					{/* Show defence % for non-weapon slots */}
					{id !== 'righthand' && id !== 'lefthand' && item.Defence && (
						<div id={`defence_${item.ID}`} className="dresseddef">
							{item.Defence}%
						</div>
					)}
				</>
			) : (
				<span className="inthing">{name}</span>
			)}

			{/* Hidden helper div */}
			<div id={`h_${id}`} className="hide">
				&nbsp;
			</div>
		</div>
	);
};

export default FighterInfoClothesSlot;
