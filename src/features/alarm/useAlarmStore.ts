// store/useAlarmStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type AlarmState = {
	header: string | null;
	text: string | null;
	isOpen: boolean;
};

export type AlarmActions = {
	openAlarm: (header: string, text: string) => void;
	closeAlarm: () => void;
};

export type AlarmStore = AlarmState & AlarmActions;

const useAlarmStore = create<AlarmStore>()(
	devtools((set) => ({
		header: null,
		text: null,
		isOpen: false,

		openAlarm: (header, text) =>
			set({ header, text, isOpen: true }, false, 'OPEN_ALARM'),

		closeAlarm: () =>
			set({ header: null, text: null, isOpen: false }, false, 'CLOSE_ALARM'),
	})),
);

export default useAlarmStore;
