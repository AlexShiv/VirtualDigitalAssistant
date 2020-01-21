import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { FormsDetailComponent } from 'app/entities/forms/forms-detail.component';
import { Forms } from 'app/shared/model/forms.model';

describe('Component Tests', () => {
  describe('Forms Management Detail Component', () => {
    let comp: FormsDetailComponent;
    let fixture: ComponentFixture<FormsDetailComponent>;
    const route = ({ data: of({ forms: new Forms(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [FormsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FormsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load forms on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.forms).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
