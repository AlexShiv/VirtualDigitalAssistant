import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocuments } from 'app/shared/model/documents.model';
import { DocumentsService } from './documents.service';

@Component({
  templateUrl: './documents-delete-dialog.component.html'
})
export class DocumentsDeleteDialogComponent {
  documents?: IDocuments;

  constructor(protected documentsService: DocumentsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('documentsListModification');
      this.activeModal.close();
    });
  }
}
