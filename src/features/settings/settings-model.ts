export type SettingFieldKind = "toggle" | "select" | "input" | "section";

export type SettingOption = { label: string; value: string };

export type SettingDefinition = {
  id: string;
  kind: SettingFieldKind;
  label: string;
  defaultValue?: boolean | string;
  options?: SettingOption[];
};

export type SettingsValues = Record<string, boolean | string | undefined>;

export function createSettingsDefaults(definitions: SettingDefinition[]): SettingsValues {
  return definitions.reduce<SettingsValues>((values, definition) => {
    if (definition.defaultValue !== undefined) values[definition.id] = definition.defaultValue;
    return values;
  }, {});
}

export function updateSetting(values: SettingsValues, id: string, value: boolean | string): SettingsValues {
  return { ...values, [id]: value };
}

export type SettingsPersistenceAdapter = {
  read: () => SettingsValues;
  write: (values: SettingsValues) => void;
};
