import * as React from "react";

export const SETTING_ATUR_COA_JENIS_BIAYA_PRODUK_PINJAMAN =
  "atur-coa-jenis-biaya-produk-pinjaman";

const STORAGE_KEY = "dyad.generalSettings.v1";
const SETTINGS_EVENT = "dyad.generalSettings.changed";

type SettingsState = Record<string, boolean>;

type SettingsScope = string;

function getStorageKey(scope?: SettingsScope) {
  return scope ? `${STORAGE_KEY}.${scope}` : STORAGE_KEY;
}

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readSettings(scope?: SettingsScope): SettingsState {
  if (typeof window === "undefined") return {};

  const parsed = safeParse<SettingsState>(
    window.localStorage.getItem(getStorageKey(scope)),
  );
  if (!parsed || typeof parsed !== "object") return {};

  return parsed;
}

function writeSettings(next: SettingsState, scope?: SettingsScope) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(getStorageKey(scope), JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(SETTINGS_EVENT));
}

export function getGeneralSetting(
  id: string,
  defaultValue = false,
  scope?: SettingsScope,
) {
  const settings = readSettings(scope);
  return settings[id] ?? defaultValue;
}

export function setGeneralSetting(
  id: string,
  value: boolean,
  scope?: SettingsScope,
) {
  const settings = readSettings(scope);
  writeSettings(
    {
      ...settings,
      [id]: value,
    },
    scope,
  );
}

export function useGeneralSetting(
  id: string,
  defaultValue = false,
  scope?: SettingsScope,
) {
  const [value, setValue] = React.useState(() =>
    getGeneralSetting(id, defaultValue, scope),
  );

  React.useEffect(() => {
    const sync = () => {
      setValue(getGeneralSetting(id, defaultValue, scope));
    };

    sync();

    window.addEventListener(SETTINGS_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(SETTINGS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [defaultValue, id, scope]);

  return value;
}