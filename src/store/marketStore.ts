import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getMarket } from '@/api/getMarket';
import { useMainStore } from '@/store/mainStore';
import { BodyPart, ItemTypes, WeaponTypes } from '@/types/Item';
import type { MarketItem } from '@/types/Market';

// Define state shape
interface MarketStoreType {
	items: MarketItem[];
	count: number;
	page: number;

	// Filters
	itemTypeFilter: ItemTypes;
	weaponTypeFilter: WeaponTypes;
	armorPartFilter: BodyPart;
}

// Define actions
interface MarketActions {
	setPage: (page: number) => void;
	fetchMarketItems: () => Promise<void>;
	setItemTypeFilter: (type: ItemTypes) => void;
	setWeaponTypeFilter: (type: WeaponTypes) => void;
	setArmorPartFilter: (type: BodyPart) => void;
}

// Combined store type
type MarketStore = MarketStoreType & MarketActions;

// Initial state
const initialState: Omit<MarketStoreType, 'items'> & { items: MarketItem[] } = {
	items: [],
	count: 0,
	page: 1,
	itemTypeFilter: ItemTypes.All,
	weaponTypeFilter: WeaponTypes.All,
	armorPartFilter: BodyPart.All,
};

export const useMarketStore = create<MarketStore>()(
	persist(
		(set, get) => ({
			...initialState,

			// Actions
			setPage: (page: number) => {
				set({ page });
				get().fetchMarketItems();
			},

			fetchMarketItems: async () => {
				const { page, itemTypeFilter, weaponTypeFilter, armorPartFilter } =
					get();
				const { authToken } = useMainStore();

				if (!authToken) {
					return;
				}

				try {
					const data = await getMarket(authToken, page, {
						itemTypeFilter,
						weaponTypeFilter,
						armorPartFilter,
					});

					set({
						items: data.items || [],
						count: data.count || 0,
					});
				} catch (error) {
					console.error('Failed to fetch market items:', error);
					set({ items: [], count: 0 });
				}
			},

			setItemTypeFilter: (type: ItemTypes) => {
				set({ itemTypeFilter: type, page: 1 });
				get().fetchMarketItems();
			},

			setWeaponTypeFilter: (type: WeaponTypes) => {
				set({ weaponTypeFilter: type, page: 1 });
				get().fetchMarketItems();
			},

			setArmorPartFilter: (type: BodyPart) => {
				set({ armorPartFilter: type, page: 1 });
				get().fetchMarketItems();
			},
		}),
		{
			name: 'marketStore', // localStorage key
			storage: createJSONStorage(() => localStorage), // use localStorage
			// Only persist filters, not page or items
			partialize: (state) => ({
				itemTypeFilter: state.itemTypeFilter,
				weaponTypeFilter: state.weaponTypeFilter,
				armorPartFilter: state.armorPartFilter,
			}),
		},
	),
);

// Optional: getter-style selector (use via hook)
// Usage: const items = useMarketStore((s) => s.items);
// Or expose a getter function if preferred
