import { useState } from 'react'

function App() {
	const [tasks, setTasks] = useState([])
	const [openSection, setOpenSection] = useState({
		taskList: true,
		tasks: true,
		completedForm: true,
	})

	const [sortType, setSortType] = useState('date')
	const [sortOrder, setSortOrder] = useState('asc')

	function toggleSection(section) {
		setOpenSection(prev => ({ ...prev, [section]: !prev[section] }))
	}

	function addTask(task) {
		setTasks([...tasks, { ...task, completed: false, id: Date.now() }])
	}

	function deleteTask(id) {
		setTasks(tasks.filter(task => task.id !== id))
	}

	function completeTask(id) {
		setTasks(
			tasks.map(task => (task.id === id ? { ...task, completed: true } : task)),
		)
	}

	function sortTask(tasks) {
		return tasks.slice().sort((a, b) => {
			if (sortType === 'priority') {
				const priorityOrder = { High: 1, Medium: 2, Low: 3 }
				return sortOrder == 'asc'
					? priorityOrder[a.priority] - priorityOrder[b.priority]
					: priorityOrder[b.priority] - priorityOrder[a.priority]
			} else {
				return sortOrder == 'asc'
					? new Date(a.deadline) - new Date(b.deadline)
					: new Date(b.deadline) - new Date(a.deadline)
			}
		})
	}

	function toggleSortOrder(type) {
		if (sortType === type) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortType(type)
			setSortOrder('asc')
		}
	}

	const activeTasks = sortTask(tasks.filter(task => !task.completed))
	const completedTasks = tasks.filter(task => task.completed)

	console.log(completedTasks)

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
					<button
						className={`sort-button ${sortType === 'date' ? 'active' : ''}`}
						onClick={() => toggleSortOrder('date')}
					>
						By Date{' '}
						{sortType === 'date' && (sortOrder === 'asc' ? '\u2191' : '\u2193')}
					</button>
					<button
						className={`sort-button ${sortType === 'priority' ? 'active' : ''}`}
						onClick={() => toggleSortOrder('priority')}
					>
						By Priority{' '}
						{sortType === 'priority' &&
							(sortOrder === 'asc' ? '\u2191' : '\u2193')}
					</button>
				</div>
				{openSection.tasks && (
					<TaskList
						completeTask={completeTask}
						deleteTask={deleteTask}
						activeTasks={activeTasks}
					/>
				)}
			</div>

			<div className='completed-task-container'>
				<h2>Completed Tasks</h2>
				<button
					className={`close-button ${openSection.completedForm ? 'open' : ''}`}
					onClick={() => toggleSection('completedForm')}
				>
					+
				</button>
				{openSection.completedForm && (
					<CompletedTaskList
						deleteTask={deleteTask}
						completedTasks={completedTasks}
					/>
				)}
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
function TaskList({ activeTasks, deleteTask, completeTask }) {
	//в этот массив мы передалаи activeTasks в котором незавершенный таски
	console.log(activeTasks)
	return (
		<ul className='task-list'>
			{activeTasks.map(task => (
				<TaskItem
					completeTask={completeTask}
					deleteTask={deleteTask}
					task={task}
					key={task.id}
				/>
			))}
		</ul>
	)
}

/// Тут компонент выполненные задачи
function CompletedTaskList({ completedTasks, deleteTask }) {
	return (
		<ul className='completed-task-list'>
			{completedTasks.map(task => (
				<TaskItem key={task.id} task={task} deleteTask={deleteTask} />
			))}
		</ul>
	)
}

/// Тут мы делаем компоненты (элементы), которые будут в списке, который выше.
function TaskItem({ task, deleteTask, completeTask }) {
	const { title, priority, deadline, id, completed } = task
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
				{completed !== true ? (
					<button className='complete-button' onClick={() => completeTask(id)}>
						Complete
					</button>
				) : null}
				<button className='delete-button' onClick={() => deleteTask(id)}>
					Delete
				</button>
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
