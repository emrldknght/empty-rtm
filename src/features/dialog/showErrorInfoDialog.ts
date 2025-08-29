import { EventBus, WEvents } from '@/EventBus';
import { IDialogMode } from '@/features/dialog/IDialogMode';

export function showErrorInfoDialog(errorText: string): void {
	EventBus.emit(WEvents.DialogSetMode, IDialogMode.Error);
	EventBus.emit(WEvents.DialogSetText, errorText);
	EventBus.emit(WEvents.DialogShow);
}
