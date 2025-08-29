import type { ItemRecord } from '@/types/Item';

export const getEquippedWith = (
	itemClasses: ItemRecord['Class'][],
	itemTypes: ItemRecord['Type'][],
) => {
	let shield = '';
	let weapon = '';
	let ttl = '';

	if (!itemClasses || !itemTypes) {
		return { shield, weapon, ttl };
	}

	const hasShield = itemClasses.find((item) => item === 'shield');
	if (hasShield) {
		shield = 'shield.png';
		weapon = 'shield.png';
		ttl = 'Вооружен только щитом';
	}

	/*
  * if ($weapon=='sword.png') {$ttl='Вооружен одноручным мечом';}
        if ($weapon=='sword_shield.png') {$ttl='Вооружен одноручным мечом и щитом';}
        if ($weapon=='mace.png') {$ttl='Вооружен дробящим оружием';}
        if ($weapon=='mace_shield.png') {$ttl='Вооружен дробящим оружием и щитом';}
        if ($weapon=='bastard.png') {$ttl='Вооружен полутораручным мечом';}
        if ($weapon=='polearm.png') {$ttl='Вооружен древковым оружием';}
  * */

	// const hasWeapon = itemClasses.findIndex((item) => item === 'weapon');
	const hasWeapon = itemClasses.indexOf('weapon');
	if (hasWeapon > -1) {
		const hasWeaponType = itemTypes[hasWeapon];

		switch (hasWeaponType) {
			case 'sword':
				weapon = 'sword.png';
				ttl = 'Вооружен одноручным мечом';
				if (hasShield) {
					weapon = 'sword_shield.png';
					ttl = 'Вооружен одноручным мечом и щитом';
				}
				break;
			case 'bastard':
				weapon = 'bastard.png';
				ttl = 'Вооружен полутораручным мечом';
				break;
			case 'morningstar':
				weapon = 'mace.png';
				ttl = 'Вооружен дробящим оружием';
				if (hasShield) {
					weapon = 'mace_shield.png';
					ttl = 'Вооружен дробящим оружием и щитом';
				}
				break;
			case 'polyarm':
				weapon = 'polearm.png';
				ttl = 'Вооружен древковым оружием';
				break;

			default:
				break;
		}
		// weapon = hasShield ? 'sword_shield.png' : 'sword.png';
	}
	return {
		weapon,
		shield,
		ttl,
	};
};
