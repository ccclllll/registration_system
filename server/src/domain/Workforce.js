/**
 * 医生排班
 */
module.exports = class Workforce {
  // am:计划看病人数，pm：下午计划看病人数，amNumber：上午已预约人数，
  constructor({
    date,
    doctor,
    preNumber,
    realNumber,
    office,
    timeQuantum
  }) {
    this.date = date;
    this.doctor = doctor;
    this.realNumber = realNumber;
    this.preNumber = preNumber;
    this.timeQuantum = timeQuantum;
    this.office = office;
  }
}