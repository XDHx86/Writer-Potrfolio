import { expect, test } from "@playwright/test";

test("resume resources, metadata, and document actions", async ({ page, request }) => {
  const html = await request.get("/resume");
  expect(html.status()).toBe(200);
  expect(await html.text()).toContain("PROFESSIONAL EXPERIENCE");
  const pdf = await request.get("/resume.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  const markdown = await request.get("/resume.md");
  expect(markdown.status()).toBe(200);
  expect(markdown.headers()["content-type"]).toContain("text/markdown");
  expect(await markdown.text()).toContain("# MUWAFAQ SAMI");
  for (const route of ["/llms.txt", "/robots.txt", "/sitemap.xml", "/favicon.ico"]) expect((await request.get(route)).status(), route).toBe(200);

  await page.goto("/resume");
  await expect(page.getByRole("heading", { level: 1, name: "MUWAFAQ SAMI" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View PDF" })).toHaveAttribute("href", "/resume.pdf");
  await expect(page.getByRole("link", { name: "View Markdown" })).toHaveAttribute("href", "/resume.md");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://portofolio-muwafaq.vercel.app/resume");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image\.png/);
});

test("mobile search returns focus to the menu button", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await page.getByRole("button", { name: "Search site" }).click();
  await expect(page.getByRole("dialog", { name: "Go to…" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Go to…" })).toBeHidden();
  await expect(menu).toBeFocused();
});

test("command palette opens with keyboard, filters projects, and closes with Escape", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const palette = page.getByRole("dialog", { name: "Go to…" });
  await expect(palette).toBeVisible();
  await page.getByRole("searchbox", { name: "Search commands and projects" }).fill("Wild Horses");
  await expect(palette.getByRole("link", { name: /Wild Horses/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(palette).toBeHidden();
  await page.getByRole("link", { name: "Resume", exact: true }).click();
  await expect(page).toHaveURL(/\/resume$/);
});
