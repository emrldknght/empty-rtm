// components/WIcon.tsx
import type React from 'react';
import type { IconType } from 'react-icons'; // Optional: if using react-icons

// Option 1: Using react-icons (recommended for simplicity)
// Option 2: Using dynamic SVG or next/image for custom icons

interface WIconProps {
	id?: string;
	iconName: string;
	className?: string;
	onClick?: (e: React.MouseEvent) => void;
	style?: React.CSSProperties;
}

// 🔧 Helper: Map string iconName to react-icons component (example with dynamic import)
// Or use a switch/if-else for known icons
// Alternatively: use a library like `react-icon/lib/esm/iconContext` or dynamic loader

// For simplicity, we'll support:
// - react-icons (e.g., "FaHome", "BiChat")
// - Or pass the component directly
// - Or use a string-based dynamic resolver (advanced)

// Simple version: accept iconName as a react-icons component, or use a mapper

// Example using a mapper (you can extend this)
const iconMap: { [key: string]: IconType } = {
	'hugeicons:menu-01': require('react-icons/hi').HiMenu,
	'hugeicons:bubble-chat': require('react-icons/fa').FaComment,
	// Add more mappings as needed
};

// If you're using a CDN or dynamic icon system, you can render SVG by name
// But for now, we'll support mapped icons or fallback to span

export const WIcon: React.FC<WIconProps> = ({
	id,
	iconName,
	className,
	onClick,
	style,
}) => {
	const IconComponent = iconMap[iconName];

	const DEFAULT_STYLE: React.CSSProperties = {
		width: '24px',
		height: '24px',
		margin: '4px',
		color: 'white',
	};

	const mergedStyle = { ...DEFAULT_STYLE, ...style };

	return IconComponent ? (
		<IconComponent
			id={id}
			style={mergedStyle}
			className={className}
			onClick={onClick}
		/>
	) : (
		// Fallback for unknown icons (e.g., render by name via external icon system)
		<span
			id={id}
			style={{ ...mergedStyle, ...{ display: 'inline-block' } }}
			className={className}
			onClick={onClick}
			title={iconName}
		>
			{/* Optional: Use <Image> or SVG loader here */}
			[Icon: {iconName}]
		</span>
	);
};
