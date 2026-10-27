const z = require("zod");

exports.categorySchema = z.object({
  name: z.string().min(3, "Category must be minimum 3 charactors"),
});
