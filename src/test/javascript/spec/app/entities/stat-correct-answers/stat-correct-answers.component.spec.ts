import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { StatCorrectAnswersComponent } from 'app/entities/stat-correct-answers/stat-correct-answers.component';
import { StatCorrectAnswersService } from 'app/entities/stat-correct-answers/stat-correct-answers.service';
import { StatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';

describe('Component Tests', () => {
  describe('StatCorrectAnswers Management Component', () => {
    let comp: StatCorrectAnswersComponent;
    let fixture: ComponentFixture<StatCorrectAnswersComponent>;
    let service: StatCorrectAnswersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [StatCorrectAnswersComponent],
        providers: []
      })
        .overrideTemplate(StatCorrectAnswersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatCorrectAnswersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatCorrectAnswersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StatCorrectAnswers(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.statCorrectAnswers && comp.statCorrectAnswers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
