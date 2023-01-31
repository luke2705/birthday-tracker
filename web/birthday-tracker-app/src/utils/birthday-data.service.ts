import mockJson from './mockData.json';
import { Birthday } from '../types/birthday';
import { BIRTHDAYS_ROUTE, REMINDERS_ROUTE } from './routes-constants';


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
        );
}

export async function postBirthdayReminders(phoneNumber: string, birthdayData: Birthday[]) {
    const payload = {
        phoneNumber,
        birthdayData
    };

    fetch(REMINDERS_ROUTE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(() => {
            console.log('success');
        },
        (error) => console.log('error: ', error)
        );
}