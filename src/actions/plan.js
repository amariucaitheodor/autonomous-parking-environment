import domain from '../assets/planner/domain/domain.js';
import axios from 'axios';

export default async function plan(problem) {
    const options = {
        url: 'http://solver.planning.domains/solve-and-validate',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify({
            "domain": domain,
            "problem": problem
        })
    };

    return await axios(options)
        .then(response => {
            if (response['data']['status'] === 'ok') {
                return response.data.result.plan;
            } else {
                return -1;
            }
        });
}