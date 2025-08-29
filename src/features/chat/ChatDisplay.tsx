// components/ChatDisplay.tsx
import {
	type FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { ChatMessage } from '@/features/chat/ChatMessage';
import { LoaderComponent } from '@/features/loader/LoaderComponent';
import { useChatStore } from '@/store/chatStore';
import { useMainStore } from '@/store/mainStore';
import type { ChatRecord } from '@/types/Chat';
import { WButton } from '@/ui/WButton';
import { WIcon } from '@/ui/WIcon';

export const ChatDisplay = () => {
	const { show, loading, messages, setShow, fetchChat, postMessage } =
		useChatStore();
	const { user } = useMainStore();

	const [inputValue, setInputValue] = useState('');

	const chatContentRef = useRef<HTMLDivElement>(null);
	const chatInputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	// Toggle chat visibility
	const handleClickChatSwitch = () => {
		setShow(!show);
	};

	// Scroll to bottom
	const scrollToBottom = useCallback(() => {
		if (chatContentRef.current) {
			chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
		}
	}, []);

	// Handle form submit
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!inputValue.trim() || !chatInputRef.current) {
			return;
		}

		await postMessage({ text: inputValue });
		setInputValue('');
		formRef.current?.reset();
		// Do not auto-scroll here — let message watcher handle it
	};

	// Handle cite
	const handleCite = (item: ChatRecord) => {
		if (chatInputRef.current) {
			chatInputRef.current.focus();
			setInputValue(`${item.Name} >> `);
		}
	};

	// Refresh chat manually
	const handleRefresh = () => {
		fetchChat();
	};

	// On mount: focus input, fetch chat, start polling
	useEffect(() => {
		if (show) {
			fetchChat();
			const timer = setInterval(() => {
				fetchChat();
			}, 15 * 1000);

			return () => clearInterval(timer);
		}
	}, [show, fetchChat]);

	// Focus input on mount and when chat opens
	useEffect(() => {
		if (show && chatInputRef.current) {
			chatInputRef.current.focus();
		}
	}, [show]);

	// Auto-scroll when messages or show changes
	useEffect(() => {
		if (show && messages.length > 0) {
			// Delay slightly to allow render
			const timeout = setTimeout(scrollToBottom, 300);
			return () => clearTimeout(timeout);
		}
	}, [messages, show, scrollToBottom]);

	if (!show) {
		return null;
	}

	return (
		<div className="chat chatroom" style={{ display: show ? 'block' : 'none' }}>
			{/* Chat Header */}
			<div
				className="chat_header row"
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					padding: '8px',
				}}
			>
				<span style={{ width: '97%' }}>&nbsp;Общение:</span>
				<WIcon
					iconName="hugeicons:refresh"
					onClick={handleRefresh}
					style={{ cursor: 'pointer' }}
				/>
				<WIcon
					iconName="hugeicons:arrow-down-01"
					className="chatheadersym al-right"
					onClick={handleClickChatSwitch}
					style={{ cursor: 'pointer', marginLeft: '8px' }}
				/>
			</div>

			{/* Loader */}
			{loading && <LoaderComponent />}

			{/* Chat Content */}
			<div
				className="chat--content"
				ref={chatContentRef}
				style={{
					maxHeight: '300px',
					overflowY: 'auto',
					flexGrow: 1,
					padding: '4px 0',
				}}
			>
				{messages.map((item) => (
					<ChatMessage
						key={item.ID}
						item={item}
						onCite={() => handleCite(item)}
					/>
				))}
			</div>

			{/* Chat Input Form */}
			<div className="chatpost">
				<form ref={formRef} onSubmit={handleSubmit}>
					{/*
					<input id="name" type="hidden" name="name" value={user?.Name || ''} />
					<div id="cid" style={{ display: 'none' }}>473</div>
					 */}
					<div
						className="row w-100"
						style={{ alignItems: 'center', gap: '4px' }}
					>
						<span>{user?.Name}:</span>
						<span style={{ flexGrow: 1 }}>
							<input
								ref={chatInputRef}
								name="msg"
								type="text"
								className="chat--input chatform"
								size={76}
								autoComplete="off"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								style={{ width: '100%', padding: '6px' }}
							/>
						</span>
						<span className="al-right">
							<WButton
								className="chat--button chatform"
								type="submit"
								label="Отправить"
							/>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};
