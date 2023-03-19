/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/main.js":
/*!**************************!*\
  !*** ./src/core/main.js ***!
  \**************************/
/***/ (() => {

const wrapper = document.querySelector('.js-themeChange');
const inputBtn = document.querySelector('#js-input-btn');
const tasksList = document.querySelector('.js-tasks__list');
const colorBtn = document.querySelector('.js-color__change');
const body = document.querySelector('body'); // const content = document.querySelector('.content');

const pinButton = document.getElementById('js-input-btn');
const tasksForm = document.querySelector('.js-inpute-form');
let taskToEditId = null;
const selectedTasksArr = []; // сохраняем выбранные селектед таск

const closeErrorMessage = document.getElementById('js-error');
const closeErrorWindow = document.querySelector('.js-error-form'); //окно ошибки

const createTask = document.getElementById('js-addTask'); //создание жлемента на странице

const infoBlock = document.querySelector('.js-info');
const clearAllTasksBtn = document.querySelector('.js-clear__btn');
const clearOnlyCheckedBtn = document.querySelector('.js-clearChecked');
let tasksArr = []; //массив задач

const taskMock = {
  id: 'asdas',
  value: '',
  status: 'inprogress',
  time: 3600
};

function errorController(message) {
  console.log('message'); // display block на элемент нотифакации
  // в див сообщение message
}

const editeTaskParrent = document.querySelector('.js-tasks__list'); //редактирование задач

const editTask = document.querySelector('.js-active-edite-btn'); // //редактрирование задачи

const showPopup = document.querySelector('.js-popup'); //popup показать

const closePopup = document.querySelector('.js-popup__close'); //закрыть popup

const acceptPopup = document.querySelector('.js-popup__accept'); //принять изменения

const takeCorrTask = document.querySelector('.js-popup__input');
takeCorrTask.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    acceptNew(e);
  }
}); //взять текст из popup

const tasksCount = document.querySelector('.js-descr__count'); //количество отображенных задач
//количество выполненных задач

const addClearCheckedBtn = document.querySelector('.js-clear__checked'); //кнопка удаления выбранных элементов

const timerApear = document.querySelector('.js-task__counter-timer');
const titleText = document.querySelector('.header__title-text-main'); //______________CLICK

pinButton.addEventListener('click', addNewTask); //клик >add >проверяем поле воода

tasksForm.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addNewTask(e);
  }
}); // при нажатии на Enter

closeErrorMessage.addEventListener('click', closeError); // закрытие окна ошибки

clearAllTasksBtn.addEventListener('click', clearAllTasks); //кнопка закрыть все

editeTaskParrent.addEventListener('click', openPopup);
editeTaskParrent.addEventListener('click', changeStatus); // когда карточка div вмонитрованна в страницу добавляем ивент на удаление

createTask.addEventListener('click', deliteOneTask); //клик >add>delite 1 task
//_____________CLICKS END______

function uuidv4() {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
} //добавление новой задачи


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
      time: 0
    };
    tasksArr.push(taskObj);
    tasksForm.value = '';
    const currentTask = tasksArr.find(item => item.id === taskId);
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
    const startButton = document.querySelector(`[data-blockId="${taskId}"] .js-task__counter`);
    const startText = startButton.querySelector('.start-text');
    const pauseText = startButton.querySelector('.pause-text');
    let isRunTimer = false;
    let timerInterval = null;

    const updateTaskTime = () => {
      currentTask.time += 1;
      const formattedTime = formatSeconds(currentTask.time);
      const timer = document.querySelector(`.js-task-${currentTask.id} .js-task__counter-timer`);
      timer.innerHTML = formattedTime;
    };

    startButton.addEventListener('click', e => {
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
} //============CHECK KOLOR


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
} // +=================================================stsrt


closePopup.addEventListener('click', function (e) {
  e.preventDefault();
  showPopup.style.display = 'none';
}); //___________________________________________________

function pushCorrText() {
  return takeCorrTask.value;
} //Добавлениее количества задач (числом)


function countOfTasks() {
  if (tasksArr.length === 0) {
    tasksCount.innerHTML = 'Today: No tasks &#128564;';
  } else {
    tasksCount.innerHTML = `Today: ${tasksArr.length}`;
  }
}

countOfTasks();

function findTaskObject(idToFind) {
  return tasksArr.find(item => item.id === idToFind);
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

    {}
  }
} //===========================================================


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
  const updateTaskArray = tasksArr.map(item => {
    if (item.id === taskToEditId) {
      return {
        id: taskToEditId,
        value: inputPopup.value
      };
    } else {
      return item;
    }
  });
  tasksArr = updateTaskArray;
  const taskTextElement = document.querySelector(`[data-blockId="${taskToEditId}"] .task__active-text`);
  taskTextElement.innerHTML = inputPopup.value;
  showPopup.style.display = 'none';
  timeCounter(e);
}

function deliteOneTask(e) {
  const deleteBtn = e.target.closest('.task__active-check-btn');

  if (deleteBtn) {
    e.preventDefault();
    const taskId = deleteBtn.dataset.iddd;
    tasksArr = tasksArr.filter(task => task.id !== taskId);
    const blockToDelete = document.querySelector(`[data-blockId="${taskId}"]`);

    if (blockToDelete) {
      blockToDelete.remove();
      countOfTasks(); // удаляем задачу со страницы
    }
  }
}

clearOnlyCheckedBtn.addEventListener('click', clearCheckedTasks);

function clearCheckedTasks() {
  const checkedItems = document.querySelectorAll('.js-task__active-check:checked');
  checkedItems.forEach(item => {
    const taskItem = item.closest('.js-tasks__active');
    const taskId = taskItem.dataset.blockid;
    taskItem.remove();
    tasksArr = tasksArr.filter(task => task.id !== taskId);
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

  const checkedItemsLength = document.querySelectorAll('.task__active-check input[type="checkbox"]:checked');

  if (checkedItemsLength.length > 0) {
    addClearCheckedBtn.classList.remove('js-visibility-hide');
    addClearCheckedBtn.classList.add('js-visibility-appear');
  } else {
    addClearCheckedBtn.classList.remove('js-visibility-appear');
    addClearCheckedBtn.classList.add('js-visibility-hide');
  }
} // ==================SET TIMER==========================================


const startButton = document.querySelector('.js-task__counter');
colorBtn.addEventListener('click', () => {
  const parrentCards = document.querySelector('.js-tasks__list');
  const cardsInside = parrentCards.querySelector('.js-tasks__active');
  body.classList.toggle('js-color__content');
  wrapper.classList.toggle('js-color__content');
  const checkbox = document.querySelector('.js-task__active-check');
  const descrLineColor = document.querySelector('.descr__line');
  const infoLineColor = document.querySelector('.info'); // const colorBtn = document.querySelector('.js-color__change')

  if (wrapper.classList.contains('js-color__content')) {
    descrLineColor.classList.toggle('js-descr-color');
    infoLineColor.classList.toggle('js-descr-color');
    colorBtn.classList.remove('header__title-color');
    colorBtn.classList.add('dark-btn');
    titleText.classList.add('header-text-dark');
    clearAllTasksBtn.classList.add('clear-btn-dark');
    addClearCheckedBtn.classList.add('clear-btn-dark');
    closeErrorWindow.classList.add('error-background'); ////
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
    lists.forEach(list => {
      const activeItems = list.querySelectorAll('.js-tasks__active');
      activeItems.forEach(item => {
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
    lists.forEach(list => {
      const activeItems = list.querySelectorAll('.js-tasks__active');
      activeItems.forEach(item => {
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

/***/ }),

/***/ "./src/core/resizer.js":
/*!*****************************!*\
  !*** ./src/core/resizer.js ***!
  \*****************************/
/***/ (() => {

var defaultWidth = 1440,
    defaultFont = 16,
    mobileFont = 16,
    minWidth = 768,
    minHeight = 600,
    defaultHeight = 900;

function fSize(device, vW, vH) {
  if (vW <= 374) {
    return 13;
  }

  return device ? mobileFont : defaultFont * Math.min(Math.max(minWidth, vW) / defaultWidth, Math.max(minHeight, vH) / defaultHeight);
}

function modifierDevice() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var isMobile = windowWidth <= 767;

  if (document.body) {
    document.body.style.fontSize = fSize(isMobile, windowWidth, windowHeight) + "px";
  }

  if (isMobile) {
    document.documentElement.classList.add("mobile");
  } else {
    document.documentElement.classList.remove("mobile");
  }
}

window.onload = function () {
  modifierDevice();
};

window.onresize = function () {
  modifierDevice();
};

modifierDevice();

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/views/index.pug":
/*!*****************************!*\
  !*** ./src/views/index.pug ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;



pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"en\"\u003E\u003Chead\u003E\u003Cmeta charset=\"UTF-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"\u003E\u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(/*! ../assets/images/favicon.png */ "./src/assets/images/favicon.png"), true, true)+" type=\"image\u002Fpng\"") + "\u003E\u003Ctitle\u003EEmpty Project\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E \u003Cdiv class=\"content card\"\u003E\u003Cdiv class=\"popup js-popup\"\u003E\u003Cdiv class=\"popup__window\"\u003E\u003Cinput class=\"popup__input js-popup__input\" type=\"text\" placeholder=\"Edite Your task\"\u003E\u003Cbutton class=\"popup__close js-popup__close\"\u003Eclose\u003C\u002Fbutton\u003E\u003Cbutton class=\"popup__accept js-popup__accept\"\u003Eaccept\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"wrapper js-themeChange\"\u003E\u003Cdiv class=\"page\"\u003E\u003Cheader class=\"header\"\u003E\u003Cdiv class=\"header__title\"\u003E\u003Cdiv class=\"header__title-color js-color__change\"\u003EColor\u003C\u002Fdiv\u003E\u003Cdiv class=\"header__title-text\"\u003E\u003Cp class=\"header__title-text-main\"\u003EHello ! Write your task\u003C\u002Fp\u003E\u003Cdiv class=\"header__title-error\"\u003E\u003Cp class=\"header__title-text-error js-error-form\"\u003EWrite your task first\u003Cbutton class=\"header__title-text-error-close\" id=\"js-error\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"header__form\"\u003E\u003Cinput class=\"header__form-inpute js-inpute-form\" type=\"text\" placeholder=\"Here...\"\u003E\u003Cbutton class=\"header__form-btn\" id=\"js-input-btn\"\u003EPin\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"descr\"\u003E\u003Cdiv class=\"descr__line\"\u003E\u003Cdiv class=\"descr__count js-descr__count\"\u003EToday:\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"info js-info\"\u003EAdd your first task\u003C\u002Fdiv\u003E\u003Cdiv class=\"tasks\"\u003E\u003Cdiv class=\"tasks__list js-tasks__list\" id=\"js-addTask\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"clear\"\u003E\u003Cdiv class=\"clear__btn js-clear__btn\"\u003E\u003Cbutton class=\"clear__btn-all clearAll\"\u003EClear All\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"clear__btn js-clear__checked\"\u003E\u003Cbutton class=\"clear__btn-checked clearChecked js-clearChecked\"\u003EClear Done\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cscript src=\"\u002Fsc.js\"\u003E\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-runtime/index.js":
/*!*******************************************!*\
  !*** ./node_modules/pug-runtime/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  var type = typeof val;
  if ((type === 'object' || type === 'function') && typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || (__webpack_require__(/*! fs */ "?8f63").readFileSync)(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),

/***/ "./src/assets/images/favicon.png":
/*!***************************************!*\
  !*** ./src/assets/images/favicon.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/4deddff989e7b96bdf6e.png";

/***/ }),

/***/ "?8f63":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/app.scss */ "./src/scss/app.scss");
/* harmony import */ var _core_resizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/resizer */ "./src/core/resizer.js");
/* harmony import */ var _core_resizer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_resizer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/main */ "./src/core/main.js");
/* harmony import */ var _core_main__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_main__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _views_index_pug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/index.pug */ "./src/views/index.pug");
/* harmony import */ var _views_index_pug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_views_index_pug__WEBPACK_IMPORTED_MODULE_3__);
// npx prettier --write "**/*.pug"





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHFEQUEwQjtBQUMzQyxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3UEE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFDeUI7QUFDRDtBQUNIO0FBQ00iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXNrc2hlZXRzLy4vc3JjL2NvcmUvbWFpbi5qcyIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzLy4vc3JjL2NvcmUvcmVzaXplci5qcyIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzLy4vc3JjL3Njc3MvYXBwLnNjc3M/OGI2ZiIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzLy4vc3JjL3ZpZXdzL2luZGV4LnB1ZyIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzLy4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzIiwid2VicGFjazovL2phc2tzaGVldHMvaWdub3JlZHwvVXNlcnMvc3lrcmVwZXRzL0Rlc2t0b3AvV2ViL3Byb2plY3QvdG9kby9UT0RPLUFQUC9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWV8ZnMiLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2phc2tzaGVldHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2phc2tzaGVldHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2phc2tzaGVldHMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRoZW1lQ2hhbmdlJyk7XG5jb25zdCBpbnB1dEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1pbnB1dC1idG4nKTtcbmNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YXNrc19fbGlzdCcpO1xuY29uc3QgY29sb3JCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY29sb3JfX2NoYW5nZScpO1xuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbi8vIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuY29uc3QgcGluQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWlucHV0LWJ0bicpO1xuY29uc3QgdGFza3NGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWlucHV0ZS1mb3JtJyk7XG5cbmxldCB0YXNrVG9FZGl0SWQgPSBudWxsO1xuY29uc3Qgc2VsZWN0ZWRUYXNrc0FyciA9IFtdOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LLRi9Cx0YDQsNC90L3Ri9C1INGB0LXQu9C10LrRgtC10LQg0YLQsNGB0LpcbmNvbnN0IGNsb3NlRXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWVycm9yJyk7XG5jb25zdCBjbG9zZUVycm9yV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWVycm9yLWZvcm0nKTtcbi8v0L7QutC90L4g0L7RiNC40LHQutC4XG5jb25zdCBjcmVhdGVUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWFkZFRhc2snKTtcbi8v0YHQvtC30LTQsNC90LjQtSDQttC70LXQvNC10L3RgtCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxuY29uc3QgaW5mb0Jsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWluZm8nKTtcbmNvbnN0IGNsZWFyQWxsVGFza3NCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2xlYXJfX2J0bicpO1xuY29uc3QgY2xlYXJPbmx5Q2hlY2tlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jbGVhckNoZWNrZWQnKTtcblxubGV0IHRhc2tzQXJyID0gW107XG4vL9C80LDRgdGB0LjQsiDQt9Cw0LTQsNGHXG5jb25zdCB0YXNrTW9jayA9IHsgaWQ6ICdhc2RhcycsIHZhbHVlOiAnJywgc3RhdHVzOiAnaW5wcm9ncmVzcycsIHRpbWU6IDM2MDAgfTtcblxuZnVuY3Rpb24gZXJyb3JDb250cm9sbGVyKG1lc3NhZ2UpIHtcblx0Y29uc29sZS5sb2coJ21lc3NhZ2UnKTtcblx0Ly8gZGlzcGxheSBibG9jayDQvdCwINGN0LvQtdC80LXQvdGCINC90L7RgtC40YTQsNC60LDRhtC40Lhcblx0Ly8g0LIg0LTQuNCyINGB0L7QvtCx0YnQtdC90LjQtSBtZXNzYWdlXG59XG5cbmNvbnN0IGVkaXRlVGFza1BhcnJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFza3NfX2xpc3QnKTtcbi8v0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDQt9Cw0LTQsNGHXG5jb25zdCBlZGl0VGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1hY3RpdmUtZWRpdGUtYnRuJyk7XG4vLyAvL9GA0LXQtNCw0LrRgtGA0LjRgNC+0LLQsNC90LjQtSDQt9Cw0LTQsNGH0LhcbmNvbnN0IHNob3dQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wb3B1cCcpO1xuLy9wb3B1cCDQv9C+0LrQsNC30LDRgtGMXG5jb25zdCBjbG9zZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBvcHVwX19jbG9zZScpO1xuLy/Qt9Cw0LrRgNGL0YLRjCBwb3B1cFxuY29uc3QgYWNjZXB0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcG9wdXBfX2FjY2VwdCcpO1xuLy/Qv9GA0LjQvdGP0YLRjCDQuNC30LzQtdC90LXQvdC40Y9cbmNvbnN0IHRha2VDb3JyVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wb3B1cF9faW5wdXQnKTtcbnRha2VDb3JyVGFzay5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcblx0aWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG5cdFx0YWNjZXB0TmV3KGUpO1xuXHR9XG59KTtcbi8v0LLQt9GP0YLRjCDRgtC10LrRgdGCINC40LcgcG9wdXBcbmNvbnN0IHRhc2tzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtZGVzY3JfX2NvdW50Jyk7XG4vL9C60L7Qu9C40YfQtdGB0YLQstC+INC+0YLQvtCx0YDQsNC20LXQvdC90YvRhSDQt9Cw0LTQsNGHXG5cbi8v0LrQvtC70LjRh9C10YHRgtCy0L4g0LLRi9C/0L7Qu9C90LXQvdC90YvRhSDQt9Cw0LTQsNGHXG5cbmNvbnN0IGFkZENsZWFyQ2hlY2tlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jbGVhcl9fY2hlY2tlZCcpO1xuLy/QutC90L7Qv9C60LAg0YPQtNCw0LvQtdC90LjRjyDQstGL0LHRgNCw0L3QvdGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyXG5cbmNvbnN0IHRpbWVyQXBlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFza19fY291bnRlci10aW1lcicpO1xuXG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX190aXRsZS10ZXh0LW1haW4nKTtcblxuLy9fX19fX19fX19fX19fX0NMSUNLXG5waW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGROZXdUYXNrKTsgLy/QutC70LjQuiA+YWRkID7Qv9GA0L7QstC10YDRj9C10Lwg0L/QvtC70LUg0LLQvtC+0LTQsFxudGFza3NGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuXHRpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0XHRhZGROZXdUYXNrKGUpO1xuXHR9XG59KTsgLy8g0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAgRW50ZXJcbmNsb3NlRXJyb3JNZXNzYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VFcnJvcik7IC8vINC30LDQutGA0YvRgtC40LUg0L7QutC90LAg0L7RiNC40LHQutC4XG5jbGVhckFsbFRhc2tzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJBbGxUYXNrcyk7IC8v0LrQvdC+0L/QutCwINC30LDQutGA0YvRgtGMINCy0YHQtVxuZWRpdGVUYXNrUGFycmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XG5lZGl0ZVRhc2tQYXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlU3RhdHVzKTtcbi8vINC60L7Qs9C00LAg0LrQsNGA0YLQvtGH0LrQsCBkaXYg0LLQvNC+0L3QuNGC0YDQvtCy0LDQvdC90LAg0LIg0YHRgtGA0LDQvdC40YbRgyDQtNC+0LHQsNCy0LvRj9C10Lwg0LjQstC10L3RgiDQvdCwINGD0LTQsNC70LXQvdC40LVcbmNyZWF0ZVRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxpdGVPbmVUYXNrKTsgLy/QutC70LjQuiA+YWRkPmRlbGl0ZSAxIHRhc2tcblxuLy9fX19fX19fX19fX19fQ0xJQ0tTIEVORF9fX19fX1xuXG5mdW5jdGlvbiB1dWlkdjQoKSB7XG5cdHJldHVybiAneHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcblx0XHR2YXIgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMCxcblx0XHRcdHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0U2Vjb25kcyhzZWNvbmRzKSB7XG5cdGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG5cdGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBzZWNvbmRzICUgNjA7XG5cdGNvbnN0IGZvcm1hdHRlZE1pbnV0ZXMgPSBtaW51dGVzIDwgMTAgPyBgMCR7bWludXRlc31gIDogYCR7bWludXRlc31gO1xuXHRjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID1cblx0XHRyZW1haW5pbmdTZWNvbmRzIDwgMTAgPyBgMCR7cmVtYWluaW5nU2Vjb25kc31gIDogYCR7cmVtYWluaW5nU2Vjb25kc31gO1xuXHRyZXR1cm4gYCR7Zm9ybWF0dGVkTWludXRlc306JHtmb3JtYXR0ZWRTZWNvbmRzfWA7XG59XG5cbi8v0LTQvtCx0LDQstC70LXQvdC40LUg0L3QvtCy0L7QuSDQt9Cw0LTQsNGH0LhcblxuZnVuY3Rpb24gYWRkTmV3VGFzayhlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRpZiAodGFza3NGb3JtLnZhbHVlID09PSAnJykge1xuXHRcdC8vIGNsb3NlRXJyb3JXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX190aXRsZS10ZXh0LWVycm9yJyk7XG5cdFx0Y2xvc2VFcnJvcldpbmRvdy5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX3RpdGxlLXRleHQtZXJyb3ItYWN0aXZlJyk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgdGFza0lkID0gdXVpZHY0KCk7XG5cdFx0Y29uc3QgaW5wdXRUZXh0ID0gdGFza3NGb3JtLnZhbHVlO1xuXHRcdGNvbnN0IHRhc2tPYmogPSB7XG5cdFx0XHRpZDogdGFza0lkLFxuXHRcdFx0dmFsdWU6IGlucHV0VGV4dCxcblx0XHRcdHRpbWU6IDAsXG5cdFx0fTtcblx0XHR0YXNrc0Fyci5wdXNoKHRhc2tPYmopO1xuXHRcdHRhc2tzRm9ybS52YWx1ZSA9ICcnO1xuXHRcdGNvbnN0IGN1cnJlbnRUYXNrID0gdGFza3NBcnIuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gdGFza0lkKTtcblxuXHRcdGluZm9CbG9jay5jbGFzc0xpc3QuYWRkKCdqcy12aXNpYmlsaXR5LWhpZGUnKTtcblxuXHRcdGNvbnN0IHRhc2tIdG1sID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInRhc2tfX2FjdGl2ZSB0YXNrX19zdHlsZSBqcy10YXNrc19fYWN0aXZlIGpzLXRhc2stJHtjdXJyZW50VGFzay5pZH1cIiBkYXRhLWJsb2NrSWQ9XCIke3Rhc2tJZH1cIiBpZD1cImFjdGl2ZVwiPlxuXG5cdFx0XHRcdDxhIGNsYXNzPVwidGFza19fYWN0aXZlLWNvdW50ZXIganMtdGFza19fY291bnRlclwiIGhyZWY9XCIjXCI+XG5cdFx0XHRcdCAgICA8c3BhbiBjbGFzcz1cInN0YXJ0LXRleHRcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPnN0YXJ0PC9zcGFuPlxuXHRcdFx0XHQgICAgPHNwYW4gY2xhc3M9XCJwYXVzZS10ZXh0XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+cGF1c2U8L3NwYW4+XG5cdFx0XHRcdDwvYT5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRhc2tfX2FjdGl2ZS10aW1lciBqcy10YXNrX19jb3VudGVyLXRpbWVyXCI+IDAwOjAwPC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRhc2tfX2FjdGl2ZS10ZXh0XCI+XG5cdFx0XHRcdFx0JHtpbnB1dFRleHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGFza19fYWN0aXZlLWNoZWNrXCI+XG5cblx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwidGFza19fYWN0aXZlLWNoZWNrLWJ0blwiIGRhdGEtaWRkZD1cIiR7dGFza0lkfVwiPlxuXHRcdFx0XHRcdFx0RGVsZXRlXG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdGNsYXNzPVwidGFza19fYWN0aXZlLWVkaXRlLWJ0biBqcy1hY3RpdmUtZWRpdGUtYnRuIGpzLWVkaXRlQnRuXCJcblx0XHRcdFx0XHRkYXRhLWlkZGQ9XCIke3Rhc2tJZH1cIlxuXHRcdFx0XHRcdGlkPVwiZWRpdGVCdG5cIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0RWRpdFxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJ0YXNrX19hY3RpdmUtY2hlY2stY2hlY2sganMtdGFza19fYWN0aXZlLWNoZWNrXCIgdHlwZT1cImNoZWNrYm94XCIgIC8+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwidGFza19fYWN0aXZlLWNoZWNrLWxhYmVsXCIgZm9yPVwidGFzay1hY3RpdmUtY2hlY2tcIj48L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHRjcmVhdGVUYXNrLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHRhc2tIdG1sKTtcblxuXHRcdGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdGBbZGF0YS1ibG9ja0lkPVwiJHt0YXNrSWR9XCJdIC5qcy10YXNrX19jb3VudGVyYFxuXHRcdCk7XG5cdFx0Y29uc3Qgc3RhcnRUZXh0ID0gc3RhcnRCdXR0b24ucXVlcnlTZWxlY3RvcignLnN0YXJ0LXRleHQnKTtcblx0XHRjb25zdCBwYXVzZVRleHQgPSBzdGFydEJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcucGF1c2UtdGV4dCcpO1xuXG5cdFx0bGV0IGlzUnVuVGltZXIgPSBmYWxzZTtcblx0XHRsZXQgdGltZXJJbnRlcnZhbCA9IG51bGw7XG5cblx0XHRjb25zdCB1cGRhdGVUYXNrVGltZSA9ICgpID0+IHtcblx0XHRcdGN1cnJlbnRUYXNrLnRpbWUgKz0gMTtcblx0XHRcdGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBmb3JtYXRTZWNvbmRzKGN1cnJlbnRUYXNrLnRpbWUpO1xuXHRcdFx0Y29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0XHRgLmpzLXRhc2stJHtjdXJyZW50VGFzay5pZH0gLmpzLXRhc2tfX2NvdW50ZXItdGltZXJgXG5cdFx0XHQpO1xuXHRcdFx0dGltZXIuaW5uZXJIVE1MID0gZm9ybWF0dGVkVGltZTtcblx0XHR9O1xuXG5cdFx0c3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKCFpc1J1blRpbWVyKSB7XG5cdFx0XHRcdGlzUnVuVGltZXIgPSB0cnVlO1xuXHRcdFx0XHRzdGFydFRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0cGF1c2VUZXh0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHR0aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwodXBkYXRlVGFza1RpbWUsIDEwMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ3BhdXNlIFRpbWVyJyk7XG5cdFx0XHRcdGlzUnVuVGltZXIgPSBmYWxzZTtcblx0XHRcdFx0c3RhcnRUZXh0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHRwYXVzZVRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNsZWFyQWxsVGFza3NCdG4uY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cdFx0Y2xlYXJBbGxUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKCdqcy12aXNpYmlsaXR5LWFwcGVhcicpO1xuXG5cdFx0Y291bnRPZlRhc2tzKCk7XG5cdFx0Y29uc3QgZm9ybUNvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhc2tzX19hY3RpdmUnKTtcblx0XHRjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcblxuXHRcdGlmICh3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnanMtY29sb3JfX2NvbnRlbnQnKSkge1xuXHRcdFx0Y29uc3QgdGFza0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9ja0lkPVwiJHt0YXNrSWR9XCJdYCk7XG5cdFx0XHR0YXNrQ2FyZC5jbGFzc0xpc3QuYWRkKCd0YXNrX19zdHlsZS1kYXJrJyk7XG5cdFx0fVxuXHRcdGNsb3NlRXJyb3JXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX190aXRsZS10ZXh0LWVycm9yLWFjdGl2ZScpO1xuXHR9XG59XG5cbi8vPT09PT09PT09PT09Q0hFQ0sgS09MT1JcbmZ1bmN0aW9uIGNoYW5nZVRhc2tDb2xvcigpIHtcblx0Y29uc3QgdGFza0NvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgpO1xufVxuXG5mdW5jdGlvbiBjbG9zZUVycm9yKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdDtcblx0Y2xvc2VFcnJvcldpbmRvdy5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmlsaXR5LWFwcGVhcicpO1xufVxuXG5mdW5jdGlvbiBjbGVhckFsbFRhc2tzKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHR0YXNrc0FyciA9IFtdO1xuXHRjcmVhdGVUYXNrLmlubmVySFRNTCA9ICcnO1xuXHRjbGVhckFsbFRhc2tzQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cblx0Y2xlYXJBbGxUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKCdqcy12aXNpYmlsaXR5LWhpZGUnKTtcblxuXHRpbmZvQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cblx0aW5mb0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cblx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cblx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXG5cdGNsZWFyT25seUNoZWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1hcHBlYXInKTtcblx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXG5cdGNvdW50T2ZUYXNrcygpO1xufVxuXG4vLyArPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PXN0c3J0XG5jbG9zZVBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHNob3dQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXG5cbmZ1bmN0aW9uIHB1c2hDb3JyVGV4dCgpIHtcblx0cmV0dXJuIHRha2VDb3JyVGFzay52YWx1ZTtcbn1cblxuLy/QlNC+0LHQsNCy0LvQtdC90LjQtdC1INC60L7Qu9C40YfQtdGB0YLQstCwINC30LDQtNCw0YcgKNGH0LjRgdC70L7QvClcbmZ1bmN0aW9uIGNvdW50T2ZUYXNrcygpIHtcblx0aWYgKHRhc2tzQXJyLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRhc2tzQ291bnQuaW5uZXJIVE1MID0gJ1RvZGF5OiBObyB0YXNrcyAmIzEyODU2NDsnO1xuXHR9IGVsc2Uge1xuXHRcdHRhc2tzQ291bnQuaW5uZXJIVE1MID0gYFRvZGF5OiAke3Rhc2tzQXJyLmxlbmd0aH1gO1xuXHR9XG59XG5cbmNvdW50T2ZUYXNrcygpO1xuXG5mdW5jdGlvbiBmaW5kVGFza09iamVjdChpZFRvRmluZCkge1xuXHRyZXR1cm4gdGFza3NBcnIuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWRUb0ZpbmQpO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VTdGF0dXMoZSkge1xuXHRjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cdGxldCBpc0NoZWNrZWQgPSBmYWxzZTtcblx0Y29uc3QgY2hlY2tib3ggPSBlLnRhcmdldC5jbG9zZXN0KCcuanMtdGFza19fYWN0aXZlLWNoZWNrJyk7XG5cdGNvbnN0IHBhcmVudCA9IGNoZWNrYm94LmNsb3Nlc3QoJy5qcy10YXNrc19fYWN0aXZlJyk7XG5cdGNvbnN0IHNlbGVjdGVkVGFzayA9IGZpbmRUYXNrT2JqZWN0KHBhcmVudC5kYXRhc2V0LmJsb2NraWQpO1xuXG5cdGlmIChjaGVja2JveCkge1xuXHRcdGlmICghd3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWNvbG9yX19jb250ZW50JykpIHtcblx0XHRcdGlmIChjaGVja2JveC5jaGVja2VkKSB7XG5cdFx0XHRcdHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrX19zdHlsZScpO1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LmFkZCgndGFza19fc3R5bGUtY2hlY2tlZCcpO1xuXG5cdFx0XHRcdGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgndGFza19fc3R5bGUtY2hlY2tlZCcpO1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LmFkZCgndGFza19fc3R5bGUnKTtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyhzZWxlY3RlZFRhc2ssICd1blNlbGVjdGVkVGFzaycpO1xuXHRcdFx0XHRjaGVja2JveC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChjaGVja2JveGVzW2ldLmNoZWNrZWQpIHtcblx0XHRcdFx0XHRpc0NoZWNrZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNDaGVja2VkKSB7XG5cdFx0XHRcdGFkZENsZWFyQ2hlY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmlsaXR5LWhpZGUnKTtcblx0XHRcdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1hcHBlYXInKTtcblx0XHRcdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAod3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWNvbG9yX19jb250ZW50JykpIHtcblx0XHRcdHBhcmVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJyMxNzE2MTYnO1xuXHRcdFx0aWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcblx0XHRcdFx0cGFyZW50LnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgndGFza19fc3R5bGUnKTtcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2tfX3N0eWxlLWRhcmsnKTtcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlLWRhcmstY2hlY2tlZCcpO1xuXHRcdFx0XHRjaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGFyZW50LnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuXHRcdFx0XHRwYXJlbnQuc3R5bGUuYmFja2dyb3VuZCA9ICcjMTcxNjE2Jztcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2tfX3N0eWxlJyk7XG5cdFx0XHRcdHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrX19zdHlsZS1kYXJrLWNoZWNrZWQnKTtcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlLWRhcmsnKTtcblx0XHRcdFx0Y2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGNoZWNrYm94ZXNbaV0uY2hlY2tlZCkge1xuXHRcdFx0XHRcdGlzQ2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChpc0NoZWNrZWQpIHtcblx0XHRcdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXHRcdFx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LmFkZCgnanMtdmlzaWJpbGl0eS1hcHBlYXInKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFkZENsZWFyQ2hlY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmlsaXR5LWFwcGVhcicpO1xuXHRcdFx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LmFkZCgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHtcblx0XHR9XG5cdH1cbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBvcGVuUG9wdXAoZSkge1xuXHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1lZGl0ZUJ0bicpKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRhc2tUb0VkaXRJZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRkZDtcblx0XHRzaG93UG9wdXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRjb25zdCBpbnB1dFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBvcHVwX19pbnB1dCcpO1xuXHRcdGNvbnN0IGVkaXRWYWx1ZSA9IGZpbmRUYXNrT2JqZWN0KHRhc2tUb0VkaXRJZCk7XG5cdFx0aW5wdXRQb3B1cC52YWx1ZSA9IGVkaXRWYWx1ZS52YWx1ZTtcblxuXHRcdGlucHV0UG9wdXAuZm9jdXMoKTtcblx0fVxufVxuXG5hY2NlcHRQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFjY2VwdE5ldyk7XG5cbmZ1bmN0aW9uIGFjY2VwdE5ldyhlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblx0Y29uc3QgaW5wdXRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wb3B1cF9faW5wdXQnKTtcblx0Y29uc3QgdXBkYXRlVGFza0FycmF5ID0gdGFza3NBcnIubWFwKChpdGVtKSA9PiB7XG5cdFx0aWYgKGl0ZW0uaWQgPT09IHRhc2tUb0VkaXRJZCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aWQ6IHRhc2tUb0VkaXRJZCxcblx0XHRcdFx0dmFsdWU6IGlucHV0UG9wdXAudmFsdWUsXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdH0pO1xuXHR0YXNrc0FyciA9IHVwZGF0ZVRhc2tBcnJheTtcblxuXHRjb25zdCB0YXNrVGV4dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdGBbZGF0YS1ibG9ja0lkPVwiJHt0YXNrVG9FZGl0SWR9XCJdIC50YXNrX19hY3RpdmUtdGV4dGBcblx0KTtcblx0dGFza1RleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0UG9wdXAudmFsdWU7XG5cdHNob3dQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHR0aW1lQ291bnRlcihlKTtcbn1cblxuZnVuY3Rpb24gZGVsaXRlT25lVGFzayhlKSB7XG5cdGNvbnN0IGRlbGV0ZUJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJy50YXNrX19hY3RpdmUtY2hlY2stYnRuJyk7XG5cdGlmIChkZWxldGVCdG4pIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgdGFza0lkID0gZGVsZXRlQnRuLmRhdGFzZXQuaWRkZDtcblx0XHR0YXNrc0FyciA9IHRhc2tzQXJyLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gdGFza0lkKTtcblx0XHRjb25zdCBibG9ja1RvRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2tJZD1cIiR7dGFza0lkfVwiXWApO1xuXHRcdGlmIChibG9ja1RvRGVsZXRlKSB7XG5cdFx0XHRibG9ja1RvRGVsZXRlLnJlbW92ZSgpO1xuXHRcdFx0Y291bnRPZlRhc2tzKCk7IC8vINGD0LTQsNC70Y/QtdC8INC30LDQtNCw0YfRgyDRgdC+INGB0YLRgNCw0L3QuNGG0Ytcblx0XHR9XG5cdH1cbn1cblxuY2xlYXJPbmx5Q2hlY2tlZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyQ2hlY2tlZFRhc2tzKTtcblxuZnVuY3Rpb24gY2xlYXJDaGVja2VkVGFza3MoKSB7XG5cdGNvbnN0IGNoZWNrZWRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0Jy5qcy10YXNrX19hY3RpdmUtY2hlY2s6Y2hlY2tlZCdcblx0KTtcblxuXHRjaGVja2VkSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXHRcdGNvbnN0IHRhc2tJdGVtID0gaXRlbS5jbG9zZXN0KCcuanMtdGFza3NfX2FjdGl2ZScpO1xuXHRcdGNvbnN0IHRhc2tJZCA9IHRhc2tJdGVtLmRhdGFzZXQuYmxvY2tpZDtcblx0XHR0YXNrSXRlbS5yZW1vdmUoKTtcblx0XHR0YXNrc0FyciA9IHRhc2tzQXJyLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gdGFza0lkKTtcblx0fSk7XG5cblx0Y291bnRPZlRhc2tzKCk7XG5cblx0Y29uc3QgYWN0aXZlVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YXNrc19fYWN0aXZlJyk7XG5cblx0aWYgKCFhY3RpdmVUYXNrKSB7XG5cdFx0Y2xlYXJBbGxUYXNrc0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmlsaXR5LWJsb2NrJyk7XG5cblx0XHRjbGVhckFsbFRhc2tzQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXG5cdFx0aW5mb0Jsb2NrLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cblx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LmFkZCgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cdH1cblxuXHRjb25zdCBjaGVja2VkSXRlbXNMZW5ndGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdCcudGFza19fYWN0aXZlLWNoZWNrIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkJ1xuXHQpO1xuXHRpZiAoY2hlY2tlZEl0ZW1zTGVuZ3RoLmxlbmd0aCA+IDApIHtcblx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cdH0gZWxzZSB7XG5cdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXHR9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PVNFVCBUSU1FUj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YXNrX19jb3VudGVyJyk7XG5cbmNvbG9yQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRjb25zdCBwYXJyZW50Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFza3NfX2xpc3QnKTtcblx0Y29uc3QgY2FyZHNJbnNpZGUgPSBwYXJyZW50Q2FyZHMucXVlcnlTZWxlY3RvcignLmpzLXRhc2tzX19hY3RpdmUnKTtcblx0Ym9keS5jbGFzc0xpc3QudG9nZ2xlKCdqcy1jb2xvcl9fY29udGVudCcpO1xuXHR3cmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoJ2pzLWNvbG9yX19jb250ZW50Jyk7XG5cdGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhc2tfX2FjdGl2ZS1jaGVjaycpO1xuXG5cdGNvbnN0IGRlc2NyTGluZUNvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc2NyX19saW5lJyk7XG5cdGNvbnN0IGluZm9MaW5lQ29sb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mbycpO1xuXG5cdC8vIGNvbnN0IGNvbG9yQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvbG9yX19jaGFuZ2UnKVxuXG5cdGlmICh3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnanMtY29sb3JfX2NvbnRlbnQnKSkge1xuXHRcdGRlc2NyTGluZUNvbG9yLmNsYXNzTGlzdC50b2dnbGUoJ2pzLWRlc2NyLWNvbG9yJyk7XG5cdFx0aW5mb0xpbmVDb2xvci5jbGFzc0xpc3QudG9nZ2xlKCdqcy1kZXNjci1jb2xvcicpO1xuXHRcdGNvbG9yQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlcl9fdGl0bGUtY29sb3InKTtcblx0XHRjb2xvckJ0bi5jbGFzc0xpc3QuYWRkKCdkYXJrLWJ0bicpO1xuXHRcdHRpdGxlVGV4dC5jbGFzc0xpc3QuYWRkKCdoZWFkZXItdGV4dC1kYXJrJyk7XG5cdFx0Y2xlYXJBbGxUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKCdjbGVhci1idG4tZGFyaycpO1xuXHRcdGFkZENsZWFyQ2hlY2tlZEJ0bi5jbGFzc0xpc3QuYWRkKCdjbGVhci1idG4tZGFyaycpO1xuXHRcdGNsb3NlRXJyb3JXaW5kb3cuY2xhc3NMaXN0LmFkZCgnZXJyb3ItYmFja2dyb3VuZCcpO1xuXHRcdC8vLy9cblx0XHQvLy9cblx0XHQvLy9cblx0XHQvLy9cblx0fSBlbHNlIHtcblx0XHRkZXNjckxpbmVDb2xvci5jbGFzc0xpc3QudG9nZ2xlKCdqcy1kZXNjci1jb2xvcicpO1xuXHRcdGluZm9MaW5lQ29sb3IuY2xhc3NMaXN0LnRvZ2dsZSgnanMtZGVzY3ItY29sb3InKTtcblx0XHRjb2xvckJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrLWJ0bicpO1xuXHRcdGNvbG9yQnRuLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fdGl0bGUtY29sb3InKTtcblx0XHR0aXRsZVRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyLXRleHQtZGFyaycpO1xuXHRcdGNsZWFyQWxsVGFza3NCdG4uY2xhc3NMaXN0LnJlbW92ZSgnY2xlYXItYnRuLWRhcmsnKTtcblx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnY2xlYXItYnRuLWRhcmsnKTtcblx0XHRjbG9zZUVycm9yV2luZG93LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yLWJhY2tncm91bmQnKTtcblx0fVxuXG5cdGlmICh3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnanMtY29sb3JfX2NvbnRlbnQnKSkge1xuXHRcdGNvbnN0IGxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhc2tzX19saXN0Jyk7XG5cblx0XHRsaXN0cy5mb3JFYWNoKChsaXN0KSA9PiB7XG5cdFx0XHRjb25zdCBhY3RpdmVJdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhc2tzX19hY3RpdmUnKTtcblx0XHRcdGFjdGl2ZUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRcdFx0Y29uc3QgY2hlY2tib3ggPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5qcy10YXNrX19hY3RpdmUtY2hlY2snKTtcblx0XHRcdFx0aWYgKGNoZWNrYm94ICYmIGNoZWNrYm94LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2tfX3N0eWxlLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlLWRhcmstY2hlY2tlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndGFza19fc3R5bGUtZGFyaycpO1xuXHRcdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LmFkZCgndGFza19fc3R5bGUtZGFyaycpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBsaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10YXNrc19fbGlzdCcpO1xuXG5cdFx0bGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuXHRcdFx0Y29uc3QgYWN0aXZlSXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10YXNrc19fYWN0aXZlJyk7XG5cdFx0XHRhY3RpdmVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNoZWNrYm94ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuanMtdGFza19fYWN0aXZlLWNoZWNrJyk7XG5cdFx0XHRcdGlmIChjaGVja2JveCAmJiBjaGVja2JveC5jaGVja2VkKSB7XG5cdFx0XHRcdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrX19zdHlsZS1kYXJrLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlLWNoZWNrZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2tfX3N0eWxlLWRhcmsnKTtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59KTtcbiIsInZhciBkZWZhdWx0V2lkdGggPSAxNDQwLFxuICBkZWZhdWx0Rm9udCA9IDE2LFxuICBtb2JpbGVGb250ID0gMTYsXG4gIG1pbldpZHRoID0gNzY4LFxuICBtaW5IZWlnaHQgPSA2MDAsXG4gIGRlZmF1bHRIZWlnaHQgPSA5MDA7XG5cbmZ1bmN0aW9uIGZTaXplKGRldmljZSwgdlcsIHZIKSB7XG4gIGlmICh2VyA8PSAzNzQpIHtcbiAgICByZXR1cm4gMTM7XG4gIH1cblxuICByZXR1cm4gZGV2aWNlXG4gICAgPyBtb2JpbGVGb250XG4gICAgOiBkZWZhdWx0Rm9udCAqXG4gICAgICAgIE1hdGgubWluKFxuICAgICAgICAgIE1hdGgubWF4KG1pbldpZHRoLCB2VykgLyBkZWZhdWx0V2lkdGgsXG4gICAgICAgICAgTWF0aC5tYXgobWluSGVpZ2h0LCB2SCkgLyBkZWZhdWx0SGVpZ2h0XG4gICAgICAgICk7XG59XG5cbmZ1bmN0aW9uIG1vZGlmaWVyRGV2aWNlKCkge1xuICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgdmFyIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgdmFyIGlzTW9iaWxlID0gd2luZG93V2lkdGggPD0gNzY3O1xuXG4gIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9XG4gICAgICBmU2l6ZShpc01vYmlsZSwgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCkgKyBcInB4XCI7XG4gIH1cblxuICBpZiAoaXNNb2JpbGUpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vYmlsZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1vYmlsZVwiKTtcbiAgfVxufVxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICBtb2RpZmllckRldmljZSgpO1xufTtcblxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICBtb2RpZmllckRldmljZSgpO1xufTtcblxubW9kaWZpZXJEZXZpY2UoKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO1xuXG5cblxucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQyFET0NUWVBFIGh0bWxcXHUwMDNFXFx1MDAzQ2h0bWwgbGFuZz1cXFwiZW5cXFwiXFx1MDAzRVxcdTAwM0NoZWFkXFx1MDAzRVxcdTAwM0NtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIlxcdTAwM0VcXHUwMDNDbWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCJcXHUwMDNFXFx1MDAzQ21ldGEgaHR0cC1lcXVpdj1cXFwiWC1VQS1Db21wYXRpYmxlXFxcIiBjb250ZW50PVxcXCJpZT1lZGdlXFxcIlxcdTAwM0VcXHUwMDNDbGlua1wiICsgKFwiIHJlbD1cXFwic2hvcnRjdXQgaWNvblxcXCJcIitwdWcuYXR0cihcImhyZWZcIiwgcmVxdWlyZShgLi4vYXNzZXRzL2ltYWdlcy9mYXZpY29uLnBuZ2ApLCB0cnVlLCB0cnVlKStcIiB0eXBlPVxcXCJpbWFnZVxcdTAwMkZwbmdcXFwiXCIpICsgXCJcXHUwMDNFXFx1MDAzQ3RpdGxlXFx1MDAzRUVtcHR5IFByb2plY3RcXHUwMDNDXFx1MDAyRnRpdGxlXFx1MDAzRVxcdTAwM0NcXHUwMDJGaGVhZFxcdTAwM0VcXHUwMDNDYm9keVxcdTAwM0UgXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY29udGVudCBjYXJkXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJwb3B1cCBqcy1wb3B1cFxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwicG9wdXBfX3dpbmRvd1xcXCJcXHUwMDNFXFx1MDAzQ2lucHV0IGNsYXNzPVxcXCJwb3B1cF9faW5wdXQganMtcG9wdXBfX2lucHV0XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRWRpdGUgWW91ciB0YXNrXFxcIlxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJwb3B1cF9fY2xvc2UganMtcG9wdXBfX2Nsb3NlXFxcIlxcdTAwM0VjbG9zZVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcInBvcHVwX19hY2NlcHQganMtcG9wdXBfX2FjY2VwdFxcXCJcXHUwMDNFYWNjZXB0XFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwid3JhcHBlciBqcy10aGVtZUNoYW5nZVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwicGFnZVxcXCJcXHUwMDNFXFx1MDAzQ2hlYWRlciBjbGFzcz1cXFwiaGVhZGVyXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJoZWFkZXJfX3RpdGxlXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJoZWFkZXJfX3RpdGxlLWNvbG9yIGpzLWNvbG9yX19jaGFuZ2VcXFwiXFx1MDAzRUNvbG9yXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiaGVhZGVyX190aXRsZS10ZXh0XFxcIlxcdTAwM0VcXHUwMDNDcCBjbGFzcz1cXFwiaGVhZGVyX190aXRsZS10ZXh0LW1haW5cXFwiXFx1MDAzRUhlbGxvICEgV3JpdGUgeW91ciB0YXNrXFx1MDAzQ1xcdTAwMkZwXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImhlYWRlcl9fdGl0bGUtZXJyb3JcXFwiXFx1MDAzRVxcdTAwM0NwIGNsYXNzPVxcXCJoZWFkZXJfX3RpdGxlLXRleHQtZXJyb3IganMtZXJyb3ItZm9ybVxcXCJcXHUwMDNFV3JpdGUgeW91ciB0YXNrIGZpcnN0XFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwiaGVhZGVyX190aXRsZS10ZXh0LWVycm9yLWNsb3NlXFxcIiBpZD1cXFwianMtZXJyb3JcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGcFxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJoZWFkZXJfX2Zvcm1cXFwiXFx1MDAzRVxcdTAwM0NpbnB1dCBjbGFzcz1cXFwiaGVhZGVyX19mb3JtLWlucHV0ZSBqcy1pbnB1dGUtZm9ybVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkhlcmUuLi5cXFwiXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImhlYWRlcl9fZm9ybS1idG5cXFwiIGlkPVxcXCJqcy1pbnB1dC1idG5cXFwiXFx1MDAzRVBpblxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGaGVhZGVyXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImRlc2NyXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJkZXNjcl9fbGluZVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiZGVzY3JfX2NvdW50IGpzLWRlc2NyX19jb3VudFxcXCJcXHUwMDNFVG9kYXk6XFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiaW5mbyBqcy1pbmZvXFxcIlxcdTAwM0VBZGQgeW91ciBmaXJzdCB0YXNrXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwidGFza3NcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcInRhc2tzX19saXN0IGpzLXRhc2tzX19saXN0XFxcIiBpZD1cXFwianMtYWRkVGFza1xcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY2xlYXJcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNsZWFyX19idG4ganMtY2xlYXJfX2J0blxcXCJcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwiY2xlYXJfX2J0bi1hbGwgY2xlYXJBbGxcXFwiXFx1MDAzRUNsZWFyIEFsbFxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNsZWFyX19idG4ganMtY2xlYXJfX2NoZWNrZWRcXFwiXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImNsZWFyX19idG4tY2hlY2tlZCBjbGVhckNoZWNrZWQganMtY2xlYXJDaGVja2VkXFxcIlxcdTAwM0VDbGVhciBEb25lXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ3NjcmlwdCBzcmM9XFxcIlxcdTAwMkZzYy5qc1xcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZzY3JpcHRcXHUwMDNFXFx1MDAzQ1xcdTAwMkZib2R5XFx1MDAzRVxcdTAwM0NcXHUwMDJGaHRtbFxcdTAwM0VcIjs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHB1Z19oYXNfb3duX3Byb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gcHVnX21lcmdlO1xuZnVuY3Rpb24gcHVnX21lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBwdWdfbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgPT09ICdjbGFzcycpIHtcbiAgICAgIHZhciB2YWxBID0gYVtrZXldIHx8IFtdO1xuICAgICAgYVtrZXldID0gKEFycmF5LmlzQXJyYXkodmFsQSkgPyB2YWxBIDogW3ZhbEFdKS5jb25jYXQoYltrZXldIHx8IFtdKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgdmFyIHZhbEEgPSBwdWdfc3R5bGUoYVtrZXldKTtcbiAgICAgIHZhbEEgPSB2YWxBICYmIHZhbEFbdmFsQS5sZW5ndGggLSAxXSAhPT0gJzsnID8gdmFsQSArICc7JyA6IHZhbEE7XG4gICAgICB2YXIgdmFsQiA9IHB1Z19zdHlsZShiW2tleV0pO1xuICAgICAgdmFsQiA9IHZhbEIgJiYgdmFsQlt2YWxCLmxlbmd0aCAtIDFdICE9PSAnOycgPyB2YWxCICsgJzsnIDogdmFsQjtcbiAgICAgIGFba2V5XSA9IHZhbEEgKyB2YWxCO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXJyYXksIG9iamVjdCwgb3Igc3RyaW5nIGFzIGEgc3RyaW5nIG9mIGNsYXNzZXMgZGVsaW1pdGVkIGJ5IGEgc3BhY2UuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gYXJyYXksIGFsbCBtZW1iZXJzIG9mIGl0IGFuZCBpdHMgc3ViYXJyYXlzIGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBJZiBgZXNjYXBpbmdgIGlzIGFuIGFycmF5LCB0aGVuIHdoZXRoZXIgb3Igbm90IHRoZSBpdGVtIGluIGB2YWxgIGlzXG4gKiBlc2NhcGVkIGRlcGVuZHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgaXRlbSBpbiBgZXNjYXBpbmdgLiBJZiBgZXNjYXBpbmdgIGlzXG4gKiBub3QgYW4gYXJyYXksIG5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gb2JqZWN0LCBhbGwgdGhlIGtleXMgd2hvc2UgdmFsdWUgaXMgdHJ1dGh5IGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGEgc3RyaW5nLCBpdCBpcyBjb3VudGVkIGFzIGEgY2xhc3MuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogQHBhcmFtIHsoQXJyYXkuPHN0cmluZz58T2JqZWN0LjxzdHJpbmcsIGJvb2xlYW4+fHN0cmluZyl9IHZhbFxuICogQHBhcmFtIHs/QXJyYXkuPHN0cmluZz59IGVzY2FwaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xhc3NlcyA9IHB1Z19jbGFzc2VzO1xuZnVuY3Rpb24gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZykge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgY2xhc3NOYW1lLCBwYWRkaW5nID0gJycsIGVzY2FwZUVuYWJsZWQgPSBBcnJheS5pc0FycmF5KGVzY2FwaW5nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICBjbGFzc05hbWUgPSBwdWdfY2xhc3Nlcyh2YWxbaV0pO1xuICAgIGlmICghY2xhc3NOYW1lKSBjb250aW51ZTtcbiAgICBlc2NhcGVFbmFibGVkICYmIGVzY2FwaW5nW2ldICYmIChjbGFzc05hbWUgPSBwdWdfZXNjYXBlKGNsYXNzTmFtZSkpO1xuICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsgY2xhc3NOYW1lO1xuICAgIHBhZGRpbmcgPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCkge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgcGFkZGluZyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XG4gICAgaWYgKGtleSAmJiB2YWxba2V5XSAmJiBwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSkge1xuICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBrZXk7XG4gICAgICBwYWRkaW5nID0gJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlcyh2YWwsIGVzY2FwaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZyk7XG4gIH0gZWxzZSBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgfHwgJyc7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IG9iamVjdCBvciBzdHJpbmcgdG8gYSBzdHJpbmcgb2YgQ1NTIHN0eWxlcyBkZWxpbWl0ZWQgYnkgYSBzZW1pY29sb24uXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0LjxzdHJpbmcsIHN0cmluZz58c3RyaW5nKX0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZXhwb3J0cy5zdHlsZSA9IHB1Z19zdHlsZTtcbmZ1bmN0aW9uIHB1Z19zdHlsZSh2YWwpIHtcbiAgaWYgKCF2YWwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIHN0eWxlIGluIHZhbCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwgc3R5bGUpKSB7XG4gICAgICAgIG91dCA9IG91dCArIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsICsgJyc7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IHB1Z19hdHRyO1xuZnVuY3Rpb24gcHVnX2F0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICh2YWwgPT09IGZhbHNlIHx8IHZhbCA9PSBudWxsIHx8ICF2YWwgJiYgKGtleSA9PT0gJ2NsYXNzJyB8fCBrZXkgPT09ICdzdHlsZScpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICgodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YWwgPSB2YWwudG9KU09OKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICBpZiAoIWVzY2FwZWQgJiYgdmFsLmluZGV4T2YoJ1wiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cXCcnICsgdmFsLnJlcGxhY2UoLycvZywgJyYjMzk7JykgKyAnXFwnJztcbiAgICB9XG4gIH1cbiAgaWYgKGVzY2FwZWQpIHZhbCA9IHB1Z19lc2NhcGUodmFsKTtcbiAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gdGVyc2Ugd2hldGhlciB0byB1c2UgSFRNTDUgdGVyc2UgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBwdWdfYXR0cnM7XG5mdW5jdGlvbiBwdWdfYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBhdHRycyA9ICcnO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfY2xhc3Nlcyh2YWwpO1xuICAgICAgICBhdHRycyA9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpICsgYXR0cnM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCdzdHlsZScgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfc3R5bGUodmFsKTtcbiAgICAgIH1cbiAgICAgIGF0dHJzICs9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcHVnX21hdGNoX2h0bWwgPSAvW1wiJjw+XS87XG5leHBvcnRzLmVzY2FwZSA9IHB1Z19lc2NhcGU7XG5mdW5jdGlvbiBwdWdfZXNjYXBlKF9odG1sKXtcbiAgdmFyIGh0bWwgPSAnJyArIF9odG1sO1xuICB2YXIgcmVnZXhSZXN1bHQgPSBwdWdfbWF0Y2hfaHRtbC5leGVjKGh0bWwpO1xuICBpZiAoIXJlZ2V4UmVzdWx0KSByZXR1cm4gX2h0bWw7XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgaSwgbGFzdEluZGV4LCBlc2NhcGU7XG4gIGZvciAoaSA9IHJlZ2V4UmVzdWx0LmluZGV4LCBsYXN0SW5kZXggPSAwOyBpIDwgaHRtbC5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAoaHRtbC5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICBjYXNlIDM0OiBlc2NhcGUgPSAnJnF1b3Q7JzsgYnJlYWs7XG4gICAgICBjYXNlIDM4OiBlc2NhcGUgPSAnJmFtcDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjA6IGVzY2FwZSA9ICcmbHQ7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYyOiBlc2NhcGUgPSAnJmd0Oyc7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogY29udGludWU7XG4gICAgfVxuICAgIGlmIChsYXN0SW5kZXggIT09IGkpIHJlc3VsdCArPSBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICAgIGxhc3RJbmRleCA9IGkgKyAxO1xuICAgIHJlc3VsdCArPSBlc2NhcGU7XG4gIH1cbiAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmV0dXJuIHJlc3VsdCArIGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgcHVnIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIG9yaWdpbmFsIHNvdXJjZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gcHVnX3JldGhyb3c7XG5mdW5jdGlvbiBwdWdfcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcHVnX3JldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdQdWcnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcbiIsIi8qIChpZ25vcmVkKSAqLyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmwgKyBcIi4uL1wiOyIsIi8vIG5weCBwcmV0dGllciAtLXdyaXRlIFwiKiovKi5wdWdcIlxuaW1wb3J0IFwiLi9zY3NzL2FwcC5zY3NzXCI7XG5pbXBvcnQgXCIuL2NvcmUvcmVzaXplclwiO1xuaW1wb3J0IFwiLi9jb3JlL21haW5cIjtcbmltcG9ydCBcIi4vdmlld3MvaW5kZXgucHVnXCI7XG4iXSwibmFtZXMiOlsid3JhcHBlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlucHV0QnRuIiwidGFza3NMaXN0IiwiY29sb3JCdG4iLCJib2R5IiwicGluQnV0dG9uIiwiZ2V0RWxlbWVudEJ5SWQiLCJ0YXNrc0Zvcm0iLCJ0YXNrVG9FZGl0SWQiLCJzZWxlY3RlZFRhc2tzQXJyIiwiY2xvc2VFcnJvck1lc3NhZ2UiLCJjbG9zZUVycm9yV2luZG93IiwiY3JlYXRlVGFzayIsImluZm9CbG9jayIsImNsZWFyQWxsVGFza3NCdG4iLCJjbGVhck9ubHlDaGVja2VkQnRuIiwidGFza3NBcnIiLCJ0YXNrTW9jayIsImlkIiwidmFsdWUiLCJzdGF0dXMiLCJ0aW1lIiwiZXJyb3JDb250cm9sbGVyIiwibWVzc2FnZSIsImNvbnNvbGUiLCJsb2ciLCJlZGl0ZVRhc2tQYXJyZW50IiwiZWRpdFRhc2siLCJzaG93UG9wdXAiLCJjbG9zZVBvcHVwIiwiYWNjZXB0UG9wdXAiLCJ0YWtlQ29yclRhc2siLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleSIsImFjY2VwdE5ldyIsInRhc2tzQ291bnQiLCJhZGRDbGVhckNoZWNrZWRCdG4iLCJ0aW1lckFwZWFyIiwidGl0bGVUZXh0IiwiYWRkTmV3VGFzayIsImNsb3NlRXJyb3IiLCJjbGVhckFsbFRhc2tzIiwib3BlblBvcHVwIiwiY2hhbmdlU3RhdHVzIiwiZGVsaXRlT25lVGFzayIsInV1aWR2NCIsInJlcGxhY2UiLCJjIiwiciIsIk1hdGgiLCJyYW5kb20iLCJ2IiwidG9TdHJpbmciLCJmb3JtYXRTZWNvbmRzIiwic2Vjb25kcyIsIm1pbnV0ZXMiLCJmbG9vciIsInJlbWFpbmluZ1NlY29uZHMiLCJmb3JtYXR0ZWRNaW51dGVzIiwiZm9ybWF0dGVkU2Vjb25kcyIsInByZXZlbnREZWZhdWx0IiwiY2xhc3NMaXN0IiwiYWRkIiwidGFza0lkIiwiaW5wdXRUZXh0IiwidGFza09iaiIsInB1c2giLCJjdXJyZW50VGFzayIsImZpbmQiLCJpdGVtIiwidGFza0h0bWwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdGFydEJ1dHRvbiIsInN0YXJ0VGV4dCIsInBhdXNlVGV4dCIsImlzUnVuVGltZXIiLCJ0aW1lckludGVydmFsIiwidXBkYXRlVGFza1RpbWUiLCJmb3JtYXR0ZWRUaW1lIiwidGltZXIiLCJpbm5lckhUTUwiLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJyZW1vdmUiLCJjb3VudE9mVGFza3MiLCJmb3JtQ29sb3IiLCJjb250YWlucyIsInRhc2tDYXJkIiwiY2hhbmdlVGFza0NvbG9yIiwidGFza0NvbG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInB1c2hDb3JyVGV4dCIsImxlbmd0aCIsImZpbmRUYXNrT2JqZWN0IiwiaWRUb0ZpbmQiLCJjaGVja2JveGVzIiwiaXNDaGVja2VkIiwiY2hlY2tib3giLCJ0YXJnZXQiLCJjbG9zZXN0IiwicGFyZW50Iiwic2VsZWN0ZWRUYXNrIiwiZGF0YXNldCIsImJsb2NraWQiLCJjaGVja2VkIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaSIsImJhY2tncm91bmQiLCJjb2xvciIsImlkZGQiLCJpbnB1dFBvcHVwIiwiZWRpdFZhbHVlIiwiZm9jdXMiLCJ1cGRhdGVUYXNrQXJyYXkiLCJtYXAiLCJ0YXNrVGV4dEVsZW1lbnQiLCJ0aW1lQ291bnRlciIsImRlbGV0ZUJ0biIsImZpbHRlciIsInRhc2siLCJibG9ja1RvRGVsZXRlIiwiY2xlYXJDaGVja2VkVGFza3MiLCJjaGVja2VkSXRlbXMiLCJmb3JFYWNoIiwidGFza0l0ZW0iLCJhY3RpdmVUYXNrIiwiY2hlY2tlZEl0ZW1zTGVuZ3RoIiwicGFycmVudENhcmRzIiwiY2FyZHNJbnNpZGUiLCJ0b2dnbGUiLCJkZXNjckxpbmVDb2xvciIsImluZm9MaW5lQ29sb3IiLCJsaXN0cyIsImxpc3QiLCJhY3RpdmVJdGVtcyIsImRlZmF1bHRXaWR0aCIsImRlZmF1bHRGb250IiwibW9iaWxlRm9udCIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwiZGVmYXVsdEhlaWdodCIsImZTaXplIiwiZGV2aWNlIiwidlciLCJ2SCIsIm1pbiIsIm1heCIsIm1vZGlmaWVyRGV2aWNlIiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwid2luZG93SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJpc01vYmlsZSIsImZvbnRTaXplIiwiZG9jdW1lbnRFbGVtZW50Iiwib25sb2FkIiwib25yZXNpemUiXSwic291cmNlUm9vdCI6IiJ9