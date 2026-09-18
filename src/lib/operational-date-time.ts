const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export function formatOperationalDateTime(dateValue: string, timeValue: string) {
  const isoDate = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const indonesianDate = dateValue.match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/i);
  const numericDate = dateValue.match(/^(\d{2})[-/]?(\d{2})[-/]?(\d{4})$/);
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
  }

  const normalizedTime = timeValue.length === 5 ? `${timeValue}:00` : timeValue;
  return day && month && year ? `${day}-${month}-${year} ${normalizedTime}` : `${dateValue} ${normalizedTime}`;
}
