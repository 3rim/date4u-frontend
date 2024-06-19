export default class AgeToDateUtil {
    static ageToDate(age: number): Date {
        const today = new Date();
        const year = today.getFullYear() - age;
        const month = today.getMonth();
        const day = today.getDate();

        // Create a new Date object with the calculated birthdate
        const birthdate = new Date(year, month, day);

        return birthdate;
    }
}