// stores/tooltip.ts
import { create } from 'zustand';

interface TooltipState {
	text: string;
	show: boolean;
	x: number;
	y: number;
	setText: (text: string) => void;
	setShow: (show: boolean) => void;
	setPosition: (pos: { x: number; y: number }) => void;
}

export const useTooltipStore = create<TooltipState>((set) => ({
	text: 'default tooltip',
	show: false,
	x: 0,
	y: 20,

	setText: (text) => set({ text }),

	setShow: (show) =>
		set((_state) => {
			if (!show) {
				return {
					show: false,
					x: 0,
					y: 20,
					text: 'default tooltip', // reset text when hidden
				};
			}
			return { show };
		}),

	setPosition: ({ x, y }) => set({ x, y }),
}));
