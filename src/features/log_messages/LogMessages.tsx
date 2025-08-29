// components/LogMessages.tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ConfirmPopup from '@/features/confirm/ConfirmPopup';
import { DelMess } from '@/features/eng_old/DelMess';
import LogMessagesItem from '@/features/log_messages/LogMessagesItem';
import { useLogStore } from '@/store/logStore';

export const LogMessages = () => {
	const { messages, updateMessages } = useLogStore();

	const [showConfirm, setShowConfirm] = useState(false);

	// Fetch messages on mount
	useEffect(() => {
		console.log('LogMessages mounted');
		updateMessages();
		const interval = setInterval(() => {
			updateMessages();
		}, 5000); // Poll every 5s (matches original)

		return () => clearInterval(interval);
	}, [updateMessages]);

	const handleClearAllMessages = () => {
		setShowConfirm(true);
	};

	const handleConfirm = () => {
		DelMess('all');
		setShowConfirm(false);
	};

	const handleCloseConfirm = () => {
		setShowConfirm(false);
	};

	return (
		<div>
			{/* Portal: Confirm Popup */}
			{showConfirm &&
				typeof window !== 'undefined' &&
				createPortal(
					<ConfirmPopup
						message="Удалить все сообщения?"
						onConfirm={handleConfirm}
						onClose={handleCloseConfirm}
					/>,
					document.getElementById('confirm-overlay-container') || document.body,
				)}

			{/* Header */}
			<table className="mark1 w-100 cs-0 cp-0">
				<tbody>
					<tr>
						<td>&nbsp;Сообщения:</td>
						<td className="al-right">
							<button
								type="button"
								className="href-button"
								title="Удалить все сообщения"
								style={{ padding: 0, margin: 0, cursor: 'pointer' }}
								onClick={handleClearAllMessages}
							>
								X&nbsp;
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			<div data-id="mid">&nbsp;</div>

			{/* Message List */}
			<div data-id="messagecontainer" className="message--container">
				{messages.map((message) => (
					<LogMessagesItem
						key={message.id}
						id={message.id}
						timeS={message.TimeS}
						timeF={message.TimeF}
						messageHtml={message.MessageHtml}
						messageClass={message.MessageClass}
					/>
				))}
			</div>

			{/* Commented script logic — replaced with useEffect polling */}
		</div>
	);
};
