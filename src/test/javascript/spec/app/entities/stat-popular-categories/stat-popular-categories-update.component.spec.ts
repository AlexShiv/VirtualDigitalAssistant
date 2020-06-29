import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { StatPopularCategoriesUpdateComponent } from 'app/entities/stat-popular-categories/stat-popular-categories-update.component';
import { StatPopularCategoriesService } from 'app/entities/stat-popular-categories/stat-popular-categories.service';
import { StatPopularCategories } from 'app/shared/model/stat-popular-categories.model';

describe('Component Tests', () => {
  describe('StatPopularCategories Management Update Component', () => {
    let comp: StatPopularCategoriesUpdateComponent;
    let fixture: ComponentFixture<StatPopularCategoriesUpdateComponent>;
    let service: StatPopularCategoriesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [StatPopularCategoriesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StatPopularCategoriesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatPopularCategoriesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatPopularCategoriesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StatPopularCategories(123);
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
        const entity = new StatPopularCategories();
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
