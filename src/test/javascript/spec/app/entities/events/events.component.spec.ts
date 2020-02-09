import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { EventsComponent } from 'app/entities/events/events.component';
import { EventsService } from 'app/entities/events/events.service';
import { Events } from 'app/shared/model/events.model';

describe('Component Tests', () => {
  describe('Events Management Component', () => {
    let comp: EventsComponent;
    let fixture: ComponentFixture<EventsComponent>;
    let service: EventsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [EventsComponent],
        providers: []
      })
        .overrideTemplate(EventsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Events(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.events && comp.events[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
