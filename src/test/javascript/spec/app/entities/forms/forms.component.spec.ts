import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { FormsComponent } from 'app/entities/forms/forms.component';
import { FormsService } from 'app/entities/forms/forms.service';
import { Forms } from 'app/shared/model/forms.model';

describe('Component Tests', () => {
  describe('Forms Management Component', () => {
    let comp: FormsComponent;
    let fixture: ComponentFixture<FormsComponent>;
    let service: FormsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [FormsComponent],
        providers: []
      })
        .overrideTemplate(FormsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Forms(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.forms && comp.forms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
