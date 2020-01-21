import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDocuments, Documents } from 'app/shared/model/documents.model';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'jhi-documents-update',
  templateUrl: './documents-update.component.html'
})
export class DocumentsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nameDocument: [],
    content: [],
    createDate: [],
    changeDate: []
  });

  constructor(protected documentsService: DocumentsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documents }) => {
      this.updateForm(documents);
    });
  }

  updateForm(documents: IDocuments): void {
    this.editForm.patchValue({
      id: documents.id,
      nameDocument: documents.nameDocument,
      content: documents.content,
      createDate: documents.createDate != null ? documents.createDate.format(DATE_TIME_FORMAT) : null,
      changeDate: documents.changeDate != null ? documents.changeDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documents = this.createFromForm();
    if (documents.id !== undefined) {
      this.subscribeToSaveResponse(this.documentsService.update(documents));
    } else {
      this.subscribeToSaveResponse(this.documentsService.create(documents));
    }
  }

  private createFromForm(): IDocuments {
    return {
      ...new Documents(),
      id: this.editForm.get(['id'])!.value,
      nameDocument: this.editForm.get(['nameDocument'])!.value,
      content: this.editForm.get(['content'])!.value,
      createDate:
        this.editForm.get(['createDate'])!.value != null ? moment(this.editForm.get(['createDate'])!.value, DATE_TIME_FORMAT) : undefined,
      changeDate:
        this.editForm.get(['changeDate'])!.value != null ? moment(this.editForm.get(['changeDate'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocuments>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
