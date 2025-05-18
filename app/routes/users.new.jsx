// app/routes/users.new.jsx
import { useActionData, Form, useNavigation } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  TextField,
  FormLayout,
  Button,
  Banner,
} from "@shopify/polaris";
import { redirect, json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import { requireAdminSession } from "../shopify.server";

export const action = async ({ request }) => {
  await requireAdminSession(request);
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  if (!name || !email) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  const prisma = new PrismaClient();
  try {
    await prisma.user.create({ data: { name, email } });
    return redirect("/dashboard?tab=users");
  } catch (err) {
    return json({ error: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export default function NewUser() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Page title="Add New User">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Form method="post">
              <FormLayout>
                {actionData?.error && <Banner status="critical">{actionData.error}</Banner>}
                <TextField label="Name" name="name" required />
                <TextField label="Email" name="email" type="email" required />
                <Button submit loading={isSubmitting} primary>Add</Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

