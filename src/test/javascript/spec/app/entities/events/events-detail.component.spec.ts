import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { EventsDetailComponent } from 'app/entities/events/events-detail.component';
import { Events } from 'app/shared/model/events.model';

describe('Component Tests', () => {
  describe('Events Management Detail Component', () => {
    let comp: EventsDetailComponent;
    let fixture: ComponentFixture<EventsDetailComponent>;
    const route = ({ data: of({ events: new Events(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [EventsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EventsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EventsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load events on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.events).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
