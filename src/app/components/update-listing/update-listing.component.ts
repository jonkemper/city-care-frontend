import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../shared/services/listing.service';
import { Listing } from '../../shared/models/listing.model';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/helpers/notification.service';

@Component({
  selector: 'app-update-listing',
  templateUrl: './update-listing.component.html',
  styleUrls: ['./update-listing.component.css']
})
export class UpdateListingComponent implements OnInit {

public isOrg = false;
public userIsOrg = false;
public isLoading = false;
public isAuthenticated = false;
public userIsAuthenticated = false;
public listing: Listing;

private authStatusSub: Subscription;
private orgStatusSub: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService
  ) { }

  ngOnInit(){ 
    this.isLoading = true;
    this.userIsAuthenticated = this.authorizationService.getIsAuth();
    this.authStatusSub = this.authorizationService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      });
      this.isOrg = this.authorizationService.getIsOrg();
      this.orgStatusSub = this.authorizationService.getAuthStatusListener().subscribe(isOrg => {
        this.userIsOrg = isOrg;
      })
      const listingId = +this.route.snapshot.paramMap.get('id');
      this.listingService.getUserListing(listingId).subscribe(listing => this.listing = listing)
      this.isLoading = false;
  }

  
updateListing() {
  const listingId = +this.route.snapshot.paramMap.get('id');
  this.listingService.updateListing(listingId, this.listing).subscribe(listing => {
    this.notification.editListing();
    this.router.navigate(['/city-care/users-profile'])
  })
}

ngOnDestroy() {
  this.authStatusSub.unsubscribe();
  this.orgStatusSub.unsubscribe();
}
}
