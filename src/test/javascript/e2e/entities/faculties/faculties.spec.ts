import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FacultiesComponentsPage, FacultiesDeleteDialog, FacultiesUpdatePage } from './faculties.page-object';

const expect = chai.expect;

describe('Faculties e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let facultiesComponentsPage: FacultiesComponentsPage;
  let facultiesUpdatePage: FacultiesUpdatePage;
  let facultiesDeleteDialog: FacultiesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Faculties', async () => {
    await navBarPage.goToEntity('faculties');
    facultiesComponentsPage = new FacultiesComponentsPage();
    await browser.wait(ec.visibilityOf(facultiesComponentsPage.title), 5000);
    expect(await facultiesComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.faculties.home.title');
  });

  it('should load create Faculties page', async () => {
    await facultiesComponentsPage.clickOnCreateButton();
    facultiesUpdatePage = new FacultiesUpdatePage();
    expect(await facultiesUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.faculties.home.createOrEditLabel');
    await facultiesUpdatePage.cancel();
  });

  it('should create and save Faculties', async () => {
    const nbButtonsBeforeCreate = await facultiesComponentsPage.countDeleteButtons();

    await facultiesComponentsPage.clickOnCreateButton();
    await promise.all([facultiesUpdatePage.setNameFacultyInput('nameFaculty')]);
    expect(await facultiesUpdatePage.getNameFacultyInput()).to.eq('nameFaculty', 'Expected NameFaculty value to be equals to nameFaculty');
    await facultiesUpdatePage.save();
    expect(await facultiesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await facultiesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Faculties', async () => {
    const nbButtonsBeforeDelete = await facultiesComponentsPage.countDeleteButtons();
    await facultiesComponentsPage.clickOnLastDeleteButton();

    facultiesDeleteDialog = new FacultiesDeleteDialog();
    expect(await facultiesDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.faculties.delete.question');
    await facultiesDeleteDialog.clickOnConfirmButton();

    expect(await facultiesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
