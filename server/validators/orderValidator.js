const z = require("zod");

exports.orderSchema = z.object({
  status: z.enum(["in progress", "canceled", "delivered"]),
  deliveredAddress: z.string(),
  discountPercent: z.number(),
});
