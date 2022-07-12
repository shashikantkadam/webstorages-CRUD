let updatebtn = document.getElementById('update')
let submitbtn = document.getElementById('submit')
let fname = document.getElementById("first-name")
let lname = document.getElementById("last-name")
let Email = document.getElementById ("Email")
let contact = document.getElementById("contact");
let StudentForm = document.getElementById("studentForm")
let stdInfo = document.getElementById("stdInfo")

let stdArray =[];

if(getDataFromLs()){
    stdArray = getDataFromLs();
    templeting(stdArray);
 }

 function getDataFromLs(){
    return JSON.parse(localStorage.getItem('studentInfo'))
 }

StudentForm.addEventListener('submit',onsubmitHandler)




function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
} 

function onsubmitHandler(e){
    e.preventDefault()
    let obj ={
        fname : fname.value,
        lname : lname.value,
        Email : Email.value,
        contact: contact.value,
        id : uuidv4(),
    }
    
    stdArray.push(obj);
    localStorage.setItem('studentInfo',JSON.stringify(stdArray))
    console.log(stdArray)
    templeting(stdArray);
    StudentForm.reset();
    console.log(e.classList)
  
}

function templeting(arr){
    let result ="";
    arr.forEach((element,i) => {
        result +=`
            <tr>
                <td>${i+1}
                <td>${element. fname}</td>
                <td>${element. lname}</td>
                <td>${element. Email}</td>
                <td>${element. contact}</td>
                <td><button class="btn btn-success" data-id="${element.id}" onclick="onEditHandler(this)">Edit</button></td>
                <td><button class="btn btn-danger"  data-id="${element.id}" onclick="onDeleteHandler(this)">Delete</button></td>
            </tr>
        `
    });
    stdInfo.innerHTML = result;
};

  
 //stdArray = JSON.parse(localStorage.getItem('studentInfo'))
function onEditHandler(ele){
   // console.log(ele.dataset.id)
   let getId = ele.dataset.id;
   localStorage.setItem('setId',getId)
   let getLocaldata = getDataFromLs();
 //  console.log(getLocaldata)
    let getobj = getLocaldata.filter(e => e.id == getId)
  //  console.log(getobj)
  fname.value = getobj[0].fname,
  lname.value = getobj[0].lname,
  Email.value = getobj[0].Email,
  contact.value = getobj[0].contact

  updatebtn.classList.remove('d-none');
  submitbtn.classList.add('d-none')

}
updatebtn.addEventListener('click',updateHandler)

function updateHandler(){
    //console.log('updating..')
    let getId = localStorage.getItem('setId');
    console.log(getId)
    let getLocaldata = getDataFromLs();
    getLocaldata.forEach(ele =>{
        if(ele.id == getId){
           ele.fname = fname.value,
            ele.lname = lname.value,
            ele.Email = Email.value,
            ele.contact = contact.value
        }
    })
    localStorage.setItem('studentInfo',JSON.stringify(getLocaldata));
    templeting(getLocaldata);
    StudentForm.reset();
    updatebtn.classList.add('d-none');
    submitbtn.classList.remove('d-none')
}
 function onDeleteHandler(ele){
   // console.log('delete')
   let getId = ele.dataset.id;
  // console.log(getId)
   let getLocaldata = getDataFromLs()
    let newLocaldata = getLocaldata.filter(e => {
        return e.id !== getId 
    })
    templeting(newLocaldata)
    localStorage.setItem('studentInfo',JSON.stringify(newLocaldata));
        
} 
/* 
  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }  */
   