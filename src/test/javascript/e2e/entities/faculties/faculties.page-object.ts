import { element, by, ElementFinder } from 'protractor';

export class FacultiesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-faculties div table .btn-danger'));
  title = element.all(by.css('jhi-faculties div h2#page-heading span')).first();

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

export class FacultiesUpdatePage {
  pageTitle = element(by.id('jhi-faculties-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameFacultyInput = element(by.id('field_nameFaculty'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameFacultyInput(nameFaculty: string): Promise<void> {
    await this.nameFacultyInput.sendKeys(nameFaculty);
  }

  async getNameFacultyInput(): Promise<string> {
    return await this.nameFacultyInput.getAttribute('value');
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

export class FacultiesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-faculties-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-faculties'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
