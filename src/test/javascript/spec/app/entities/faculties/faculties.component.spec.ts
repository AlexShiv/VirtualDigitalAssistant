import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { FacultiesComponent } from 'app/entities/faculties/faculties.component';
import { FacultiesService } from 'app/entities/faculties/faculties.service';
import { Faculties } from 'app/shared/model/faculties.model';

describe('Component Tests', () => {
  describe('Faculties Management Component', () => {
    let comp: FacultiesComponent;
    let fixture: ComponentFixture<FacultiesComponent>;
    let service: FacultiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [FacultiesComponent],
        providers: []
      })
        .overrideTemplate(FacultiesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacultiesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacultiesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Faculties(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.faculties && comp.faculties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
