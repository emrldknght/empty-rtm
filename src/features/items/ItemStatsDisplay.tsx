// ItemStatsDisplay.tsx
import type React from 'react';
import { getItemBodyParts } from '@/features/items/getItemBodyParts';
import { type ItemRecord, ItemTypes } from '@/types/Item';
import type { MasterThingsRecord } from '@/types/Masters';

// Union type for item prop
type ItemStatsProps = {
	item: ItemRecord | MasterThingsRecord;
};

const ItemStatsDisplay: React.FC<ItemStatsProps> = ({ item }) => {
	return (
		<>
			{/* Armor Stats */}
			{item.Class === ItemTypes.Armor && (
				<>
					<span>Защита: {item.Defence}</span>
					{/* todo - check cast to type */}
					<span>Закрывает: {getItemBodyParts(item as ItemRecord)}</span>
				</>
			)}

			{/* Shield Stats */}
			{item.Class === ItemTypes.Shield && (
				<>
					<span>Защита: {item.Defence}</span>
					<span>Сила удара: {item.Damage}</span>
					<span>Скорость: {item.Speed}</span>
					<span>Длина: {item.Length}</span>
					<span>Травматичность: {item.Trauma}</span>
				</>
			)}

			{/* Weapon Stats */}
			{item.Class === ItemTypes.Weapon && (
				<>
					<span>Сила удара: {item.Damage}</span>
					<span>Скорость: {item.Speed}</span>
					<span>Длина: {item.Length}</span>
					<span>Травматичность: {item.Trauma}</span>
					<span>Тип: {item.DamageType}</span>
					<span>Хват: {item.Hands}</span>
				</>
			)}

			{/* Common Stats (always shown) */}
			<span>
				Прочность: {item.Durability}/{item.MaxDurability}
			</span>
			<span>Вес: {item.Weight} кг</span>
			<span>Аутентичность: {item.Authentic}</span>
			<span>Внешний вид: {item.Beauty}</span>
		</>
	);
};

export default ItemStatsDisplay;
