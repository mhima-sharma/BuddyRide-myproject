import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';
import { SearchRideComponent } from '../search-ride/search-ride.component';
import { PublishRideComponent } from '../publish-ride/publish-ride.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { ForgotComponent } from '../forgot/forgot.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserAuthModalComponent } from '../log-out/user-auth-modal.component';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';
import { PublishedRideComponent } from '../published-ride/published-ride.component';
import { BookRideComponent } from '../book-ride/book-ride.component';
import { ComplaintBoxComponent } from '../complaint-box/complaint-box.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
// import { DropOffLocationComponent } from '../drop-off-location/drop-off-location.component';
import { PickupLocationComponent } from '../pickup-location/pickup-location.component';
import { SelectRouteComponent } from '../select-route/select-route.component';
import { SplashComponent } from '../splash/splash.component';
import { FirstPageComponent } from '../first-page/first-page.component';
import { TermsAndConditionComponent } from '../pages/terms-and-condition/terms-and-condition.component';
import { BlogComponent } from '../pages/blog/blog.component';
import { SafetyTrustComponent } from '../pages/safety-trust/safety-trust.component';
import { PublishrideCalanderComponent } from '../publishride-calander/publishride-calander.component';
import { PublishrideTimeComponent } from '../publishride-time/publishride-time.component';
import { ThankyouPageComponent } from '../thankyou-page/thankyou-page.component';
import { RideDetalisCardComponent } from '../ride-detalis-card/ride-detalis-card.component';
import { UserRidesComponent } from '../user-rides/user-rides.component';
import { ContactWithUsComponent } from '../contact-with-us/contact-with-us.component';

export const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'first', component:FirstPageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchRideComponent },
    { path: 'publish-ride', component: PublishRideComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot', component: ForgotComponent},
    { path: 'reset', component: ResetPasswordComponent},
    { path: 'change-pass', component: ChangePasswordComponent},
    { path: 'logout', component:LogoutPopupComponent },
    { path: 'published', component:PublishedRideComponent},
    { path: 'book', component:BookRideComponent},
    { path: 'complaint', component:ComplaintBoxComponent},
    { path: 'profile', component: ProfileComponent},
    // { path: 'drop-off', component: DropOffLocationComponent},
    { path: 'pick-up', component: PickupLocationComponent},
    { path: 'select-route', component: SelectRouteComponent},
    { path: 'term-cond', component: TermsAndConditionComponent},
    { path: 'blog', component: BlogComponent},
    { path: 'safety', component: SafetyTrustComponent},
    { path: 'calander', component:PublishrideCalanderComponent},
    { path: 'time', component: PublishrideTimeComponent},
    { path: 'thanks', component: ThankyouPageComponent},
    { path: 'ride-detail', component: RideDetalisCardComponent},
    { path: 'my-ride', component: UserRidesComponent},
    { path: 'contact', component: ContactWithUsComponent},
    // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];
