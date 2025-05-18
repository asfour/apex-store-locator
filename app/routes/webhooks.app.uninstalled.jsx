import { authenticate } from "../shopify.server";
import db from "../db.server";


export const action = async ({ request }) => {
  const { shopify } = await import("../shopify.server.js");
  const { topic, shop } = await shopify.authenticate.webhook(request);

  console.log(`[WEBHOOK] topic=${topic}, shop=${shop}`);

  return Response.json({ success: true });
};
