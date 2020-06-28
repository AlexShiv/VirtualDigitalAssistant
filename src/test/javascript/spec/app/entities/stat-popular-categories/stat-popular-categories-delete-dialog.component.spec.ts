import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { StatPopularCategoriesDeleteDialogComponent } from 'app/entities/stat-popular-categories/stat-popular-categories-delete-dialog.component';
import { StatPopularCategoriesService } from 'app/entities/stat-popular-categories/stat-popular-categories.service';

describe('Component Tests', () => {
  describe('StatPopularCategories Management Delete Component', () => {
    let comp: StatPopularCategoriesDeleteDialogComponent;
    let fixture: ComponentFixture<StatPopularCategoriesDeleteDialogComponent>;
    let service: StatPopularCategoriesService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [StatPopularCategoriesDeleteDialogComponent]
      })
        .overrideTemplate(StatPopularCategoriesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatPopularCategoriesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatPopularCategoriesService);
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
