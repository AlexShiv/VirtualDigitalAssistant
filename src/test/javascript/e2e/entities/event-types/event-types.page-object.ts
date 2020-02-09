import { element, by, ElementFinder } from 'protractor';

export class EventTypesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-event-types div table .btn-danger'));
  title = element.all(by.css('jhi-event-types div h2#page-heading span')).first();

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

export class EventTypesUpdatePage {
  pageTitle = element(by.id('jhi-event-types-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameEventTypeInput = element(by.id('field_nameEventType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameEventTypeInput(nameEventType: string): Promise<void> {
    await this.nameEventTypeInput.sendKeys(nameEventType);
  }

  async getNameEventTypeInput(): Promise<string> {
    return await this.nameEventTypeInput.getAttribute('value');
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

export class EventTypesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-eventTypes-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-eventTypes'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
