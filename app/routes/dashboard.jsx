// app/routes/dashboard.jsx
import { useSearchParams } from "@remix-run/react";
import { Page, Tabs, Layout, Card, TextContainer } from "@shopify/polaris";
import { json } from "@remix-run/node";
import { requireAdminSession } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

export const loader = async ({ request }) => {
  await requireAdminSession(request);
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  await prisma.$disconnect();
  return json({ users });
};

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "overview";

  const handleTabChange = (selectedIndex) => {
    const tabs = ["overview", "users", "settings"];
    setSearchParams({ tab: tabs[selectedIndex] });
  };

  const tabs = [
    { id: "overview", content: "Overview" },
    { id: "users", content: "Users" },
    { id: "settings", content: "Settings" },
  ];

  const selectedIndex = tabs.findIndex((t) => t.id === selectedTab);

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <Tabs tabs={tabs} selected={selectedIndex} onSelect={handleTabChange}>
            <Card sectioned>
              <TextContainer>
                {selectedTab === "overview" && <p>Welcome to the dashboard!</p>}
                {selectedTab === "users" && <p>Manage users. Navigate to /users/new to add more.</p>}
                {selectedTab === "settings" && <p>App settings will go here.</p>}
              </TextContainer>
            </Card>
          </Tabs>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

