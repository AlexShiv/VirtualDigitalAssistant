import { element, by, ElementFinder } from 'protractor';

export class EventsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-events div table .btn-danger'));
  title = element.all(by.css('jhi-events div h2#page-heading span')).first();

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

export class EventsUpdatePage {
  pageTitle = element(by.id('jhi-events-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameEventInput = element(by.id('field_nameEvent'));
  descriptionInput = element(by.id('field_description'));
  beginDateInput = element(by.id('field_beginDate'));
  endDateInput = element(by.id('field_endDate'));
  eventTypesSelect = element(by.id('field_eventTypes'));
  clientSelect = element(by.id('field_client'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameEventInput(nameEvent: string): Promise<void> {
    await this.nameEventInput.sendKeys(nameEvent);
  }

  async getNameEventInput(): Promise<string> {
    return await this.nameEventInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setBeginDateInput(beginDate: string): Promise<void> {
    await this.beginDateInput.sendKeys(beginDate);
  }

  async getBeginDateInput(): Promise<string> {
    return await this.beginDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate: string): Promise<void> {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput(): Promise<string> {
    return await this.endDateInput.getAttribute('value');
  }

  async eventTypesSelectLastOption(): Promise<void> {
    await this.eventTypesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async eventTypesSelectOption(option: string): Promise<void> {
    await this.eventTypesSelect.sendKeys(option);
  }

  getEventTypesSelect(): ElementFinder {
    return this.eventTypesSelect;
  }

  async getEventTypesSelectedOption(): Promise<string> {
    return await this.eventTypesSelect.element(by.css('option:checked')).getText();
  }

  async clientSelectLastOption(): Promise<void> {
    await this.clientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clientSelectOption(option: string): Promise<void> {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect(): ElementFinder {
    return this.clientSelect;
  }

  async getClientSelectedOption(): Promise<string> {
    return await this.clientSelect.element(by.css('option:checked')).getText();
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

export class EventsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-events-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-events'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
