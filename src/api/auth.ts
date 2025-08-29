import { API_PATH } from '@/api/const';
import { showErrorInfoDialog } from '@/features/dialog/showErrorInfoDialog';
import type { IAnswer } from '@/types';

export function auth(id: string, pass: string): Promise<IAnswer> {
	// const url = new URL(serverPath);
	const usp = new URLSearchParams();

	usp.append('feature', 'mobile');
	usp.append('login', id);
	usp.append('passwd', pass);

	// url.search = usp.toString();

	return new Promise((resolve) => {
		// fetch(url.toString(), {
		fetch(`${API_PATH}/api/login`, {
			method: 'POST',
			body: JSON.stringify({
				username: id,
				password: pass,
			}),
		})
			.then((res: Response) => {
				return res.json();
			})
			.then((j) => {
				resolve(j);
			})
			.catch((e: Error) => showErrorInfoDialog(e.message));
	});
}
