import { element, by, ElementFinder } from 'protractor';

export class StatCorrectAnswersComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-stat-correct-answers div table .btn-danger'));
  title = element.all(by.css('jhi-stat-correct-answers div h2#page-heading span')).first();

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

export class StatCorrectAnswersUpdatePage {
  pageTitle = element(by.id('jhi-stat-correct-answers-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameCriteriaInput = element(by.id('field_nameCriteria'));
  countResultInput = element(by.id('field_countResult'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameCriteriaInput(nameCriteria: string): Promise<void> {
    await this.nameCriteriaInput.sendKeys(nameCriteria);
  }

  async getNameCriteriaInput(): Promise<string> {
    return await this.nameCriteriaInput.getAttribute('value');
  }

  async setCountResultInput(countResult: string): Promise<void> {
    await this.countResultInput.sendKeys(countResult);
  }

  async getCountResultInput(): Promise<string> {
    return await this.countResultInput.getAttribute('value');
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

export class StatCorrectAnswersDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-statCorrectAnswers-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-statCorrectAnswers'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
