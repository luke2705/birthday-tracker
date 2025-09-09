export type Birthday = {
    name: string;
    birthday: string;
    precedingDaysForReminder?: number;
    reminderEnabled?: boolean;
}

export const serverlessBirthdays: Birthday[] = [
    { name: 'Cass', birthday: '2018-09-20T00:00:00.000Z' },
    { name: 'Kade', birthday: '2019-04-18T00:00:00.000Z' },
    { name: 'Owen', birthday: '2020-03-09T00:00:00.000Z' },
    { name: 'Troy', birthday: '2020-07-07T00:00:00.000Z' },
    { name: 'Trevor', birthday: '2020-11-29T00:00:00.000Z' },
    { name: 'Finley', birthday: '2021-08-25T00:00:00.000Z' },
    { name: 'Chloe', birthday: '2023-02-13T00:00:00.000Z' },
    { name: 'Quinn', birthday: '2025-04-25T00:00:00.000Z' },
    { name: 'Zoey', birthday: '2025-09-08T00:00:00.000Z' },
];

