// components/SectionLeft.tsx
import type React from 'react';

interface SectionLeftProps {
	children?: React.ReactNode;
	className?: string;
}

export const SectionLeft: React.FC<SectionLeftProps> = ({
	children,
	className,
}) => {
	return (
		<div
			data-id="leftdiv"
			className={`leftdiv forteam container__content ${className || ''}`.trim()}
		>
			{children}
		</div>
	);
};
