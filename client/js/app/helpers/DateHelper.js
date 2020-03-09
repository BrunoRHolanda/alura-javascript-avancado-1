
class DateHelper {

    static toDate(date) {
        let [ano, mes, dia] = date.split('-');

        return new Date(ano, mes - 1, dia);
    }

    static toText(date) {
        return date.getDay() + '/' + (date.getMonth() + 1) + "/" + date.getYear();
    }
}
