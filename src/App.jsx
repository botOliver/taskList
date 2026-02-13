function App() {
	return (
		<div className='app'>
			<div className='task-container'>
				<h1>Task List with Priority</h1>
				<button className='close-button'>+</button>
				<TaskForm />
			</div>

			<div className='task-container'>
				<h2>Tasks</h2>
				<button className='close-button'>+</button>
				<div className='sort-controls'>
					<button className='sort-button'>By Date</button>
					<button className='sort-button'>By Priority</button>
				</div>
				<TaskList />
			</div>

			<div className='completed-task-container'>
				<h2>Completed Tasks</h2>
				<button className='close-button'>+</button>
				<CompletedTaskList />
			</div>
			<Footer />
		</div>
	)
}

/// Тут компонент под форму
function TaskForm() {
	return (
		<form action='' className='task-form'>
			<input type='text' value={''} placeholder='Task Title' required />
			<select value={''}>
				<option value='High'>High</option>
				<option value='Mediun'>Mediun</option>
				<option value='Low'>Low</option>
			</select>
			<input type='datetime-local' required value={''} />
			<button type='submit'>Add Task</button>
		</form>
	)
}

/// Тут компонент подвторую форму
function TaskList() {
	return (
		<ul className='task-list'>
			<TaskItem />
		</ul>
	)
}

/// Тут компонент выполненные задачи
function CompletedTaskList() {
	return (
		<ul className='completed-task-list'>
			<TaskItem />
		</ul>
	)
}

/// Тут мы делаем компоненты (элементы), которые будут в списке, который выше.
function TaskItem() {
	return (
		<li className='task-item'>
			<div className='task-info'>
				<div>
					Title <strong>Medium</strong>
				</div>
				<div className='task-deadline'>Due: {new Date().toLocaleString()}</div>
			</div>
			<div className='task-buttons'>
				<button className='complete-button'>Complete</button>
				<button className='delete-button'>Delete</button>
			</div>
		</li>
	)
}

function Footer() {
	return (
		<footer className='footer'>
			<p>Technologies</p>
		</footer>
	)
}

export default App
