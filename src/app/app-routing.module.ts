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
import { ViewUsersComponent } from './view-users/view-users.component';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LoginComponent},
  {path:'users', component:ViewUsersComponent},
  {path:'users/newUser', component:NewUserComponent},
  {path:'contacts', component:AllContactsComponent},
  {path:'updateProfile', component:UpdateProfileComponent},
  {path:'changePassword', component:ChangePasswordComponent},
  {path:'register', component:RegistrationComponent},
  {path:'accounts', component:UserAccountsComponent},
  {path:'refreshUserAccounts', component:UserAccountsComponent},
  {path:'accounts/editAccount/:ID', component:EditAccountComponent},
  {path:'accounts/addAccount', component:AddAccountComponent},
  {path:'accounts/viewAccount/:ID', component:ViewAccountComponent},
  {path:'accounts/viewAccount/:ID/accountContacts', component:AccountContactsComponent},
  {path:'accounts/viewAccount/:ID/accountContacts/editContact/:ID', component:EditContactComponent},
  {path:'accounts/viewAccount/:ID/accountContacts/viewContact/:ID', component:ViewContactComponent},
  {path:'accounts/viewAccount/:ID/accountContacts/addContact', component:AddContactComponent},
  {path:'contacts/:ID/accountContacts/addContact', component:AddContactComponent},
  {path:'contacts/editContact/:ID', component:EditContactComponent},
  {path:'contacts/viewContact/:ID', component:ViewContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
