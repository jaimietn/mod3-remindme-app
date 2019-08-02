const BASE_URL = "http://localhost:3000"
const USERS_URL = "http://localhost:3000/users"
const TASKS_URL = "http://localhost:3000/tasks"
const loginForm = document.querySelector('#login-form')
const navBar = document.querySelector('#navbar')
const taskForm = document.querySelector('.task-form')
const listBox = document.querySelector('.list-box')
const taskNameField = document.querySelector('#new-task-name')
const taskDescriptionField = document.querySelector('#new-task-description')
const taskDueField = document.querySelector('#due-menu')
let currentUserId = null

//end global vars

loginForm.addEventListener('click', (e) => {
	e.preventDefault()
	if (e.target.id === 'login-btn') {
		addUser(e)
	}
})

function addUser(e) {
	const newUser = e.target.previousElementSibling.value
	fetch(`${USERS_URL}`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		},
	body: JSON.stringify({
		name: newUser
		})
	})
	.then(resp => resp.json())
	.then(newUserObject => {
		document.querySelector('#user-greeting').innerHTML = ` <div id="user-greeting">
			<h3> Hi, ${newUserObject.name}!</h3>
			<p hidden>${newUserObject.id}</p>
		</div>`
		currentUserId = newUserObject.id
		console.log(newUserObject.id)
		console.log(currentUserId)
	})
}

//function to add task
taskForm.addEventListener('click', (e) => {
	e.preventDefault()
	const newTaskName = e.target.parentElement.querySelector('#new-task-name').value
	const newTaskDescription = e.target.parentElement.querySelector('#new-task-description').value
	const newTaskDue = e.target.parentElement.querySelector('#due-menu').value
	if (e.target.id === 'submit-btn') {
		// console.log(e.target)
		// debugger
		document.querySelector('.list-box').innerHTML =`
		<ul> <strong> New Task:</strong>
			<p> <strong> ${newTaskName} </strong> </p>
			<p> Due: ${newTaskDue} </p>
			<p> ${newTaskDescription} </p>
		</ul>
		`
		addListItem(e)
	}
})

function addListItem(e) {
	const newTaskName = e.target.parentElement.querySelector('#new-task-name').value
	const newTaskDescription = e.target.parentElement.querySelector('#new-task-description').value
	const newTaskDue = e.target.parentElement.querySelector('#due-menu').value

	fetch(`${TASKS_URL}`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		},
	body: JSON.stringify({
		title: newTaskName,
		description: newTaskDescription,
		due: newTaskDue,
		completed: 'false',
		user_id: currentUserId,
		})
	})
}

navBar.addEventListener('click', (e) => {
	getUserTasks(e.target.id)
})
	// showFilteredTasks(e.target.id)
	// if (e.target.id === 'today') {
	// 	console.log("today!")
	// 	getUserTasks(currentUserId)
	// }
	// if (e.target.id === 'week') {
	// 	console.log("week!")
	// }
	// if (e.target.id === 'month') {
	// 	console.log("month!")
	// }
	// if (e.target.id === 'year') {
	// 	console.log("year!")
	// }
	// if (e.target.id === 'life') {
	// 	console.log("life!")
	// }

// function showFilteredTasks(timePeriod){
// 	getUserTasks(currentUserId)
// 	if (timePeriod === ){
//
// 	}
// }
function getUserTasks(dueDate) {
	fetch(`${USERS_URL}/${currentUserId}`)
	.then(resp => resp.json())
	.then(currentUserObject => showTasks(currentUserObject, dueDate))
}

function showTasks(currentUserObject, dueDate) {
	listBox.innerHTML = ''
	const filteredTasks = currentUserObject.data.attributes.tasks.filter(task => task.due === dueDate)
	console.log(filteredTasks)
	filteredTasks.forEach(task => addSingleTaskToPage(task))
}

function addSingleTaskToPage(task) {
  listBox.innerHTML += `
	<ul>
		<li> <strong> ${task.title} </strong> </li>
		<p> ${task.description} </p>
		<p hidden> ${task.due}</p>
		<p hidden> ${task.id}</p>
		<p> <button data-id=${task.id} id="delete" class="delete-btn"> Delete </button> </p>
	</ul>
	<br>
  `
}

listBox.addEventListener('click', (e) => {
	if (e.target.id === 'delete') {
		// debugger
		e.target.parentElement.parentElement.remove()
		deleteItem(e)
	}
})

function deleteItem(e) {
	fetch(TASKS_URL + '/' + e.target.dataset.id, {
		method: 'DELETE'
	})
}
