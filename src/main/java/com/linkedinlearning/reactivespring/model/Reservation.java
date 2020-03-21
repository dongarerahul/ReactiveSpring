package com.linkedinlearning.reactivespring.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Document
public class Reservation {
    private Long roomNumber;
    private Integer price;

    @DateTimeFormat(iso=DateTimeFormat.ISO.DATE)
    private LocalDate checkIn;

    @DateTimeFormat(iso=DateTimeFormat.ISO.DATE)
    private LocalDate checkOut;

    @Id
    private String id;

    public String getId() {
        return id;
    }

    public Long getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(final Long roomNumber) {
        this.roomNumber = roomNumber;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(final LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(final LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(final Integer price) {
        this.price = price;
    }

    public Reservation() { }

    @Override
    public String toString() {
        return "Reservation{" +
                "roomNumber=" + roomNumber +
                ", price=" + price +
                ", checkIn=" + checkIn +
                ", checkOut=" + checkOut +
                ", id='" + id + '\'' +
                '}';
    }

    public Reservation(final Long roomNumber, final LocalDate checkIn, final LocalDate checkOut, final Integer price) {
        this.roomNumber = roomNumber;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.price = price;
    }
}
