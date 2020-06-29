import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { StatCorrectAnswersDetailComponent } from 'app/entities/stat-correct-answers/stat-correct-answers-detail.component';
import { StatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';

describe('Component Tests', () => {
  describe('StatCorrectAnswers Management Detail Component', () => {
    let comp: StatCorrectAnswersDetailComponent;
    let fixture: ComponentFixture<StatCorrectAnswersDetailComponent>;
    const route = ({ data: of({ statCorrectAnswers: new StatCorrectAnswers(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [StatCorrectAnswersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StatCorrectAnswersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatCorrectAnswersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load statCorrectAnswers on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.statCorrectAnswers).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
