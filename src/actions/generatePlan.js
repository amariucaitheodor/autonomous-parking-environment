import domain from '../assets/planner/domain.js';
import axios from 'axios';

export default async function plan(problem, solver) {
    const development = false;
    const api = development ? 'https://solver.planning.domains' : 'https://pddl-planner-backend.herokuapp.com';
    
    const options = {
        url: api + '/solve-and-validate',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify({
            "domain": domain,
            "problem": problem,
            "solver": solver
        })
    };

    return await axios(options)
        .then(response => {
            if (development) {
                if (response.data.status === 'ok' && response.data.result.error === false) {
                    return response.data.result.plan;
                } else {
                    console.error(`Online planner at ${api}/solve-and-validate failed:\nError: ${response.data.result.error}\nParse status: ${response.data.result.parse_status}`);
                    return response.data.result.error;
                }
            } else {
                if (response.data.parse_status === 'ok' && response.data.error === false) {
                    return response.data.plan;
                } else {
                    console.error(`Online planner at ${api}/solve-and-validate failed:\nError: ${response.data.error}\nParse status: ${response.data.parse_status}`);
                    return response.data.error;
                }
            }
        });
}