import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EventsComponentsPage, EventsDeleteDialog, EventsUpdatePage } from './events.page-object';

const expect = chai.expect;

describe('Events e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventsComponentsPage: EventsComponentsPage;
  let eventsUpdatePage: EventsUpdatePage;
  let eventsDeleteDialog: EventsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Events', async () => {
    await navBarPage.goToEntity('events');
    eventsComponentsPage = new EventsComponentsPage();
    await browser.wait(ec.visibilityOf(eventsComponentsPage.title), 5000);
    expect(await eventsComponentsPage.getTitle()).to.eq('virtualDigitalAssistantApp.events.home.title');
  });

  it('should load create Events page', async () => {
    await eventsComponentsPage.clickOnCreateButton();
    eventsUpdatePage = new EventsUpdatePage();
    expect(await eventsUpdatePage.getPageTitle()).to.eq('virtualDigitalAssistantApp.events.home.createOrEditLabel');
    await eventsUpdatePage.cancel();
  });

  it('should create and save Events', async () => {
    const nbButtonsBeforeCreate = await eventsComponentsPage.countDeleteButtons();

    await eventsComponentsPage.clickOnCreateButton();
    await promise.all([
      eventsUpdatePage.setNameEventInput('nameEvent'),
      eventsUpdatePage.setDescriptionInput('description'),
      eventsUpdatePage.setBeginDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      eventsUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      eventsUpdatePage.clientSelectLastOption(),
      eventsUpdatePage.eventTypesSelectLastOption()
    ]);
    expect(await eventsUpdatePage.getNameEventInput()).to.eq('nameEvent', 'Expected NameEvent value to be equals to nameEvent');
    expect(await eventsUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await eventsUpdatePage.getBeginDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected beginDate value to be equals to 2000-12-31'
    );
    expect(await eventsUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30', 'Expected endDate value to be equals to 2000-12-31');
    await eventsUpdatePage.save();
    expect(await eventsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await eventsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Events', async () => {
    const nbButtonsBeforeDelete = await eventsComponentsPage.countDeleteButtons();
    await eventsComponentsPage.clickOnLastDeleteButton();

    eventsDeleteDialog = new EventsDeleteDialog();
    expect(await eventsDeleteDialog.getDialogTitle()).to.eq('virtualDigitalAssistantApp.events.delete.question');
    await eventsDeleteDialog.clickOnConfirmButton();

    expect(await eventsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
