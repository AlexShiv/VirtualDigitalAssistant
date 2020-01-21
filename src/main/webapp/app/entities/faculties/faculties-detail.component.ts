import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFaculties } from 'app/shared/model/faculties.model';

@Component({
  selector: 'jhi-faculties-detail',
  templateUrl: './faculties-detail.component.html'
})
export class FacultiesDetailComponent implements OnInit {
  faculties: IFaculties | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ faculties }) => {
      this.faculties = faculties;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
