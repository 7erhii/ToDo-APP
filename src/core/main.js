const wrapper = document.querySelector('.js-themeChange');
const inputBtn = document.querySelector('#js-input-btn');
const tasksList = document.querySelector('.js-tasks__list');
const colorBtn = document.querySelector('.js-color__change');
const body = document.querySelector('body');
// const content = document.querySelector('.content');
const pinButton = document.getElementById('js-input-btn');
const tasksForm = document.querySelector('.js-inpute-form');

let taskToEditId = null;
const selectedTasksArr = []; // сохраняем выбранные селектед таск
const closeErrorMessage = document.getElementById('js-error');
const closeErrorWindow = document.querySelector('.js-error-form');
//окно ошибки
const createTask = document.getElementById('js-addTask');
//создание жлемента на странице
const infoBlock = document.querySelector('.js-info');
const clearAllTasksBtn = document.querySelector('.js-clear__btn');
const clearOnlyCheckedBtn = document.querySelector('.js-clearChecked');

let tasksArr = [];
//массив задач
const taskMock = { id: 'asdas', value: '', status: 'inprogress', time: 3600 };

function errorController(message) {
	console.log('message');
	// display block на элемент нотифакации
	// в див сообщение message
}

const editeTaskParrent = document.querySelector('.js-tasks__list');
//редактирование задач
const editTask = document.querySelector('.js-active-edite-btn');
// //редактрирование задачи
const showPopup = document.querySelector('.js-popup');
//popup показать
const closePopup = document.querySelector('.js-popup__close');
//закрыть popup
const acceptPopup = document.querySelector('.js-popup__accept');
//принять изменения
const takeCorrTask = document.querySelector('.js-popup__input');
takeCorrTask.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		acceptNew(e);
	}
});
//взять текст из popup
const tasksCount = document.querySelector('.js-descr__count');
//количество отображенных задач

//количество выполненных задач

const addClearCheckedBtn = document.querySelector('.js-clear__checked');
//кнопка удаления выбранных элементов

const timerApear = document.querySelector('.js-task__counter-timer');

const titleText = document.querySelector('.header__title-text-main');

//______________CLICK
pinButton.addEventListener('click', addNewTask); //клик >add >проверяем поле воода
tasksForm.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		addNewTask(e);
	}
}); // при нажатии на Enter
closeErrorMessage.addEventListener('click', closeError); // закрытие окна ошибки
clearAllTasksBtn.addEventListener('click', clearAllTasks); //кнопка закрыть все
editeTaskParrent.addEventListener('click', openPopup);
editeTaskParrent.addEventListener('click', changeStatus);
// когда карточка div вмонитрованна в страницу добавляем ивент на удаление
createTask.addEventListener('click', deliteOneTask); //клик >add>delite 1 task

//_____________CLICKS END______

function uuidv4() {
	return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function formatSeconds(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const formattedSeconds =
		remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
	return `${formattedMinutes}:${formattedSeconds}`;
}

//добавление новой задачи

function addNewTask(e) {
	e.preventDefault();

	if (tasksForm.value === '') {
		// closeErrorWindow.classList.remove('header__title-text-error');
		closeErrorWindow.classList.add('header__title-text-error-active');
	} else {
		const taskId = uuidv4();
		const inputText = tasksForm.value;
		const taskObj = {
			id: taskId,
			value: inputText,
			time: 0,
		};
		tasksArr.push(taskObj);
		tasksForm.value = '';
		const currentTask = tasksArr.find((item) => item.id === taskId);

		infoBlock.classList.add('js-visibility-hide');

		const taskHtml = `
			<div class="task__active task__style js-tasks__active js-task-${currentTask.id}" data-blockId="${taskId}" id="active">

				<a class="task__active-counter js-task__counter" href="#">
				    <span class="start-text" style="display: block;">start</span>
				    <span class="pause-text" style="display:none;">pause</span>
				</a>
				<div class="task__active-timer js-task__counter-timer"> 00:00</div>

				<div class="task__active-text">
					${inputText}
				</div>
				<div class="task__active-check">

					<button class="task__active-check-btn" data-iddd="${taskId}">
						Delete
					</button>
					<button
					class="task__active-edite-btn js-active-edite-btn js-editeBtn"
					data-iddd="${taskId}"
					id="editeBtn"
				>
					Edit
				</button>
					<input class="task__active-check-check js-task__active-check" type="checkbox"  />
					<label class="task__active-check-label" for="task-active-check"></label>
				</div>
			</div>
		`;

		createTask.insertAdjacentHTML('afterbegin', taskHtml);

		const startButton = document.querySelector(
			`[data-blockId="${taskId}"] .js-task__counter`
		);
		const startText = startButton.querySelector('.start-text');
		const pauseText = startButton.querySelector('.pause-text');

		let isRunTimer = false;
		let timerInterval = null;

		const updateTaskTime = () => {
			currentTask.time += 1;
			const formattedTime = formatSeconds(currentTask.time);
			const timer = document.querySelector(
				`.js-task-${currentTask.id} .js-task__counter-timer`
			);
			timer.innerHTML = formattedTime;
		};

		startButton.addEventListener('click', (e) => {
			e.preventDefault();
			if (!isRunTimer) {
				isRunTimer = true;
				startText.style.display = 'none';
				pauseText.style.display = 'block';
				timerInterval = setInterval(updateTaskTime, 1000);
			} else {
				console.log('pause Timer');
				isRunTimer = false;
				startText.style.display = 'block';
				pauseText.style.display = 'none';
				clearInterval(timerInterval);
			}
		});

		clearAllTasksBtn.classList.remove('js-visibility-hide');
		clearAllTasksBtn.classList.add('js-visibility-appear');

		countOfTasks();
		const formColor = document.querySelector('.js-tasks__active');
		const wrapper = document.querySelector('.wrapper');

		if (wrapper.classList.contains('js-color__content')) {
			const taskCard = document.querySelector(`[data-blockId="${taskId}"]`);
			taskCard.classList.add('task__style-dark');
		}
		closeErrorWindow.classList.remove('header__title-text-error-active');
	}
}

//============CHECK KOLOR
function changeTaskColor() {
	const taskColor = document.querySelectorAll();
}

function closeError(e) {
	e.preventDefault;
	closeErrorWindow.classList.remove('js-visibility-appear');
}

function clearAllTasks(e) {
	e.preventDefault();
	tasksArr = [];
	createTask.innerHTML = '';
	clearAllTasksBtn.classList.remove('js-visibility-appear');

	clearAllTasksBtn.classList.add('js-visibility-hide');

	infoBlock.classList.remove('js-visibility-hide');

	infoBlock.classList.add('js-visibility-appear');

	addClearCheckedBtn.classList.remove('js-visibility-appear');

	addClearCheckedBtn.classList.add('js-visibility-hide');

	clearOnlyCheckedBtn.classList.remove('js-visibility-appear');
	addClearCheckedBtn.classList.add('js-visibility-hide');

	countOfTasks();
}

// +=================================================stsrt
closePopup.addEventListener('click', function (e) {
	e.preventDefault();

	showPopup.style.display = 'none';
});

//___________________________________________________

function pushCorrText() {
	return takeCorrTask.value;
}

//Добавлениее количества задач (числом)
function countOfTasks() {
	if (tasksArr.length === 0) {
		tasksCount.innerHTML = 'Today: No tasks &#128564;';
	} else {
		tasksCount.innerHTML = `Today: ${tasksArr.length}`;
	}
}

countOfTasks();

function findTaskObject(idToFind) {
	return tasksArr.find((item) => item.id === idToFind);
}

function changeStatus(e) {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	let isChecked = false;
	const checkbox = e.target.closest('.js-task__active-check');
	const parent = checkbox.closest('.js-tasks__active');
	const selectedTask = findTaskObject(parent.dataset.blockid);

	if (checkbox) {
		if (!wrapper.classList.contains('js-color__content')) {
			if (checkbox.checked) {
				parent.classList.remove('task__style');
				parent.classList.add('task__style-checked');

				checkbox.setAttribute('checked', 'checked');
			} else {
				parent.classList.remove('task__style-checked');
				parent.classList.add('task__style');

				console.log(selectedTask, 'unSelectedTask');
				checkbox.removeAttribute('checked');
			}

			for (let i = 0; i < checkboxes.length; i++) {
				if (checkboxes[i].checked) {
					isChecked = true;
					break;
				}
			}
			if (isChecked) {
				addClearCheckedBtn.classList.remove('js-visibility-hide');
				addClearCheckedBtn.classList.add('js-visibility-appear');
			} else {
				addClearCheckedBtn.classList.remove('js-visibility-appear');
				addClearCheckedBtn.classList.add('js-visibility-hide');
			}
		} else if (wrapper.classList.contains('js-color__content')) {
			parent.style.background = '#171616';
			if (checkbox.checked) {
				parent.style.color = '#fff';
				parent.classList.remove('task__style');
				parent.classList.remove('task__style-dark');
				parent.classList.add('task__style-dark-checked');
				checkbox.setAttribute('checked', 'checked');
			} else {
				parent.style.color = '#fff';
				parent.style.background = '#171616';
				parent.classList.remove('task__style');
				parent.classList.remove('task__style-dark-checked');
				parent.classList.add('task__style-dark');
				checkbox.setAttribute('checked', 'disabled');
			}
			for (let i = 0; i < checkboxes.length; i++) {
				if (checkboxes[i].checked) {
					isChecked = true;
					break;
				}
			}
			if (isChecked) {
				addClearCheckedBtn.classList.remove('js-visibility-hide');
				addClearCheckedBtn.classList.add('js-visibility-appear');
			} else {
				addClearCheckedBtn.classList.remove('js-visibility-appear');
				addClearCheckedBtn.classList.add('js-visibility-hide');
			}
		}
		{
		}
	}
}

//===========================================================

function openPopup(e) {
	if (e.target.classList.contains('js-editeBtn')) {
		e.preventDefault();
		taskToEditId = e.target.dataset.iddd;
		showPopup.style.display = 'flex';
		const inputPopup = document.querySelector('.js-popup__input');
		const editValue = findTaskObject(taskToEditId);
		inputPopup.value = editValue.value;

		inputPopup.focus();
	}
}

acceptPopup.addEventListener('click', acceptNew);

function acceptNew(e) {
	e.preventDefault();
	const inputPopup = document.querySelector('.js-popup__input');
	const updateTaskArray = tasksArr.map((item) => {
		if (item.id === taskToEditId) {
			return {
				id: taskToEditId,
				value: inputPopup.value,
			};
		} else {
			return item;
		}
	});
	tasksArr = updateTaskArray;

	const taskTextElement = document.querySelector(
		`[data-blockId="${taskToEditId}"] .task__active-text`
	);
	taskTextElement.innerHTML = inputPopup.value;
	showPopup.style.display = 'none';
	timeCounter(e);
}

function deliteOneTask(e) {
	const deleteBtn = e.target.closest('.task__active-check-btn');
	if (deleteBtn) {
		e.preventDefault();
		const taskId = deleteBtn.dataset.iddd;
		tasksArr = tasksArr.filter((task) => task.id !== taskId);
		const blockToDelete = document.querySelector(`[data-blockId="${taskId}"]`);
		if (blockToDelete) {
			blockToDelete.remove();
			countOfTasks(); // удаляем задачу со страницы
		}
	}
}

clearOnlyCheckedBtn.addEventListener('click', clearCheckedTasks);

function clearCheckedTasks() {
	const checkedItems = document.querySelectorAll(
		'.js-task__active-check:checked'
	);

	checkedItems.forEach((item) => {
		const taskItem = item.closest('.js-tasks__active');
		const taskId = taskItem.dataset.blockid;
		taskItem.remove();
		tasksArr = tasksArr.filter((task) => task.id !== taskId);
	});

	countOfTasks();

	const activeTask = document.querySelector('.js-tasks__active');

	if (!activeTask) {
		clearAllTasksBtn.classList.remove('js-visibility-block');

		clearAllTasksBtn.classList.add('js-visibility-hide');

		infoBlock.style.display = 'flex';

		addClearCheckedBtn.classList.add('js-visibility-hide');
		addClearCheckedBtn.classList.remove('js-visibility-appear');
	}

	const checkedItemsLength = document.querySelectorAll(
		'.task__active-check input[type="checkbox"]:checked'
	);
	if (checkedItemsLength.length > 0) {
		addClearCheckedBtn.classList.remove('js-visibility-hide');
		addClearCheckedBtn.classList.add('js-visibility-appear');
	} else {
		addClearCheckedBtn.classList.remove('js-visibility-appear');
		addClearCheckedBtn.classList.add('js-visibility-hide');
	}
}

// ==================SET TIMER==========================================

const startButton = document.querySelector('.js-task__counter');

colorBtn.addEventListener('click', () => {
	const parrentCards = document.querySelector('.js-tasks__list');
	const cardsInside = parrentCards.querySelector('.js-tasks__active');
	body.classList.toggle('js-color__content');
	wrapper.classList.toggle('js-color__content');
	const checkbox = document.querySelector('.js-task__active-check');

	const descrLineColor = document.querySelector('.descr__line');
	const infoLineColor = document.querySelector('.info');

	// const colorBtn = document.querySelector('.js-color__change')

	if (wrapper.classList.contains('js-color__content')) {
		descrLineColor.classList.toggle('js-descr-color');
		infoLineColor.classList.toggle('js-descr-color');
		colorBtn.classList.remove('header__title-color');
		colorBtn.classList.add('dark-btn');
		titleText.classList.add('header-text-dark');
		clearAllTasksBtn.classList.add('clear-btn-dark');
		addClearCheckedBtn.classList.add('clear-btn-dark');
		closeErrorWindow.classList.add('error-background');
		////
		///
		///
		///
	} else {
		descrLineColor.classList.toggle('js-descr-color');
		infoLineColor.classList.toggle('js-descr-color');
		colorBtn.classList.remove('dark-btn');
		colorBtn.classList.add('header__title-color');
		titleText.classList.remove('header-text-dark');
		clearAllTasksBtn.classList.remove('clear-btn-dark');
		addClearCheckedBtn.classList.remove('clear-btn-dark');
		closeErrorWindow.classList.remove('error-background');
	}

	if (wrapper.classList.contains('js-color__content')) {
		const lists = document.querySelectorAll('.js-tasks__list');

		lists.forEach((list) => {
			const activeItems = list.querySelectorAll('.js-tasks__active');
			activeItems.forEach((item) => {
				const checkbox = item.querySelector('.js-task__active-check');
				if (checkbox && checkbox.checked) {
					item.classList.remove('task__style-checked');
					item.classList.add('task__style-dark-checked');
				} else {
					item.classList.remove('task__style-dark');
					item.classList.add('task__style-dark');
				}
			});
		});
	} else {
		const lists = document.querySelectorAll('.js-tasks__list');

		lists.forEach((list) => {
			const activeItems = list.querySelectorAll('.js-tasks__active');
			activeItems.forEach((item) => {
				const checkbox = item.querySelector('.js-task__active-check');
				if (checkbox && checkbox.checked) {
					item.classList.remove('task__style-dark-checked');
					item.classList.add('task__style-checked');
				} else {
					item.classList.remove('task__style-dark');
					item.classList.add('task__style');
				}
			});
		});
	}
});
