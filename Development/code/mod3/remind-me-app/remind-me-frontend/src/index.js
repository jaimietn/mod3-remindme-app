const BASE_URL = "http://localhost:3000"
const USERS_URL = "http://localhost:3000/users"
const TASKS_URL = "http://localhost:3000/tasks"
const loginForm = document.querySelector('#login-form')
const navBar = document.querySelector('#navbar')
const taskForm = document.querySelector('.task-form')
const listBox = document.querySelector('.list-box')
let currentUserId = null

//end global vars

loginForm.addEventListener('click', (e) => {
	e.preventDefault()
	if (e.target.id === 'login-btn') {
		console.log('logged in!')
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
		//need to add real user id
		})
	})
	// .then(resp => resp.json())
	// .then(newTaskObject => {
	// 	document.querySelector('.list-box').innerHTML =`
	// 	  <li> ${newTaskName} </li>
	// 		<li> ${newTaskDescription} </li>
	// 		<li> ${newTaskDue} </li>
	// 		`
	// })
}

navBar.addEventListener('click', (e) => {
	if (e.target.id === 'today') {
		console.log("today!")
		getUserTasks(currentUserId)
	}
	if (e.target.id === 'week') {
		console.log("week!")
	}
	if (e.target.id === 'month') {
		console.log("month!")
	}
	if (e.target.id === 'year') {
		console.log("year!")
	}
	if (e.target.id === 'life') {
		console.log("life!")
	}
	if (e.target.id === 'reminders') {
		console.log("reminders!")
	}
	if (e.target.id === 'profile') {
		console.log("profile!")
	}
})

function getUserTasks(currentUserId) {
	fetch(`${USERS_URL}/${currentUserId}`)
	.then(resp => resp.json())
	.then(currentUserObject => showTasks(currentUserObject))
}

function showTasks(currentUserObject) {
	currentUserObject.data.attributes.tasks.forEach(task => addSingleTaskToPage(task))
}

function addSingleTaskToPage(task) {
  listBox.innerHTML += `
		<p> <strong> ${task.name} </strong> </p>
		<p> ${task.description} </p>
		<p> ${task.escription} </p>
		<p hidden> ${task.id}</p>
		<p> <button id="delete" class="delete-btn"> Delete </button> </p>
  `
}

// newUserObject => {
// 	document.querySelector('#user-greeting').innerHTML = ` <div id="user-greeting">
// 		<h3> Hi, ${newUserObject.name}!</h3>
// 		<p hidden>${newUserObject.id}</p>
// 	</div>`
// })
// }
