// components/TooltipOverlay.tsx

import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
import { useTooltipStore } from '@/features/tooltip/tooltipStore';

const TooltipOverlay: React.FC = () => {
	const { text, show, x, y } = useTooltipStore();
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!tooltipRef.current || !show) {
			return;
		}

		const tip = tooltipRef.current;
		const rect = tip.getBoundingClientRect();

		// Optional: adjust position to avoid screen overflow
		let left = x + 10;
		let top = y + 10;

		if (left + rect.width > window.innerWidth) {
			left = window.innerWidth - rect.width - 5;
		}
		if (top + rect.height > window.innerHeight) {
			top = window.innerHeight - rect.height - 5;
		}

		tip.style.left = `${left}px`;
		tip.style.top = `${top}px`;
	}, [x, y, show]);

	if (!show || !text) {
		return null;
	}

	return (
		<div
			ref={tooltipRef}
			className="tooltip-overlay"
			style={{
				position: 'absolute',
				pointerEvents: 'none',
				zIndex: 9999,
				background: '#000',
				color: '#fff',
				padding: '8px 12px',
				borderRadius: '4px',
				fontSize: '14px',
				maxWidth: '300px',
				boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
				whiteSpace: 'pre-line',
				transform: 'translateY(-2px)',
			}}
		>
			{parse(text)}
		</div>
	);
};

export default TooltipOverlay;

/*
* // layouts/MainLayout.tsx
import TooltipOverlay from '~/src/components/TooltipOverlay';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <TooltipOverlay />
    </>
  );
};

export default MainLayout;
*
* or
*
* // pages/_app.tsx
import TooltipOverlay from '~/src/components/TooltipOverlay';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <TooltipOverlay />
    </>
  );
}
*
* in component
* <span
  onMouseOver={() => handleMouseOver('<b>Меч Справедливости</b><br/>Урон: 45')}
  onMouseMove={handleMouseMove}
  onMouseOut={handleMouseOut}
>
  <img src={item.Image} alt={item.Name} />
</span>
*  */
