import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { FormsUpdateComponent } from 'app/entities/forms/forms-update.component';
import { FormsService } from 'app/entities/forms/forms.service';
import { Forms } from 'app/shared/model/forms.model';

describe('Component Tests', () => {
  describe('Forms Management Update Component', () => {
    let comp: FormsUpdateComponent;
    let fixture: ComponentFixture<FormsUpdateComponent>;
    let service: FormsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [FormsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FormsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Forms(123);
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
        const entity = new Forms();
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
