import { NgModule } from '@angular/core';
// PRELOAD ALL MODULES DOWNLOAD ALL CHUNKS ONCE THE CURRENT IS COMPILED
// THEN WHEN THEY ARE REQUIRED THE APP START THE PARSE AND COMPILATION PROCESS
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CustomPreloadService } from './services/custom-preload.service';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true
    }
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
