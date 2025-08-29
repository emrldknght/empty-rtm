// stores/fightersListStore.ts
import { create } from 'zustand';
import { getFightersList } from '@/api/getFightersList';
import { useMainStore } from '@/store/mainStore';
import type { FighterRecord } from '@/types/Fighter';

// Define the store state and actions
interface FightersListStoreType {
	fightersList: FighterRecord[];

	// Actions
	fetchFightersList: () => Promise<void>;
}

export const useFightersListStore = create<FightersListStoreType>((set) => ({
	fightersList: [],

	fetchFightersList: async () => {
		const { authToken, user } = useMainStore();

		// Guard: do nothing if no user or auth
		if (!user || !authToken) {
			return;
		}

		try {
			const response = await getFightersList(user.ID, authToken);
			set({ fightersList: response.list });
		} catch (error) {
			console.error('Failed to fetch fighters list:', error);
			// Optionally set empty list or keep previous state
			set({ fightersList: [] });
		}
	},
}));

/* util functions
// Add a single fighter
* set((state) => ({
  fightersList: [...state.fightersList, newFighter],
}));

// Or reset
set({ fightersList: [] });
*  */
