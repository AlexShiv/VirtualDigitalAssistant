import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClientsComponentsPage, ClientsDeleteDialog, ClientsUpdatePage } from './clients.page-object';

const expect = chai.expect;

describe('Clients e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clientsComponentsPage: ClientsComponentsPage;
  let clientsUpdatePage: ClientsUpdatePage;
  let clientsDeleteDialog: ClientsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Clients', async () => {
    await navBarPage.goToEntity('clients');
    clientsComponentsPage = new ClientsComponentsPage();
    await browser.wait(ec.visibilityOf(clientsComponentsPage.title), 5000);
    expect(await clientsComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.clients.home.title');
  });

  it('should load create Clients page', async () => {
    await clientsComponentsPage.clickOnCreateButton();
    clientsUpdatePage = new ClientsUpdatePage();
    expect(await clientsUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.clients.home.createOrEditLabel');
    await clientsUpdatePage.cancel();
  });

  it('should create and save Clients', async () => {
    const nbButtonsBeforeCreate = await clientsComponentsPage.countDeleteButtons();

    await clientsComponentsPage.clickOnCreateButton();
    await promise.all([
      clientsUpdatePage.setSurnameInput('surname'),
      clientsUpdatePage.setNameInput('name'),
      clientsUpdatePage.setPatronymicInput('patronymic'),
      clientsUpdatePage.setPhoneInput('phone'),
      clientsUpdatePage.groupsSelectLastOption(),
      clientsUpdatePage.roleSelectLastOption()
    ]);
    expect(await clientsUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await clientsUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await clientsUpdatePage.getPatronymicInput()).to.eq('patronymic', 'Expected Patronymic value to be equals to patronymic');
    expect(await clientsUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    await clientsUpdatePage.save();
    expect(await clientsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await clientsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Clients', async () => {
    const nbButtonsBeforeDelete = await clientsComponentsPage.countDeleteButtons();
    await clientsComponentsPage.clickOnLastDeleteButton();

    clientsDeleteDialog = new ClientsDeleteDialog();
    expect(await clientsDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.clients.delete.question');
    await clientsDeleteDialog.clickOnConfirmButton();

    expect(await clientsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
