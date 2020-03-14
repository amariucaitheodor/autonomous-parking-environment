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
    (not (exists (?c - car) (or 
        ; there is no car such that either:
        (AwaitingParking ?c)
        (AwaitingDelivery ?c)
    )))
))
)`;
export default problemTemplate;