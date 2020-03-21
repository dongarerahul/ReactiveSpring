package com.linkedinlearning.reactivespring.model;

import com.linkedinlearning.reactivespring.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReactiveMongoOperations operations;

    @Autowired
    public ReservationServiceImpl(ReactiveMongoOperations operations) {
        this.operations = operations;
    }

    @Override
    public Mono<Reservation> getReservation(String id) {
        return operations.findById(id, Reservation.class);
    }

    @Override
    public Mono<Reservation> createReservation(final Mono<Reservation> reservation) {
        return operations.save(reservation);
    }

    @Override // update just price
    public Mono<Reservation> updateReservation(final String id, final Mono<Reservation> reservationMono) {
        return reservationMono.flatMap(reservation -> {
            Query query = Query.query(Criteria.where("id").is(id));
            return operations.findAndModify(
                    query,
                    Update.update("price", reservation.getPrice()),
                    Reservation.class)
                    .flatMap(result -> {
                        result.setPrice(reservation.getPrice());
                        return Mono.just(result);
                    });
        });
    }

    @Override
    public Mono<Boolean> deleteReservation(final String id) {
        Query query = Query.query(Criteria.where("id").is(id));
        return operations.remove(query, Reservation.class)
                .flatMap(deleteResult -> Mono.just(deleteResult.wasAcknowledged()));
    }
}
