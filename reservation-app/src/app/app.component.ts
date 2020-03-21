import { Component } from '@angular/core';
import {ReservationRequest, ReservationService} from "./reservation.service";
import {FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservation-app';
  rooms: Room[];
  roomResearchForm: FormGroup;
  currentCheckInVal: string;
  currentCheckOutVal: string;
  currentPrice: number;
  currentRoomNumber: number;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.roomResearchForm = new FormGroup({
      checkIn: new FormControl(''),
      checkOut: new FormControl(''),
      roomNumber: new FormControl('')
    });

    this.roomResearchForm.valueChanges.subscribe(form => {
      this.currentCheckInVal = form.checkIn;
      this.currentCheckOutVal = form.checkOut;

      if(form.roomNumber) {
        let roomValues: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = Number(roomValues[0]);
        this.currentPrice = Number(roomValues[1]);
      }
    });
    this.rooms = [ new Room("127", 127, 150),
                   new Room("138", 138, 180),
                   new Room("254", 254, 200)];

    console.log(this.currentCheckInVal);
    console.log(this.currentCheckOutVal);
    console.log(this.currentRoomNumber);
    console.log(this.currentPrice);
  }

  createReservation() {
    this.reservationService.createReservation(
      new ReservationRequest(this.currentRoomNumber, this.currentCheckInVal, this.currentCheckOutVal, this.currentPrice)
    ).subscribe(
      postResult =>   console.log('Received Response: ' + JSON.stringify(postResult))
    );
  }
}

export class Room {
  id: string;
  roomNumber: number;
  price: number;


  constructor(id: string, roomNumber: number, price: number) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.price = price;
  }
}
