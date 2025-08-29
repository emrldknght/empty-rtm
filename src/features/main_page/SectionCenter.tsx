// components/SectionCenter.tsx
import type React from 'react';
import { useEffect } from 'react';

interface SectionCenterProps {
	children?: React.ReactNode;
	className?: string;
}

export const SectionCenter: React.FC<SectionCenterProps> = ({
	children,
	className,
}) => {
	// Simulate onMounted()
	useEffect(() => {
		// Example side effect — uncomment if needed
		// store.setSection(FRAME_DIV_TARGET.Center, SECTION_KEY.Donate);
		// store.fetchSelectedClubInfo('62');
	}, []);

	return (
		<div
			data-id="centerdiv"
			className={`centerdiv container__content ${className || ''}`.trim()}
		>
			{children}
		</div>
	);
};
