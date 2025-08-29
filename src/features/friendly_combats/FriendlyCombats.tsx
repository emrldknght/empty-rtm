// FriendlyCombats.tsx
import type React from 'react';
import { useState } from 'react';
import { CreateApp } from '@/features/eng_old/CreateApp';
import { MakeDiv } from '@/features/eng_old/MakeDiv';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { WButton } from '@/ui/WButton';

const FriendlyCombats: React.FC = () => {
	const [showApplication, setShowApplication] = useState(true);

	// Form state
	const [combatType, setCombatType] = useState<string>('buhurt');
	const [combatNomination, setCombatNomination] = useState<string>('');
	const [combatTeamLimit, setCombatTeamLimit] = useState<string>('1');
	const [combatStartTime, setCombatStartTime] = useState<string>('10');
	const [combatComment, setCombatComment] = useState<string>('');

	// Toggle application form
	const handleToggleApplication = (e: React.MouseEvent) => {
		e.preventDefault();
		setShowApplication((prev) => !prev);
	};

	// Submit application
	const handleSendApplication = () => {
		CreateApp('appteam_0');
	};

	// Drag & Drop handlers
	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		console.log('Dropped fighters:', e.dataTransfer.getData('text'));
		// Handle fighter data here if needed
	};

	// Select combat type
	const handleSelectCombatType = (type: string) => {
		MakeInfo(type, FRAME_DIV_TARGET.Center, SECTION_KEY.FriendlyCombats, 1, '');
	};

	// Show all combats
	const handleSelectAllTypes = () => {
		MakeDiv(FRAME_DIV_TARGET.Center, SECTION_KEY.FriendlyCombats);
	};

	return (
		<div className="friendly-combats-wrapper">
			{/* Hidden location marker */}
			<div data-id="location" style={{ display: 'none' }}>
				frendlycombats
			</div>

			{/* Header */}
			<div className="w-100 cs-0">
				<div className="tableheader row">
					<div>
						<b>&nbsp;Дружеские бои: </b>
					</div>
					<div className="highlight al-right" style={{ marginLeft: 'auto' }}>
						<button
							type="button"
							className="href-button"
							data-id="appl"
							onClick={handleToggleApplication}
						>
							<span className="highlight"> Подать заявку&nbsp;</span>
						</button>
					</div>
				</div>
			</div>

			{/* Application Form (conditionally shown) */}
			{showApplication && (
				<div data-id="fapplication" className="fapplication application row">
					{/* Drag Zone */}
					{/* todo - check for accessibility -- div -> section */}
					<section
						data-id="appteam_0"
						className="applicationteam center v-top"
						style={{ border: '1px dashed yellow', padding: '10px' }}
						onDragEnter={handleDragEnter}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						aria-label="Зона для добавления бойцов. Перетащите сюда бойцов из списка."
					>
						<br />
						Перетащите сюда бойцов из списка
					</section>

					{/* Options */}
					<div className="friendly-combats--options v-top">
						{/* Debug Info */}
						<div className="debug">
							{combatType}: {combatNomination}: {combatTeamLimit}:
							{combatStartTime}:{combatComment}
						</div>

						{/* Type */}
						<label>
							<span>Тип боя:</span>
							<select
								data-id="stype"
								value={combatType}
								onChange={(e) => setCombatType(e.target.value)}
								name="type"
							>
								<option value="duel">Дуэль</option>
								<option value="buhurt">Бугурт</option>
							</select>
						</label>

						{/* Nomination */}
						<label>
							<span>Номинация:</span>
							<select
								data-id="nomination"
								value={combatNomination}
								onChange={(e) => setCombatNomination(e.target.value)}
								style={{ width: '70px' }}
								className="training"
								name="nomination"
								disabled
							>
								<option value="" selected>
									&nbsp;
								</option>
								<option value="sword">Меч</option>
								<option value="sword,shield">Щит-Меч</option>
								<option value="bastard">Бастард</option>
								<option value="polyarm">Алебарда</option>
								<option value="fist">Кулаки</option>
							</select>
						</label>

						{/* Team Limit */}
						<label>
							<span>Кол-во бойцов:</span>
							<select
								data-id="teamlimit"
								value={combatTeamLimit}
								onChange={(e) => setCombatTeamLimit(e.target.value)}
								className="training"
								name="teamlimit"
							>
								<option value="1">1 x 1</option>
								<option value="3">3 x 3</option>
								<option value="5">5 x 5</option>
								<option value="10">10 x 10</option>
								<option value="15">15 x 15</option>
								<option value="21">21 x 21</option>
							</select>
						</label>

						{/* Start Time */}
						<label>
							<span>До начала:</span>
							<select
								data-id="stime"
								value={combatStartTime}
								onChange={(e) => setCombatStartTime(e.target.value)}
								className="training"
								name="stime"
							>
								<option value="1">1 мин</option>
								<option value="5">5 мин</option>
								<option value="10" selected>
									10 мин
								</option>
								<option value="15">15 мин</option>
								<option value="20">20 мин</option>
								<option value="30">30 мин</option>
								<option value="60">1 час</option>
							</select>
						</label>

						{/* Comment */}
						<label>
							<span>Комментарий:</span>
							<input
								data-id="scomm"
								type="text"
								className="training"
								name="comment"
								value={combatComment}
								onChange={(e) => setCombatComment(e.target.value)}
							/>
							<input
								data-id="sclass"
								type="hidden"
								name="sclass"
								value="frendlycombats"
							/>
						</label>

						{/* Submit Button */}
						<div className="al-center" style={{ display: 'block' }}>
							<br />
							<br />
							<WButton
								type="button"
								className="training"
								label="В бой!"
								onClick={handleSendApplication}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Combat Type Filters */}
			<div className="friendly-combats--type w-100 cp-3 cs-3 row">
				<div className="submenu">
					<button
						type="button"
						className="href-button"
						onClick={() => handleSelectCombatType('buhurt')}
					>
						<span className="menuforgebuhurt">Бугурты</span>
					</button>
				</div>
				<div className="submenu">
					<button
						type="button"
						className="href-button"
						onClick={() => handleSelectCombatType('profight')}
					>
						<span className="menuforgebuhurt">Профайты</span>
					</button>
				</div>
				<div className="submenu">
					<button
						type="button"
						className="href-button"
						onClick={() => handleSelectCombatType('duel')}
					>
						<span className="menuforgebuhurt">Дуэли</span>
					</button>
				</div>
				<div className="submenu">
					<button
						type="button"
						className="href-button"
						onClick={handleSelectAllTypes}
					>
						<span className="menuforge_all">Все бои</span>
					</button>
				</div>
			</div>

			<hr />
		</div>
	);
};

export default FriendlyCombats;
