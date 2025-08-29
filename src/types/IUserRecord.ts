export interface IUserRecordFull {
	/*
  id: number;
  name: string;
  login: string;
  password: string;
  regtime: number;
  lasttime: number;
  lastip: string;
  */

	ID: number; // 2;
	Name: string; // 'Андрей Кучумов';
	Email: string; // '1@1.ru';
	Login: string; // 'yoba';
	Password: string; // '---hash---';
	OldPassword: string; // '---hash---';
	RegTime: number; // 1580332080;
	Time: number; // 1745752921;
	Club: string; // 'Угнетающие отморозки';
	Rights: number; // 9;
	Money: number; // 100597.45;
	Roubles: number; // 1000;
	LastLogin: number; // 0;
	Rating: number; // 0;
	Image: string; // '002.png';
	Win: number;
	Lose: number;
	BannerHistory: string; //  '';
	Premium: number;
	RecruitTime: number; //1584393152;
}

export type IUserRecord = Omit<
	IUserRecordFull,
	'Login' | 'Password' | 'OldPassword' | 'Rights'
>;
