import { test, expect, Page } from "@playwright/test";

async function openImageModal(page: Page) {
  await page.goto("/");
  const firstImage = page.getByRole("img").first();
  await firstImage.click();
  const imageModal = page.getByRole("dialog");
  await imageModal.isVisible();
  return imageModal;
}

test("should navigate to the new image page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=neues Bild");
  await expect(page).toHaveURL("/neues-Bild");
  await expect(page.locator("h2")).toContainText("Neues Bild");
});

test.describe("when image modal is opened", () => {
  test("should navigate to tags page when clicked on a tag", async ({
    page,
  }) => {
    await openImageModal(page);
    const firstTag = page.getByTestId("tag").first();
    test.skip(!firstTag, "No tag for this image");
    await firstTag.click();
    await expect(page).toHaveURL(/\/tags\/.*/);
  });

  test("should navigate to specific image page when 'Zum Bild' is clicked", async ({
    page,
  }) => {
    const imageModal = await openImageModal(page);
    await imageModal.getByText("Zum Bild").click();
    await expect(page).toHaveURL(/\/photos\/\d+/);
  });

  test("should close modal when clicked outside", async ({ page }) => {
    await openImageModal(page);
    const backdrop = page.getByTestId("modalbackdrop");
    await backdrop.click({
      force: true,
      position: {
        x: 1,
        y: 1,
      },
    });
    await expect(page).toHaveURL("/");
  });
});
