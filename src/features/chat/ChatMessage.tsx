// components/ChatMessage.tsx
import type React from 'react';

interface ChatRecord {
	ID: number;
	Name: string;
	Text: string;
	Time: number; // Unix timestamp (seconds)
}

interface ChatMessageProps {
	item: ChatRecord;
	onCite: (item: ChatRecord) => void;
}

// Helper: Pad number with leading zero
const pad = (d: number): string => d.toString().padStart(2, '0');

// Convert timestamp to DD.MM.YYYY
const getDateFromTimeStamp = (timestamp: number): string => {
	const date = new Date((timestamp + 10800) * 1000); // Add 3 hours (10800 sec) offset
	const dd = pad(date.getDate());
	const mm = pad(date.getMonth() + 1); // Month is 0-indexed
	const yyyy = date.getFullYear();
	return `${dd}.${mm}.${yyyy}`;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ item, onCite }) => {
	const handleClick = () => {
		onCite(item); // Trigger parent handler (e.g., fill input with "Name >> ")
	};

	return (
		<div>
			<span className="messagetime">[{getDateFromTimeStamp(item.Time)}]</span>
			<span>:{item.ID}:</span>
			<button
				type="button"
				className="chat-message-content--text"
				onClick={handleClick}
				style={{ cursor: 'pointer' }}
			>
				<strong>{item.Name}</strong>
			</button>
			: {item.Text} <br />
		</div>
	);
};
