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

  createReservation(reservation: ReservationRequest): Observable<Reservation> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };

    const response = this.http.post<Reservation>(this.reservationUrl, reservation, httpOptions);
    return response;
  }
}

export class ReservationRequest {
  roomNumber: number;
  checkin: string;
  checkout: string;
  price: number;


  constructor(roomNumber: number, checkin: string, checkout: string, price: number) {
    this.roomNumber = roomNumber;
    this.checkin = checkin;
    this.checkout = checkout;
    this.price = price;
  }
}

export interface Reservation {
  id: string;
  roomNumber: number;
  checkin: Date;
  checkout: Date;
  price: number;
}
