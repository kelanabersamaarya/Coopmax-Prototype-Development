const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export function formatOperationalDateTime(dateValue: string, timeValue: string) {
  const isoDate = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const indonesianDate = dateValue.match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/i);
  const numericDate = dateValue.match(/^(\d{1,2})[-/]?(\d{1,2})[-/]?(\d{4})$/);
  let day = "";
  let month = "";
  let year = "";

  if (isoDate) {
    [, year, month, day] = isoDate;
  } else if (indonesianDate) {
    day = indonesianDate[1].padStart(2, "0");
    month = String(monthNames.findIndex((name) => name.toLowerCase() === indonesianDate[2].toLowerCase()) + 1).padStart(2, "0");
    year = indonesianDate[3];
  } else if (numericDate) {
    [, day, month, year] = numericDate;
    day = day.padStart(2, "0");
    month = month.padStart(2, "0");
  }

  const normalizedTime = timeValue.length === 5 ? `${timeValue}:00` : timeValue;
  return day && month && year ? `${day}-${month}-${year} ${normalizedTime}` : `${dateValue} ${normalizedTime}`;
}

export function formatOperationalHistoryDateTime(value: string) {
  const match = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4}),?\s+(\d{1,2})[.:](\d{2})(?:[.:](\d{2}))?/);
  if (match) {
    const [, day, month, year, hour, minute, second = "00"] = match;
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year} ${hour.padStart(2, "0")}:${minute}:${second}`;
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return `${String(parsed.getDate()).padStart(2, "0")}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${parsed.getFullYear()} ${String(parsed.getHours()).padStart(2, "0")}:${String(parsed.getMinutes()).padStart(2, "0")}:${String(parsed.getSeconds()).padStart(2, "0")}`;
  }

  return value;
}

export function formatCurrentOperationalDateTime() {
  const now = new Date();
  return formatOperationalDateTime(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
  );
}
