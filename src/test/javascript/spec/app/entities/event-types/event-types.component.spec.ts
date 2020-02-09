import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { EventTypesComponent } from 'app/entities/event-types/event-types.component';
import { EventTypesService } from 'app/entities/event-types/event-types.service';
import { EventTypes } from 'app/shared/model/event-types.model';

describe('Component Tests', () => {
  describe('EventTypes Management Component', () => {
    let comp: EventTypesComponent;
    let fixture: ComponentFixture<EventTypesComponent>;
    let service: EventTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [EventTypesComponent],
        providers: []
      })
        .overrideTemplate(EventTypesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventTypesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventTypesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EventTypes(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.eventTypes && comp.eventTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
