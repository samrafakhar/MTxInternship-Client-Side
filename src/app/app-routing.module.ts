import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { AccountContactsComponent } from './account-contacts/account-contacts.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LoginComponent},
  {path:'updateProfile', component:UpdateProfileComponent},
  {path:'changePassword', component:ChangePasswordComponent},
  {path:'register', component:RegistrationComponent},
  {path:'userAccounts', component:UserAccountsComponent},
  {path:'refreshUserAccounts', component:UserAccountsComponent},
  {path:'userAccounts/editAccount/:ID', component:EditAccountComponent},
  {path:'userAccounts/addAccount', component:AddAccountComponent},
  {path:'userAccounts/viewAccount/:ID', component:ViewAccountComponent},
  {path:'userAccounts/viewAccount/:ID/accountContacts', component:AccountContactsComponent},
  {path:'userAccounts/viewAccount/:ID/accountContacts/editContact/:ID', component:EditContactComponent},
  {path:'userAccounts/viewAccount/:ID/accountContacts/viewContact/:ID', component:ViewContactComponent},
  {path:'userAccounts/viewAccount/:ID/accountContacts/addContact', component:AddContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
