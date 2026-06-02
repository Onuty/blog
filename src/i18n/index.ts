import { get, writable } from "svelte/store";
import I18nKey from "./i18nKey";
import { en } from "./en";
import { ja } from "./ja";
import { zhCN } from "./zh-CN";
import { zhTW } from "./zh-TW";
import type { Translation } from "./translation";

export type LanguageCode = "en" | "zh-TW" | "zh-CN" | "ja";

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
