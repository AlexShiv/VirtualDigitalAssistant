import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { TeachersUpdateComponent } from 'app/entities/teachers/teachers-update.component';
import { TeachersService } from 'app/entities/teachers/teachers.service';
import { Teachers } from 'app/shared/model/teachers.model';

describe('Component Tests', () => {
  describe('Teachers Management Update Component', () => {
    let comp: TeachersUpdateComponent;
    let fixture: ComponentFixture<TeachersUpdateComponent>;
    let service: TeachersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [TeachersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TeachersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeachersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeachersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Teachers(123);
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
        const entity = new Teachers();
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
