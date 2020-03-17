var domain = `; Authors: Theodor Amariucai & Bora M. Alper
; NOTE!!!! PRECONDITIONS SHOULD BE AS VERBOSE AS POSSIBLE TO INCREASE SOLVE TIME

(define (domain finitech)
    (:requirements :adl :typing :negative-preconditions :strips)

    (:types
        ; physically inacessible, plays no role:
        inaccessibleTile - tile

        ; cars are left/picked up from here by their owners:
        hubTile - tile

        ; robot can move on movementTiles given certain conditions further defined in the actions section:
        movementTile - tile
        roadTile - movementTile
        parkingTile - movementTile
        
        ; Dynamic objects can move around, cars can only be moved by a robot:
        car - dynamic
        robot - dynamic
    )

    (:predicates
        ; The car is AWAITING_PARKING or AWAITING_DELIVERY. 
        ; Otherwise the car is AWAITING_OWNER or is IDLE, both of which are the same for us.
        (AwaitingParking ?c - car)
        (AwaitingDelivery ?c - car)
        
        ; Map configuration
        (IsToTheLeftOf ?a - tile ?b - tile)
        (IsAbove ?a - tile ?b - tile)

        (IsAt ?m - dynamic ?t - tile)

        (IsCarrying ?r - robot ?c - car)
    )

    ;; Actions ;;
    (:action go-left
        :parameters (?r - robot ?f - tile ?t - movementTile)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?t ?f)
            (or
                (not (exists (?c - car) (IsAt ?c ?t)))
                (not (exists (?c - car) (IsCarrying ?r ?c)))
            )
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    (:action go-right
        :parameters (?r - robot ?f - tile ?t - movementTile)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?f ?t)
            (or
                (not (exists (?c - car) (IsAt ?c ?t)))
                (not (exists (?c - car) (IsCarrying ?r ?c)))
            )
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    ; You should only go up or down from an empty parking tile (f empty) or a road tile. Both are movementTiles
    (:action go-up
        :parameters (?r - robot ?f - movementTile ?t - movementTile)
        :precondition (and
            (IsAt ?r ?f)
            (IsAbove ?t ?f)
            (not (exists (?c - car) (IsAt ?c ?t)))
            (not (exists (?c - car) (IsAt ?c ?f)))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    (:action go-down
        :parameters (?r - robot ?f - movementTile ?t - movementTile)
        :precondition (and
            (IsAt ?r ?f)
            (IsAbove ?f ?t)
            (not (exists (?c - car) (IsAt ?c ?t)))
            (not (exists (?c - car) (IsAt ?c ?f)))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    ; Lifting a car involves multiple steps: scan license plate, move underneath, lift by the wheels
    ; Destination ?t - tile here will be either a hubTile or a parkingTile (not enforced)
    (:action lift-car-leftwards
        :parameters (?r - robot ?f - movementTile ?t - tile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsAt ?c ?t)
            (IsToTheLeftOf ?t ?f)
            
            (not (exists (?c2 - car) (and (IsCarrying ?r ?c2))))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (not (IsAt ?c ?t))
            (IsAt ?r ?t)
            
            (IsCarrying ?r ?c)
        )
    )

    (:action lift-car-rightwards
        :parameters (?r - robot ?f - movementTile ?t - tile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsAt ?c ?t)
            (IsToTheLeftOf ?f ?t)
            
            (not (exists (?c2 - car) (and (IsCarrying ?r ?c2))))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (not (IsAt ?c ?t))
            (IsAt ?r ?t)
            
            (IsCarrying ?r ?c)
        )
    )

    ; Can only transfer from parkingTiles for now, otherwise solver is overwhelmed
    (:action transfer-car-rightwards
        :parameters (?r - robot ?f - parkingTile ?t - parkingTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?f ?t)
            
            (IsCarrying ?r ?c)
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            (IsAt ?c ?t)
            
            (not (IsCarrying ?r ?c))
        )
    )

    (:action transfer-car-leftwards
        :parameters (?r - robot ?f - parkingTile ?t - parkingTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?t ?f)
            
            (IsCarrying ?r ?c)
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            (IsAt ?c ?t)
            
            (not (IsCarrying ?r ?c))
        )
    )

    (:action dropoff-car-rightwards
        :parameters (?r - robot ?f - movementTile ?t - hubTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?f ?t)
            
            (IsCarrying ?r ?c)
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
            (AwaitingDelivery ?c)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            (IsAt ?c ?t)
            
            (not (IsCarrying ?r ?c))
            (not (AwaitingDelivery ?c))
        )
    )

    (:action dropoff-car-leftwards
        :parameters (?r - robot ?f - movementTile ?t - hubTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?t ?f)
            
            (IsCarrying ?r ?c)
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
            (AwaitingDelivery ?c)
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
        :parameters (?r - robot ?f - movementTile ?t - parkingTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?f ?t)
            
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
            (IsCarrying ?r ?c)
            (AwaitingParking ?c)
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
        :parameters (?r - robot ?f - movementTile ?t - parkingTile ?c - car)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeftOf ?t ?f)
            
            (not (exists (?c2 - car) (IsAt ?c2 ?t)))
            (IsCarrying ?r ?c)
            (AwaitingParking ?c)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
            
            (not (IsCarrying ?r ?c))
            (IsAt ?c ?t)
            (not (AwaitingParking ?c))
        )
    )
)`;
export default domain;