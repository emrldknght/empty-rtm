// MyClub.tsx

import Image from 'next/image';
import type React from 'react';
import { useEffect } from 'react';
import ClubAward from '@/features/club_info/ClubAward';
import ClubShield from '@/features/club_info/ClubShield';
import { MakeDiv } from '@/features/eng_old/MakeDiv';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { useMainStore } from '@/store/mainStore';

const Options = () => {};

const MyClub: React.FC = () => {
	const { fetchMyClub, myClub } = useMainStore();
	const club = myClub;

	// Fetch club data on mount
	useEffect(() => {
		console.log('MyClub mounted');

		fetchMyClub();
	}, [fetchMyClub]);

	const handleClickClubName = async (e: React.MouseEvent) => {
		e.preventDefault();
		await fetchMyClub();
	};

	const handleClickOptions = (e: React.MouseEvent) => {
		e.preventDefault();
		Options();
	};

	const handleClickSummary = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeDiv(FRAME_DIV_TARGET.Center, SECTION_KEY.ClubReview);
	};

	const handleClickFighters = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeDiv('leftdiv', 'clubmembers');
	};

	if (!club) {
		return <div>Загрузка информации о клубе...</div>;
	}

	return (
		<div>
			{/* Header with Club Name and Options */}
			<table className="w-100 cs-0 cp-3">
				<tbody>
					<tr>
						<td className="tableheader highlight">
							<button
								type="button"
								className="href-button"
								onClick={handleClickClubName}
							>
								<span data-id="menuclubmembers">Мой клуб:</span>
							</button>
						</td>
						<td className="tableheader al-right">
							<button
								type="button"
								className="href-button"
								onClick={handleClickOptions}
							>
								<Image
									src="/img/options.png"
									alt="options icon"
									width={14}
									height={14}
								/>
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			{/* Club Info */}
			<table className="w-100" style={{ marginTop: '5px' }}>
				<tbody>
					<tr>
						<td className="clubcell" style={{ width: '120px' }}>
							<ClubShield club={club} />
						</td>
						<td className="clubcell">
							Рейтинг: <span className="rating">{club.Rating}</span>
							<br />
							Бойцов: {club.FightersNum}
							<br />
							Побед: {club.Win}
							<br />
							Поражений: {club.Lose}
							<br />В игре: {club.InGameTime}
							<br />
							(c {club.FromTime})
						</td>
					</tr>

					{/* Обзор клуба */}
					<tr>
						<td className="clubcell al-center" colSpan={2}>
							<hr />
							<input
								type="button"
								className="training"
								value="Обзор клуба"
								onClick={handleClickSummary}
							/>
						</td>
					</tr>

					{/* Награды */}
					<tr>
						<td className="clubcell" colSpan={2}>
							<hr />
							Награды:
						</td>
					</tr>
					<tr>
						{/* todo - check typings */}
						<td className="clubcell" colSpan={2}>
							{club.Awards && club.Awards.length > 0 ? (
								club.Awards.map((award) => (
									<ClubAward key={award.id || award.ID} award={award} />
								))
							) : (
								<span>Нет наград</span>
							)}
							<br />
						</td>
					</tr>

					{/* Достижения */}
					<tr>
						<td className="clubcell" colSpan={2}>
							<hr /> Достижения:
						</td>
					</tr>
					<tr>
						<td className="clubcell" colSpan={2}>
							<br />
						</td>
					</tr>

					{/* Статистика */}
					<tr>
						<td className="clubcell" colSpan={2}>
							<hr /> Статистика:
						</td>
					</tr>
					<tr>
						<td className="clubcell" colSpan={2}>
							<br />
						</td>
					</tr>

					{/* Перейти к списку бойцов */}
					<tr>
						<td className="clubcell" colSpan={2}>
							<hr />
							<br />
							<input
								type="button"
								className="training"
								value="Перейти к списку бойцов"
								onClick={handleClickFighters}
							/>
							<br />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default MyClub;
