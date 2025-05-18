import { authenticate } from "../shopify.server";
import db from "../db.server";
import { shopify } from "../shopify.server";

export const action = async ({ request }) => {
  const { shopify } = await import("../shopify.server.js"); // ✅ dynamic server-only
  const { topic, shop, session } = await shopify.authenticate.webhook(request);

  console.log(`[WEBHOOK: ${topic}] from ${shop}`);
  return Response.json({ success: true });
};
