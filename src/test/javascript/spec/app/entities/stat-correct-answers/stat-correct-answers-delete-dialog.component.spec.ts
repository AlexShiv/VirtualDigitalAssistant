import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { StatCorrectAnswersDeleteDialogComponent } from 'app/entities/stat-correct-answers/stat-correct-answers-delete-dialog.component';
import { StatCorrectAnswersService } from 'app/entities/stat-correct-answers/stat-correct-answers.service';

describe('Component Tests', () => {
  describe('StatCorrectAnswers Management Delete Component', () => {
    let comp: StatCorrectAnswersDeleteDialogComponent;
    let fixture: ComponentFixture<StatCorrectAnswersDeleteDialogComponent>;
    let service: StatCorrectAnswersService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [StatCorrectAnswersDeleteDialogComponent]
      })
        .overrideTemplate(StatCorrectAnswersDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatCorrectAnswersDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatCorrectAnswersService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.clear();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
