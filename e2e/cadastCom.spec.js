import { test, expect } from '@playwright/test'

import { signupPage } from '../support/pages/signup'

    const walker = {
        name: 'Kira Oliveira',
        email: 'kira@walkdog.com',
        cpf: '12312312315',
        cep: '81250000',
        number: '2',
        info: 'Apartamento 3',
        document: 'rg.png'
    }

// Cadastro realizado com sucesso      
test('Deve poder cadastrar um novo walker com sucesso', async ({ page }) => {

   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit(walker)

   // Validando que o cadastro foi realizado com sucesso
   const message = page.locator('#swal2-html-container')

       await expect(message)
            .toContainText('Recebemos o seu cadastro e em breve retornaremos o contato.')

       await page
            .getByRole('button', { name: 'Voltar' })
            .click()
})

// Erro ao deixar o campo nome vazio
test('Não deve cadastrar quando o campo Nome estiver vazio', async ({ page }) => {
   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit({...walker, name: ''}) // Usando os '...' estamos espalhamento de objetos dentro das {}

   // Validando que exibiu a mensagem de erro abaixo do campo nome
   await expect(signup.alertError()).toContainText('Informe o seu nome completo')
})

// Erro ao inserir um e-mail incorreto
test('Não deve cadastrar com E-mail incorreto', async ({ page }) => {
   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit({...walker, email: 'www.walkdog.com'}) // Usando os '...' estamos espalhamento de objetos dentro das {}

   // Validando que exibiu a mensagem de erro abaixo do campo e-mail
   await expect(signup.alertError()).toContainText('Informe um email válido')
})

// Erro ao deixar o campo E-mail vazio
test('Não deve cadastrar quando o campo E-mail estiver vazio', async ({ page }) => {
   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit({...walker, email: ''}) // Usando os '...' estamos espalhamento de objetos dentro das {}

   // Validando que exibiu a mensagem de erro abaixo do campo e-mail
   await expect(signup.alertError()).toContainText('Informe o seu melhor email')
})

// Erro ao inserir um CPF inválido
test('Não deve cadastrar com CPF inválido', async ({ page }) => {
   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit({...walker, cpf: '11111111111'}) // Usando os '...' estamos espalhamento de objetos dentro das {}

   // Validando que exibiu a mensagem de erro abaixo do campo CPF
   await expect(signup.alertError()).toContainText('CPF inválido')
})

// Erro ao deixar o campo CPF vazio
test('Não deve cadastrar quando o campo CPF estiver vazio', async ({ page }) => {
   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit({...walker, cpf: ''}) // Usando os '...' estamos espalhamento de objetos dentro das {}

   // Validando que exibiu a mensagem de erro abaixo do campo CPF
   await expect(signup.alertError()).toContainText('Informe o seu CPF')
})

// Erro ao deixar o campo CEP vazio
test('Não deve cadastrar com o campo CEP vazio', async ({ page }) => {
   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit({...walker, cep: ''}) // Usando os '...' estamos espalhamento de objetos dentro das {}

   // Validando que exibiu a mensagem de erro abaixo do campo CEP
   await expect(signup.alertError()).toContainText('Informe o seu CEP')
})

// Erro ao inserir no campo Número um valor menor que zero
test('Não deve cadastrar quando o Número for igual a "0"', async ({ page }) => {
   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit({...walker, number: '0'}) // Usando os '...' estamos espalhamento de objetos dentro das {}

   // Validando que exibiu a mensagem de erro abaixo do campo Número
   await expect(signup.alertError()).toContainText('Informe um número maior que zero')
})

// Erro ao realizar o upload de um Documento inválido
test('Não deve cadastrar com upload de Documento inválido', async ({ page }) => {
   const signup = signupPage(page)
   
   await signup.open()
   await signup.submit({...walker, document: 'rg.doc'}) // Usando os '...' estamos espalhamento de objetos dentro das {}

   // Validando que exibiu a mensagem de erro abaixo do campo Documento
   await expect(signup.alertError()).toContainText('Adcione um documento com foto (RG ou CHN)')
})