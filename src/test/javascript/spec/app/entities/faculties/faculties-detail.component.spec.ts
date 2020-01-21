import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { FacultiesDetailComponent } from 'app/entities/faculties/faculties-detail.component';
import { Faculties } from 'app/shared/model/faculties.model';

describe('Component Tests', () => {
  describe('Faculties Management Detail Component', () => {
    let comp: FacultiesDetailComponent;
    let fixture: ComponentFixture<FacultiesDetailComponent>;
    const route = ({ data: of({ faculties: new Faculties(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [FacultiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacultiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacultiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load faculties on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.faculties).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
