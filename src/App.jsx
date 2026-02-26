import { useState } from 'react'

function App() {
	const [tasks, setTasks] = useState([])
	const [openSection, setOpenSection] = useState({
		taskList: true,
		tasks: true,
		completedForm: true,
	})
	function toggleSection(section) {
		setOpenSection(prev => ({ ...prev, [section]: !prev[section] }))
	}

	function addTask(task) {
		setTasks([...tasks, { ...task, completed: false, id: Date.now() }])
	}

	const activeTasks = tasks.filter(task => !task.completed)
	const completedTasks = tasks.filter(task => task.completed)

	return (
		<div className='app'>
			<div className='task-container'>
				<h1>Task List with Priority</h1>
				<button
					className={`close-button ${openSection.taskList ? 'open' : ''}`}
					onClick={() => toggleSection('taskList')}
				>
					+
				</button>
				{openSection.taskList && <TaskForm addTask={addTask} />}
			</div>

			<div className='task-container'>
				<h2>Tasks</h2>
				<button
					className={`close-button ${openSection.tasks ? 'open' : ''}`}
					onClick={() => toggleSection('tasks')}
				>
					+
				</button>
				<div className='sort-controls'>
					<button className='sort-button'>By Date</button>
					<button className='sort-button'>By Priority</button>
				</div>
				{openSection.tasks && <TaskList activeTasks={activeTasks} />}
			</div>

			<div className='completed-task-container'>
				<h2>Completed Tasks</h2>
				<button
					className={`close-button ${openSection.completedForm ? 'open' : ''}`}
					onClick={() => toggleSection('completedForm')}
				>
					+
				</button>
				{openSection.completedForm && <CompletedTaskList />}
			</div>
			<Footer />
		</div>
	)
}

/// Тут компонент под форму
function TaskForm({ addTask }) {
	const [title, setTitle] = useState('')
	const [priority, setPriority] = useState('Low')
	const [deadline, setDeadline] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		if (title.trim() && deadline) {
			;(addTask({ title, priority, deadline }),
				setTitle(''),
				setPriority('Low'),
				setDeadline(''))
		}
	}

	return (
		<form action='' className='task-form' onSubmit={handleSubmit}>
			<input
				type='text'
				value={title}
				placeholder='Task Title'
				required
				onChange={e => setTitle(e.target.value)}
			/>
			<select value={priority} onChange={e => setPriority(e.target.value)}>
				<option value='High'>High</option>
				<option value='Medium'>Medium</option>
				<option value='Low'>Low</option>
			</select>
			<input
				type='datetime-local'
				required
				value={deadline}
				onChange={e => setDeadline(e.target.value)}
			/>
			<button type='submit'>Add Task</button>
		</form>
	)
}

/// Тут компонент подвторую форму
function TaskList({ activeTasks }) {
	//в этот массив мы передалаи activeTasks в котором незавершенный таски
	console.log(activeTasks)
	return (
		<ul className='task-list'>
			{activeTasks.map(task => (
				<TaskItem task={task} key={task.id} />
			))}
		</ul>
	)
}

/// Тут компонент выполненные задачи
function CompletedTaskList({ completedTasks }) {
	return <ul className='completed-task-list'>{/* <TaskItem /> */}</ul>
}

/// Тут мы делаем компоненты (элементы), которые будут в списке, который выше.
function TaskItem({ task }) {
	console.log()
	const { title, priority, deadline, id } = task
	return (
		<li className={`task-item ${priority.toLowerCase()}`}>
			<div className='task-info'>
				<div>
					{title} <strong>{priority}</strong>
				</div>
				<div className='task-deadline'>
					Due: {new Date(deadline).toLocaleString()}
				</div>
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
