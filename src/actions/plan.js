import domain from '../assets/planner/domain/domain.js';
import axios from 'axios';

export default async function plan(problem) {
    const options = {
        url: 'https://pddl-planner-backend.herokuapp.com/solve-and-validate',
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
            if (response.data.parse_status === 'ok' && response.data.error === false) {
                return response.data.result.plan;
            } else {
                console.error("Online planner at `https://pddl-planner-backend.herokuapp.com/solve-and-validate` failed:\nError: " + response.data.error + "\nParse status: " + response.data.parse_status);
                return -1;
            }
        });
}