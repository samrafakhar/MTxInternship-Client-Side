import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AccountContactsComponent } from './account-contacts/account-contacts.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ProductComponent } from './product/product.component';
import { ProteinComponent } from './protein/protein.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { NewUserComponent } from './new-user/new-user.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserAccountsComponent,
    EditAccountComponent,
    ViewAccountComponent,
    AddAccountComponent,
    AccountContactsComponent,
    ViewContactComponent,
    AddContactComponent,
    EditContactComponent,
    ProductComponent,
    ProteinComponent,
    UserManagmentComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
    SidebarComponent,
    ViewUsersComponent,
    AllContactsComponent,
    NewUserComponent,
    NavbarComponent,
  ],
  imports: [
    //NgbActiveModal,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MultiSelectAllModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    MatFormFieldModule,
    NgbModule,
    InfiniteScrollModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }