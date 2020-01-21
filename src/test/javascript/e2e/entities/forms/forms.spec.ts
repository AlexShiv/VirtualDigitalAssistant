import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormsComponentsPage, FormsDeleteDialog, FormsUpdatePage } from './forms.page-object';

const expect = chai.expect;

describe('Forms e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let formsComponentsPage: FormsComponentsPage;
  let formsUpdatePage: FormsUpdatePage;
  let formsDeleteDialog: FormsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Forms', async () => {
    await navBarPage.goToEntity('forms');
    formsComponentsPage = new FormsComponentsPage();
    await browser.wait(ec.visibilityOf(formsComponentsPage.title), 5000);
    expect(await formsComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.forms.home.title');
  });

  it('should load create Forms page', async () => {
    await formsComponentsPage.clickOnCreateButton();
    formsUpdatePage = new FormsUpdatePage();
    expect(await formsUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.forms.home.createOrEditLabel');
    await formsUpdatePage.cancel();
  });

  it('should create and save Forms', async () => {
    const nbButtonsBeforeCreate = await formsComponentsPage.countDeleteButtons();

    await formsComponentsPage.clickOnCreateButton();
    await promise.all([
      formsUpdatePage.setCreateDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      formsUpdatePage.eventSelectLastOption(),
      formsUpdatePage.clientSelectLastOption()
    ]);
    expect(await formsUpdatePage.getCreateDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createDate value to be equals to 2000-12-31'
    );
    await formsUpdatePage.save();
    expect(await formsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await formsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Forms', async () => {
    const nbButtonsBeforeDelete = await formsComponentsPage.countDeleteButtons();
    await formsComponentsPage.clickOnLastDeleteButton();

    formsDeleteDialog = new FormsDeleteDialog();
    expect(await formsDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.forms.delete.question');
    await formsDeleteDialog.clickOnConfirmButton();

    expect(await formsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
