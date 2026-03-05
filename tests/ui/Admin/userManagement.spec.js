// tests/admin/navegacion.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '@pages/login/LoginPage';
import { SidebarComponent } from '@pages/componentes/sidebarcomponent';
import { TopbarComponent } from '@pages/componentes/TopbarComponent';
import { UsersPage } from '@pages/admin/user_management/UsersPage';

test.describe('Gestión de Usuarios en el Módulo de Administración', () => {

    let createdUsername = '';
    let createdUserData = {};

    test('Navegación dinámica por el sidebar', async ({ page }) => {
        const login = new LoginPage(page);
        const sidebar = new SidebarComponent(page);
        const topbar = new TopbarComponent(page);
        await login.goto();
        await login.login('Admin', 'admin123');

        // Ahora puedes navegar a donde quieras usando solo el nombre
        await sidebar.selectOption('Admin');
        await topbar.selectComboOption('User Management', 'Users');
        await page.waitForTimeout(6000);
    });

    test('Debería crear un nuevo usuario exitosamente', async ({ page }) => {
        const login = new LoginPage(page);
        const sidebar = new SidebarComponent(page);
        const topbar = new TopbarComponent(page);
        const usersPage = new UsersPage(page);

        await login.goto();
        await login.login('Admin', 'admin123');
        await sidebar.selectOption('Admin');
        await topbar.selectComboOption('User Management', 'Users');

        // Datos para el nuevo usuario
        const newUser = {
            role: 'Admin',
            status: 'Enabled',
            employeeHint: 'a',
            fullEmployeeName: 'Ranga Akunuri',
            username: 'prueba_' + Date.now(), // Agregamos timestamp para que sea único
            password: 'Password123!'
        };

        // Guardamos el username en la variable global para el siguiente test
        createdUsername = newUser.username;
        createdUserData = {
            username: newUser.username,
            role: newUser.role,
            employeeName: newUser.fullEmployeeName,
            status: newUser.status
        };

        await usersPage.goToCreateUser();
        await usersPage.createUser(newUser);
        await usersPage.verifySuccessMessage();
        await page.waitForTimeout(6000);
    });

    test('Debería buscar un usuario existente y validar sus datos en la tabla', async ({ page }) => {
        const login = new LoginPage(page);
        const sidebar = new SidebarComponent(page);
        const topbar = new TopbarComponent(page);
        const usersPage = new UsersPage(page);

        await login.goto();
        await login.login('Admin', 'admin123');
        await sidebar.selectOption('Admin');
        await topbar.selectComboOption('User Management', 'Users');

    });

});