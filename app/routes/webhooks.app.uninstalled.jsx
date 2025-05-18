import { authenticate } from "../shopify.server";
import db from "../db.server";
import { shopify } from "../shopify.server";

export const action = async ({ request }) => {
  const { shopify } = await import("../shopify.server.js"); // ✅ server-only safe
  const { topic, shop } = await shopify.authenticate.webhook(request);

  console.log(`[WEBHOOK: ${topic}] received from ${shop}`);

  return Response.json({ success: true });
};
