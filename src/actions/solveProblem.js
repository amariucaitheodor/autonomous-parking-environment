// import StripsManager from '../assets/strips/strips';
// import testdomain from '../assets/pddl/testdomain';

// export default function solveProblem(problem) {
//     let domain = testdomain;
//     beginSolving(domain);

//     function beginSolving(domain) {
//         StripsManager.load(domain, problem, function (domain, problem) {
//             console.log("NICE");
//             var solutions = StripsManager.solve(domain, problem);
//             console.log("NICE");
            
//             for (var i in solutions) {
//                 var solution = solutions[i];

//                 console.log('- Solution found in ' + solution.steps + ' steps!');
//                 for (var j = 0; j < solution.path.length; j++) {
//                     console.log((j + 1) + '. ' + solution.path[j]);
//                 }
//             }
//         }, true);
//     }
// }