import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { EventTypesDetailComponent } from 'app/entities/event-types/event-types-detail.component';
import { EventTypes } from 'app/shared/model/event-types.model';

describe('Component Tests', () => {
  describe('EventTypes Management Detail Component', () => {
    let comp: EventTypesDetailComponent;
    let fixture: ComponentFixture<EventTypesDetailComponent>;
    const route = ({ data: of({ eventTypes: new EventTypes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [EventTypesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EventTypesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EventTypesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load eventTypes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.eventTypes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
