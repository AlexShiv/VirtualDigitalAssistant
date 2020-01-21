import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EventTypesComponentsPage, EventTypesDeleteDialog, EventTypesUpdatePage } from './event-types.page-object';

const expect = chai.expect;

describe('EventTypes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventTypesComponentsPage: EventTypesComponentsPage;
  let eventTypesUpdatePage: EventTypesUpdatePage;
  let eventTypesDeleteDialog: EventTypesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EventTypes', async () => {
    await navBarPage.goToEntity('event-types');
    eventTypesComponentsPage = new EventTypesComponentsPage();
    await browser.wait(ec.visibilityOf(eventTypesComponentsPage.title), 5000);
    expect(await eventTypesComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.eventTypes.home.title');
  });

  it('should load create EventTypes page', async () => {
    await eventTypesComponentsPage.clickOnCreateButton();
    eventTypesUpdatePage = new EventTypesUpdatePage();
    expect(await eventTypesUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.eventTypes.home.createOrEditLabel');
    await eventTypesUpdatePage.cancel();
  });

  it('should create and save EventTypes', async () => {
    const nbButtonsBeforeCreate = await eventTypesComponentsPage.countDeleteButtons();

    await eventTypesComponentsPage.clickOnCreateButton();
    await promise.all([eventTypesUpdatePage.setNameEventTypeInput('nameEventType')]);
    expect(await eventTypesUpdatePage.getNameEventTypeInput()).to.eq(
      'nameEventType',
      'Expected NameEventType value to be equals to nameEventType'
    );
    await eventTypesUpdatePage.save();
    expect(await eventTypesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await eventTypesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last EventTypes', async () => {
    const nbButtonsBeforeDelete = await eventTypesComponentsPage.countDeleteButtons();
    await eventTypesComponentsPage.clickOnLastDeleteButton();

    eventTypesDeleteDialog = new EventTypesDeleteDialog();
    expect(await eventTypesDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.eventTypes.delete.question');
    await eventTypesDeleteDialog.clickOnConfirmButton();

    expect(await eventTypesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
