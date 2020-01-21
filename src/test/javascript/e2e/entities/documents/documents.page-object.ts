import { element, by, ElementFinder } from 'protractor';

export class DocumentsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-documents div table .btn-danger'));
  title = element.all(by.css('jhi-documents div h2#page-heading span')).first();

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

export class DocumentsUpdatePage {
  pageTitle = element(by.id('jhi-documents-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameDocumentInput = element(by.id('field_nameDocument'));
  contentInput = element(by.id('field_content'));
  createDateInput = element(by.id('field_createDate'));
  changeDateInput = element(by.id('field_changeDate'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameDocumentInput(nameDocument: string): Promise<void> {
    await this.nameDocumentInput.sendKeys(nameDocument);
  }

  async getNameDocumentInput(): Promise<string> {
    return await this.nameDocumentInput.getAttribute('value');
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
  }

  async setCreateDateInput(createDate: string): Promise<void> {
    await this.createDateInput.sendKeys(createDate);
  }

  async getCreateDateInput(): Promise<string> {
    return await this.createDateInput.getAttribute('value');
  }

  async setChangeDateInput(changeDate: string): Promise<void> {
    await this.changeDateInput.sendKeys(changeDate);
  }

  async getChangeDateInput(): Promise<string> {
    return await this.changeDateInput.getAttribute('value');
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

export class DocumentsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-documents-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-documents'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
