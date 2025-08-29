// ClubPremium.tsx

import Image from 'next/image';
import type React from 'react';
import './ClubPremium.css'; // We'll define styles below

const ClubPremium: React.FC = () => {
	return (
		<span className="premium-container">
			<Image src="/img/star.png" alt="icon premium" width="16" height="16" />

			{/* Custom Tooltip */}
			<div className="premium-tooltip">
				<b>Премиум:</b>
				<br />
				Тренировка: х1.25
				<br />
				Опыт в бою: х1.25
				<br />
				Зрителей: х1.25
			</div>
		</span>
	);
};

export default ClubPremium;
