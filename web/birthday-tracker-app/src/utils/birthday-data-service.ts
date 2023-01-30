import mockJson from './mockData.json';
import {Birthday} from '../types/birthday';
import {BIRTHDAYS_ROUTE} from './routes';


export async function getBirthdayData(useMockData: boolean) {
    if (useMockData) {
       return loadMockedData();
    } else {
        return await loadDataFromServer();
    }
}

function loadMockedData() {
    return mockJson as Birthday[];
}

async function loadDataFromServer() {
    return await fetch(BIRTHDAYS_ROUTE, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then((result) => {
           return result;
        },
        (error) => {
            console.error('error: ', error);
        }
    )
}