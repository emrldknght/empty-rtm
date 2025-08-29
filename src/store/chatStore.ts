// store/chatStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { chatGet } from '@/api/chatGet';
import { chatPost } from '@/api/chatPost';
import { useMainStore } from '@/store/mainStore';
import type { ChatRecord } from '@/types/Chat';

// Define types
interface ChatPostMessage {
	name?: string;
	text: string;
}

interface ChatStore {
	messages: ChatRecord[];
	show: boolean;
	loading: boolean;

	// Actions
	setShow: (show: boolean) => void;
	fetchChat: (messageID?: number) => Promise<void>;
	postMessage: (data: ChatPostMessage) => Promise<void>;
	clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
	persist(
		(set, get) => ({
			// Initial state
			messages: [],
			show: false,
			loading: false,

			// Set visibility
			setShow: (show: boolean) => {
				set({ show });
				if (show) {
					get().fetchChat(); // Optionally load messages when opening
				}
			},

			// Fetch chat messages
			fetchChat: async (messageID = 0) => {
				if (!get().show) return;

				const { authToken } = useMainStore.getState();
				if (!authToken) return;

				const lastMessage = get().messages.at(-1);
				const lastMessageId = lastMessage ? lastMessage.ID : 0;
				const fetchId = messageID || lastMessageId;

				set({ loading: true });
				try {
					const res = await chatGet(authToken, fetchId);
					const messages = res.messages || [];

					set((state) => {
						console.log(fetchId, 'chat', messages);
						if (fetchId) {
							console.log('with id - add', messages);
							return {
								messages: messages.length
									? [...state.messages, ...messages]
									: state.messages,
							};
						} else {
							console.log('no id - set', messages);
							return { messages };
						}
					});
				} catch (error) {
					console.error('Failed to fetch chat:', error);
				} finally {
					set({ loading: false });
				}
			},

			// Post a new message
			postMessage: async (data: ChatPostMessage) => {
				const mainStore = useMainStore();
				const authToken = mainStore.authToken;
				if (!authToken) return;

				// Inject user name if not provided
				const name = data.name || mainStore.user?.Name || 'Anonymous';

				try {
					await chatPost(authToken, { ...data, name });
					// Optionally refetch or optimistic update
					// get().fetchChat(); // uncomment if you want to refresh after send
				} catch (error) {
					console.error('Failed to send message:', error);
				}
			},

			// Optional: clear messages
			clearMessages: () => {
				set({ messages: [] });
			},
		}),
		{
			name: 'chat-store', // key in localStorage / AsyncStorage
			storage: createJSONStorage(() => localStorage), // Use AsyncStorage for React Native
			partialize: (state) => ({
				// Persist only what you need
				messages: state.messages,
				show: state.show,
			}),
		},
	),
);
