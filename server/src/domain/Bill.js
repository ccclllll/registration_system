//请假条
module.exports = class Bill{
  constructor({patient,doctor,registration,beginDate,endDate}){
    this.patient = patient;
    this.doctor = doctor;
    this.registration = registration;
    this.beginDate = beginDate;
    this.endDate = endDate;
  }
}