//请假条
module.exports = class Bill{
  constructor({id,patient,doctor,days,reaseon,state,date,workforce,startDate,endDate}){
    this.id = id;
    this.patient = patient;
    this.doctor = doctor;
    this.days = days;
    this.reaseon = reaseon;
    this.state = state;
    this.date = date;
    this.workforce = workforce,
    this.startDate = startDate;
    this.endDate = endDate;
  }
}