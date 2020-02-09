import { element, by, ElementFinder } from 'protractor';

export class ClientsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-clients div table .btn-danger'));
  title = element.all(by.css('jhi-clients div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ClientsUpdatePage {
  pageTitle = element(by.id('jhi-clients-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  surnameInput = element(by.id('field_surname'));
  nameInput = element(by.id('field_name'));
  patronymicInput = element(by.id('field_patronymic'));
  phoneInput = element(by.id('field_phone'));
  groupsSelect = element(by.id('field_groups'));
  roleSelect = element(by.id('field_role'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSurnameInput(surname: string): Promise<void> {
    await this.surnameInput.sendKeys(surname);
  }

  async getSurnameInput(): Promise<string> {
    return await this.surnameInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setPatronymicInput(patronymic: string): Promise<void> {
    await this.patronymicInput.sendKeys(patronymic);
  }

  async getPatronymicInput(): Promise<string> {
    return await this.patronymicInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async groupsSelectLastOption(): Promise<void> {
    await this.groupsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async groupsSelectOption(option: string): Promise<void> {
    await this.groupsSelect.sendKeys(option);
  }

  getGroupsSelect(): ElementFinder {
    return this.groupsSelect;
  }

  async getGroupsSelectedOption(): Promise<string> {
    return await this.groupsSelect.element(by.css('option:checked')).getText();
  }

  async roleSelectLastOption(): Promise<void> {
    await this.roleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async roleSelectOption(option: string): Promise<void> {
    await this.roleSelect.sendKeys(option);
  }

  getRoleSelect(): ElementFinder {
    return this.roleSelect;
  }

  async getRoleSelectedOption(): Promise<string> {
    return await this.roleSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ClientsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-clients-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-clients'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
