import { authenticate } from "../shopify.server";
import db from "../db.server";
import { shopify } from "../../shopify.server";

export const action = async ({ request }) => {
  const { shop, session, topic } = await authenticate.webhook(request);

  console.log(`[WEBHOOK: ${topic}] from shop: ${shop}`);

  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    await db.session.deleteMany({ where: { shop } });
  }

  return Response.json({ success: true });
};
