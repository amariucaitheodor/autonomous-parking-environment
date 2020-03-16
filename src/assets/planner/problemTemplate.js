var problemTemplate = `;; Authors: Theodor Amariucai & Bora M. Alper (in no particular order)
\n
(define (problem parking)    
(:domain finitech)    
    
(:objects        
    {{robot}}
           
    {{cars}}       
            
    {{tiles}}
)
    
(:init        
    {{scenario}}
            
    {{setup}}
)

(:goal (and
    (or
        (not (exists (?c - car) (AwaitingDelivery ?c)))
        ;(forall (?ht - hubTile) (exists (?c - car) (IsAt ?c ?ht)))
    )
    (or
        (not (exists (?c - car) (AwaitingParking ?c)))
        ;(forall (?pt - parkingTile) (exists (?c - car) (IsAt ?c ?pt)))
    )
))
)`;
export default problemTemplate;