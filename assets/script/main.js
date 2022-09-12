import axios from 'axios';

async function getGroupStudents() {
    let students = await axios.get("/assets/data/StudentList/students.json")
        .then(response => response.data)
        .catch(error => console.log(error));

    const result = Object.values(students);
    let studentGroups = [];
    result.forEach(student => {
        studentGroups.push(student);
    });
    let groups = [...new Set(studentGroups.map(item => item.group))];
    for (let i in groups) {
        filterByGroupName(result, groups[i]);
    }
}

function filterByGroupName(students, groupName) {
    let groupStudents = [];
    let groupOfStudents = {
        group: groupName,
    }
    students.forEach(student => {
        if (student.group === groupName) {
            groupStudents.push(student.name);
            groupOfStudents.students = groupStudents;
            if (student.type === 'assistant') {
                groupOfStudents.asistant = student.name;
            }
        }
    });
    console.log(groupOfStudents);
    showGroupsToUI(groupOfStudents.group, groupOfStudents.asistant, Object.values(groupOfStudents.students).join('<br/>'));
}

function showGroupsToUI(groupName, asistantName, studentName) {
    document.querySelector('#root').innerHTML += `
        <div class="col-md-4 mt-3" >
            <div class="card" style="height: 30rem;">
                <div class="card-body">
                    <h5 class="card-title" id="group-name"> ${groupName} </h5>
                    <ul class="list-group">
                        <li class="list-group-item">${studentName}</li>
                    </ul>
                    <p class="mt-2"><strong>Asistant: </strong> <small> ${asistantName} </small></p>
                </div>
            </div>
        </div>
    `
}

getGroupStudents();
