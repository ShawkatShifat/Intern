import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { customInterceptor } from './Interceptor/custom.interceptor';
import { TableDataComponent } from './table-data/table-data.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProjectDetailDialogComponent } from './project-detail-dialog/project-detail-dialog.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { DeletePeojectComponent } from './delete-peoject/delete-peoject.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LayoutComponent,
    TableDataComponent,
    CreateProjectComponent,
    AssignMemberComponent,
    ProjectDetailDialogComponent,
    UpdateProjectComponent,
    DeletePeojectComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([customInterceptor]),withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
