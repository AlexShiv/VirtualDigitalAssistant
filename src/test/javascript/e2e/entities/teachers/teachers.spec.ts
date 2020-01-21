import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TeachersComponentsPage, TeachersDeleteDialog, TeachersUpdatePage } from './teachers.page-object';

const expect = chai.expect;

describe('Teachers e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let teachersComponentsPage: TeachersComponentsPage;
  let teachersUpdatePage: TeachersUpdatePage;
  let teachersDeleteDialog: TeachersDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Teachers', async () => {
    await navBarPage.goToEntity('teachers');
    teachersComponentsPage = new TeachersComponentsPage();
    await browser.wait(ec.visibilityOf(teachersComponentsPage.title), 5000);
    expect(await teachersComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.teachers.home.title');
  });

  it('should load create Teachers page', async () => {
    await teachersComponentsPage.clickOnCreateButton();
    teachersUpdatePage = new TeachersUpdatePage();
    expect(await teachersUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.teachers.home.createOrEditLabel');
    await teachersUpdatePage.cancel();
  });

  it('should create and save Teachers', async () => {
    const nbButtonsBeforeCreate = await teachersComponentsPage.countDeleteButtons();

    await teachersComponentsPage.clickOnCreateButton();
    await promise.all([
      teachersUpdatePage.setSurnameInput('surname'),
      teachersUpdatePage.setNameInput('name'),
      teachersUpdatePage.setPatronymicInput('patronymic'),
      teachersUpdatePage.facultiesSelectLastOption()
    ]);
    expect(await teachersUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await teachersUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await teachersUpdatePage.getPatronymicInput()).to.eq('patronymic', 'Expected Patronymic value to be equals to patronymic');
    const selectedIsDecan = teachersUpdatePage.getIsDecanInput();
    if (await selectedIsDecan.isSelected()) {
      await teachersUpdatePage.getIsDecanInput().click();
      expect(await teachersUpdatePage.getIsDecanInput().isSelected(), 'Expected isDecan not to be selected').to.be.false;
    } else {
      await teachersUpdatePage.getIsDecanInput().click();
      expect(await teachersUpdatePage.getIsDecanInput().isSelected(), 'Expected isDecan to be selected').to.be.true;
    }
    await teachersUpdatePage.save();
    expect(await teachersUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await teachersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Teachers', async () => {
    const nbButtonsBeforeDelete = await teachersComponentsPage.countDeleteButtons();
    await teachersComponentsPage.clickOnLastDeleteButton();

    teachersDeleteDialog = new TeachersDeleteDialog();
    expect(await teachersDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.teachers.delete.question');
    await teachersDeleteDialog.clickOnConfirmButton();

    expect(await teachersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
