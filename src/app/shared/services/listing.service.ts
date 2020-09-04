import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Org } from '../models/org.model';
import { Listing } from '../models/listing.model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  api: string = 'http://localhost:3000/listings';

  public org: Org[];
  public users: User[];
  public listings: Listing[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //Get all of  the listings made by an organization for the profile page
  getUserListings(): Observable<Listing[]> {
    let token = localStorage.getItem('access-token');
    let header = new HttpHeaders().set('jwt', token);
    return this.http.get<Listing[]>(`${this.api}/listings`, { headers: header });
  }
 //Get all of the organization listings in the database for the site tally page
 /* getUserListings(): Observable<Listing[]> {
  let token = localStorage.getItem('access-token');
  let header = new HttpHeaders().set('jwt', token);
  return this.http.get<Listing[]>(`${this.api}/listings`, { headers: header });
} */
  // Delete an organizations listing
  deleteListing(listingId: number): Observable<Listing> {
    let token = localStorage.getItem('access-token');
    let header = new HttpHeaders().set('jwt', token);
    return this.http.delete<Listing>(`${this.api}/delete/${listingId}`, { headers: header });
  }
  //Get a organizations listing by the listing id
  getUserListing(listingId): Observable <Listing> {
    let token = localStorage.getItem('access-token');
    let header = new HttpHeaders().set('jwt', token);
    return this.http.get<Listing>(`${this.api}/listing/${listingId}`, {headers: header});
  }
  //Get a listing by the user Id for the site tally page
  getUsersListing(): Observable <Listing> {
    let token = localStorage.getItem('access-token');
    let header = new HttpHeaders().set('jwt', token);
    return this.http.get<Listing>(`${this.api}/listings`, {headers: header})
  }
  //Create listing
  createListing(listing: Listing): Observable <Listing> {
    let token = localStorage.getItem('access-token');
    let header = new HttpHeaders().set('jwt', token);
    return this.http.post<Listing>(`${this.api}/create`, listing, {headers: header});
  }
  //Update listing
  updateListing(listingId: number, listing: any): Observable <Listing> {
    let token = localStorage.getItem('access-token');
    let header = new HttpHeaders().set('jwt', token);
    return this.http.put<Listing>(`${this.api}/update/${listingId}`, listing, {
      headers: header,
    });
  }
 /*  getUser(org_id): Observable<User> {
    let token = localStorage.getItem('access-token');
    let header = new HttpHeaders().set('jwt', token);
    return this.http.get<User>(`${this.api}/listing/${org_id}`, { headers: header });
  } */
   //get all the users for the site tally page
 /* getEverything(): Observable <User[]> {
  let token = localStorage.getItem('access-token');
  let header = new HttpHeaders().set('jwt', token);
  return this.http.get<User[]>(`${this.api}/find`, { headers: header});
 }  */
}