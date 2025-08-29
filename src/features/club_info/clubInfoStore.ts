// stores/clubInfoStore.ts
import { create } from 'zustand';
import { getClubInfo } from '@/features/club_info/getClubInfo';
import { useMainStore } from '@/store/mainStore';
import type { ClubRecord } from '@/types/ClubRecord';
import type { FighterRecord } from '@/types/Fighter';

// Define the structure of selected club info
interface SelectedClubInfo {
	info: ClubRecord;
	fighters: FighterRecord[];
}

// Store state type
interface ClubInfoStoreType {
	selectedClubInfo: SelectedClubInfo | null;
}

// Actions type
interface ClubInfoActions {
	fetchSelectedClubInfo: (playerId: string | null) => Promise<void>;
}

// Full store type
type ClubInfoStore = ClubInfoStoreType & ClubInfoActions;

export const useClubInfoStore = create<ClubInfoStore>()((set) => ({
	selectedClubInfo: null,

	fetchSelectedClubInfo: async (playerId: string | null) => {
		const { authToken } = useMainStore();

		if (!playerId) {
			set({ selectedClubInfo: null });
			return;
		}

		if (!authToken) {
			set({ selectedClubInfo: null });
			return;
		}

		try {
			const clubInfo = await getClubInfo(playerId, authToken);
			set({ selectedClubInfo: clubInfo });
		} catch (error) {
			console.error(`Failed to fetch club info for player ${playerId}:`, error);
			set({ selectedClubInfo: null });
		}
	},
}));
