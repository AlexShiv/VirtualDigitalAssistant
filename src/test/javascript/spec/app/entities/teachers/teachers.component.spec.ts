import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { TeachersComponent } from 'app/entities/teachers/teachers.component';
import { TeachersService } from 'app/entities/teachers/teachers.service';
import { Teachers } from 'app/shared/model/teachers.model';

describe('Component Tests', () => {
  describe('Teachers Management Component', () => {
    let comp: TeachersComponent;
    let fixture: ComponentFixture<TeachersComponent>;
    let service: TeachersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [TeachersComponent],
        providers: []
      })
        .overrideTemplate(TeachersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeachersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeachersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Teachers(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.teachers && comp.teachers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
