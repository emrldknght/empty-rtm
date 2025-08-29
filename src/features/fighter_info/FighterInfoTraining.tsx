// FighterInfoTraining.tsx
import { useState } from 'react';
import { SetTraining } from '@/features/eng_old/SetTraining';

interface FighterInfoTrainingProps {
	id: number;
}

type TrainingItem = {
	id: string;
	label: string;
	text: string;
	disabled?: boolean;
};

const TRAINING: TrainingItem[] = [
	{ id: 'trainnothing', label: '', text: 'Отдыхать' },
	{ id: 'trainstrength', label: 'strength', text: 'Упражнения с гирями' },
	{ id: 'traindextirity', label: 'dextirity', text: 'Акробатика и паркур' },
	{ id: 'trainstamina', label: 'stamina', text: 'Изнурительные походы' },
	{
		id: 'trainno',
		label: '',
		disabled: true,
		text: '---------------------------------',
	},
	{ id: 'trainsword', label: 'sword', text: 'Одноручный меч' },
	{ id: 'trainshield', label: 'shield', text: 'Щит' },
	{ id: 'trainbastard', label: 'bastard', text: 'Полутораручный меч' },
	{ id: 'trainmorningstar', label: 'morningstar', text: 'Дробящее оружие' },
	{ id: 'trainpolyarm', label: 'polyarm', text: 'Древковое оружие' },
	{ id: 'trainwrestling', label: 'wrestling', text: 'Борьба' },
] as const;

const FighterInfoTraining: React.FC<FighterInfoTrainingProps> = ({ id }) => {
	const [selectedTraining, setSelectedTraining] = useState<string>('');

	const handleChangeTraining = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setSelectedTraining(value);
		SetTraining(id, value);
		console.log('c!');
	};

	/*
  useEffect(() => {
    setSelectedTraining('');
  }, [id]);

  */

	return (
		<table
			className="fighter-info-training mrgn cs-0 cp-3"
			style={{ width: '98%' }}
		>
			<tbody>
				<tr>
					<td>
						<b>Тренировка:</b>
						<span
							data-id="train_progress"
							className="trainprogress"
							style={{
								background: 'linear-gradient(to right, #006600, #9f9f9f)',
								display: 'inline-block',
								minWidth: '100px',
								height: '12px',
								marginLeft: '8px',
							}}
						>
							&nbsp;
						</span>
					</td>
					<td className="al-right">
						<select
							data-id="training"
							name="training"
							className="training"
							style={{ width: '147px' }}
							value={selectedTraining}
							onChange={handleChangeTraining}
						>
							{TRAINING.map((item) => (
								<option
									key={item.id}
									id={item.id}
									value={item.label}
									disabled={!!item.disabled}
									className="training"
								>
									{item.text}
								</option>
							))}
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default FighterInfoTraining;
