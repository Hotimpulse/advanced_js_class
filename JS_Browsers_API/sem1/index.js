const tableEl = document.createElement('table');
tableEl.setAttribute('id', 'table-wrapper');
document.body.appendChild(tableEl);
const tableHead = document.createElement('thead');
tableEl.appendChild(tableHead);
const tableBody = document.createElement('tbody');
tableEl.appendChild(tableBody);
const divWrapper = document.createElement('div');
document.body.appendChild(divWrapper);
divWrapper.setAttribute('id', 'main-wrapper');
divWrapper.append(tableEl);

let currentMembers = 0;

const loadData = async () => {
    try {
        if (!localStorage.getItem('data')) {
            const response = await fetch('./data.json');
            const data = await response.json();
            localStorage.setItem('data', JSON.stringify(data));
        }
    } catch (error) {
        console.error(error);
    }
}

const fetchData = () => {
    const localData = JSON.parse(localStorage.getItem('data')) || [];

    const tableHeaders = document.createElement('tr');
    tableHeaders.innerHTML = `
        <th>Занятия</th>
        <th>Время</th>
        <th>Макс. человек</th>
        <th>Человек записано</th>
        <th>Действие</th>
    `;

    tableHead.appendChild(tableHeaders);

    localData.forEach((obj, index) => {
        const objData = localData[index];

        currentMembers += objData ? objData.currentParticipants : obj.currentParticipants;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${obj.name}</td>
            <td>${obj.time}</td>
            <td>${obj.maxParticipants}</td>
            <td>${objData ? objData.currentParticipants : obj.currentParticipants}</td>
            <td>
                <button class="signup-btn" data-max="${obj.maxParticipants}" data-current="${objData ? objData.currentParticipants : obj.currentParticipants}">Sign up</button>
                <button class="cancel-btn">Cancel</button>
            </td>
            `;
        tableBody.append(row);

        const signUpBtn = row.querySelector('.signup-btn');
        const cancelBtn = row.querySelector('.cancel-btn');

        signUpBtn.addEventListener('click', () => {
            signUp(signUpBtn, cancelBtn, localData, index);
        });

        cancelBtn.addEventListener('click', () => {
            closeMembership(cancelBtn, signUpBtn, localData, index);
        });
    });
}

function signUp(signUpBtn, cancelBtn, data, index) {
    cancelBtn.style.display = 'flex';

    const maxParticipants = parseInt(signUpBtn.getAttribute('data-max'));
    let currentParticipants = parseInt(signUpBtn.getAttribute('data-current')) + 1;

    if (currentParticipants <= maxParticipants) {
        signUpBtn.setAttribute('data-current', currentParticipants);
        signUpBtn.parentElement.previousElementSibling.textContent = currentParticipants;

        if (currentParticipants === maxParticipants) {
            signUpBtn.classList.add('disabled');
        }
        data[index].currentParticipants = currentParticipants;
        updateLocalStorage(data);
    }
}

function closeMembership(cancelBtn, signUpBtn, data, index) {
    let currentParticipants = parseInt(cancelBtn.previousElementSibling.getAttribute('data-current')) - 1;

    signUpBtn.classList.remove('disabled');

    if (currentParticipants >= 0) {
        cancelBtn.previousElementSibling.setAttribute('data-current', currentParticipants);
        cancelBtn.parentElement.previousElementSibling.textContent = currentParticipants;

        if (currentParticipants === 0) {
            cancelBtn.style.display = 'none';
        }
        data[index].currentParticipants = currentParticipants;
        updateLocalStorage(data);
    }

}

function updateLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

loadData().then(() => {
    setTimeout(() => {
        fetchData();
    }, 0);
});