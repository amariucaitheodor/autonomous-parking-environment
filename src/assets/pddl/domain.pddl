(define (domain parking)

    (:requirements :adl :typing :strips )
    ; :strips
    ;     The most basic subset of PDDL, consisting of STRIPS only. 
    ; :typing
    ;     This requirement means that the domain uses types (see Typing below). 
    ; :adl
    ;     Means that the domain uses some or all of ADL (i.e. disjunctions and quantifiers in preconditions and goals, quantified and conditional effects). 
    ;MAYBE?: (:requirements :fluents :durative-actions :timed-initial-literals :conditional-effects :negative-preconditions :duration-inequalities :equality)

    (:types
        robot - mover
        car - movable

        ;; kind of tiles
        road - tile
        available - tile
        pickup - tile
        blocked - tile
    )

    (:constants
        Robot - robot
        Car - car
    )

    (:predicates
        ;; Example:
        ;; (Contains ?x - object ?c - container)

        (IsAt ?m - mover ?t - tile)
        (Occupied ?p - park)
        (HasLifted ?r - robot ?c - car)

        (IsToTheLeft ?a - tile ?b - tile)
        (IsToTheUp ?a - tile ?b - tile)
    )

    ;;;; Action Template - Delete and fill in own actions ;;;;

    (:action lift-car
        :parameters (?r - robot ?c - car ?t - tile)
        :precondition (and
            (IsAt ?r ?t)
            (IsAt ?c ?t)
         )
        :effect (and
            (HasLifted ?r ?c)
            (not (IsAt ?c ?t))
        )
    )

    (:action park-car-at
        :parameters (?r - robot ?c - car ?ps - park)
        :precondition (and
            (IsAt ?r ?ps)
            (HasLifted ?r ?c)
            (not (Occupied ?ps))
        )
        :effect (and
            (not (HasLifted ?r ?c))
            (Occupied ?ps)
            (IsAt ?c ?ps)
        )
    )

    (:action go-left
        :parameters (?r - robot ?f - tile ?t - tile)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeft ?t ?f)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    (:action go-right
        :parameters (?r - robot ?f - tile ?t - tile)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheLeft ?f ?t)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    (:action go-up
        :parameters (?r - robot ?f - tile ?t - tile)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheUp ?t ?f)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )

    (:action go-down
        :parameters (?r - robot ?f - tile ?t - tile)
        :precondition (and
            (IsAt ?r ?f)
            (IsToTheUp ?f ?t)
        )
        :effect (and
            (not (IsAt ?r ?f))
            (IsAt ?r ?t)
        )
    )
)