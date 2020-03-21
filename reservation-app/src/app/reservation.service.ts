import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl: string = 'http://localhost:8080';
  private reservationUrl: string = this.baseUrl + '/room/v1/reservation/';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationUrl);
  }

  createReservation(reservationBody: ReservationRequest): Observable<Reservation> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };

    console.log('Creating Reservation : ' + JSON.stringify(reservationBody));
    return this.http.post<Reservation>(this.reservationUrl, reservationBody, httpOptions);
  }
}

export class ReservationRequest {
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  price: number;


  constructor(roomNumber: number, checkIn: string, checkOut: string, price: number) {
    this.roomNumber = roomNumber;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.price = price;
  }
}

export interface Reservation {
  id: string;
  roomNumber: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
}
