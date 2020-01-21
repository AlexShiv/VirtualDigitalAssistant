import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClients } from 'app/shared/model/clients.model';
import { ClientsService } from './clients.service';
import { ClientsDeleteDialogComponent } from './clients-delete-dialog.component';

@Component({
  selector: 'jhi-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients?: IClients[];
  eventSubscriber?: Subscription;

  constructor(protected clientsService: ClientsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.clientsService.query().subscribe((res: HttpResponse<IClients[]>) => {
      this.clients = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClients();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IClients): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClients(): void {
    this.eventSubscriber = this.eventManager.subscribe('clientsListModification', () => this.loadAll());
  }

  delete(clients: IClients): void {
    const modalRef = this.modalService.open(ClientsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.clients = clients;
  }
}
