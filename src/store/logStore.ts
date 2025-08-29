// store/useLogStore.ts
import { create } from 'zustand';

import { getLogMessages } from '@/api/getLogMessages';
import { useMainStore } from '@/store/mainStore';
import type { LogMessageRecord } from '@/types/LogMessageRecord';

// 🔹 State Interface
interface MessagesSliceState {
	messages: LogMessageRecord[];
	loading: boolean;
	error: string | null;
}

// 🔹 Actions Interface
interface MessagesSliceActions {
	setMessages: (messages: LogMessageRecord[]) => void;
	addMessage: (message: LogMessageRecord) => void;
	updateMessages: () => Promise<void>;
	clearMessages: () => void;
}

// 🔹 Full Store Type
type LogStore = MessagesSliceState & MessagesSliceActions;

export const useLogStore = create<LogStore>()((set, get) => ({
	// Initial state
	messages: [],
	loading: false,
	error: null,

	// Set all messages
	setMessages: (messages: LogMessageRecord[]) => {
		set({ messages, error: null });
	},

	// Add a single message
	addMessage: (message: LogMessageRecord) => {
		set((state) => ({
			messages: [...state.messages, message],
		}));
	},

	// Fetch latest messages
	updateMessages: async () => {
		console.log('updateMessages');

		const { authToken } = useMainStore.getState();

		if (!authToken) {
			set({ error: 'No auth token available' });
			return;
		}

		set({ loading: true, error: null });

		try {
			const lastMessage = get().messages.at(-1);
			const lastMessageId = lastMessage ? lastMessage.id : -1;

			console.log(get().messages.length, 'lastMessageId', lastMessageId);

			const logMessages = await getLogMessages(authToken, 0); // Adjust API if it supports delta fetching
			set({ messages: logMessages });
		} catch (err) {
			const error = err instanceof Error ? err.message : 'Unknown error';
			set({ error });
			console.error('Failed to fetch log messages:', error);
		} finally {
			set({ loading: false });
		}
	},

	// Optional: clear messages
	clearMessages: () => {
		set({ messages: [] });
	},
}));
