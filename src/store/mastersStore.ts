// stores/useMastersStore.ts
import { create } from 'zustand';
import { mastersGet } from '@/api/mastersGet';
import { BuyMasters } from '@/features/eng_old/BuyMasters';
import { useMainStore } from '@/store/mainStore';
import type { MasterThingsRecord } from '@/types/Masters';

// State interface
interface MastersStoreType {
	items: MasterThingsRecord[];
	count: number;
	page: number;
	forgeFilter: string;
	itemTypeFilter: string;
	loading: boolean;

	// Actions
	setPage: (page: number) => void;
	fetchMasters: () => Promise<void>;
	setForgeFilter: (filter: string) => void;
	setItemTypeFilter: (filter: string) => void;
	buyItem: (id: number, amount: number) => Promise<any>;
}

export const useMastersStore = create<MastersStoreType>()((set, get) => ({
	// Initial state
	items: [],
	count: 0,
	page: 1,
	forgeFilter: '',
	itemTypeFilter: '',
	loading: false,

	// Actions
	setPage: (page: number) => set({ page }),

	fetchMasters: async () => {
		const { forgeFilter, itemTypeFilter, page } = get();
		const { authToken } = useMainStore();

		if (!authToken) {
			return;
		}

		set({ loading: true });
		try {
			const data = await mastersGet(
				authToken,
				page,
				forgeFilter,
				itemTypeFilter,
			);
			const { items = [], count = 0 } = data;

			if (!items) {
				return;
			}

			set({ items, count });
		} catch (error) {
			console.error('Failed to fetch masters items:', error);
			set({ items: [], count: 0 });
		} finally {
			set({ loading: false });
		}
	},

	setForgeFilter: (filter: string) => set({ forgeFilter: filter }),

	setItemTypeFilter: (filter: string) => set({ itemTypeFilter: filter }),

	buyItem: async (id: number, amount: number) => {
		const { forgeFilter, page, itemTypeFilter } = get();

		const res = await BuyMasters(id, forgeFilter, amount, page, itemTypeFilter);
		console.log(res);

		if (res && res.status === 200) {
			// Refresh list on success
			await get().fetchMasters();
		} else {
			console.error(res);
		}

		return res;
	},
}));
