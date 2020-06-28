import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.module').then(m => m.VirtualDigitalAssistantTeachersModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.VirtualDigitalAssistantClientsModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.VirtualDigitalAssistantRolesModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then(m => m.VirtualDigitalAssistantGroupsModule)
      },
      {
        path: 'faculties',
        loadChildren: () => import('./faculties/faculties.module').then(m => m.VirtualDigitalAssistantFacultiesModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.VirtualDigitalAssistantEventsModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.VirtualDigitalAssistantFormsModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.VirtualDigitalAssistantDocumentsModule)
      },
      {
        path: 'event-types',
        loadChildren: () => import('./event-types/event-types.module').then(m => m.VirtualDigitalAssistantEventTypesModule)
      },
      {
        path: 'stat-popular-categories',
        loadChildren: () =>
          import('./stat-popular-categories/stat-popular-categories.module').then(m => m.VirtualDigitalAssistantStatPopularCategoriesModule)
      },
      {
        path: 'stat-correct-answers',
        loadChildren: () =>
          import('./stat-correct-answers/stat-correct-answers.module').then(m => m.VirtualDigitalAssistantStatCorrectAnswersModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class VirtualDigitalAssistantEntityModule {}
