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

const phoneFormat = (phone) => {
  try {
    phone = String(phone);
    if (phone.length !== 11) throw new Error("Phone must contain 11 digit");

    return phone.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3");
  } catch (error) {
    console.error(error.message);
  }
};

export { normalizeText, pad, isStartsWith, isIncludes, phoneFormat };
