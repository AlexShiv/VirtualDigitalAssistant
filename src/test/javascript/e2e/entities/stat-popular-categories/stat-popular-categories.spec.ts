import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  StatPopularCategoriesComponentsPage,
  StatPopularCategoriesDeleteDialog,
  StatPopularCategoriesUpdatePage
} from './stat-popular-categories.page-object';

const expect = chai.expect;

describe('StatPopularCategories e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let statPopularCategoriesComponentsPage: StatPopularCategoriesComponentsPage;
  let statPopularCategoriesUpdatePage: StatPopularCategoriesUpdatePage;
  let statPopularCategoriesDeleteDialog: StatPopularCategoriesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StatPopularCategories', async () => {
    await navBarPage.goToEntity('stat-popular-categories');
    statPopularCategoriesComponentsPage = new StatPopularCategoriesComponentsPage();
    await browser.wait(ec.visibilityOf(statPopularCategoriesComponentsPage.title), 5000);
    expect(await statPopularCategoriesComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.statPopularCategories.home.title');
  });

  it('should load create StatPopularCategories page', async () => {
    await statPopularCategoriesComponentsPage.clickOnCreateButton();
    statPopularCategoriesUpdatePage = new StatPopularCategoriesUpdatePage();
    expect(await statPopularCategoriesUpdatePage.getPageTitle()).to.eq(
      'virtualDigitalAssistantApp.statPopularCategories.home.createOrEditLabel'
    );
    await statPopularCategoriesUpdatePage.cancel();
  });

  it('should create and save StatPopularCategories', async () => {
    const nbButtonsBeforeCreate = await statPopularCategoriesComponentsPage.countDeleteButtons();

    await statPopularCategoriesComponentsPage.clickOnCreateButton();
    await promise.all([
      statPopularCategoriesUpdatePage.setNameCategoryInput('nameCategory'),
      statPopularCategoriesUpdatePage.setCountAnswersInput('5')
    ]);
    expect(await statPopularCategoriesUpdatePage.getNameCategoryInput()).to.eq(
      'nameCategory',
      'Expected NameCategory value to be equals to nameCategory'
    );
    expect(await statPopularCategoriesUpdatePage.getCountAnswersInput()).to.eq('5', 'Expected countAnswers value to be equals to 5');
    await statPopularCategoriesUpdatePage.save();
    expect(await statPopularCategoriesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await statPopularCategoriesComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last StatPopularCategories', async () => {
    const nbButtonsBeforeDelete = await statPopularCategoriesComponentsPage.countDeleteButtons();
    await statPopularCategoriesComponentsPage.clickOnLastDeleteButton();

    statPopularCategoriesDeleteDialog = new StatPopularCategoriesDeleteDialog();
    expect(await statPopularCategoriesDeleteDialog.getDialogTitle()).to.eq(
      'virtualDigitalAssistantApp.statPopularCategories.delete.question'
    );
    await statPopularCategoriesDeleteDialog.clickOnConfirmButton();

    expect(await statPopularCategoriesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
