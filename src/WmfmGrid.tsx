'use client';

import type React from 'react';
import { type JSX, useEffect, useMemo, useState } from 'react';
import { getMyUser } from '@/api/getMyUser';
import MyBase from '@/features/base/MyBase';
import ChampInfo from '@/features/champ/ChampInfo';
import { ChatDisplay } from '@/features/chat/ChatDisplay';
// Import all components
import PlayerClubDetails from '@/features/club_info/PlayerClubDetails';
import ClubSummaryDisplay from '@/features/club_summary/ClubSummaryDisplay';
import ClubThings from '@/features/club_things/ClubThings';
import ClubsList from '@/features/clubs_list/ClubsList';
import CombatDisplay from '@/features/combat_display/CombatDisplay';
import CombatList from '@/features/combat_list/CombatList';
import DonateDisplay from '@/features/donate/DonateDisplay';
import FighterInfo from '@/features/fighter_info/FighterInfo';
import FightersList from '@/features/fighters_list/FightersList';
import FriendlyCombats from '@/features/friendly_combats/FriendlyCombats';
import { LogMessages } from '@/features/log_messages/LogMessages';
import { ClubName } from '@/features/main_page/ClubName';
import { MenuPanel } from '@/features/main_page/MenuPanel';
import { SectionCenter } from '@/features/main_page/SectionCenter';
import { SectionLeft } from '@/features/main_page/SectionLeft';
import SectionMenuCenter from '@/features/main_page/SectionMenuCenter';
import SectionMenuLeft from '@/features/main_page/SectionMenuLeft';
import SectionMenuRight from '@/features/main_page/SectionMenuRight';
import { SectionRight } from '@/features/main_page/SectionRight';
import MarketDisplay from '@/features/market/MarketDisplay';
import MastersDisplay from '@/features/masters/MastersDisplay';
import MyClub from '@/features/my_club/MyClub';
import RecruitsDisplay from '@/features/recruits/RecruitsDisplay';
import RepairDisplay from '@/features/repair/RepairDisplay';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { useMainStore } from '@/store/mainStore';
import type { SectionKey } from '@/types/section';

// Types

// Stub Component
const Stub = ({ value }: { value: string }) => (
	<div style={{ padding: '20px', color: 'gray' }}>🔧 Stub: {value}</div>
);

// Component Map
const LEFT_COMPONENTS: Partial<Record<SectionKey, JSX.Element>> = {
	MyClub: <MyClub />,
	ClubMembers: <FightersList />,
	FighterInfo: <FighterInfo />,
	CombatList: <CombatList />,
} as const;

const CENTER_COMPONENTS: Partial<Record<SectionKey, JSX.Element>> = {
	Championship: <ChampInfo />,
	Clubs: <ClubsList />,
	PlayerClubDetails: <PlayerClubDetails />,
	ClubThings: <ClubThings />,
	Base: <MyBase />,
	FriendlyCombats: <FriendlyCombats />,
	Market: <MarketDisplay />,
	Masters: <MastersDisplay />,
	Repair: <RepairDisplay />,
	ClubReview: <ClubSummaryDisplay />,
	Donate: <DonateDisplay />,
	FreeFighters: <RecruitsDisplay />,
} as const;

interface WmfmMainProps {
	logOut?: () => void;
}

export const WmfmMain: React.FC<WmfmMainProps> = ({ logOut }) => {
	const {
		authToken,
		user,
		sections,
		currentSection,
		setUser,
		// isLoadingUser, setIsLoadingUser
	} = useMainStore();

	const [isLoadingUser, setIsLoadingUser] = useState(false);

	useEffect(() => {
		const loadUser = async () => {
			if (!authToken || user) return;
			setIsLoadingUser(true);
			try {
				const myUser = await getMyUser(authToken);
				setUser(myUser);
			} catch (err) {
				console.error('Failed to fetch user:', err);
			} finally {
				setIsLoadingUser(false);
			}
		};
		loadUser();
	}, [authToken, user, setUser, setIsLoadingUser]);

	const leftSectionComponent = useMemo(() => {
		return LEFT_COMPONENTS[sections.Left] || <Stub value={sections.Left} />;
	}, [sections.Left]);

	const centerSectionComponent = useMemo(() => {
		return (
			CENTER_COMPONENTS[sections.Center] || <Stub value={sections.Center} />
		);
	}, [sections.Center]);

	return (
		<div>
			<ChatDisplay />
			<CombatDisplay />

			<div id="container" className="main-screen">
				<MenuPanel />

				{!user && isLoadingUser ? (
					<div>Loading profile...</div>
				) : user ? (
					<ClubName user={user} />
				) : null}

				<div className="container-wrapper">
					<SectionMenuLeft />
					<SectionLeft
						className={
							currentSection === FRAME_DIV_TARGET.Left ? 'section--visible' : ''
						}
					>
						{leftSectionComponent}
					</SectionLeft>

					<SectionMenuCenter />
					<SectionCenter
						className={
							currentSection === FRAME_DIV_TARGET.Center
								? 'section--visible'
								: ''
						}
					>
						{process.env.NODE_ENV === 'development' && (
							<div
								style={{
									position: 'absolute',
									top: 10,
									right: 10,
									background: 'yellow',
									padding: 4,
									fontSize: 12,
								}}
							>
								🧪 {sections.Center}
							</div>
						)}
						{centerSectionComponent}
					</SectionCenter>

					<SectionMenuRight />
					<SectionRight>
						<LogMessages />
					</SectionRight>
				</div>
			</div>
		</div>
	);
};
