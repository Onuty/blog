import { get, writable } from "svelte/store";
import I18nKey from "./i18nKey";
import { en } from "./en";
import { ja } from "./ja";
import { zhCN } from "./zh-CN";
import { zhTW } from "./zh-TW";
import type { Translation } from "./translation";

export type LanguageCode = "en" | "zh-TW" | "zh-CN" | "ja";
type PostField = "title" | "description" | "category" | "bodyIntro" | "bodyNote";
export type CustomI18nKey =
	| "friends"
	| "friendsSubtitle"
	| "searchFriends"
	| "all"
	| "visit"
	| "copyLink"
	| "aboutTitle"
	| "aboutIntro"
	| "aboutDetail";

export const LANGUAGE_STORAGE_KEY = "language";
export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const languageOptions: { code: LanguageCode; label: string }[] = [
	{ code: "en", label: "English" },
	{ code: "zh-TW", label: "繁體中文" },
	{ code: "zh-CN", label: "简体中文" },
	{ code: "ja", label: "日本語" },
];

const translationMap: Record<LanguageCode, Translation> = {
	en,
	"zh-TW": zhTW,
	"zh-CN": zhCN,
	ja,
};

const postTranslationMap: Record<
	LanguageCode,
	Record<string, Partial<Record<PostField, string>>>
> = {
	en: {
		welcome: {
			title: "Welcome to Onuty",
			description: "The first sample post on Onuty.",
			category: "Journal",
			bodyIntro: "This is a personal blog built with the Fuwari template.",
			bodyNote:
				"I will use this space for technical notes, personal writing, and anything worth keeping around.",
		},
	},
	"zh-TW": {
		welcome: {
			title: "歡迎來到 Onuty",
			description: "這是 Onuty 的第一篇示例文章。",
			category: "日誌",
			bodyIntro: "這是使用 Fuwari 模板建立的個人博客。",
			bodyNote: "之後會在這裡整理技術筆記、個人文章，以及值得留下來的內容。",
		},
	},
	"zh-CN": {
		welcome: {
			title: "欢迎来到 Onuty",
			description: "这是 Onuty 的第一篇示例文章。",
			category: "日志",
			bodyIntro: "这是使用 Fuwari 模板建立的个人博客。",
			bodyNote: "之后会在这里整理技术笔记、个人文章，以及值得留下来的内容。",
		},
	},
	ja: {
		welcome: {
			title: "Onuty へようこそ",
			description: "Onuty の最初のサンプル記事です。",
			category: "ジャーナル",
			bodyIntro: "これは Fuwari テンプレートで作成した個人ブログです。",
			bodyNote:
				"技術メモ、個人的な文章、残しておきたい内容をここにまとめていきます。",
		},
	},
};

const taxonomyTranslationMap: Record<
	LanguageCode,
	Record<string, string>
> = {
	en: {
		Blog: "Blog",
		Fuwari: "Fuwari",
		Journal: "Journal",
	},
	"zh-TW": {
		Blog: "部落格",
		Fuwari: "Fuwari",
		Journal: "日誌",
	},
	"zh-CN": {
		Blog: "博客",
		Fuwari: "Fuwari",
		Journal: "日志",
	},
	ja: {
		Blog: "ブログ",
		Fuwari: "Fuwari",
		Journal: "ジャーナル",
	},
};

const customTranslationMap: Record<LanguageCode, Record<CustomI18nKey, string>> = {
	en: {
		friends: "Friends",
		friendsSubtitle: "Discover more excellent websites",
		searchFriends: "Search by friend name or description...",
		all: "All",
		visit: "Visit",
		copyLink: "Copy link",
		aboutTitle: "About",
		aboutIntro: "This is Onuty's personal blog.",
		aboutDetail:
			"I use this space to collect technical notes, personal writing, and links worth keeping.",
	},
	"zh-TW": {
		friends: "友鏈",
		friendsSubtitle: "發現更多優秀網站",
		searchFriends: "搜尋友鏈名稱或描述...",
		all: "全部",
		visit: "訪問",
		copyLink: "複製連結",
		aboutTitle: "關於",
		aboutIntro: "這是 Onuty 的個人博客。",
		aboutDetail: "我會在這裡整理技術筆記、個人文章，以及值得留下來的連結。",
	},
	"zh-CN": {
		friends: "友链",
		friendsSubtitle: "发现更多优秀网站",
		searchFriends: "搜索友链名称或描述...",
		all: "全部",
		visit: "访问",
		copyLink: "复制链接",
		aboutTitle: "关于",
		aboutIntro: "这是 Onuty 的个人博客。",
		aboutDetail: "我会在这里整理技术笔记、个人文章，以及值得留下来的链接。",
	},
	ja: {
		friends: "リンク集",
		friendsSubtitle: "すてきなサイトを見つける",
		searchFriends: "名前や説明で検索...",
		all: "すべて",
		visit: "訪問",
		copyLink: "リンクをコピー",
		aboutTitle: "このサイトについて",
		aboutIntro: "これは Onuty の個人ブログです。",
		aboutDetail:
			"技術メモ、個人的な文章、残しておきたいリンクをここにまとめています。",
	},
};

export function normalizeLanguage(language: string | null | undefined): LanguageCode {
	const normalized = language?.replace("_", "-").toLowerCase();
	switch (normalized) {
		case "zh-tw":
			return "zh-TW";
		case "zh-cn":
			return "zh-CN";
		case "ja":
		case "ja-jp":
			return "ja";
		case "en":
		case "en-us":
		case "en-gb":
		case "en-au":
			return "en";
		default:
			return DEFAULT_LANGUAGE;
	}
}

function readStoredLanguage(): LanguageCode {
	if (typeof localStorage === "undefined") {
		return DEFAULT_LANGUAGE;
	}
	return normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
}

export const currentLanguage = writable<LanguageCode>(readStoredLanguage());

export function translate(key: I18nKey, language = get(currentLanguage)): string {
	return translationMap[language][key] || translationMap[DEFAULT_LANGUAGE][key];
}

export function translatePost(
	slug: string,
	field: PostField,
	language = get(currentLanguage),
): string | undefined {
	return (
		postTranslationMap[language][slug]?.[field] ||
		postTranslationMap[DEFAULT_LANGUAGE][slug]?.[field]
	);
}

export function translateTaxonomy(
	value: string,
	language = get(currentLanguage),
): string {
	return taxonomyTranslationMap[language][value] || value;
}

export function translateCustom(
	key: CustomI18nKey,
	language = get(currentLanguage),
): string {
	return customTranslationMap[language][key] || customTranslationMap[DEFAULT_LANGUAGE][key];
}

export function applyLanguageToDocument(language = readStoredLanguage()): void {
	if (typeof document === "undefined") {
		return;
	}

	document.documentElement.lang = language;

	document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
		const key = element.dataset.i18n as I18nKey | undefined;
		if (key) {
			element.textContent = translate(key, language);
		}
	});

	document
		.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
			"[data-i18n-placeholder]",
		)
		.forEach((element) => {
			const key = element.dataset.i18nPlaceholder as I18nKey | undefined;
			if (key) {
				element.placeholder = translate(key, language);
			}
		});

	document.querySelectorAll<HTMLElement>("[data-i18n-aria-label]").forEach((element) => {
		const key = element.dataset.i18nAriaLabel as I18nKey | undefined;
		if (key) {
			element.setAttribute("aria-label", translate(key, language));
		}
	});

	document.querySelectorAll<HTMLElement>("[data-i18n-post]").forEach((element) => {
		const slug = element.dataset.i18nPost;
		const field = element.dataset.i18nPostField as PostField | undefined;
		if (!slug || !field) {
			return;
		}
		const translated = translatePost(slug, field, language);
		if (translated) {
			element.textContent = translated;
		}
	});

	document.querySelectorAll<HTMLElement>("[data-i18n-taxonomy]").forEach((element) => {
		const value = element.dataset.i18nTaxonomy;
		if (value) {
			element.textContent = translateTaxonomy(value, language);
		}
	});

	document.querySelectorAll<HTMLElement>("[data-i18n-custom]").forEach((element) => {
		const key = element.dataset.i18nCustom as CustomI18nKey | undefined;
		if (key) {
			element.textContent = translateCustom(key, language);
		}
	});

	document
		.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
			"[data-i18n-custom-placeholder]",
		)
		.forEach((element) => {
			const key = element.dataset.i18nCustomPlaceholder as
				| CustomI18nKey
				| undefined;
			if (key) {
				element.placeholder = translateCustom(key, language);
			}
		});

	document.querySelectorAll<HTMLElement>("[data-i18n-custom-aria-label]").forEach((element) => {
		const key = element.dataset.i18nCustomAriaLabel as
			| CustomI18nKey
			| undefined;
		if (key) {
			element.setAttribute("aria-label", translateCustom(key, language));
		}
	});

	document.querySelectorAll<HTMLElement>("[data-i18n-post-body]").forEach((element) => {
		const slug = element.dataset.i18nPostBody;
		if (!slug) {
			return;
		}
		const paragraphs = element.querySelectorAll("p");
		const intro = translatePost(slug, "bodyIntro", language);
		const note = translatePost(slug, "bodyNote", language);
		if (intro && paragraphs[0]) {
			paragraphs[0].textContent = intro;
		}
		if (note && paragraphs[1]) {
			paragraphs[1].textContent = note;
		}
	});
}

export function setLanguage(language: LanguageCode): void {
	const nextLanguage = normalizeLanguage(language);
	if (typeof localStorage !== "undefined") {
		localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
	}
	currentLanguage.set(nextLanguage);
	applyLanguageToDocument(nextLanguage);
	if (typeof document !== "undefined") {
		document.dispatchEvent(
			new CustomEvent("languagechange", { detail: { language: nextLanguage } }),
		);
	}
}

export function applyStoredLanguageToDocument(): void {
	const storedLanguage = readStoredLanguage();
	currentLanguage.set(storedLanguage);
	applyLanguageToDocument(storedLanguage);
}
