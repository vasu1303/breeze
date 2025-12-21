import { invoke } from "@tauri-apps/api/core"
import { listen, UnlistenFn } from "@tauri-apps/api/event";

export const typeText = async (text: string) => {
    try {
        await invoke("type_text", {text});
    } catch (err) {
        console.error("Failed to invoke Rust type_text", err);
    };
};

export const setupShortcutListener = async ( callback: () => void ): Promise<UnlistenFn> => {
    return listen("shortcut-pressed", callback);
}