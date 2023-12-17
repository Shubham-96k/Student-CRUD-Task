const cl = console.log;

const submtform = document.getElementById('stdform');
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
const submtbtn = document.getElementById("submtbtn");
const updatebtn = document.getElementById("updatebtn");
const tbody = document.getElementById("tbody");


let stdArray = JSON.parse(localStorage.getItem("stdinfo")) || [];

const onEdit = eve => {
    let getId = eve.closest("tr").id;
    localStorage.setItem("editId", getId)
    let getobj = stdArray.find(ele => ele.stdId === getId);
    fnameControl.value = getobj.fname;
    lnameControl.value = getobj.lname;
    emailControl.value = getobj.email;
    contactControl.value = getobj.contact; 
    submtbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
}

const onUpdate = () => {
    let getid = localStorage.getItem("editId");
    stdArray.forEach(std => {
        if(std.stdId === getid){
            std.fname = fnameControl.value,
            std.lname = lnameControl.value,
            std.email = emailControl.value,
            std.contact = contactControl.value
        }
    })
    localStorage.setItem("stdinfo",JSON.stringify(stdArray));
    let gettr = [...document.getElementById(getid).children];
    gettr[1].innerHTML = fnameControl.value;
    gettr[2].innerHTML = lnameControl.value;
    gettr[3].innerHTML = emailControl.value;
    gettr[4].innerHTML = contactControl.value;
    submtform.reset();
    submtbtn.classList.remove('d-none');
    updatebtn.classList.add('d-none');
}

const onRemove = eve => {
    let getconfirmation = confirm('Are you sure!!! you want to remove this student.');
    if(getconfirmation){
        let getid = eve.closest("tr").id;
        let getindex = stdArray.findIndex(std => std.stdId === getid);
        stdArray.splice(getindex,1);
        localStorage.setItem("stdinfo",JSON.stringify(stdArray));
        document.getElementById(getid).remove();
    }else{
        return;
    }
}

const stdTemplating = eve => {
    let result = " ";
    eve.forEach((std,i) => {
        result += `
                    <tr id="${std.stdId}">
                        <td>${i + 1}</td>
                        <td>${std.fname}</td>
                        <td>${std.lname}</td>
                        <td>${std.email}</td>
                        <td>${std.contact}</td>
                        <td>
                            <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" onclick="onRemove(this)">Delete</button>
                        </td>
                    </tr>
        `
    })
    tbody.innerHTML = result;
}

stdTemplating(stdArray);

const onSubmit = eve => {
    eve.preventDefault();
    let createobj = {
        fname : fnameControl.value,
        lname : lnameControl.value,
        email : emailControl.value,
        contact : contactControl.value,
        stdId : uuidv4()
    }
    stdArray.push(createobj);
    localStorage.setItem('stdinfo',JSON.stringify(stdArray));
    stdTemplating(stdArray);
    eve.target.reset();

}



submtform.addEventListener('submit', onSubmit);
updatebtn.addEventListener('click', onUpdate);

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  