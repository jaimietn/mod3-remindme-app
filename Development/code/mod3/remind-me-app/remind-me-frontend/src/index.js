const BASE_URL = "http://localhost:3000"
const USERS_URL = "http://localhost:3000/users"
const TASKS_URL = "http://localhost:3000/tasks"
const loginForm = document.querySelector('#login-form')
const navBar = document.querySelector('#navbar')
const listShow = document.querySelector('.show-list')

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
	.then(console.log)
}

navBar.addEventListener('click', (e) => {
	if (e.target.id === 'add-task') {
		console.log("add task!")

	}
	if (e.target.id === 'today') {
		console.log("today!")
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

//function to add task
listShow.addEventListener('click', (e) => {
	e.preventDefault()
	if (e.target.id === 'submit-btn') {
		console.log(e.target)
	}
})
