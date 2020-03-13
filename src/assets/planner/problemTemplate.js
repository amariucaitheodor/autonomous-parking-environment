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
        (AwaitingParking ?c)            
        (AwaitingDelivery ?c)        
    )))    
))\n)`;
export default problemTemplate;