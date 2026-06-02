<script lang="ts">
import Icon from "@iconify/svelte";
import {
	currentLanguage,
	languageOptions,
	setLanguage,
	type LanguageCode,
} from "@/i18n";

function showPanel() {
	const panel = document.querySelector("#language-panel");
	panel?.classList.remove("float-panel-closed");
}

function hidePanel() {
	const panel = document.querySelector("#language-panel");
	panel?.classList.add("float-panel-closed");
}

function switchLanguage(language: LanguageCode) {
	setLanguage(language);
	hidePanel();
}
</script>

<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={hidePanel}>
    <button
        aria-label="Language"
        role="menuitem"
        class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
        id="language-switch"
        onclick={showPanel}
        onmouseenter={showPanel}
    >
        <Icon icon="material-symbols:translate" class="text-[1.25rem]"></Icon>
    </button>

    <div id="language-panel" class="absolute transition float-panel-closed top-11 -right-2 pt-5">
        <div class="card-base float-panel p-2">
            {#each languageOptions as option}
                <button
                    class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={$currentLanguage === option.code}
                    onclick={() => switchLanguage(option.code)}
                >
                    <span>{option.label}</span>
                </button>
            {/each}
        </div>
    </div>
</div>
