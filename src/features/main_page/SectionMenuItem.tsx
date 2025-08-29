// SectionMenuItem.tsx
import type { CSSProperties, ReactNode } from 'react';

export interface SectionMenuItemProps {
	id: string;
	label: string;
	style?: CSSProperties;
	action: () => void;
	title?: string;
	children?: ReactNode;
	className?: string;
}

const defaultStyle: CSSProperties = {
	cursor: 'pointer',
};

const SectionMenuItem = ({
	id,
	label,
	style,
	action,
	title,
	children,
	className,
}: SectionMenuItemProps) => {
	return (
		<button
			type="button"
			style={style || defaultStyle}
			title={title}
			onClick={action}
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					action();
				}
			}}
			className={`href-button section-menu-item ${className || ''}`} // Optional: for styling
		>
			{children}
			<span id={id}>{label}</span>
		</button>
	);
};

export default SectionMenuItem;
