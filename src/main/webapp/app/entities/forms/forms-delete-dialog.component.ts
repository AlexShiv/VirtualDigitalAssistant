import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IForms } from 'app/shared/model/forms.model';
import { FormsService } from './forms.service';

@Component({
  templateUrl: './forms-delete-dialog.component.html'
})
export class FormsDeleteDialogComponent {
  forms?: IForms;

  constructor(protected formsService: FormsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('formsListModification');
      this.activeModal.close();
    });
  }
}
