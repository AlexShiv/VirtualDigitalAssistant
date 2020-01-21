import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GroupsComponentsPage, GroupsDeleteDialog, GroupsUpdatePage } from './groups.page-object';

const expect = chai.expect;

describe('Groups e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let groupsComponentsPage: GroupsComponentsPage;
  let groupsUpdatePage: GroupsUpdatePage;
  let groupsDeleteDialog: GroupsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Groups', async () => {
    await navBarPage.goToEntity('groups');
    groupsComponentsPage = new GroupsComponentsPage();
    await browser.wait(ec.visibilityOf(groupsComponentsPage.title), 5000);
    expect(await groupsComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.groups.home.title');
  });

  it('should load create Groups page', async () => {
    await groupsComponentsPage.clickOnCreateButton();
    groupsUpdatePage = new GroupsUpdatePage();
    expect(await groupsUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.groups.home.createOrEditLabel');
    await groupsUpdatePage.cancel();
  });

  it('should create and save Groups', async () => {
    const nbButtonsBeforeCreate = await groupsComponentsPage.countDeleteButtons();

    await groupsComponentsPage.clickOnCreateButton();
    await promise.all([groupsUpdatePage.setNameGroupInput('nameGroup'), groupsUpdatePage.facultySelectLastOption()]);
    expect(await groupsUpdatePage.getNameGroupInput()).to.eq('nameGroup', 'Expected NameGroup value to be equals to nameGroup');
    await groupsUpdatePage.save();
    expect(await groupsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await groupsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Groups', async () => {
    const nbButtonsBeforeDelete = await groupsComponentsPage.countDeleteButtons();
    await groupsComponentsPage.clickOnLastDeleteButton();

    groupsDeleteDialog = new GroupsDeleteDialog();
    expect(await groupsDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.groups.delete.question');
    await groupsDeleteDialog.clickOnConfirmButton();

    expect(await groupsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
