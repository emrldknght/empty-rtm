// ClubShield.tsx
import type React from 'react';
import { API_PATH } from '@/api/const';
import type { MyClub } from '@/types';
import type { ClubRecord } from '@/types/ClubRecord';

type Props = {
	club: MyClub | ClubRecord;
};

const ClubShield: React.FC<Props> = ({ club }) => {
	// todo - add image component without using path
	const imageUrl = `${API_PATH}/img/clubbanners/${club.Image}`;
	const linkUrl = `https://www.aspilogia.com/HE-Heralds_Roll/img/${club.Image}`;
	const tooltipText = `Принадлежал:\nfr: ${club.France}\nen: ${club.English}`;

	return (
		<a href={linkUrl} target="_blank" rel="noreferrer">
			<div title={tooltipText}>
				<div
					className="clubbanner"
					style={{
						backgroundImage: `url(${imageUrl})`,
						width: '100%',
						height: '0',
						paddingBottom: '60%', // 3:2 aspect ratio (adjust as needed)
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						borderRadius: '4px',
					}}
				/>
			</div>
		</a>
	);
};

export default ClubShield;
