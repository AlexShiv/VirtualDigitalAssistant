import { element, by, ElementFinder } from 'protractor';

export class TeachersComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-teachers div table .btn-danger'));
  title = element.all(by.css('jhi-teachers div h2#page-heading span')).first();

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

export class TeachersUpdatePage {
  pageTitle = element(by.id('jhi-teachers-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  surnameInput = element(by.id('field_surname'));
  nameInput = element(by.id('field_name'));
  patronymicInput = element(by.id('field_patronymic'));
  isDecanInput = element(by.id('field_isDecan'));
  facultiesSelect = element(by.id('field_faculties'));

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

  getIsDecanInput(): ElementFinder {
    return this.isDecanInput;
  }

  async facultiesSelectLastOption(): Promise<void> {
    await this.facultiesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async facultiesSelectOption(option: string): Promise<void> {
    await this.facultiesSelect.sendKeys(option);
  }

  getFacultiesSelect(): ElementFinder {
    return this.facultiesSelect;
  }

  async getFacultiesSelectedOption(): Promise<string> {
    return await this.facultiesSelect.element(by.css('option:checked')).getText();
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

export class TeachersDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-teachers-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-teachers'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
