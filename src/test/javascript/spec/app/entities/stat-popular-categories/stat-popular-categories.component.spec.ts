import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { StatPopularCategoriesComponent } from 'app/entities/stat-popular-categories/stat-popular-categories.component';
import { StatPopularCategoriesService } from 'app/entities/stat-popular-categories/stat-popular-categories.service';
import { StatPopularCategories } from 'app/shared/model/stat-popular-categories.model';

describe('Component Tests', () => {
  describe('StatPopularCategories Management Component', () => {
    let comp: StatPopularCategoriesComponent;
    let fixture: ComponentFixture<StatPopularCategoriesComponent>;
    let service: StatPopularCategoriesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [StatPopularCategoriesComponent],
        providers: []
      })
        .overrideTemplate(StatPopularCategoriesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatPopularCategoriesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatPopularCategoriesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StatPopularCategories(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.statPopularCategories && comp.statPopularCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
