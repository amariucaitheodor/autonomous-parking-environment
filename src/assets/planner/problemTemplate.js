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

; OLD GOAL:
;(:goal (and        
;    (not (exists (?c - car) (or 
;        ; there is no car such that either:
;        (AwaitingParking ?c)            
;        (AwaitingDelivery ?c)        
;    )))    
;))

; NEW GOAL:
(:goal (and
    (not (exists (?c - car) (or ; there is no car such that either
    (and ; it is awaiting parking and there is a free parking tile
        (AwaitingParking ?c)
        ;(exists (?pt - parkingTile) (not (Occupied ?pt)))
    )
    (and ; it is awaiting delivery and there is a free hub tile
        (AwaitingDelivery ?c)
        ;(exists (?ht - hubTile) (not (Occupied ?ht)))
    )
    )))
))
)`;
export default problemTemplate;