import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { StatPopularCategoriesDetailComponent } from 'app/entities/stat-popular-categories/stat-popular-categories-detail.component';
import { StatPopularCategories } from 'app/shared/model/stat-popular-categories.model';

describe('Component Tests', () => {
  describe('StatPopularCategories Management Detail Component', () => {
    let comp: StatPopularCategoriesDetailComponent;
    let fixture: ComponentFixture<StatPopularCategoriesDetailComponent>;
    const route = ({ data: of({ statPopularCategories: new StatPopularCategories(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [StatPopularCategoriesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StatPopularCategoriesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatPopularCategoriesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load statPopularCategories on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.statPopularCategories).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
