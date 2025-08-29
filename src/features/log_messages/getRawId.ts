export const getRawId = (MessageHtml: string) => {
	const node = document.createElement('html');
	node.innerHTML = MessageHtml;

	// <a href="#" onClick="MakeInfo(`318`, `leftdiv`,`finfo`); return false;">Александр Гавриков</a> научился новому! Он стал лучше владеть древковым оружием.

	const a = node.querySelector('a');
	// console.log('a->', a);
	if (a) {
		const fighterName = a.textContent;
		const onClickRaw = (a.onclick || '').toString();
		let fighterId = '';

		// console.log(fighterName, onClickRaw)

		if (onClickRaw) {
			let start = -1;
			let end = -1;

			const hayStart = 'MakeInfo(`';
			start = onClickRaw.indexOf(hayStart) + hayStart.length;
			if (start > -1) {
				end = onClickRaw.indexOf('`', start);
			}
			if (end > start) {
				fighterId = onClickRaw.substring(start, end);
			}

			// console.log('html', MessageHtml)
			const tailEnd = '</a>';
			const tailEndPos = MessageHtml.indexOf(tailEnd);

			return {
				fighterName,
				fighterId,
				tail: MessageHtml.substring(tailEndPos + tailEnd.length),
			};
		}
	}

	return {
		fighterName: '',
		fighterId: '',
		tail: '',
	};
};
