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

    students.filter(function (filterAsis) { filterAsis.type === "assistant" && filterAsis.group === groupName ? groupOfStudents.asistant = filterAsis.name : null })
    students.filter(function (filterGroup) { filterGroup.group === groupName ? groupStudents.push(filterGroup.name) : null })
    groupOfStudents.students = groupStudents;

    console.log(groupOfStudents);
    const studentsInGroup = Object.values(groupOfStudents.students).join('<br/>')
    showGroupsToUI(groupOfStudents.group, groupOfStudents.asistant, studentsInGroup);
}

function showGroupsToUI(groupName, asistantName, studentName) {
    document.querySelector('#root').innerHTML += `
        <div class="card" >
            <div>
                <div class="card-body" >
                    <h2> ${groupName} </h2>
                    <ul>
                        <li>${studentName}</li>
                    </ul>
                    <p><strong>Asistant: </strong> <small> ${asistantName} </small></p>
                </div>
            </div>
        </div>
    `
}

getGroupStudents();
