import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesComponent } from './purchases/purchases.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "purchases" },
  { path: "purchases", component: PurchasesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
