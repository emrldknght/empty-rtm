// stores/useRepairStore.ts
import { create } from 'zustand';
import { repairGet } from '@/api/repairGet';
import type { RepairItemRecord } from '@/features/repair/RepairItem';
import { useMainStore } from '@/store/mainStore';

// State interface
interface RepairStoreType {
	// items: ItemRecord[]; // todo - check api typings
	items: RepairItemRecord[];
	count: number;
	page: number;
	forgeFilter: string;
	itemTypeFilter: string;
	loading: boolean;

	// Actions
	fetchRepairItems: () => Promise<void>;
	setPage: (page: number) => void;
}

export const useRepairStore = create<RepairStoreType>()((set, get) => ({
	// Initial state
	items: [],
	count: 0,
	page: 1,
	forgeFilter: '',
	itemTypeFilter: '',
	loading: false,

	// Actions
	fetchRepairItems: async () => {
		const { page } = get();
		const { authToken } = useMainStore();

		if (!authToken) {
			return;
		}

		set({ loading: true });
		try {
			const data = await repairGet(authToken, page);
			const { items = [], count = 0 } = data;
			set({ items, count });
		} catch (error) {
			console.error('Failed to fetch repair items:', error);
			set({ items: [], count: 0 });
		} finally {
			set({ loading: false });
		}
	},

	setPage: (page: number) => {
		set({ page });
		// Optionally auto-fetch on page change:
		// get().fetchRepairItems();
	},
}));
