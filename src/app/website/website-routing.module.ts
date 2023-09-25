import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import { authGuard } from './../guards/auth.guard';
import { exitGuard } from './../guards/exit.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m =>m.CategoryModule),
        // INDICATES THE CATEGORY MODULE SHOULD BE PRELOADED
        data : {
          preload: true
        }
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent
      },
      {
        path: 'profile',
        canActivate: [ authGuard ],
        component: ProfileComponent
      },
      {
        path: 'register',
        // CHECK IF THE USER IS SURE ABOUT LEAVING THE PAGE WITH exitGuard
        canDeactivate: [ exitGuard ],
        component: RegisterComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
