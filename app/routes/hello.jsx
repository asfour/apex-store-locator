import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { Page, Layout, Card, TextContainer } from "@shopify/polaris";
import { requireAdminSession } from "../shopify.server";

export const loader = async ({ request }) => {
  const session = await requireAdminSession(request);
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  await prisma.$disconnect();

  return json({ shop: session.shop, users });
};

export default function HelloPage() {
  const { shop, users } = useLoaderData();
  return (
    <Page title="Hello from Render">
      <Layout>
        <Layout.Section>
          <Card>
            <TextContainer>
              <p><strong>Shop:</strong> {shop}</p>
              <p><strong>Users:</strong></p>
              <ul>{users.map(u => <li key={u.id}>{u.name} - {u.email}</li>)}</ul>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

