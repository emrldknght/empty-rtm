// stores/clubThingsStore.ts
import { create } from 'zustand';
import { getClubThings } from '@/api/getClubThings';
import { useMainStore } from '@/store/mainStore';
import { type ItemRecord, ItemType, ItemTypes } from '@/types/Item';

// State interface
interface ClubThingsState {
	dressed: number;
	items: ItemRecord[];
	total: number;
	undressed: number;

	// Filters
	itemTypeFilter: ItemTypes;
	weaponTypeFilter: ItemTypes;
	armorPartFilter: ItemTypes;

	// Actions
	fetchClubThings: () => Promise<void>;
	setItemTypeFilter: (type: ItemTypes) => void;
	setWeaponTypeFilter: (type: ItemTypes) => void;
	setArmorPartFilter: (type: ItemTypes) => void;

	// Derived state (computed)
	getItemsGrid: () => ItemRecord[][];
}

export const useClubThingsStore = create<ClubThingsState>((set, get) => ({
	// Initial state
	dressed: 0,
	items: [],
	total: 0,
	undressed: 0,
	itemTypeFilter: ItemTypes.All,
	weaponTypeFilter: ItemTypes.All,
	armorPartFilter: ItemTypes.All,

	// Actions
	fetchClubThings: async () => {
		const { authToken } = useMainStore();

		if (!authToken) {
			return;
		}

		try {
			const { dressed, items, total, undressed } =
				await getClubThings(authToken);

			set({ dressed, items, total, undressed });
		} catch (error) {
			console.error('Failed to fetch club things:', error);
			set({ items: [], total: 0, dressed: 0, undressed: 0 });
		}
	},

	setItemTypeFilter: (type: ItemTypes) => set({ itemTypeFilter: type }),
	setWeaponTypeFilter: (type: ItemTypes) => set({ weaponTypeFilter: type }),
	setArmorPartFilter: (type: ItemTypes) => set({ armorPartFilter: type }),

	// Getter: Computed derived state
	getItemsGrid: () => {
		const state = get();

		let filtered = state.items.filter((item) => !item.Dressed);

		// Filter by item type
		if (state.itemTypeFilter !== ItemTypes.All) {
			filtered = filtered.filter((item) => item.Class === state.itemTypeFilter);

			// Weapon subtype
			if (
				state.itemTypeFilter === ItemTypes.Weapon &&
				state.weaponTypeFilter !== ItemTypes.All
			) {
				filtered = filtered.filter(
					(item) => item.Type === state.weaponTypeFilter,
				);
			}

			// Armor body part
			if (
				state.itemTypeFilter === ItemTypes.Armor &&
				state.armorPartFilter !== ItemTypes.All
			) {
				filtered = filtered.filter(
					(item) => item.BodyPart === state.armorPartFilter,
				);
			}
		}

		// Split into 8-column grid
		const columnsNumber = 8;
		const grid: ItemRecord[][] = [];
		for (let i = 0; i < filtered.length; i += columnsNumber) {
			grid.push(filtered.slice(i, i + columnsNumber));
		}

		return grid;
	},
}));
