import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  StatCorrectAnswersComponentsPage,
  StatCorrectAnswersDeleteDialog,
  StatCorrectAnswersUpdatePage
} from './stat-correct-answers.page-object';

const expect = chai.expect;

describe('StatCorrectAnswers e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let statCorrectAnswersComponentsPage: StatCorrectAnswersComponentsPage;
  let statCorrectAnswersUpdatePage: StatCorrectAnswersUpdatePage;
  let statCorrectAnswersDeleteDialog: StatCorrectAnswersDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StatCorrectAnswers', async () => {
    await navBarPage.goToEntity('stat-correct-answers');
    statCorrectAnswersComponentsPage = new StatCorrectAnswersComponentsPage();
    await browser.wait(ec.visibilityOf(statCorrectAnswersComponentsPage.title), 5000);
    expect(await statCorrectAnswersComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.statCorrectAnswers.home.title');
  });

  it('should load create StatCorrectAnswers page', async () => {
    await statCorrectAnswersComponentsPage.clickOnCreateButton();
    statCorrectAnswersUpdatePage = new StatCorrectAnswersUpdatePage();
    expect(await statCorrectAnswersUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.statCorrectAnswers.home.createOrEditLabel');
    await statCorrectAnswersUpdatePage.cancel();
  });

  it('should create and save StatCorrectAnswers', async () => {
    const nbButtonsBeforeCreate = await statCorrectAnswersComponentsPage.countDeleteButtons();

    await statCorrectAnswersComponentsPage.clickOnCreateButton();
    await promise.all([
      statCorrectAnswersUpdatePage.setNameCriteriaInput('nameCriteria'),
      statCorrectAnswersUpdatePage.setCountResultInput('5')
    ]);
    expect(await statCorrectAnswersUpdatePage.getNameCriteriaInput()).to.eq(
      'nameCriteria',
      'Expected NameCriteria value to be equals to nameCriteria'
    );
    expect(await statCorrectAnswersUpdatePage.getCountResultInput()).to.eq('5', 'Expected countResult value to be equals to 5');
    await statCorrectAnswersUpdatePage.save();
    expect(await statCorrectAnswersUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await statCorrectAnswersComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last StatCorrectAnswers', async () => {
    const nbButtonsBeforeDelete = await statCorrectAnswersComponentsPage.countDeleteButtons();
    await statCorrectAnswersComponentsPage.clickOnLastDeleteButton();

    statCorrectAnswersDeleteDialog = new StatCorrectAnswersDeleteDialog();
    expect(await statCorrectAnswersDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.statCorrectAnswers.delete.question');
    await statCorrectAnswersDeleteDialog.clickOnConfirmButton();

    expect(await statCorrectAnswersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
