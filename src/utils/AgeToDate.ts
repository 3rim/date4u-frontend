export default class AgeToDateUtil {
    static ageToDate(age: number): string {
        const today = new Date();
        const year = today.getFullYear() - age;
        const month = today.getMonth(); // Note: months are zero-indexed in JavaScript Date
        const day = today.getDate();

        // Create a new Date object with the calculated birthdate
        const birthdate = new Date(year, month, day);

        // Format the date as yyyy-mm-dd
        const formattedDate = `${birthdate.getFullYear()}-${(birthdate.getMonth() + 1).toString().padStart(2, '0')}-${birthdate.getDate().toString().padStart(2, '0')}`;
        //console.log(formattedDate);
        return formattedDate;
    }
}