var domain = `
;; Authors: Theodor Amariucai & Bora M. Alper (in no particular order)

(define (domain finitech)
    (:requirements :adl :typing :negative-preconditions :strips)

    (:types
        blockedTile - tile  ;; physically inaccessible 
        roadTile - tile
        parkingTile - tile
        hubTile - tile
        
        car - dynamic  ;; cars can only be moved around with the help of the robot
        robot - dynamic
    )

    (:predicates
        ;; TODO: enforce that one and only one is true at a given time
        (TemporarilyBlocked ?t - tile)

        ;; The car is waiting to be parked
        (AwaitingParking ?c - car)
        ;; The car is waiting for delivery
        (AwaitingDelivery ?c - car)
        ;; Otherwise the car is waiting for its owner

        ;; ?a IsToTheLeftOf/IsAbove ?b
        (IsToTheLeftOf ?a - tile ?b - tile)
        (IsAbove ?a - tile ?b - tile)

        (IsAt ?m - dynamic ?t - tile)

        (IsCarrying ?r - robot ?c - car)
    )

    ;;;;;; WE ASSUME HORIZONTAL TILES!

    ;;;; Action Template - Delete and fill in own actions ;;;;
    (:action go-left
        :parameters (?r - robot ?f - tile ?t - roadTile)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?t ?f)
            (not (TemporarilyBlocked ?t))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    (:action go-right
        :parameters (?r - robot ?f - tile ?t - roadTile)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?f ?t)
            (not (TemporarilyBlocked ?t))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    (:action go-up
        :parameters (?r - robot ?f - roadTile ?t - roadTile)
        :precondition (and
            (IsAt ?r ?f)
            (IsAbove ?t ?f)
            (not (TemporarilyBlocked ?t))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    (:action go-down
        :parameters (?r - robot ?f - roadTile ?t - roadTile)
        :precondition (and
            (IsAt ?r ?f)
            (IsAbove ?f ?t)
            (not (TemporarilyBlocked ?t))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    ;; 1) scan
    ;; 2) slide under
    ;; 3) lift
    (:action pickup-car-leftwards
        :parameters (?r - robot ?f - roadTile ?t - hubTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsAt ?c ?t)
            (IsToTheLeftOf ?t ?f)
            
            (not (exists (?c2 - car) (and (IsCarrying ?r ?c2))))
            (AwaitingParking ?c)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (not (IsAt ?c ?t))
            (IsAt ?r ?t)
            
            (IsCarrying ?r ?c)
        )
    )

    (:action dropoff-car-leftwards
        :parameters (?r - robot ?f - roadTile ?t - hubTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?t ?f)
            
            (IsCarrying ?r ?c)
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
            ;; Necessary? (AwaitingDelivery ?c)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            (IsAt ?c ?t)
            
            (not (IsCarrying ?r ?c))
            (not (AwaitingDelivery ?c))
        )
    )

    (:action park-car-rightwards
        :parameters (?r - robot ?f - roadTile ?t - parkingTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?f ?t)
            
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
            (IsCarrying ?r ?c)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            
            (not (IsCarrying ?r ?c))
            (IsAt ?c ?t)
            (not (AwaitingParking ?c))
        )
    )

    (:action park-car-leftwards
        :parameters (?r - robot ?f - roadTile ?t - parkingTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?t ?f)
            
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
            (IsCarrying ?r ?c)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            
            (not (IsCarrying ?r ?c))
            (IsAt ?c ?t)
            (not (AwaitingParking ?c))
        )
    )

    ;;;;

    (:action retrieve-car-rightwards
        :parameters (?r - robot ?f - roadTile ?t - parkingTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?f ?t)
            
            (AwaitingDelivery ?c)
            (IsAt ?c ?t)
            
            (not (exists (?c2 - car) (and
                (IsCarrying ?r ?c2)
            )))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            
            (not (IsAt ?c ?t))
            (IsCarrying ?r ?c)
        )
    )

    (:action retrieve-car-leftwards
        :parameters (?r - robot ?f - roadTile ?t - parkingTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?t ?f)
            
            (AwaitingDelivery ?c)
            (IsAt ?c ?t)
            
            (not (exists (?c2 - car) (and
                (IsCarrying ?r ?c2)
            )))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            
            (not (IsAt ?c ?t))
            (IsCarrying ?r ?c)
        )
    )

)`;
export default domain;