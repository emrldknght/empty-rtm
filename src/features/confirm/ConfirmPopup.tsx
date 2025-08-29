import type React from 'react';
import type { ReactNode } from 'react';

// Define props
interface ConfirmModalProps {
	message?: string;
	action?: (e: React.MouseEvent) => void;
	onConfirm: () => void;
	onClose: () => void;
	children?: ReactNode; // For default slot
	buttons?: ReactNode; // For custom buttons
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	message,
	action,
	onConfirm,
	onClose,
	children,
	buttons,
}) => {
	const handleConfirm = (e: React.MouseEvent) => {
		onConfirm();
		if (action) {
			action(e);
		}
	};

	const handleCancel = (_e: React.MouseEvent) => {
		onClose();
	};

	return (
		<div className="confirm-overlay">
			<div className="confirm-box">
				<h4>Подтверждение действия</h4>
				{message && <p>{message}</p>}
				<p>{children}</p>
				<div className="confirm-buttons">
					{buttons || (
						<>
							<input
								type="button"
								className="button training"
								value="Да"
								onClick={handleConfirm}
							/>
							<input
								type="button"
								className="button training"
								value="Нет"
								onClick={handleCancel}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
