// stores/useBaseStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getMyBase } from '@/api/getMyBase';
import { useMainStore } from '@/store/mainStore';
import type { BaseRecord, BaseTemplateRecord } from '@/types/Base';

// State interface
interface BaseStoreType {
	baseList: BaseTemplateRecord[];
	currentId: number;
	currentBase: BaseRecord | null; // Record<string, never>; // `unknown` not ideal for partials
	watchers: number;

	// Actions
	fetchMyBase: () => Promise<void>;
	setCurrentBase: (base: BaseRecord) => void;
	setCurrentId: (id: number) => void;
}

export const useBaseStore = create<BaseStoreType>()(
	persist(
		(set, _get) => ({
			// Initial state
			baseList: [],
			currentId: 0,
			currentBase: null,
			watchers: 0,

			// Actions
			fetchMyBase: async () => {
				const { authToken } = useMainStore.getState();
				if (!authToken) {
					return;
				}

				try {
					const { list, currentId, currentBase, watchers } =
						await getMyBase(authToken);
					set({
						baseList: list,
						currentId,
						currentBase,
						watchers,
					});
				} catch (error) {
					console.error('Failed to fetch base data:', error);
					// Optionally reset or set error state
				}
			},

			setCurrentBase: (base: BaseRecord) => set({ currentBase: base }),
			setCurrentId: (id: number) => set({ currentId: id }),
		}),
		{
			name: 'base-store', // localStorage key
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				currentId: state.currentId,
				currentBase: state.currentBase,
				watchers: state.watchers,
			}),
		},
	),
);
