import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('https://walkdog.vercel.app/signup')
  
  await page
    .getByRole('textbox', { name: 'Nome completo' })
    .fill('Kira Oliveira')
    
  await page
    .getByRole('textbox', { name: 'E-mail' })
    .fill('kira@walkdog.com')
  
  await page
    .getByRole('textbox', { name: 'CPF somente números' })
    .fill('12345678982')
  
  await page
    .getByRole('textbox', { name: 'CEP' })
    .fill('81250000')

  await page
    .getByRole('button', { name: 'Buscar CEP' })
    .click()

  await page
    .getByPlaceholder('Número', { exact: true })
    .fill('2')

  await page
    .getByRole('textbox', { name: 'Complemento' })
    .fill('Apartamento 3')
  
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Cuidar' })
    .click()
  
  await page
    .setInputFiles('[type=file]', 'support/fixtures/rg.png')  

  await page
    .getByRole('button', { name: 'Cadastrar' })
    .click()   

const message = page.locator('#swal2-html-container')

  await expect(message)
    .toContainText('Recebemos o seu cadastro e em breve retornaremos o contato.')

  await page
    .getByRole('button', { name: 'Voltar' })
    .click()
})