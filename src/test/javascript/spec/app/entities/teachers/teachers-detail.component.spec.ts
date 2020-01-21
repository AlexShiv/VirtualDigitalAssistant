import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { TeachersDetailComponent } from 'app/entities/teachers/teachers-detail.component';
import { Teachers } from 'app/shared/model/teachers.model';

describe('Component Tests', () => {
  describe('Teachers Management Detail Component', () => {
    let comp: TeachersDetailComponent;
    let fixture: ComponentFixture<TeachersDetailComponent>;
    const route = ({ data: of({ teachers: new Teachers(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [TeachersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TeachersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TeachersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load teachers on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.teachers).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
