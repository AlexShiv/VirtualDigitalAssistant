import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { EventTypesUpdateComponent } from 'app/entities/event-types/event-types-update.component';
import { EventTypesService } from 'app/entities/event-types/event-types.service';
import { EventTypes } from 'app/shared/model/event-types.model';

describe('Component Tests', () => {
  describe('EventTypes Management Update Component', () => {
    let comp: EventTypesUpdateComponent;
    let fixture: ComponentFixture<EventTypesUpdateComponent>;
    let service: EventTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [EventTypesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EventTypesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventTypesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventTypesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EventTypes(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new EventTypes();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
