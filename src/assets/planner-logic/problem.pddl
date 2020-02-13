;; Authors: Theodor Amariucai & Bora M. Alper (in no particular order)

(define (problem parking)
    (:domain finitech)
    (:objects
        Robot - robot
    )

    (:init
        (IsAt Robot R5C1)
    )

    (:goal (and
        (exists (?ps - park) (and
            (IsAt Car ?ps)
        ))
    ))
)

