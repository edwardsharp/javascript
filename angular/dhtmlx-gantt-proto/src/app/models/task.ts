export class Task {
	_id: string;
	_rev: string;
	start_date: string;
	text: string;
	progress: number;
	duration: number;
	parent: string;
}