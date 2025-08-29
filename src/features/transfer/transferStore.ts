// store/useTransferStore.ts
import { create } from 'zustand';
import { getTransferList } from '@/api/getTransferList';
import { useMainStore } from '@/store/mainStore';
import type { FighterRecord } from '@/types/Fighter';

export interface Pagination {
	page: number;
	totalPages: number;
	totalItems: number;
	lim: number;
}

export interface TransferState {
	fighters: FighterRecord[];
	pagination: Pagination | null;
	page: number;
	loading: boolean;
	error: string | null;
	setPage: (page: number) => void;
	fetchTransferList: () => Promise<void>;
	reset: () => void;
}

export const useTransferStore = create<TransferState>((set, get) => ({
	fighters: [],

	pagination: null,
	page: 1,

	loading: false,
	error: null,

	setPage: (page: number) => set({ page }),

	fetchTransferList: async () => {
		const { authToken } = useMainStore();
		if (!authToken) {
			return;
		}

		set({ loading: true, error: null });

		try {
			const { page } = get();
			const data = await getTransferList(authToken, page);

			set({
				fighters: data.list,
				loading: false,
				error: null,
			});

			/*
      const formData = new URLSearchParams();
      formData.append('page', 'transfer');
      formData.append('transfer', '1');
      if (page > 1) formData.append('page_num', page.toString());

      const response = await fetch('/a.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authToken}`,
        },
        body: formData.toString(),
      });

      const html = await response.text();

      if (html.includes('Не сезон!')) {
        set({
          fighters: [],
          pagination: null,
          loading: false,
          error: 'Transfer market is only open from 19:00 to 22:00 MSK.',
        });
        return;
      }

      const { fighters, pagination } = parseTransferHtml(html, page);
       */
			// set({ fighters, pagination, loading: false });
		} catch (err) {
			set({
				error: (err as Error).message || 'Failed to load transfer list',
				loading: false,
			});
		}
	},

	reset: () => set({ fighters: [], pagination: null, error: null }),
}));

// 🔍 Parse HTML response (temporary until backend returns JSON)
