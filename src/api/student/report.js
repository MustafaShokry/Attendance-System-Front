import axios from 'axios';
import { base_url } from '../settings';

const api = axios.create({
    baseURL: base_url,
});

export const submitIllnessReport = async (ssn, co_id, date_of_absent, report_text, attachment = null) => {

    const response = await api.post('/illness-report', null, {
        params: {
            ssn,
            co_id,
            date_of_absent,
            report_text,
            attachment,
        },
    });
    if (response.status === 200) {
        return response.data;
    } else if (response.status === 400) {
        throw new Error('Failed to submit illness report');
    }
    else if (response.status === 404) {
        throw new Error('Failed to submit illness report');
    }

};
