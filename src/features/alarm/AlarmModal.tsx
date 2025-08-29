// components/AlarmModal.tsx
import type React from 'react';
import useAlarmStore from '@/features/alarm/useAlarmStore';

import './AlarmModal.css';
import parse from 'html-react-parser';

const AlarmModal: React.FC = () => {
	const { isOpen, header, text, closeAlarm } = useAlarmStore();

	if (!isOpen) return null;

	return (
		<div
			id="alarm"
			style={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				backgroundColor: 'white',
				padding: '20px',
				borderRadius: '8px',
				boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
				zIndex: 10000,
				width: '400px',
				textAlign: 'center',
				fontFamily: 'Arial, sans-serif',
				opacity: isOpen ? 1 : 0,
				pointerEvents: isOpen ? 'auto' : 'none',
				transition: 'opacity 0.2s ease-in-out',
				display: 'block',
			}}
		>
			<div style={{ fontSize: 'larger', color: 'red', marginBottom: '10px' }}>
				{header}
			</div>
			<table width="100%">
				<tbody>
					<tr>
						<td width="20"></td>
						<td align="center" valign="middle">
							<div>{parse(text || '')}</div>
						</td>
						<td width="20"></td>
					</tr>
				</tbody>
			</table>
			<br />
			<br />
			<br />
			<button
				type="button"
				className="okbutton"
				onClick={closeAlarm}
				style={{
					padding: '8px 16px',
					fontSize: '14px',
				}}
			>
				OK
			</button>
		</div>
	);
};

// Make sure it's visible when opened via fade-in effect (via CSS)
// We'll handle fade-in/out with CSS transitions below
export default AlarmModal;
