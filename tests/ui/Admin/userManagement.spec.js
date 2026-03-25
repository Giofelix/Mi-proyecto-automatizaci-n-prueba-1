// tests/admin/navegacion.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '@pages/login/LoginPage';
import { SidebarComponent } from '@pages/componentes/sidebarcomponent';
import { TopbarComponent } from '@pages/componentes/TopbarComponent';

test('navegacion a user management', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebar = new SidebarComponent(page);
    const topbar = new TopbarComponent(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await sidebar.selectOption('Admin');
    await topbar.selectComboOption('Job', 'Job Titles');
    await page.waitForTimeout(3000);
});

