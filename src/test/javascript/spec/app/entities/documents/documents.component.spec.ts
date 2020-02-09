import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { DocumentsComponent } from 'app/entities/documents/documents.component';
import { DocumentsService } from 'app/entities/documents/documents.service';
import { Documents } from 'app/shared/model/documents.model';

describe('Component Tests', () => {
  describe('Documents Management Component', () => {
    let comp: DocumentsComponent;
    let fixture: ComponentFixture<DocumentsComponent>;
    let service: DocumentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [DocumentsComponent],
        providers: []
      })
        .overrideTemplate(DocumentsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Documents(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.documents && comp.documents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
