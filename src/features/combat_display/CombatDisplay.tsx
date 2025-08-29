// CombatDisplay.tsx

import parse from 'html-react-parser';
import { type ReactNode, useEffect, useRef } from 'react';
import CombatDisplayLogItem from '@/features/combat_display/CombatDisplayLogItem';
import { LoaderComponent } from '@/features/loader/LoaderComponent';
import { l } from '@/locales';
import { useCombatStore } from '@/store/combatStore';
import type { CombatRecord } from '@/types/CombatRecord';

// Refs map type
type LogItemRefs = { [key: string]: HTMLElement | null };

const CombatDisplay = () => {
	const { show, loading, id, data, log, setShow } = useCombatStore();

	const logRef = useRef<HTMLDivElement>(null);
	const logItemRefs = useRef<LogItemRefs>({});

	// Extract first record for teams/scores
	const firstRecord = log[0];
	const Team0 = firstRecord?.Team0 || '';
	const Team1 = firstRecord?.Team1 || '';
	const Score0 = firstRecord?.Score0 ?? 0;
	const Score1 = firstRecord?.Score1 ?? 0;

	const handleClick = () => {
		setShow(false);
	};

	// Auto-scroll to bottom when new log entries arrive
	useEffect(() => {
		if (!logRef.current || loading || log.length === 0) {
			return;
		}

		const timeoutId = setTimeout(() => {
			const el = logRef.current;
			if (!el) {
				return;
			}
			el.scrollTop = el.scrollHeight;
		}, 50); // Fast scroll, not 3s

		return () => clearTimeout(timeoutId);
	}, [log, loading]);

	// Cleanup refs on unmount or log change
	useEffect(() => {
		return () => {
			logItemRefs.current = {};
		};
	}, []);

	if (!show) {
		return null;
	}

	return (
		<div className="combats--show cmbshow">
			{/* Score Overlay */}
			<div className="score--wrapper">
				<div
					style={{
						position: 'absolute',
						width: '120px',
						zIndex: 9,
						border: 'none',
					}}
					className="scorecounter score"
				>
					{Score0} : {Score1}
				</div>
			</div>

			{/* Header */}
			<table className="w-100 cs-0 cp-0">
				<tbody>
					<tr className="chatheader">
						<td style={{ width: '97%' }}>
							&nbsp;Бои:
							<span className="combat-number">
								{/*  todo - check types */}
								{id} {l(data?.Type) as ReactNode}
							</span>
						</td>
						<td className="headersym al-right">
							<button
								type="button"
								className="href-button"
								onClick={handleClick}
							>
								▲&nbsp;
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			{/* Loader */}
			{loading && (
				<div style={{ textAlign: 'center', padding: '10px' }}>
					<LoaderComponent />
					<div>Loading...</div>
				</div>
			)}

			{/* Combat Log */}
			{!loading && (
				<div className="combatlogcontainer">
					{/* Team 0 */}
					<div className="teamlist team-0">
						<div className="center">
							<span className="combat-display--team-score">{Score0}</span>
						</div>
						<div>{parse(Team0)}</div>
					</div>

					{/* Log */}
					<div className="combat--log" ref={logRef} aria-live="polite">
						{log.map((item: CombatRecord) => (
							<CombatDisplayLogItem
								key={item.ID}
								item={item}
								ref={(el) => {
									if (el) {
										logItemRefs.current[item.ID] = el;
									} else {
										delete logItemRefs.current[item.ID];
									}
								}}
							/>
						))}
					</div>

					{/* Team 1 */}
					<div className="teamlist team-1">
						<div className="center">
							<span className="combat-display--team-score">{Score1}</span>
						</div>
						<div>{parse(Team1)}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CombatDisplay;
