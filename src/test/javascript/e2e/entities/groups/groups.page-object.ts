import { element, by, ElementFinder } from 'protractor';

export class GroupsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-groups div table .btn-danger'));
  title = element.all(by.css('jhi-groups div h2#page-heading span')).first();

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

export class GroupsUpdatePage {
  pageTitle = element(by.id('jhi-groups-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameGroupInput = element(by.id('field_nameGroup'));
  facultySelect = element(by.id('field_faculty'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameGroupInput(nameGroup: string): Promise<void> {
    await this.nameGroupInput.sendKeys(nameGroup);
  }

  async getNameGroupInput(): Promise<string> {
    return await this.nameGroupInput.getAttribute('value');
  }

  async facultySelectLastOption(): Promise<void> {
    await this.facultySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async facultySelectOption(option: string): Promise<void> {
    await this.facultySelect.sendKeys(option);
  }

  getFacultySelect(): ElementFinder {
    return this.facultySelect;
  }

  async getFacultySelectedOption(): Promise<string> {
    return await this.facultySelect.element(by.css('option:checked')).getText();
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

export class GroupsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-groups-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-groups'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
