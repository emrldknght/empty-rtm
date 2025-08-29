// components/MenuPanel.tsx
import type React from 'react';
import { useState } from 'react';
import { MakeMenu } from '@/features/eng_old/MakeMenu';
import { MakeTutor } from '@/features/eng_old/MakeTutor';
import { RmScript } from '@/features/eng_old/RmScript';
import { useChatStore } from '@/store/chatStore';
import { useMainStore } from '@/store/mainStore';
import { WIcon } from '@/ui/WIcon';

interface MenuPanelProps {
	children?: React.ReactNode; // For the debug-token slot
}

export const MenuPanel: React.FC<MenuPanelProps> = ({ children }) => {
	const { setShow: setChatShow } = useChatStore();
	const { logOut } = useMainStore();

	const [menuListVisible, setMenuListVisible] = useState(false);

	const FORUM_URL = 'forum/index.php?forum=37&category=39&listcategory=39';

	const handleClickChatSwitch = (e: React.MouseEvent) => {
		e.preventDefault();
		RmScript('blinkscript');
		setChatShow(true);
		MakeMenu('chat');
	};

	const handleClickAsk = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeTutor('start', 0);
	};

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		await logOut();
	};

	return (
		<div data-id="menu" className="menu">
			{/* Menu Toggle Button */}
			<button
				type="button"
				className="menu-switch"
				onClick={() => setMenuListVisible((prev) => !prev)}
				onMouseOut={() => setMenuListVisible(false)}
				onBlur={() => setMenuListVisible(false)}
				style={{ cursor: 'pointer', display: 'inline-block' }}
			>
				<WIcon iconName="hugeicons:menu-01" />
			</button>

			{/* Chat Switch Button */}
			<button
				type="button"
				className="href-button chatswitch"
				onClick={handleClickChatSwitch}
				style={{ cursor: 'pointer' }}
			>
				<WIcon iconName="hugeicons:bubble-chat" />
				<span className="menuchat"> &nbsp; Общение &nbsp; </span>
			</button>

			{/* Debug Token Slot */}
			{children}

			{/* Dropdown Menu Links */}
			<div
				className={`menu--links ${menuListVisible ? 'menu--links-visible' : ''}`}
				style={{
					display: menuListVisible ? 'flex' : 'none',
					alignItems: 'center',
					gap: '4px',
					flexWrap: 'wrap',
					padding: '8px',
					backgroundColor: '#f9f9f9',
					border: '1px solid #ddd',
					borderRadius: '4px',
					fontSize: '14px',
				}}
			>
				<a href="/">Заглавная</a>
				<span className="menu--links-sep" style={{ margin: '0 4px' }}>
					|
				</span>

				<a href={FORUM_URL} target="_blank" rel="noopener noreferrer">
					Новости
				</a>
				<span className="menu--links-sep" style={{ margin: '0 4px' }}>
					|
				</span>

				<a href="/mobile/">Мобильная версия</a>
				<span className="menu--links-sep" style={{ margin: '0 4px' }}>
					|
				</span>

				<a href="forum/" target="_blank" rel="noopener noreferrer">
					Форум
				</a>
				<span className="menu--links-sep" style={{ margin: '0 4px' }}>
					|
				</span>

				<button
					type="button"
					className="href-button"
					onClick={handleClickAsk}
					style={{ textDecoration: 'underline' }}
				>
					&nbsp; ? &nbsp;
				</button>
				<span className="menu--links-sep" style={{ margin: '0 4px' }}>
					|
				</span>

				<button type="button" className="href-button" onClick={handleLogout}>
					Выход
				</button>
			</div>
		</div>
	);
};
