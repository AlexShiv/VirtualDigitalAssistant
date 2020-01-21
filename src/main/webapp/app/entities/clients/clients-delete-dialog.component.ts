import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClients } from 'app/shared/model/clients.model';
import { ClientsService } from './clients.service';

@Component({
  templateUrl: './clients-delete-dialog.component.html'
})
export class ClientsDeleteDialogComponent {
  clients?: IClients;

  constructor(protected clientsService: ClientsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clientsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('clientsListModification');
      this.activeModal.close();
    });
  }
}
