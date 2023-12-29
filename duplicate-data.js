console.log('hello');
let newarray = JSON.parse(localStorage.getItem("demo29")) || [];
let isEdit = -1;

let deletedata = (index) => {
    const Delete = newarray.filter((item, ind) => ind !== index);
    newarray = Delete;
    localStorage.setItem("demo29", JSON.stringify(newarray));
    renderHtmlTable();
}

let editdata = (value) => {
    isEdit = value;
    const edit = newarray.find((item, ind) => ind === value);
    document.getElementById("names").value = edit.names;
    document.getElementById("email").value = edit.email;
    document.getElementById("pass").value = edit.pass;
    document.getElementById("cpass").value = edit.cpass;
    document.getElementById("phone").value = edit.phone;
}

let renderHtmlTable = () => {
    document.getElementById("table").innerHTML = newarray.map((item, index) => {
        return (
            `<tr>
            <td>${item.names}</td>
            <td>${item.email}</td>
            <td>${item.pass}</td>
            <td>${item.cpass}</td>
            <td>${item.phone}</td>
            <td><button onclick="editdata(${index})">Edit</button></td>
            <td><button onclick="deletedata(${index})">Delete</button></td>

            </tr>` 
        )
    }).join("")
}

renderHtmlTable();

function submit() {
    let names = document.getElementById("names").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;
    let phone = document.getElementById("phone").value;

    let student = {
        names: names,
        email: email,
        pass: pass,
        cpass: cpass,
        phone: phone,
    }

    console.log(student);

    if (isEdit !== -1) {
        const updatedData = newarray.map((item, index) => {
            if (index === isEdit) {
                return student
            }
            else {
                return item
            }
        })
        newarray = updatedData
        localStorage.setItem("demo29", JSON.stringify(updatedData));
    }
    // duplicate record
    else {
        let duplicatedata = newarray.some((item) => item.names === names || item.email === email || item.pass === pass || item.cpass === cpass || item.phone === phone);
        console.log("duplicatedata", duplicatedata);
        if (duplicatedata) {
            window.alert("Already exist data")
        }
        else {
            newarray.push(student);
            localStorage.setItem("studentinfo", JSON.stringify(newarray));
        }
    }
    renderHtmlTable();

}
renderHtmlTable();
function search() {
    let searchdata = document.getElementById("search").value;
    let student = newarray.filter((item, value) => item.names === searchdata || item.email === searchdata || item.pass === searchdata || item.cpass === searchdata || item.phone === searchdata);
    newarray = student;
    renderHtmlTable();
}   