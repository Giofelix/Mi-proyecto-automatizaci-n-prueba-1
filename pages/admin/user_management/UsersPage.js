class UsersPage {
    constructor(page) {
        this.page = page;

        // --- Localizadores de la Sección de Búsqueda ---
        // Usamos filtros para encontrar el input/dropdown dentro del contenedor que tiene el label correcto
        this.usernameSearchInput = page.locator('div.oxd-input-group:has-text("Username") input');
        this.userRoleDropdown = page.locator('div.oxd-input-group:has-text("User Role") .oxd-select-text');
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.statusDropdown = page.locator('div.oxd-input-group:has-text("Status") .oxd-select-text');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        // --- Localizadores de la Tabla de Resultados ---
        this.table = page.getByRole('table');
        // Localizador para las celdas de la tabla (para validaciones)
        this.tableCell = (text) => this.table.getByText(text, { exact: true });
        this.addButton = page.getByRole('button', { name: 'Add' });
        // Localizadores del formulario de creación (usando filtros por label para evitar el .nth)
        this.addUserRoleDropdown = page.locator('div.oxd-input-group:has-text("User Role") .oxd-select-text');
        this.addStatusDropdown = page.locator('div.oxd-input-group:has-text("Status") .oxd-select-text');
        this.addEmployeeNameInput = page.getByPlaceholder('Type for hints...');
        this.addUsernameInput = page.locator('div.oxd-input-group:has-text("Username") input');
        this.addPasswordInput = page.getByRole('textbox').nth(3);
        this.addConfirmPasswordInput = page.getByRole('textbox').nth(4);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.successToast = page.getByText('Successfully Saved');
    }

    // --- Métodos de Acción ---

    /**
   * Navega al formulario de creación
   */
    async goToCreateUser() {
        await this.addButton.click();
        // Validamos que el encabezado "Add User" sea visible para asegurar que cargó
        await this.page.getByRole('heading', { name: 'Add User' }).waitFor();
    }

    /**
     * Llena el formulario de nuevo usuario y guarda
     */
    async createUser(userData) {
        // 1. Seleccionar Rol
        await this.addUserRoleDropdown.click();
        await this.page.getByRole('option', { name: userData.role }).click();

        // 2. Seleccionar Status
        await this.addStatusDropdown.click();
        await this.page.getByRole('option', { name: userData.status }).click();

        // 3. Nombre del Empleado (con autocompletado)
        await this.addEmployeeNameInput.fill(userData.employeeHint);
        await this.page.getByText(userData.fullEmployeeName).click();

        // 4. Credenciales
        await this.addUsernameInput.fill(userData.username);
        await this.addPasswordInput.click();
        await this.addPasswordInput.fill(userData.password);

        // Llenar el campo Confirm Password (basado en tu nth(4))
        await this.addConfirmPasswordInput.click();
        await this.addConfirmPasswordInput.fill(userData.password);

        // 5. Guardar
        await this.saveButton.click();
    }

    async verifySuccessMessage() {
        // Esperamos a que el mensaje sea visible
        await this.successToast.waitFor({ state: 'visible' });
    }

    /**
     * Completa los campos de búsqueda y hace clic en Search
     */
    async searchUser(username, role, employeeName, status) {
        // 1. Username
        await this.usernameSearchInput.fill(username);

        // 2. User Role (Dropdown)
        await this.userRoleDropdown.click();
        await this.page.getByRole('option', { name: role }).click();

        // 3. Employee Name (Autocomplete)
        await this.employeeNameInput.fill(employeeName);
        // Esperamos a que la sugerencia específica aparezca y le damos click
        await this.page.getByRole('option').filter({ hasText: employeeName }).first().click();

        // 4. Status (Dropdown)
        await this.statusDropdown.click();
        await this.page.getByRole('listbox').getByText(status).click();

        // 5. Click en Search
        await this.searchButton.click();
    }

    /**
     * Valida que los datos aparezcan en la tabla de resultados
     */
    async verifyUserInTable(username, role, employeeName, status) {
        // En lugar de hacer .click() como en la grabación, en POM verificamos visibilidad
        await this.tableCell(username).first().waitFor({ state: 'visible' });
        await this.tableCell(role).first().waitFor({ state: 'visible' });
        await this.tableCell(employeeName).first().waitFor({ state: 'visible' });
        await this.tableCell(status).first().waitFor({ state: 'visible' });
    }
}

module.exports = { UsersPage };