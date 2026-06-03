import * as React from "react";

export const SETTING_ATUR_COA_JENIS_BIAYA_PRODUK_PINJAMAN =
  "atur-coa-jenis-biaya-produk-pinjaman";

const STORAGE_KEY = "dyad.generalSettings.v1";
const SETTINGS_EVENT = "dyad.generalSettings.changed";

type SettingsState = Record<string, boolean>;

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readSettings(): SettingsState {
  if (typeof window === "undefined") return {};

  const parsed = safeParse<SettingsState>(window.localStorage.getItem(STORAGE_KEY));
  if (!parsed || typeof parsed !== "object") return {};

  return parsed;
}

function writeSettings(next: SettingsState) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(SETTINGS_EVENT));
}

export function getGeneralSetting(id: string, defaultValue = false) {
  const settings = readSettings();
  return settings[id] ?? defaultValue;
}

export function setGeneralSetting(id: string, value: boolean) {
  const settings = readSettings();
  writeSettings({
    ...settings,
    [id]: value,
  });
}

export function useGeneralSetting(id: string, defaultValue = false) {
  const [value, setValue] = React.useState(() =>
    getGeneralSetting(id, defaultValue),
  );

  React.useEffect(() => {
    const sync = () => {
      setValue(getGeneralSetting(id, defaultValue));
    };

    sync();

    window.addEventListener(SETTINGS_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(SETTINGS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [defaultValue, id]);

  return value;
}