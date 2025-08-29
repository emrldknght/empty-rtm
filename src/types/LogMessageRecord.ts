export interface LogMessageRecord {
	id: number;
	user: number;
	time: number;
	msg: string;
	class: string;

	deleted: 0 | 1;
	TimeS: string; // "2020-05-16";
	TimeF: string; // "07:07:42";
	MessageHtml: string;
	MessageClass: string;
}
