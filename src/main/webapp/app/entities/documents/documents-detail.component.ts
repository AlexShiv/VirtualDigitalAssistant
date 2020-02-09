import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocuments } from 'app/shared/model/documents.model';

@Component({
  selector: 'jhi-documents-detail',
  templateUrl: './documents-detail.component.html'
})
export class DocumentsDetailComponent implements OnInit {
  documents: IDocuments | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documents }) => {
      this.documents = documents;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
