import { test, expect } from '@playwright/test';
import {IUpdateBookDto, ICreateBookDto} from '../../shared/types'
test.describe('User CRUD Flow with MUI Dialog', () => {
  const book: ICreateBookDto = {
    name: 'Alice Test',
    author: 'ben'
  }

  const updatedBook: ICreateBookDto = {
    name: 'Alice Updated',
    author: 'not ben'
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  });

    test('Verify Page Load', async ({ page }) => {
    await expect(page).toHaveTitle('Books App');
    await expect(page.getByTestId('create-button')).toBeVisible();
    await page.getByTestId('create-button').click();
     const dialog = page.getByRole('dialog');
     await expect(dialog).toBeVisible();
    })

  test('Create a book', async ({ page }) => {
    await test.step('Open create book dialog', async () => {
      await page.getByTestId('create-button').click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
    });

    await test.step('Fill in user details and submit', async () => {
      const dialog = page.getByRole('dialog');
      await dialog.getByLabel('Name').fill(book.name);
      await dialog.getByLabel('Author').fill(book.author);
     await expect(dialog.getByRole('button', { name: /CREATE/i })).toBeVisible();
    await expect(dialog.getByRole('button', { name: /CREATE/i })).toBeEnabled();
      await page.getByRole('button', { name: /CREATE/i }).click();
    });

    await test.step('Verify book appears in the list', async () => {
      const cards = page.locator('.MuiCard-root', { hasText: book.name });      
    const newCard = page.locator('.MuiCard-root ').filter({ hasText: book.name }).first();
        await expect(newCard.getByTestId('author')).toContainText(book.author);
        await expect(newCard).toContainText(book.author);
    })

  await test.step('Click edit on the book row', async () => {
       const newCard = page.locator('.MuiCard-root', { hasText: book.name });
       await newCard.click()
       const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
       await page.getByRole('textbox', { name: /author/i }).fill(updatedBook.author);
        await expect(dialog.getByRole('button', { name: /EDIT/i })).toBeVisible();
    await expect(dialog.getByRole('button', { name: /EDIT/i })).toBeEnabled();
      await page.getByRole('button', { name: /EDIT/i }).click();
     });

     await test.step('Verify user appears in the list', async () => {      
    const newCard = page.locator('.MuiCard-root').filter({ hasText: book.name }).first();
        await expect(newCard.getByTestId('author')).toContainText(updatedBook.author);
        await expect(newCard).toContainText(updatedBook.author);
    })

    await test.step('Click delete on the user row', async () => {
      const newCard = page.locator('.MuiCard-root', { hasText: book.name });
      await newCard.getByRole('button').click();
    });

    await test.step('Confirm deletion in dialog', async () => {
      const confirmDialog = page.getByRole('dialog');
      await confirmDialog.getByRole('button', { name: /Agree/i }).click();
    });

    await test.step('Verify user is removed from list', async () => {
      const newCard = page.locator('.MuiCard-root', { hasText: book.name });
      await expect(newCard).not.toBeVisible()
    });
})


  // test('Update the user', async ({ page }) => {
  //   await test.step('Click edit on the user row', async () => {
  //     const newCard = page.locator('.MuiCard-root', { hasText: book.name });
  //     await newCard.click()
  //     const dialog = page.getByRole('dialog');
  //     await expect(dialog).toBeVisible();
  //     await page.getByRole('textbox', { name: /name/i }).fill(book.name);
  //     await dialog.getByRole('button', { name: /edit/i }).click();
  //   });

  //   await test.step('Update user details and submit', async () => {
  //     const dialog = page.getByRole('dialog');
  //    await page.getByRole('textbox', { name: /name/i }).fill(book.name);
  //     await dialog.getByRole('button', { name: /edit/i }).click();
  //     await page.getByRole('textbox', { name: /name/i }).fill(book.name);
  //   });

  //   await test.step('Verify updated user is shown', async () => {
  //     const newCard = page.locator('.MuiCard-root', { hasText: book.name });
  //     await expect(newCard).toBeVisible()
  //   });
  // });

  // test('Delete the user', async ({ page }) => {
  //   await test.step('Click delete on the user row', async () => {
  //     const newCard = page.locator('.MuiCard-root', { hasText: book.name });
  //     const row = newCard.getByTestId('');
  //     await row.getByRole('button').click();
  //   });

  //   await test.step('Confirm deletion in dialog', async () => {
  //     const confirmDialog = page.getByRole('dialog');
  //     await confirmDialog.getByRole('button', { name: /Agree/i }).click();
  //   });

  //   await test.step('Verify user is removed from list', async () => {
  //     const newCard = page.locator('.MuiCard-root', { hasText: book.name });
  //     await expect(newCard).not.toBeVisible()
  //   });
  // });
})