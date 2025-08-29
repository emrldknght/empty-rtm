'use client';

import type React from 'react';
import { useEffect, useMemo } from 'react';
import { getMyUser } from '@/api/getMyUser';
import MyBase from '@/features/base/MyBase';
import ChampInfo from '@/features/champ/ChampInfo';
import { ChatDisplay } from '@/features/chat/ChatDisplay';
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
// Import all your UI components
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
import StubComponent from '@/features/stub/StubComponent';
import TransferDisplay from '@/features/transfer/TransferDisplay';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { useMainStore } from '@/store/mainStore';

interface MainLayoutProps {
	logOut?: () => void;
}

export const WmfmMain: React.FC<MainLayoutProps> = ({ logOut }) => {
	const {
		authToken,
		// user,
		// sections,
		// currentSection,
		// setUser,
	} = useMainStore.getState();
	// } = useMainStore.getState();

	useEffect(() => {
		console.log('checking auth', authToken);
		if (!authToken) {
			window.location.href = '/login';
		}
	}, []);

	const { user, sections, currentSection, setUser } = useMainStore();

	// Fetch user on mount
	useEffect(() => {
		console.log('Fetching user...', authToken);
		const loadUser = async () => {
			if (!authToken) return;
			try {
				const myUser = await getMyUser(authToken);
				setUser(myUser);
			} catch (err) {
				console.error('Failed to fetch user:', err);
			}
		};

		loadUser();
	}, []);

	// Memoize dynamic components
	const leftSectionComponent = useMemo(() => {
		switch (sections.Left) {
			case SECTION_KEY.MyClub:
				return <MyClub />;
			case SECTION_KEY.ClubMembers:
				return <FightersList />;
			case SECTION_KEY.FighterInfo:
				return <FighterInfo />;
			case SECTION_KEY.CombatList:
				return <CombatList />;
			default:
				return <StubComponent label={sections.Left} />;
		}
	}, [sections.Left]);

	const centerSectionComponent = useMemo(() => {
		switch (sections.Center) {
			case SECTION_KEY.Championship:
				return <ChampInfo />;
			case SECTION_KEY.Clubs:
				return <ClubsList />;
			case SECTION_KEY.PlayerClubDetails:
				return <PlayerClubDetails />;
			case SECTION_KEY.ClubThings:
				return <ClubThings />;
			case SECTION_KEY.Base:
				return <MyBase />;
			case SECTION_KEY.FriendlyCombats:
				return <FriendlyCombats />;
			case SECTION_KEY.Market:
				return <MarketDisplay />;
			case SECTION_KEY.Masters:
				return <MastersDisplay />;
			case SECTION_KEY.Repair:
				return <RepairDisplay />;
			case SECTION_KEY.ClubReview:
				return <ClubSummaryDisplay />;
			case SECTION_KEY.Donate:
				return <DonateDisplay />;
			case SECTION_KEY.FreeFighters:
				return <RecruitsDisplay />;
			case SECTION_KEY.Transfer:
				return <TransferDisplay />;
			default:
				return <StubComponent label={sections.Center as string} />;
		}
	}, [sections.Center]);

	return (
		<div>
			{/* Always visible */}
			<ChatDisplay />
			<CombatDisplay />
			{/* Dynamic */}

			{/* Main Screen */}
			<div id="container" className="main-screen">
				<MenuPanel>
					{/* Hidden debug token */}
					{/* <div style={{ display: 'none' }}>{authToken}</div> */}
				</MenuPanel>

				{/* Show ClubName only if user exists */}
				{user && <ClubName user={user} />}

				{/* Layout Wrapper */}
				<div className="container-wrapper">
					{/* Left Side */}
					<SectionMenuLeft />
					<SectionLeft
						className={
							currentSection === FRAME_DIV_TARGET.Left ? 'section--visible' : ''
						}
					>
						{leftSectionComponent}
					</SectionLeft>

					{/* Center */}
					<SectionMenuCenter />
					<SectionCenter
						className={
							currentSection === FRAME_DIV_TARGET.Center
								? 'section--visible'
								: ''
						}
					>
						{/* Debug: Show current center section key */}
						<div
							id="debug-key"
							style={{
								position: 'absolute',
								right: 0,
								marginRight: '148px',
								backgroundColor: 'yellow',
								color: 'black',
							}}
						>
							{sections.Center}
						</div>
						{centerSectionComponent}
					</SectionCenter>

					{/* Right Side */}
					<SectionMenuRight />
					<SectionRight>
						<LogMessages />
					</SectionRight>
				</div>
			</div>
		</div>
	);
};
