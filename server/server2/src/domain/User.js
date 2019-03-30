module.exports = class User{
  constructor({id,sex,name,bornDate,career,role,office,img,password}){
    this.id = id;
    this.sex = sex;
    this.name = name;
    this.bornDate = bornDate;
    this.career = career; // 职称
    this.role = role;
    this.office = office; // 科室
    this.img = img;
    this.password = password;
  }
}