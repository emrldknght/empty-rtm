// components/SectionRight.tsx
import type React from 'react';

interface SectionRightProps {
	children?: React.ReactNode;
	className?: string; // Optional: to allow additional classes
}

export const SectionRight: React.FC<SectionRightProps> = ({
	children,
	className,
}) => {
	return (
		<div
			data-id="rightdiv"
			className={`rightdiv container__content ${className || ''}`.trim()}
		>
			{children}
		</div>
	);
};
