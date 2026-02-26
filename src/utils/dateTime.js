import { pad } from "./string.util.js";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDateTime() {
  const date = new Date();

  return normalizeDateTime(date);
}

function normalizeDateTime(dateTime) {
  // Input Format: "2024-05-10T09:45:37.408Z"
  const date = new Date(dateTime);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay() + 1,
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    milliSecond: date.getMilliseconds(),
  };
}

function formattingDateTime(dateTime) {
  const stringDateTime = {
    year: dateTime.year,
    month: dateTime.month,
    day: dateTime.day,
    hour: dateTime.hour,
    minute: dateTime.minute,
    second: dateTime.second,
    yearStr: pad(dateTime.year, 4),
    monthStr: pad(dateTime.month),
    dayStr: pad(dateTime.day),
    hourStr: pad(dateTime.hour),
    minuteStr: pad(dateTime.minute),
    secondStr: pad(dateTime.second),

    weekdayName: WEEKDAYS[dateTime.weekday - 1],
    monthName: MONTHS[dateTime.month - 1],
  };

  return {
    ...stringDateTime,
    date: `${stringDateTime.monthStr}/${stringDateTime.dayStr}/${stringDateTime.yearStr}`,
    time: `${stringDateTime.hourStr}:${stringDateTime.minuteStr}:${stringDateTime.secondStr}`,
    iso: `${stringDateTime.yearStr}-${stringDateTime.monthStr}-${stringDateTime.dayStr}T${stringDateTime.hourStr}:${stringDateTime.minuteStr}:${stringDateTime.secondStr}`,
  };
}

// Get, Format, normalize

function calcRelativeDateTimeDifference(
  isoDateTime = "1970-01-01T00:00:00.000Z"
) {
  const currentDateTime = new Date();
  const inputDateTime = new Date(isoDateTime);

  return convertMilliSecondsToDateTime(currentDateTime - inputDateTime);
}

function convertMilliSecondsToDateTime(milliSeconds) {
  let result = null;

  const SEC_TO_MILLISEC = 1000;
  const MIN_TO_MILLISEC = 60 * SEC_TO_MILLISEC;
  const HOUR_TO_MILLISEC = 60 * MIN_TO_MILLISEC;
  const DAY_TO_MILLISEC = 24 * HOUR_TO_MILLISEC;
  const WEEK_TO_MILLISEC = 7 * DAY_TO_MILLISEC;
  const MONTH_TO_MILLISEC = 30.4166 * DAY_TO_MILLISEC;
  const YEAR_TO_MILLISEC = 365.25 * DAY_TO_MILLISEC;

  const seconds = Math.floor(milliSeconds / SEC_TO_MILLISEC);
  const minutes = Math.floor(milliSeconds / MIN_TO_MILLISEC);
  const hours = Math.floor(milliSeconds / HOUR_TO_MILLISEC);
  const days = Math.floor(milliSeconds / DAY_TO_MILLISEC);
  const weeks = Math.floor(milliSeconds / WEEK_TO_MILLISEC);
  const months = Math.floor(milliSeconds / MONTH_TO_MILLISEC);
  const years = Math.floor(milliSeconds / YEAR_TO_MILLISEC);

  if (months >= 12) {
    result = `${years} Years ago`;
  } else if (days >= 30) {
    result = `${months} Months ago`;
  } else if (days >= 7) {
    result = `${weeks} Weeks ago`;
  } else if (hours >= 24) {
    result = `${days} Days ago`;
  } else if (minutes >= 60) {
    result = `${hours} Hours ago`;
  } else if (seconds >= 60) {
    result = `${minutes} Minutes ago`;
  } else {
    result = `Moments ago`;
  }

  return result;
}

function convertMonthToMonthName(month) {
  return MONTHS[month - 1];
}

function calcNumberOfDaysOnMonth(currentYear, currentMonth) {
  const daysOfMonthMap = {
    1: 31,
    2: currentYear % 4 === 0 ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  return daysOfMonthMap[currentMonth];
}

function calcWeeksOfMonth(year, month) {
  const daysOfMonth = calcNumberOfDaysOnMonth(year, month);
  const firstDayOfMonthOnWeek =
    normalizeDateTime(`${year}-${month}-1`).weekday % 7;

  const days = [];
  const weeks = [];
  const temp = [];

  for (let i = 0; i <= firstDayOfMonthOnWeek; i++) days.push(null);
  for (let i = 1; i <= daysOfMonth; i++) days.push(i);

  for (let i = 1; i < days.length; i++) {
    temp.push(days[i]);

    if (i % 7 === 0) {
      weeks.push([...temp]);

      temp.length = 0;
    }
  }

  temp.length && weeks.push([...temp]);

  return weeks;
}

const isDateMatch = (mainDate, date) => {
  mainDate = normalizeDateTime(mainDate);
  date = normalizeDateTime(date);

  return (
    mainDate.year === date.year &&
    mainDate.month === date.month &&
    mainDate.day === date.day
  );
};

export {
  calcNumberOfDaysOnMonth,
  convertMilliSecondsToDateTime,
  convertMonthToMonthName,
  calcRelativeDateTimeDifference,
  formattingDateTime,
  normalizeDateTime,
  calcWeeksOfMonth,
  getDateTime,
  isDateMatch,
};
