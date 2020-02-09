import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VirtualDigitalAssistantTestModule } from '../../../test.module';
import { DocumentsDetailComponent } from 'app/entities/documents/documents-detail.component';
import { Documents } from 'app/shared/model/documents.model';

describe('Component Tests', () => {
  describe('Documents Management Detail Component', () => {
    let comp: DocumentsDetailComponent;
    let fixture: ComponentFixture<DocumentsDetailComponent>;
    const route = ({ data: of({ documents: new Documents(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VirtualDigitalAssistantTestModule],
        declarations: [DocumentsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocumentsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load documents on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documents).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
