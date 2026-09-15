const normalizeString = (string) => sanitize(string).trim().toLowerCase();

const escapeHtml = (string) => {
  return String(string)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

function sanitize(string) {
  return String(string)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("/", "&#x2F;");
}

module.exports = { escapeHtml, sanitize, normalizeString };
