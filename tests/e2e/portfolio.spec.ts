import { expect, test } from "@playwright/test";

test("project dialog reads the correct PDF and restores focus", async ({ page, request }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { level: 1, name: /Muwafaq Sami/i })).toBeVisible();
  await page.screenshot({ path: "test-results/hero-desktop.png" });
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page.locator("#projects")).toBeInViewport();
  await page.screenshot({ path: "test-results/work-desktop.png" });
  const project = page.locator(".manuscript-row").filter({ hasText: "The Fate of Moramania" });
  await project.click();
  await expect(page.getByRole("dialog", { name: "The Fate of Moramania" })).toBeVisible();
  await expect(page).toHaveURL(/project=the-fate-of-moramania/);
  await expect(page.getByRole("link", { name: /Download PDF/i })).toHaveAttribute("href", /Fate%20of%20Muramania%20Glossary%20\.pdf/);
  await expect(page.getByRole("dialog").locator("iframe")).toBeVisible();
  await page.getByRole("dialog").getByRole("button", { name: "Writing sample", exact: true }).click();
  await expect(page.getByRole("link", { name: /Download PDF/i })).toHaveAttribute("href", /Fate%20of%20Muramnia%20Sample\.pdf/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(project).toBeFocused();
  await expect(page).not.toHaveURL(/project=/);
  const pdf = await request.get("/personal/Wild%20Horses%20Premise.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
});

test("archive, direct project URLs, and previous/next navigation", async ({ page }) => {
  await page.goto("/?project=dante#projects");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("dialog", { name: "Dante" })).toBeVisible();
  await page.getByRole("button", { name: /Next work/ }).click();
  await expect(page.getByRole("dialog", { name: "Love Kills" })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("dialog", { name: "Dante" })).toBeVisible();
  await page.getByRole("button", { name: "Close project" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("form validates and handles Formspree success, failure, and duplicate submits", async ({ page }) => {
  await page.goto("/#contact");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  await page.getByRole("textbox", { name: "Your name" }).fill("Alex Reader");
  await page.getByRole("textbox", { name: "Email address" }).fill("bad");
  await page.getByRole("textbox", { name: "Subject" }).fill("Work");
  await page.getByRole("textbox", { name: "Message" }).fill("A message of sufficient length.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  await page.getByRole("textbox", { name: "Email address" }).fill("alex@example.com");
  let submissions = 0;
  await page.route("https://formspree.io/f/mdeadwwe", async (route) => {
    submissions++;
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({ status: submissions === 1 ? 500 : 200, contentType: "application/json", body: "{}" });
  });
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("button", { name: /Sending/ })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("could not be sent");
  await expect(page.getByRole("textbox", { name: "Message" })).toHaveValue("A message of sufficient length.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("Message sent");
  expect(submissions).toBe(2);
});

test("mobile menu, dialog, and small viewports", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "test-results/hero-mobile.png" });
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), `overflow at ${width}px`).toBe(false);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator(".manuscript-row").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.waitForTimeout(450);
  await page.screenshot({ path: "test-results/dialog-mobile.png" });
});
