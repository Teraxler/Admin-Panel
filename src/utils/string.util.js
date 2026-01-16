function normalizeText(text) {
  return String(text).trim().toLowerCase();
}

function pad(num, len = 2) {
  return String(num).padStart(len, 0);
}

const isStartsWith = (mainString, param) =>
  normalizeText(mainString).startsWith(normalizeText(param));

const isIncludes = (mainString, param) =>
  normalizeText(mainString).includes(normalizeText(param));

export { normalizeText, pad, isStartsWith, isIncludes };
