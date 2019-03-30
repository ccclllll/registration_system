
let xhr = new XMLHttpRequest();
xhr.open('post','http://localhost:8088/api/workforce');
xhr.setRequestHeader('Content-Type','application/json');
xhr.send({
  date:20190327,
  am:15,
  pm:10,
  amNumber:5,
  pmNumber: 10,
  office: 1,
  doctor:111112
})
xhr.onload = function(e){
  console.log(e)
}