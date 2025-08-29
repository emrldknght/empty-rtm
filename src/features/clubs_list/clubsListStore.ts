// stores/useClubsListStore.ts

import { create } from 'zustand';
import { getClubsList } from '@/features/clubs_list/getClubsList';
import { useMainStore } from '@/store/mainStore'; // assuming this is still available (e.g., in shared logic)
import type { ClubRecord } from '@/types/ClubRecord';

// Define the state and actions interface
interface ClubsListStoreState {
	clubsList: ClubRecord[];
	page: number;
	total: number;

	// Actions
	fetchClubsList: () => Promise<void>;
	setPage: (page: number) => void;
}

// Zustand Store
export const useClubsListStore = create<ClubsListStoreState>((set, get) => ({
	clubsList: [],
	page: 1,
	total: 0,

	setPage: (page: number) => set({ page }),

	fetchClubsList: async () => {
		const { authToken } = useMainStore(); // ⚠️ Caution: see note below
		const { page } = get();

		if (!authToken) {
			return;
		}

		try {
			const res = await getClubsList(page, authToken);
			set({ clubsList: res.list, total: res.count });
		} catch (error) {
			console.error('Failed to fetch clubs list:', error);
			set({ clubsList: [], total: 0 });
		}
	},
}));
