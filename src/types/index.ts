import type { AwardRecord } from '@/types/AwardRecord';

export type SliceStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface IPlayerInfo {
	id: string;
}

// todo - update usage
export interface IAnswer extends IPlayerInfo {
	error?: string;
	errType?: string;
	PHPSESSID?: string;
	// id?: string
	token?: string;
}

export interface IClubAward {
	id: number;
	club: number;

	awardname: string; //"За создание мира",
	awardtext: string; //"И создал он на шестой <del> день </del> месяц мир. И понял, что он тёмен и полон багов.
	// \nРасстроился и решил исправлять их потом, походу. Так и живём с тех пор...",
	awardimg: string; //"worldcreation.png",
	awardbonus: string; //"",
	awardtime: string | number; //"0" | 1588194060
}

export interface IClubInfo {
	id: string; //"1",
	name: string; //"Сергей Новиков",
	regtime: string; //"1",
	time: string; //"1578995936",
	club: string; //"Смертоносные упорыши",
	rights: string; //"0",
	money: string; //"40096.71",
	rubles: string; //"348.00",
	lastlogin: string; //"0",
	rating: string; //"169",
	img: string; //"001.png",
	win: string; //"295",
	lose: string; //"213",
	banner_history: string; //"",
	premium: string; //"0",
	france: string; //"Prester Johan de Ynde",
	english: string; //"Prester John  ",
	fighters: number; //30,
	place: number; //1,
	awards: AwardRecord[];
}

export interface MyClub {
	ID: number;
	Club: string;
	Image: string; // "002.png";
	Rating: number;
	Win: number;
	Lose: number;
	RegTime: number;
	France: string;
	English: string;
	InGameTime: string; // "1895 d. 0 h. 13m.";
	FromTime: string; // "2020-01-30";
	FightersNum: number;
	Awards: AwardRecord[];
}

/*
* {
        "id": 66665,
        "user": 2,
        "time": 1589602062,
        "msg": "\u003ca href=\"#\" onClick=\"MakeInfo(`318`, `leftdiv`,`finfo`); return false;\"\u003eАлександр Гавриков\u003c/a\u003e научился новому! Он стал лучше владеть древковым оружием.",
        "class": "trn",
        "deleted": 0,
        "TimeS": "2020-05-16",
        "TimeF": "07:07:42",
        "MessageHtml": "\u003ca href=\"#\" onClick=\"MakeInfo(`318`, `leftdiv`,`finfo`); return false;\"\u003eАлександр Гавриков\u003c/a\u003e научился новому! Он стал лучше владеть древковым оружием."
    }
*
* */
