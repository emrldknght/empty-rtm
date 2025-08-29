// components/WButton.tsx
import type React from 'react';

interface WButtonProps {
	id?: string;
	label?: string;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	style?: React.CSSProperties;
}

export const WButton: React.FC<WButtonProps> = ({
	id,
	label = 'Click!',
	type = 'button',
	className = '',
	onClick,
}) => {
	return (
		<button
			id={id}
			type={type}
			className={className}
			onClick={onClick}
			style={{
				borderWidth: '2px',
				borderStyle: 'inset',
				padding: '2px 4px',
				borderRadius: '5px',
			}}
		>
			{label}
		</button>
	);
};
