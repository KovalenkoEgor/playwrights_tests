import {test, expect, type Page, type Locator} from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;

  }
}
const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.locator('h1'),
    name: 'Header',
    text: 'Playwright enables reliable end-to-end testing for modern web apps.',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo Playwright',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/'
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
    attribute: {
      type: 'href',
      value: '#'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
    name: 'Get started link',
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    }
  },
  {
    locator: (page: Page): Locator => page.getByLabel('GitHub repository'),
    name: 'GitHub icon',
  },
  {
    locator: (page: Page): Locator => page.getByLabel('Discord server'),
    name: 'Discord icon',
  },
  {
    locator: (page: Page): Locator => page.getByLabel('Switch between dark and light'),
    name: 'Light mode icon',
  },
];

test.describe("Проверки для главной страницы Playwright", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Проверка отображения элементов навигации хэдера', async ({ page }) => {
      for (const {locator, name} of elements) {
        await test.step(`Проверка отображения элемента ${name} видимым`, async () => {
          await expect.soft(locator(page)).toBeVisible()
        });
      }
  });

  test('Проверка названий элементов навигации хэдера', async ({ page }) => {
    for (const {locator, name, text} of elements) {
      if (text) {
        await test.step(`Проверка наименований ${text} элементов ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    }
  });

  test("Проверка атрибутов элементов навигации хэдера", async ({ page }) => {
    for (const {locator, name, attribute} of elements) {
      if (attribute) {
        await test.step(`Проверка атрибутов href элементов ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    }
  });

  test("Проверка переключения лайт мода", async ({ page }) => {
    await expect.soft(page.getByRole('button', { name: 'Switch between dark and light' })).toHaveAttribute('title', 'system mode');

    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect.soft(page.getByRole('button', { name: 'Switch between dark and light' })).toHaveAttribute('title', 'light mode');

    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect.soft(page.getByRole('button', { name: 'Switch between dark and light' })).toHaveAttribute('title', 'dark mode');
  });

  test("Проверка редиректа на страницу playwright.dev/docs/intro по клику на кнопку  Get started", async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect.soft(page).toHaveURL('https://playwright.dev/docs/intro')
  });
})

