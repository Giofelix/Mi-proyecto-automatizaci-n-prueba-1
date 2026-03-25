// tests/autenticacion.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login/LoginPage'; // Ajusta la ruta si es necesario

test('#1 iniciar sesión exitosamente con credenciales válidas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Ejecutar la acción de login
  await loginPage.login('Admin', 'admin123');

  // 3. Validar que se redirige al dashboard (o página principal después del login)
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});

test('#2 Debe mostrar mensaje de error con usuario invalido', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Ejecutar la acción de login con credenciales inválidas
  await loginPage.login('usuarioNoValido', 'wrongpassword');

  // 3. Validar que aparece un mensaje de error
  const errorMessage = await loginPage.invalidCredentials();
  expect(errorMessage).toBe('Invalid credentials');

});

test('#3 Debe mostrar mensaje de error con password invalido', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Ejecutar la acción de login con credenciales inválidas
  await loginPage.login('Admin', 'wrongpassword');

  // 3. Validar que aparece un mensaje de error
  const errorMessage = await loginPage.invalidCredentials();
  expect(errorMessage).toBe('Invalid credentials');


});

test('#4 Debe mostrar logos y elementos de texto correctamente', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // 1. Ir a la página
  await loginPage.goto();
  // 2. Validar que los logos son visibles
  const logosVisible = await loginPage.validacionImagenesLogin();
  expect(logosVisible).toBe(true);
  // 3. Validar que los elementos de texto son visibles
  await loginPage.validarElementosVisibles(
    [loginPage.headerLogin, loginPage.labelUsername, loginPage.labelPassword, loginPage.forgotPassword, loginPage.version, loginPage.copyright],
    ['Login', 'Username', 'Password', 'Forgot your password?', 'OrangeHRM OS', '© 2005 - 2026 OrangeHRM, Inc']
  );

});

test('#5 Debe mostrar mensaje de error con campos vacíos', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Ejecutar la acción de login con campos vacíos
  await loginPage.login('', '');

  // 3. Validar que aparecen mensajes de required
  await expect(loginPage.requiredMessages).toHaveCount(2);
});

test('#6 Debe mostrar mensaje de error con usuario vacío', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Ejecutar la acción de login con usuario vacío
  await loginPage.login('', 'admin123');

  // 3. Validar que aparece mensaje de required para username
  await expect(loginPage.requiredMessages).toHaveCount(1);
});

test('#7 Debe mostrar mensaje de error con password vacío', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Ejecutar la acción de login con password vacío
  await loginPage.login('Admin', '');

  // 3. Validar que aparece mensaje de required para password
  await expect(loginPage.requiredMessages).toHaveCount(1);
});

test('#8 Debe validar texto de ejemplo de credenciales', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Validar que el texto de ejemplo es visible
  await expect(loginPage.usernameExample).toBeVisible();
  await expect(loginPage.passwordExample).toBeVisible();
});

test('#9 Debe validar enlaces sociales', async ({ page, context }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Validar que los enlaces sociales son visibles y clickeables
  await expect(loginPage.linkedinLink).toBeVisible();
  await expect(loginPage.facebookLink).toBeVisible();
  await expect(loginPage.twitterLink).toBeVisible();
  await expect(loginPage.youtubeLink).toBeVisible();

  // 3. Opcional: Validar que al hacer clic abren nueva pestaña (si es el comportamiento esperado)
  // Por ejemplo, para LinkedIn:
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    loginPage.linkedinLink.click()
  ]);
  await expect(newPage).toHaveURL(/linkedin/);
  await newPage.close();
});

test('#10 Debe validar enlace de forgot password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Hacer clic en "Forgot your password?"
  await loginPage.forgotPassword.click();

  // 3. Validar que navega a la página de reset de password
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
});

test('#11 Debe validar enlace en el copyright', async ({ page, context }) => {
  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Hacer clic en el enlace "OrangeHRM, Inc"
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    loginPage.orangehrmLink.click()
  ]);

  // 3. Validar que abre el sitio de OrangeHRM
  await expect(newPage).toHaveURL('https://orangehrm.com/');
  await newPage.close();
});



