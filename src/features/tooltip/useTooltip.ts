// hooks/useTooltip.ts

import { useTooltipStore } from '@/features/tooltip/tooltipStore';

/**
 * React hook for tooltip interactions
 * Use with onMouseOver, onMouseMove, onMouseOut
 */
const useTooltip = () => {
	const { setText, setShow, setPosition } = useTooltipStore();

	const handleMouseOver = (txt: string) => {
		setText(txt);
		setShow(true);
	};

	const handleMouseOut = () => {
		setShow(false); // This will reset text and position via store logic
	};

	const handleMouseMove = (event: React.MouseEvent) => {
		setPosition({
			x: event.pageX,
			y: event.pageY,
		});
	};

	return {
		handleMouseOver,
		handleMouseOut,
		handleMouseMove,
	};
};

export default useTooltip;
