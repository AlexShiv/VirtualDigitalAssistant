import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { FacultiesUpdateComponent } from 'app/entities/faculties/faculties-update.component';
import { FacultiesService } from 'app/entities/faculties/faculties.service';
import { Faculties } from 'app/shared/model/faculties.model';

describe('Component Tests', () => {
  describe('Faculties Management Update Component', () => {
    let comp: FacultiesUpdateComponent;
    let fixture: ComponentFixture<FacultiesUpdateComponent>;
    let service: FacultiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [FacultiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacultiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacultiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacultiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Faculties(123);
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
        const entity = new Faculties();
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
