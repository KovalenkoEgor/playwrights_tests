import { test, expect } from '@playwright/test';

test.describe("Проверки для главной страницы Playwright", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хэдера', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Community' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();
  });

  test('Проверка названий элементов навигации хэдера', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText('Playwright');
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect.soft(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect.soft(page.getByRole('link', { name: 'Community' })).toContainText('Community');
  });

  test("Проверка заголовка страницы", async ({ page }) => {
    await expect.soft(page.locator('h1')).toBeVisible();
    await expect.soft(page.locator('h1')).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
  });

  test("Проверка атрибутов элементов навигации хэдера", async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
    await expect.soft(page.getByRole('link', { name: 'API' })).toHaveAttribute('href', '/docs/api/class-playwright');
    await expect.soft(page.getByRole('button', { name: 'Node.js' })).toHaveAttribute('href', '#');
    await expect.soft(page.getByRole('link', { name: 'Community' })).toHaveAttribute('href', '/community/welcome');
  });

  test("Проверка переключения лайт мода", async ({ page }) => {
    await expect.soft(page.getByRole('button', { name: 'Switch between dark and light' })).toHaveAttribute('title', 'system mode');

    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect.soft(page.getByRole('button', { name: 'Switch between dark and light' })).toHaveAttribute('title', 'light mode');

    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect.soft(page.getByRole('button', { name: 'Switch between dark and light' })).toHaveAttribute('title', 'dark mode');
  });

  test("Проверка кнопки 'Get Started'", async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible()
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');

    await page.getByRole('link', { name: 'Get started' }).click();
    await expect.soft(page).toHaveURL('https://playwright.dev/docs/intro')
  });
})

