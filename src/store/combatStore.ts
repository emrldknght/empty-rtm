// stores/combat.ts
import { create } from 'zustand';
import { getCombat } from '@/api/getCombat';
import { useMainStore } from '@/store/mainStore';
import type { CombatRecord } from '@/types/CombatRecord';
import type { UserCombatRecord } from '@/types/UserCombatRecord';

// State interface
interface CombatStoreState {
	data?: UserCombatRecord;
	log: CombatRecord[];
	id: number;
	last: number;
	show: boolean;
	loading: boolean;

	// Actions
	setShow: (show: boolean) => void;
	fetchCombat: (id: number, last: number) => Promise<void>;
}

/**
 * Zustand store for combat display
 * Works in both React and Vue (if needed)
 */
export const useCombatStore = create<CombatStoreState>((set, get) => ({
	// Initial state
	data: undefined,
	log: [],
	id: 0,
	last: 0,
	show: false,
	loading: false,

	// Action: Show/hide combat panel
	setShow: (show: boolean) => {
		set((state) => {
			if (!show) {
				return {
					show: false,
					log: [], // Clear log when hidden
				};
			}
			return { show };
		});
	},

	// Action: Fetch combat data
	fetchCombat: async (id: number, last: number) => {
		const mainStore = useMainStore();
		const token = mainStore.authToken;

		if (!token) {
			console.error('No auth token available');
			return;
		}

		set({ id, last, show: true, loading: true });

		try {
			const { data, log } = await getCombat(token, id, last);
			set({ data, log, loading: false });
		} catch (error) {
			console.error('Failed to fetch combat:', error);
			set({ loading: false });
		}
	},
}));
