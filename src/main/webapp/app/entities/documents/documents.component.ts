import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocuments } from 'app/shared/model/documents.model';
import { DocumentsService } from './documents.service';
import { DocumentsDeleteDialogComponent } from './documents-delete-dialog.component';

@Component({
  selector: 'jhi-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit, OnDestroy {
  documents?: IDocuments[];
  eventSubscriber?: Subscription;

  constructor(protected documentsService: DocumentsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.documentsService.query().subscribe((res: HttpResponse<IDocuments[]>) => {
      this.documents = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDocuments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDocuments): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDocuments(): void {
    this.eventSubscriber = this.eventManager.subscribe('documentsListModification', () => this.loadAll());
  }

  delete(documents: IDocuments): void {
    const modalRef = this.modalService.open(DocumentsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documents = documents;
  }
}
