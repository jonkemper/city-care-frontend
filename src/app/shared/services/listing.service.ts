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

  //GET all of  the listings made by an organization for the profile page
  getUserListings(): Observable<Listing[]> {
    // let token = localStorage.getItem('access-token');
    // let header = new HttpHeaders().set('jwt', token);
    return this.http.get<Listing[]>(`${this.api}/listings`);
  }
  // DELETE an organizations listing
  deleteListing(listingId: number): Observable<Listing> {
    // let token = localStorage.getItem('access-token');
    // let header = new HttpHeaders().set('jwt', token);
    return this.http.delete<Listing>(`${this.api}/delete/${listingId}`);
  }
  //GET a organizations listing by the listing id
  getUserListing(listingId: number): Observable <Listing> {
    // let token = localStorage.getItem('access-token');
    // let header = new HttpHeaders().set('jwt', token);
    return this.http.get<Listing>(`${this.api}/listing/${listingId}`);
  }
  //CREATE an organization listing 
  createListing(listing: Listing): Observable <Listing> {
    // let token = localStorage.getItem('access-token');
    // let header = new HttpHeaders().set('jwt', token);
    return this.http.post<Listing>(`${this.api}/create`, listing);
  }
  //UPDATE an organization listing
  updateListing(listingId: number, listing: any): Observable <Listing> {
    // let token = localStorage.getItem('access-token');
    // let header = new HttpHeaders().set('jwt', token);
    return this.http.put<Listing>(`${this.api}/update/${listingId}`, listing);
  }
   //GET all the organization users and their listings for the site tally page
 getEverythingOrgs(): Observable <User[]> {
  // let token = localStorage.getItem('access-token');
  // let header = new HttpHeaders().set('jwt', token);
  return this.http.get<User[]>(`${this.api}/findOrgs`);
 } 
}