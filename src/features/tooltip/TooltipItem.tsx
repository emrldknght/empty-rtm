// components/TooltipItem.tsx

import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTooltipStore } from '@/features/tooltip/tooltipStore';

const TooltipItem = () => {
	const { show, x, y, text } = useTooltipStore();
	const tooltipRef = useRef<HTMLDivElement>(null);

	// Optional: adjust position to prevent screen overflow
	useEffect(() => {
		if (!tooltipRef.current || !show) {
			return;
		}

		const tip = tooltipRef.current;
		const rect = tip.getBoundingClientRect();

		let left = x + 10;
		let top = y + 10;

		// Prevent overflow on right edge
		if (left + rect.width > window.innerWidth) {
			left = window.innerWidth - rect.width - 5;
		}
		// Prevent overflow on bottom
		if (top + rect.height > window.innerHeight) {
			top = window.innerHeight - rect.height - 5;
		}

		tip.style.left = `${left}px`;
		tip.style.top = `${top}px`;
	}, [x, y, show]);

	// Find the container or fallback to body
	const container =
		typeof document !== 'undefined'
			? document.getElementById('tooltip-container')
			: null;

	if (!container || !show || !text) {
		return null;
	}

	return createPortal(
		<div
			ref={tooltipRef}
			data-id="tooltip"
			className="tooltip"
			style={{
				position: 'absolute',
				left: 0, // Will be set by useEffect
				top: 0, // Will be set by useEffect
				background: '#111',
				color: '#fff',
				padding: '6px 10px',
				borderRadius: '4px',
				fontSize: '13px',
				maxWidth: '280px',
				boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
				pointerEvents: 'none',
				whiteSpace: 'pre-line',
				zIndex: 9999,
				transform: 'translateY(-4px)',
				transition: 'opacity 0.2s ease',
			}}
		>
			{parse(text)}
		</div>,
		container,
	);
};

export default TooltipItem;
