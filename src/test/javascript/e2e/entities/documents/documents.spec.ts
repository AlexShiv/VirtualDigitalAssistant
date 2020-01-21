import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocumentsComponentsPage, DocumentsDeleteDialog, DocumentsUpdatePage } from './documents.page-object';

const expect = chai.expect;

describe('Documents e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentsComponentsPage: DocumentsComponentsPage;
  let documentsUpdatePage: DocumentsUpdatePage;
  let documentsDeleteDialog: DocumentsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Documents', async () => {
    await navBarPage.goToEntity('documents');
    documentsComponentsPage = new DocumentsComponentsPage();
    await browser.wait(ec.visibilityOf(documentsComponentsPage.title), 5000);
    expect(await documentsComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.documents.home.title');
  });

  it('should load create Documents page', async () => {
    await documentsComponentsPage.clickOnCreateButton();
    documentsUpdatePage = new DocumentsUpdatePage();
    expect(await documentsUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.documents.home.createOrEditLabel');
    await documentsUpdatePage.cancel();
  });

  it('should create and save Documents', async () => {
    const nbButtonsBeforeCreate = await documentsComponentsPage.countDeleteButtons();

    await documentsComponentsPage.clickOnCreateButton();
    await promise.all([
      documentsUpdatePage.setNameDocumentInput('nameDocument'),
      documentsUpdatePage.setContentInput('content'),
      documentsUpdatePage.setCreateDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      documentsUpdatePage.setChangeDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await documentsUpdatePage.getNameDocumentInput()).to.eq(
      'nameDocument',
      'Expected NameDocument value to be equals to nameDocument'
    );
    expect(await documentsUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await documentsUpdatePage.getCreateDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createDate value to be equals to 2000-12-31'
    );
    expect(await documentsUpdatePage.getChangeDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected changeDate value to be equals to 2000-12-31'
    );
    await documentsUpdatePage.save();
    expect(await documentsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await documentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Documents', async () => {
    const nbButtonsBeforeDelete = await documentsComponentsPage.countDeleteButtons();
    await documentsComponentsPage.clickOnLastDeleteButton();

    documentsDeleteDialog = new DocumentsDeleteDialog();
    expect(await documentsDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.documents.delete.question');
    await documentsDeleteDialog.clickOnConfirmButton();

    expect(await documentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
