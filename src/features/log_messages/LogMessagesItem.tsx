import parse from 'html-react-parser';
import { Fragment } from 'react';
import { DelMess } from '@/features/eng_old/DelMess';
import { getRawId } from '@/features/log_messages/getRawId';
import type { LogMessageRecord } from '@/types/LogMessageRecord';

// Define props type
interface LogMessageItemProps {
	id: LogMessageRecord['id'];
	timeS: LogMessageRecord['TimeS'];
	timeF: LogMessageRecord['TimeF'];
	messageHtml: LogMessageRecord['MessageHtml'];
	messageClass: LogMessageRecord['MessageClass'];
}

// React Component
const LogMessagesItem: React.FC<LogMessageItemProps> = ({
	id,
	timeS,
	timeF,
	messageHtml,
	messageClass,
}) => {
	const handleClickFighter = (fighterId: string) => {
		console.log('Fighter clicked:', fighterId);
	};

	// Handle click to delete message
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		DelMess(id.toString());
	};

	// Extract raw ID info if not cmbt
	const rawId = messageClass !== 'cmbt' ? getRawId(messageHtml) : null;

	return (
		<table
			id={`tb${id}`}
			className={`msg_${messageClass} mtable w-100 cs-0 cp-2`}
		>
			<tbody>
				<tr>
					<td className="messheader">
						<span className="messagetime">
							{id}[{timeS}&nbsp;{timeF}]:
						</span>
					</td>
					<td className="messheader al-right">
						<button
							type="button"
							className="href-button"
							onClick={handleClick}
							style={{ cursor: 'pointer' }}
						>
							x
						</button>
					</td>
				</tr>
				<tr>
					<td className="messtext" colSpan={2}>
						{messageClass === 'cmbt' ? (
							<Fragment>
								{/* messageHtml */}
								<span>{parse(messageHtml)}</span>
							</Fragment>
						) : (
							<Fragment>
								<button
									type="button"
									className="href-button lm-fighter-info"
									onClick={() => {
										if (rawId) {
											handleClickFighter(rawId.fighterId);
										}
									}}
									style={{ cursor: 'pointer' }}
								>
									[{rawId?.fighterId}] {rawId?.fighterName}
								</button>{' '}
								{rawId?.tail}
							</Fragment>
						)}
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default LogMessagesItem;
