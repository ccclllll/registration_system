/**
 * 挂号单
 */
module.exports = class Registration {
  //date :就诊时间
  constructor({office,doctor,date,patientId,workforce}){
    this.office = office;
    this.doctor = doctor;
    this.date = date;
    this.patientId = patientId;
    this.workforce = workforce;
  }
}