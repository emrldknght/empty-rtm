// stores/useRecruitsStore.ts
import { create } from 'zustand';
import { recruitsGetList } from '@/features/recruits/recruitsGetList';
import { useMainStore } from '@/store/mainStore';
import type { FighterRecord } from '@/types/Fighter';

// State interface
interface RecruitsStoreType {
	recruits: FighterRecord[];
	count: number;
	page: number;
	loading: boolean;

	// Actions
	fetchRecruits: () => Promise<void>;
	setPage: (page: number) => void;
}

export const useRecruitsStore = create<RecruitsStoreType>()((set, get) => ({
	// Initial state
	recruits: [],
	count: 0,
	page: 1,
	loading: false,

	// Actions
	fetchRecruits: async () => {
		const { page } = get();
		const { authToken } = useMainStore();

		if (!authToken) {
			return;
		}

		set({ loading: true });
		try {
			const data = await recruitsGetList(authToken, page);
			set({
				recruits: data.list || [],
				count: data.count || 0,
			});
		} catch (error) {
			console.error('Failed to fetch recruits:', error);
			set({ recruits: [], count: 0 });
		} finally {
			set({ loading: false });
		}
	},

	setPage: (page: number) => {
		set({ page });
		get().fetchRecruits(); // Fetch after updating page
	},
}));
