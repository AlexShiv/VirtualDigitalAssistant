import { element, by, ElementFinder } from 'protractor';

export class StatPopularCategoriesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-stat-popular-categories div table .btn-danger'));
  title = element.all(by.css('jhi-stat-popular-categories div h2#page-heading span')).first();

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

export class StatPopularCategoriesUpdatePage {
  pageTitle = element(by.id('jhi-stat-popular-categories-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameCategoryInput = element(by.id('field_nameCategory'));
  countAnswersInput = element(by.id('field_countAnswers'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameCategoryInput(nameCategory: string): Promise<void> {
    await this.nameCategoryInput.sendKeys(nameCategory);
  }

  async getNameCategoryInput(): Promise<string> {
    return await this.nameCategoryInput.getAttribute('value');
  }

  async setCountAnswersInput(countAnswers: string): Promise<void> {
    await this.countAnswersInput.sendKeys(countAnswers);
  }

  async getCountAnswersInput(): Promise<string> {
    return await this.countAnswersInput.getAttribute('value');
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

export class StatPopularCategoriesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-statPopularCategories-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-statPopularCategories'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
