var problemTemplate = `;; Authors: Theodor Amariucai & Bora M. Alper
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
        (AwaitingDelivery ?c)
        (AwaitingParking ?c)
    )))
))
)`;
export default problemTemplate;