// import { WritableStream } from 'memory-streams';

// export default function writeProblem() {
//     var writer = new WritableStream();

//     let objects = [], init = [];
//     // write problem data to memory stream (replace XX with task number?)
//     writer.write(
//         `(define (problem parking-XX) (:domain parking)\n\n
//         (:objects\n
//             ${objects}
//         )\n\n
//         (:init\n
//             ${init}
//         )\n\n
//         (:goal (and\n
//             (exists (?ps - park) (and\n
//                 (IsAt Car ?ps)\n
//             ))\n
//         )
//         )\n`
//     );

//     let problem = writer.toString();

//     // // add the following line if metric is needed
//     // // (:metric minimize (???))

//     writer.end();
//     return problem;
// }