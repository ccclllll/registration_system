/**
 * 医生排班
 */
module.exports = class Workforce {
  // am:计划看病人数，pm：下午计划看病人数，amNumber：上午已预约人数，
  constructor({
    date,
    doctor,
    am,
    pm,
    amNumber,
    pmNumber,
    office
  }) {
    this.date = date;
    this.doctor = doctor;
    this.am = am;
    this.pm = pm;
    this.amNumber = amNumber;
    this.pmNumber = pmNumber;
    this.office = office;
  }
}