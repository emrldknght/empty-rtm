// MarketFilters.tsx
import type React from 'react';
import { ItemTypeFilterEl } from '@/features/club_things/ItemTypeFilterEl';
import { l } from '@/locales';
import { useMarketStore } from '@/store/marketStore';
import { BodyPart, ItemTypes, WeaponTypes } from '@/types/Item';

// Props for extra slots (children)
interface MarketFiltersProps {
	children?: React.ReactNode;
	armorSort?: React.ReactNode; // Named slot equivalent
}

const MarketFilters: React.FC<MarketFiltersProps> = ({
	children,
	armorSort,
}) => {
	const {
		itemTypeFilter,
		weaponTypeFilter,
		armorPartFilter,
		setItemTypeFilter,
		setWeaponTypeFilter,
		setArmorPartFilter,
	} = useMarketStore();

	const itemTypeFilterOnUpdate = (type: ItemTypes) => {
		setItemTypeFilter(type);
	};

	const weaponTypeFilterOnUpdate = (type: WeaponTypes) => {
		setWeaponTypeFilter(type);
	};

	const armorPartFilterOnUpdate = (type: BodyPart) => {
		setArmorPartFilter(type);
	};

	return (
		<fieldset className="row" style={{ gap: '8px', padding: '4px' }}>
			{/* Item Type Filter (All, Weapon, Armor, etc.) */}
			<ItemTypeFilterEl
				label={`${l('item')}:`}
				filter={itemTypeFilter}
				types={ItemTypes}
				onUpdateFilter={itemTypeFilterOnUpdate}
			/>

			{/* Weapon Type Filter (only if itemType is Weapon) */}
			{itemTypeFilter === ItemTypes.Weapon && (
				<ItemTypeFilterEl
					label={`${l('type')}:`}
					filter={weaponTypeFilter}
					types={WeaponTypes}
					onUpdateFilter={weaponTypeFilterOnUpdate}
				/>
			)}

			{/* Armor Part Filter (only if itemType is Armor) */}
			{itemTypeFilter === ItemTypes.Armor && (
				<>
					<ItemTypeFilterEl
						label={`${l('part')}:`}
						filter={armorPartFilter}
						types={BodyPart}
						onUpdateFilter={armorPartFilterOnUpdate}
					/>
					{armorSort}
				</>
			)}

			{/* Default slot */}
			{children}
		</fieldset>
	);
};

export default MarketFilters;
