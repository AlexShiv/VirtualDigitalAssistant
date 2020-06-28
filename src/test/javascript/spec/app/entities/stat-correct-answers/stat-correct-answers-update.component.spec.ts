import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { StatCorrectAnswersUpdateComponent } from 'app/entities/stat-correct-answers/stat-correct-answers-update.component';
import { StatCorrectAnswersService } from 'app/entities/stat-correct-answers/stat-correct-answers.service';
import { StatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';

describe('Component Tests', () => {
  describe('StatCorrectAnswers Management Update Component', () => {
    let comp: StatCorrectAnswersUpdateComponent;
    let fixture: ComponentFixture<StatCorrectAnswersUpdateComponent>;
    let service: StatCorrectAnswersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [StatCorrectAnswersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StatCorrectAnswersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatCorrectAnswersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatCorrectAnswersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StatCorrectAnswers(123);
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
        const entity = new StatCorrectAnswers();
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
