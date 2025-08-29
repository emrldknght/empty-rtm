// ThingsFilter.tsx
import type React from 'react';
import { l } from '@/locales';
import { useClubThingsStore } from '@/store/clubThingsStore';
import { BodyPart, ItemTypes, WeaponTypes } from '@/types/Item';
import { ItemTypeFilterEl } from './ItemTypeFilterEl';

export const ThingsFilter: React.FC<{
	children?: React.ReactNode;
	armorSort?: React.ReactNode;
}> = ({ children, armorSort }) => {
	const {
		itemTypeFilter,
		weaponTypeFilter,
		armorPartFilter,
		setItemTypeFilter,
		setWeaponTypeFilter,
		setArmorPartFilter,
	} = useClubThingsStore();

	return (
		<fieldset className="row" style={{ gap: 8, padding: '4px' }}>
			{/* Item Type Filter */}
			<ItemTypeFilterEl
				label={`${l('item')}:`}
				filter={itemTypeFilter}
				types={ItemTypes}
				onUpdateFilter={setItemTypeFilter}
			/>

			{/* Weapon Type Filter */}
			{itemTypeFilter === ItemTypes.Weapon && (
				<ItemTypeFilterEl
					label={`${l('type')}:`}
					filter={weaponTypeFilter}
					types={WeaponTypes}
					onUpdateFilter={setWeaponTypeFilter}
				/>
			)}

			{/* Armor Part Filter */}
			{itemTypeFilter === ItemTypes.Armor && (
				<>
					<ItemTypeFilterEl
						label={`${l('part')}:`}
						filter={armorPartFilter}
						types={BodyPart}
						onUpdateFilter={setArmorPartFilter}
					/>
					{armorSort}
				</>
			)}

			{/* Additional filters or buttons */}
			{children}
		</fieldset>
	);
};
