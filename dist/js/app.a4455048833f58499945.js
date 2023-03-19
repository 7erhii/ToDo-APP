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



pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"en\"\u003E\u003Chead\u003E\u003Cmeta charset=\"UTF-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"\u003E\u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(/*! ../assets/images/favicon.png */ "./src/assets/images/favicon.png"), true, true)+" type=\"image\u002Fpng\"") + "\u003E\u003Ctitle\u003EEmpty Project\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E \u003Cdiv class=\"content card\"\u003E\u003Cdiv class=\"popup js-popup\"\u003E\u003Cdiv class=\"popup__window\"\u003E\u003Cinput class=\"popup__input js-popup__input\" type=\"text\" placeholder=\"Edite Your task\"\u003E\u003Cbutton class=\"popup__close js-popup__close\"\u003Eclose\u003C\u002Fbutton\u003E\u003Cbutton class=\"popup__accept js-popup__accept\"\u003Eaccept\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"wrapper js-themeChange\"\u003E\u003Cdiv class=\"page\"\u003E\u003Cheader class=\"header\"\u003E\u003Cdiv class=\"header__title\"\u003E\u003Cdiv class=\"header__title-color js-color__change\"\u003EColor\u003C\u002Fdiv\u003E\u003Cdiv class=\"header__title-text\"\u003E\u003Cp class=\"header__title-text-main\"\u003EHello ! Write your task\u003C\u002Fp\u003E\u003Cdiv class=\"header__title-error\"\u003E\u003Cp class=\"header__title-text-error js-error-form\"\u003EWrite your task first\u003Cbutton class=\"header__title-text-error-close\" id=\"js-error\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"header__form\"\u003E\u003Cinput class=\"header__form-inpute js-inpute-form\" type=\"text\" placeholder=\"Here...\"\u003E\u003Cbutton class=\"header__form-btn\" id=\"js-input-btn\"\u003EPin\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"descr\"\u003E\u003Cdiv class=\"descr__line\"\u003E\u003Cdiv class=\"descr__count js-descr__count\"\u003EToday:\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"info js-info\"\u003EAdd your first task\u003C\u002Fdiv\u003E\u003Cdiv class=\"tasks\"\u003E\u003Cdiv class=\"tasks__list js-tasks__list\" id=\"js-addTask\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"clear\"\u003E\u003Cdiv class=\"clear__btn js-clear__btn js-visibility-hide\"\u003E\u003Cbutton class=\"clear__btn-all clearAll\"\u003EClear All\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"clear__btn js-clear__checked js-visibility-hide js-clearChecked\"\u003E\u003Cbutton class=\"clear__btn-checked clearChecked\"\u003EClear Done\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cscript src=\"\u002Fsc.js\"\u003E\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";;return pug_html;};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixxREFBMEI7QUFDM0MsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN1BBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ3lCO0FBQ0Q7QUFDSDtBQUNNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamFza3NoZWV0cy8uL3NyYy9jb3JlL21haW4uanMiLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy8uL3NyYy9jb3JlL3Jlc2l6ZXIuanMiLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy8uL3NyYy9zY3NzL2FwcC5zY3NzPzhiNmYiLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy8uL3NyYy92aWV3cy9pbmRleC5wdWciLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy8uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzL2lnbm9yZWR8L1VzZXJzL3N5a3JlcGV0cy9EZXNrdG9wL1dlYi9wcm9qZWN0L3RvZG8vVE9ETy1BUFAvbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lfGZzIiwid2VicGFjazovL2phc2tzaGVldHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vamFza3NoZWV0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2phc2tzaGVldHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qYXNrc2hlZXRzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2phc2tzaGVldHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10aGVtZUNoYW5nZScpO1xuY29uc3QgaW5wdXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjanMtaW5wdXQtYnRuJyk7XG5jb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFza3NfX2xpc3QnKTtcbmNvbnN0IGNvbG9yQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvbG9yX19jaGFuZ2UnKTtcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4vLyBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbmNvbnN0IHBpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1pbnB1dC1idG4nKTtcbmNvbnN0IHRhc2tzRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1pbnB1dGUtZm9ybScpO1xuXG5sZXQgdGFza1RvRWRpdElkID0gbnVsbDtcbmNvbnN0IHNlbGVjdGVkVGFza3NBcnIgPSBbXTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INCy0YvQsdGA0LDQvdC90YvQtSDRgdC10LvQtdC60YLQtdC0INGC0LDRgdC6XG5jb25zdCBjbG9zZUVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1lcnJvcicpO1xuY29uc3QgY2xvc2VFcnJvcldpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1lcnJvci1mb3JtJyk7XG4vL9C+0LrQvdC+INC+0YjQuNCx0LrQuFxuY29uc3QgY3JlYXRlVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1hZGRUYXNrJyk7XG4vL9GB0L7Qt9C00LDQvdC40LUg0LbQu9C10LzQtdC90YLQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcbmNvbnN0IGluZm9CbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1pbmZvJyk7XG5jb25zdCBjbGVhckFsbFRhc2tzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNsZWFyX19idG4nKTtcbmNvbnN0IGNsZWFyT25seUNoZWNrZWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2xlYXJDaGVja2VkJyk7XG5cbmxldCB0YXNrc0FyciA9IFtdO1xuLy/QvNCw0YHRgdC40LIg0LfQsNC00LDRh1xuY29uc3QgdGFza01vY2sgPSB7IGlkOiAnYXNkYXMnLCB2YWx1ZTogJycsIHN0YXR1czogJ2lucHJvZ3Jlc3MnLCB0aW1lOiAzNjAwIH07XG5cbmZ1bmN0aW9uIGVycm9yQ29udHJvbGxlcihtZXNzYWdlKSB7XG5cdGNvbnNvbGUubG9nKCdtZXNzYWdlJyk7XG5cdC8vIGRpc3BsYXkgYmxvY2sg0L3QsCDRjdC70LXQvNC10L3RgiDQvdC+0YLQuNGE0LDQutCw0YbQuNC4XG5cdC8vINCyINC00LjQsiDRgdC+0L7QsdGJ0LXQvdC40LUgbWVzc2FnZVxufVxuXG5jb25zdCBlZGl0ZVRhc2tQYXJyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhc2tzX19saXN0Jyk7XG4vL9GA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LfQsNC00LDRh1xuY29uc3QgZWRpdFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYWN0aXZlLWVkaXRlLWJ0bicpO1xuLy8gLy/RgNC10LTQsNC60YLRgNC40YDQvtCy0LDQvdC40LUg0LfQsNC00LDRh9C4XG5jb25zdCBzaG93UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcG9wdXAnKTtcbi8vcG9wdXAg0L/QvtC60LDQt9Cw0YLRjFxuY29uc3QgY2xvc2VQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wb3B1cF9fY2xvc2UnKTtcbi8v0LfQsNC60YDRi9GC0YwgcG9wdXBcbmNvbnN0IGFjY2VwdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBvcHVwX19hY2NlcHQnKTtcbi8v0L/RgNC40L3Rj9GC0Ywg0LjQt9C80LXQvdC10L3QuNGPXG5jb25zdCB0YWtlQ29yclRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcG9wdXBfX2lucHV0Jyk7XG50YWtlQ29yclRhc2suYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG5cdGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuXHRcdGFjY2VwdE5ldyhlKTtcblx0fVxufSk7XG4vL9Cy0LfRj9GC0Ywg0YLQtdC60YHRgiDQuNC3IHBvcHVwXG5jb25zdCB0YXNrc0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWRlc2NyX19jb3VudCcpO1xuLy/QutC+0LvQuNGH0LXRgdGC0LLQviDQvtGC0L7QsdGA0LDQttC10L3QvdGL0YUg0LfQsNC00LDRh1xuXG4vL9C60L7Qu9C40YfQtdGB0YLQstC+INCy0YvQv9C+0LvQvdC10L3QvdGL0YUg0LfQsNC00LDRh1xuXG5jb25zdCBhZGRDbGVhckNoZWNrZWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2xlYXJfX2NoZWNrZWQnKTtcbi8v0LrQvdC+0L/QutCwINGD0LTQsNC70LXQvdC40Y8g0LLRi9Cx0YDQsNC90L3Ri9GFINGN0LvQtdC80LXQvdGC0L7QslxuXG5jb25zdCB0aW1lckFwZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhc2tfX2NvdW50ZXItdGltZXInKTtcblxuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdGl0bGUtdGV4dC1tYWluJyk7XG5cbi8vX19fX19fX19fX19fX19DTElDS1xucGluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTmV3VGFzayk7IC8v0LrQu9C40LogPmFkZCA+0L/RgNC+0LLQtdGA0Y/QtdC8INC/0L7Qu9C1INCy0L7QvtC00LBcbnRhc2tzRm9ybS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcblx0aWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG5cdFx0YWRkTmV3VGFzayhlKTtcblx0fVxufSk7IC8vINC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwIEVudGVyXG5jbG9zZUVycm9yTWVzc2FnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlRXJyb3IpOyAvLyDQt9Cw0LrRgNGL0YLQuNC1INC+0LrQvdCwINC+0YjQuNCx0LrQuFxuY2xlYXJBbGxUYXNrc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyQWxsVGFza3MpOyAvL9C60L3QvtC/0LrQsCDQt9Cw0LrRgNGL0YLRjCDQstGB0LVcbmVkaXRlVGFza1BhcnJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUG9wdXApO1xuZWRpdGVUYXNrUGFycmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoYW5nZVN0YXR1cyk7XG4vLyDQutC+0LPQtNCwINC60LDRgNGC0L7Rh9C60LAgZGl2INCy0LzQvtC90LjRgtGA0L7QstCw0L3QvdCwINCyINGB0YLRgNCw0L3QuNGG0YMg0LTQvtCx0LDQstC70Y/QtdC8INC40LLQtdC90YIg0L3QsCDRg9C00LDQu9C10L3QuNC1XG5jcmVhdGVUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsaXRlT25lVGFzayk7IC8v0LrQu9C40LogPmFkZD5kZWxpdGUgMSB0YXNrXG5cbi8vX19fX19fX19fX19fX0NMSUNLUyBFTkRfX19fX19cblxuZnVuY3Rpb24gdXVpZHY0KCkge1xuXHRyZXR1cm4gJ3h4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG5cdFx0dmFyIHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDAsXG5cdFx0XHR2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMpIHwgMHg4O1xuXHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFNlY29uZHMoc2Vjb25kcykge1xuXHRjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xuXHRjb25zdCByZW1haW5pbmdTZWNvbmRzID0gc2Vjb25kcyAlIDYwO1xuXHRjb25zdCBmb3JtYXR0ZWRNaW51dGVzID0gbWludXRlcyA8IDEwID8gYDAke21pbnV0ZXN9YCA6IGAke21pbnV0ZXN9YDtcblx0Y29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9XG5cdFx0cmVtYWluaW5nU2Vjb25kcyA8IDEwID8gYDAke3JlbWFpbmluZ1NlY29uZHN9YCA6IGAke3JlbWFpbmluZ1NlY29uZHN9YDtcblx0cmV0dXJuIGAke2Zvcm1hdHRlZE1pbnV0ZXN9OiR7Zm9ybWF0dGVkU2Vjb25kc31gO1xufVxuXG4vL9C00L7QsdCw0LLQu9C10L3QuNC1INC90L7QstC+0Lkg0LfQsNC00LDRh9C4XG5cbmZ1bmN0aW9uIGFkZE5ld1Rhc2soZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0aWYgKHRhc2tzRm9ybS52YWx1ZSA9PT0gJycpIHtcblx0XHQvLyBjbG9zZUVycm9yV2luZG93LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlcl9fdGl0bGUtdGV4dC1lcnJvcicpO1xuXHRcdGNsb3NlRXJyb3JXaW5kb3cuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX190aXRsZS10ZXh0LWVycm9yLWFjdGl2ZScpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IHRhc2tJZCA9IHV1aWR2NCgpO1xuXHRcdGNvbnN0IGlucHV0VGV4dCA9IHRhc2tzRm9ybS52YWx1ZTtcblx0XHRjb25zdCB0YXNrT2JqID0ge1xuXHRcdFx0aWQ6IHRhc2tJZCxcblx0XHRcdHZhbHVlOiBpbnB1dFRleHQsXG5cdFx0XHR0aW1lOiAwLFxuXHRcdH07XG5cdFx0dGFza3NBcnIucHVzaCh0YXNrT2JqKTtcblx0XHR0YXNrc0Zvcm0udmFsdWUgPSAnJztcblx0XHRjb25zdCBjdXJyZW50VGFzayA9IHRhc2tzQXJyLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRhc2tJZCk7XG5cblx0XHRpbmZvQmxvY2suY2xhc3NMaXN0LmFkZCgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cblx0XHRjb25zdCB0YXNrSHRtbCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ0YXNrX19hY3RpdmUgdGFza19fc3R5bGUganMtdGFza3NfX2FjdGl2ZSBqcy10YXNrLSR7Y3VycmVudFRhc2suaWR9XCIgZGF0YS1ibG9ja0lkPVwiJHt0YXNrSWR9XCIgaWQ9XCJhY3RpdmVcIj5cblxuXHRcdFx0XHQ8YSBjbGFzcz1cInRhc2tfX2FjdGl2ZS1jb3VudGVyIGpzLXRhc2tfX2NvdW50ZXJcIiBocmVmPVwiI1wiPlxuXHRcdFx0XHQgICAgPHNwYW4gY2xhc3M9XCJzdGFydC10ZXh0XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj5zdGFydDwvc3Bhbj5cblx0XHRcdFx0ICAgIDxzcGFuIGNsYXNzPVwicGF1c2UtdGV4dFwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPnBhdXNlPC9zcGFuPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0YXNrX19hY3RpdmUtdGltZXIganMtdGFza19fY291bnRlci10aW1lclwiPiAwMDowMDwvZGl2PlxuXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0YXNrX19hY3RpdmUtdGV4dFwiPlxuXHRcdFx0XHRcdCR7aW5wdXRUZXh0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRhc2tfX2FjdGl2ZS1jaGVja1wiPlxuXG5cdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInRhc2tfX2FjdGl2ZS1jaGVjay1idG5cIiBkYXRhLWlkZGQ9XCIke3Rhc2tJZH1cIj5cblx0XHRcdFx0XHRcdERlbGV0ZVxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRjbGFzcz1cInRhc2tfX2FjdGl2ZS1lZGl0ZS1idG4ganMtYWN0aXZlLWVkaXRlLWJ0biBqcy1lZGl0ZUJ0blwiXG5cdFx0XHRcdFx0ZGF0YS1pZGRkPVwiJHt0YXNrSWR9XCJcblx0XHRcdFx0XHRpZD1cImVkaXRlQnRuXCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdEVkaXRcblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwidGFza19fYWN0aXZlLWNoZWNrLWNoZWNrIGpzLXRhc2tfX2FjdGl2ZS1jaGVja1wiIHR5cGU9XCJjaGVja2JveFwiICAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHRjcmVhdGVUYXNrLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHRhc2tIdG1sKTtcblxuXHRcdGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdGBbZGF0YS1ibG9ja0lkPVwiJHt0YXNrSWR9XCJdIC5qcy10YXNrX19jb3VudGVyYFxuXHRcdCk7XG5cdFx0Y29uc3Qgc3RhcnRUZXh0ID0gc3RhcnRCdXR0b24ucXVlcnlTZWxlY3RvcignLnN0YXJ0LXRleHQnKTtcblx0XHRjb25zdCBwYXVzZVRleHQgPSBzdGFydEJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcucGF1c2UtdGV4dCcpO1xuXG5cdFx0bGV0IGlzUnVuVGltZXIgPSBmYWxzZTtcblx0XHRsZXQgdGltZXJJbnRlcnZhbCA9IG51bGw7XG5cblx0XHRjb25zdCB1cGRhdGVUYXNrVGltZSA9ICgpID0+IHtcblx0XHRcdGN1cnJlbnRUYXNrLnRpbWUgKz0gMTtcblx0XHRcdGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBmb3JtYXRTZWNvbmRzKGN1cnJlbnRUYXNrLnRpbWUpO1xuXHRcdFx0Y29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0XHRgLmpzLXRhc2stJHtjdXJyZW50VGFzay5pZH0gLmpzLXRhc2tfX2NvdW50ZXItdGltZXJgXG5cdFx0XHQpO1xuXHRcdFx0dGltZXIuaW5uZXJIVE1MID0gZm9ybWF0dGVkVGltZTtcblx0XHR9O1xuXG5cdFx0c3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKCFpc1J1blRpbWVyKSB7XG5cdFx0XHRcdGlzUnVuVGltZXIgPSB0cnVlO1xuXHRcdFx0XHRzdGFydFRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0cGF1c2VUZXh0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHR0aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwodXBkYXRlVGFza1RpbWUsIDEwMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ3BhdXNlIFRpbWVyJyk7XG5cdFx0XHRcdGlzUnVuVGltZXIgPSBmYWxzZTtcblx0XHRcdFx0c3RhcnRUZXh0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHRwYXVzZVRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNsZWFyQWxsVGFza3NCdG4uY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cdFx0Y2xlYXJBbGxUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKCdqcy12aXNpYmlsaXR5LWFwcGVhcicpO1xuXG5cdFx0Y291bnRPZlRhc2tzKCk7XG5cdFx0Y29uc3QgZm9ybUNvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhc2tzX19hY3RpdmUnKTtcblx0XHRjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcblxuXHRcdGlmICh3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnanMtY29sb3JfX2NvbnRlbnQnKSkge1xuXHRcdFx0Y29uc3QgdGFza0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9ja0lkPVwiJHt0YXNrSWR9XCJdYCk7XG5cdFx0XHR0YXNrQ2FyZC5jbGFzc0xpc3QuYWRkKCd0YXNrX19zdHlsZS1kYXJrJyk7XG5cdFx0fVxuXHRcdGNsb3NlRXJyb3JXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX190aXRsZS10ZXh0LWVycm9yLWFjdGl2ZScpO1xuXHR9XG59XG5cbi8vPT09PT09PT09PT09Q0hFQ0sgS09MT1JcbmZ1bmN0aW9uIGNoYW5nZVRhc2tDb2xvcigpIHtcblx0Y29uc3QgdGFza0NvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgpO1xufVxuXG5mdW5jdGlvbiBjbG9zZUVycm9yKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdDtcblx0Y2xvc2VFcnJvcldpbmRvdy5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmlsaXR5LWFwcGVhcicpO1xufVxuXG5mdW5jdGlvbiBjbGVhckFsbFRhc2tzKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHR0YXNrc0FyciA9IFtdO1xuXHRjcmVhdGVUYXNrLmlubmVySFRNTCA9ICcnO1xuXHRjbGVhckFsbFRhc2tzQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cblx0Y2xlYXJBbGxUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKCdqcy12aXNpYmlsaXR5LWhpZGUnKTtcblxuXHRpbmZvQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cblx0aW5mb0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cblx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cblx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXG5cdGNsZWFyT25seUNoZWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1hcHBlYXInKTtcblx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXG5cdGNvdW50T2ZUYXNrcygpO1xufVxuXG4vLyArPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PXN0c3J0XG5jbG9zZVBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHNob3dQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXG5cbmZ1bmN0aW9uIHB1c2hDb3JyVGV4dCgpIHtcblx0cmV0dXJuIHRha2VDb3JyVGFzay52YWx1ZTtcbn1cblxuLy/QlNC+0LHQsNCy0LvQtdC90LjQtdC1INC60L7Qu9C40YfQtdGB0YLQstCwINC30LDQtNCw0YcgKNGH0LjRgdC70L7QvClcbmZ1bmN0aW9uIGNvdW50T2ZUYXNrcygpIHtcblx0aWYgKHRhc2tzQXJyLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRhc2tzQ291bnQuaW5uZXJIVE1MID0gJ1RvZGF5OiBObyB0YXNrcyAmIzEyODU2NDsnO1xuXHR9IGVsc2Uge1xuXHRcdHRhc2tzQ291bnQuaW5uZXJIVE1MID0gYFRvZGF5OiAke3Rhc2tzQXJyLmxlbmd0aH1gO1xuXHR9XG59XG5cbmNvdW50T2ZUYXNrcygpO1xuXG5mdW5jdGlvbiBmaW5kVGFza09iamVjdChpZFRvRmluZCkge1xuXHRyZXR1cm4gdGFza3NBcnIuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWRUb0ZpbmQpO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VTdGF0dXMoZSkge1xuXHRjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cdGxldCBpc0NoZWNrZWQgPSBmYWxzZTtcblx0Y29uc3QgY2hlY2tib3ggPSBlLnRhcmdldC5jbG9zZXN0KCcuanMtdGFza19fYWN0aXZlLWNoZWNrJyk7XG5cdGNvbnN0IHBhcmVudCA9IGNoZWNrYm94LmNsb3Nlc3QoJy5qcy10YXNrc19fYWN0aXZlJyk7XG5cdGNvbnN0IHNlbGVjdGVkVGFzayA9IGZpbmRUYXNrT2JqZWN0KHBhcmVudC5kYXRhc2V0LmJsb2NraWQpO1xuXG5cdGlmIChjaGVja2JveCkge1xuXHRcdGlmICghd3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWNvbG9yX19jb250ZW50JykpIHtcblx0XHRcdGlmIChjaGVja2JveC5jaGVja2VkKSB7XG5cdFx0XHRcdHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrX19zdHlsZScpO1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LmFkZCgndGFza19fc3R5bGUtY2hlY2tlZCcpO1xuXG5cdFx0XHRcdGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgndGFza19fc3R5bGUtY2hlY2tlZCcpO1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LmFkZCgndGFza19fc3R5bGUnKTtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyhzZWxlY3RlZFRhc2ssICd1blNlbGVjdGVkVGFzaycpO1xuXHRcdFx0XHRjaGVja2JveC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChjaGVja2JveGVzW2ldLmNoZWNrZWQpIHtcblx0XHRcdFx0XHRpc0NoZWNrZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNDaGVja2VkKSB7XG5cdFx0XHRcdGFkZENsZWFyQ2hlY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmlsaXR5LWhpZGUnKTtcblx0XHRcdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1hcHBlYXInKTtcblx0XHRcdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAod3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWNvbG9yX19jb250ZW50JykpIHtcblx0XHRcdHBhcmVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJyMxNzE2MTYnO1xuXHRcdFx0aWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcblx0XHRcdFx0cGFyZW50LnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgndGFza19fc3R5bGUnKTtcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2tfX3N0eWxlLWRhcmsnKTtcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlLWRhcmstY2hlY2tlZCcpO1xuXHRcdFx0XHRjaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGFyZW50LnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuXHRcdFx0XHRwYXJlbnQuc3R5bGUuYmFja2dyb3VuZCA9ICcjMTcxNjE2Jztcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2tfX3N0eWxlJyk7XG5cdFx0XHRcdHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrX19zdHlsZS1kYXJrLWNoZWNrZWQnKTtcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlLWRhcmsnKTtcblx0XHRcdFx0Y2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGNoZWNrYm94ZXNbaV0uY2hlY2tlZCkge1xuXHRcdFx0XHRcdGlzQ2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChpc0NoZWNrZWQpIHtcblx0XHRcdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXHRcdFx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LmFkZCgnanMtdmlzaWJpbGl0eS1hcHBlYXInKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFkZENsZWFyQ2hlY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmlsaXR5LWFwcGVhcicpO1xuXHRcdFx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LmFkZCgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHtcblx0XHR9XG5cdH1cbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBvcGVuUG9wdXAoZSkge1xuXHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1lZGl0ZUJ0bicpKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRhc2tUb0VkaXRJZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRkZDtcblx0XHRzaG93UG9wdXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRjb25zdCBpbnB1dFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBvcHVwX19pbnB1dCcpO1xuXHRcdGNvbnN0IGVkaXRWYWx1ZSA9IGZpbmRUYXNrT2JqZWN0KHRhc2tUb0VkaXRJZCk7XG5cdFx0aW5wdXRQb3B1cC52YWx1ZSA9IGVkaXRWYWx1ZS52YWx1ZTtcblxuXHRcdGlucHV0UG9wdXAuZm9jdXMoKTtcblx0fVxufVxuXG5hY2NlcHRQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFjY2VwdE5ldyk7XG5cbmZ1bmN0aW9uIGFjY2VwdE5ldyhlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblx0Y29uc3QgaW5wdXRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wb3B1cF9faW5wdXQnKTtcblx0Y29uc3QgdXBkYXRlVGFza0FycmF5ID0gdGFza3NBcnIubWFwKChpdGVtKSA9PiB7XG5cdFx0aWYgKGl0ZW0uaWQgPT09IHRhc2tUb0VkaXRJZCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aWQ6IHRhc2tUb0VkaXRJZCxcblx0XHRcdFx0dmFsdWU6IGlucHV0UG9wdXAudmFsdWUsXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdH0pO1xuXHR0YXNrc0FyciA9IHVwZGF0ZVRhc2tBcnJheTtcblxuXHRjb25zdCB0YXNrVGV4dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdGBbZGF0YS1ibG9ja0lkPVwiJHt0YXNrVG9FZGl0SWR9XCJdIC50YXNrX19hY3RpdmUtdGV4dGBcblx0KTtcblx0dGFza1RleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0UG9wdXAudmFsdWU7XG5cdHNob3dQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHR0aW1lQ291bnRlcihlKTtcbn1cblxuZnVuY3Rpb24gZGVsaXRlT25lVGFzayhlKSB7XG5cdGNvbnN0IGRlbGV0ZUJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJy50YXNrX19hY3RpdmUtY2hlY2stYnRuJyk7XG5cdGlmIChkZWxldGVCdG4pIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgdGFza0lkID0gZGVsZXRlQnRuLmRhdGFzZXQuaWRkZDtcblx0XHR0YXNrc0FyciA9IHRhc2tzQXJyLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gdGFza0lkKTtcblx0XHRjb25zdCBibG9ja1RvRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2tJZD1cIiR7dGFza0lkfVwiXWApO1xuXHRcdGlmIChibG9ja1RvRGVsZXRlKSB7XG5cdFx0XHRibG9ja1RvRGVsZXRlLnJlbW92ZSgpO1xuXHRcdFx0Y291bnRPZlRhc2tzKCk7IC8vINGD0LTQsNC70Y/QtdC8INC30LDQtNCw0YfRgyDRgdC+INGB0YLRgNCw0L3QuNGG0Ytcblx0XHR9XG5cdH1cbn1cblxuY2xlYXJPbmx5Q2hlY2tlZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyQ2hlY2tlZFRhc2tzKTtcblxuZnVuY3Rpb24gY2xlYXJDaGVja2VkVGFza3MoKSB7XG5cdGNvbnN0IGNoZWNrZWRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0Jy5qcy10YXNrX19hY3RpdmUtY2hlY2s6Y2hlY2tlZCdcblx0KTtcblxuXHRjaGVja2VkSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXHRcdGNvbnN0IHRhc2tJdGVtID0gaXRlbS5jbG9zZXN0KCcuanMtdGFza3NfX2FjdGl2ZScpO1xuXHRcdGNvbnN0IHRhc2tJZCA9IHRhc2tJdGVtLmRhdGFzZXQuYmxvY2tpZDtcblx0XHR0YXNrSXRlbS5yZW1vdmUoKTtcblx0XHR0YXNrc0FyciA9IHRhc2tzQXJyLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gdGFza0lkKTtcblx0fSk7XG5cblx0Y291bnRPZlRhc2tzKCk7XG5cblx0Y29uc3QgYWN0aXZlVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YXNrc19fYWN0aXZlJyk7XG5cblx0aWYgKCFhY3RpdmVUYXNrKSB7XG5cdFx0Y2xlYXJBbGxUYXNrc0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmlsaXR5LWJsb2NrJyk7XG5cblx0XHRjbGVhckFsbFRhc2tzQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXG5cdFx0aW5mb0Jsb2NrLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cblx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LmFkZCgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cdH1cblxuXHRjb25zdCBjaGVja2VkSXRlbXNMZW5ndGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdCcudGFza19fYWN0aXZlLWNoZWNrIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkJ1xuXHQpO1xuXHRpZiAoY2hlY2tlZEl0ZW1zTGVuZ3RoLmxlbmd0aCA+IDApIHtcblx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnanMtdmlzaWJpbGl0eS1oaWRlJyk7XG5cdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cdH0gZWxzZSB7XG5cdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLXZpc2liaWxpdHktYXBwZWFyJyk7XG5cdFx0YWRkQ2xlYXJDaGVja2VkQnRuLmNsYXNzTGlzdC5hZGQoJ2pzLXZpc2liaWxpdHktaGlkZScpO1xuXHR9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PVNFVCBUSU1FUj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YXNrX19jb3VudGVyJyk7XG5cbmNvbG9yQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRjb25zdCBwYXJyZW50Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFza3NfX2xpc3QnKTtcblx0Y29uc3QgY2FyZHNJbnNpZGUgPSBwYXJyZW50Q2FyZHMucXVlcnlTZWxlY3RvcignLmpzLXRhc2tzX19hY3RpdmUnKTtcblx0Ym9keS5jbGFzc0xpc3QudG9nZ2xlKCdqcy1jb2xvcl9fY29udGVudCcpO1xuXHR3cmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoJ2pzLWNvbG9yX19jb250ZW50Jyk7XG5cdGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhc2tfX2FjdGl2ZS1jaGVjaycpO1xuXG5cdGNvbnN0IGRlc2NyTGluZUNvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc2NyX19saW5lJyk7XG5cdGNvbnN0IGluZm9MaW5lQ29sb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mbycpO1xuXG5cdC8vIGNvbnN0IGNvbG9yQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvbG9yX19jaGFuZ2UnKVxuXG5cdGlmICh3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnanMtY29sb3JfX2NvbnRlbnQnKSkge1xuXHRcdGRlc2NyTGluZUNvbG9yLmNsYXNzTGlzdC50b2dnbGUoJ2pzLWRlc2NyLWNvbG9yJyk7XG5cdFx0aW5mb0xpbmVDb2xvci5jbGFzc0xpc3QudG9nZ2xlKCdqcy1kZXNjci1jb2xvcicpO1xuXHRcdGNvbG9yQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlcl9fdGl0bGUtY29sb3InKTtcblx0XHRjb2xvckJ0bi5jbGFzc0xpc3QuYWRkKCdkYXJrLWJ0bicpO1xuXHRcdHRpdGxlVGV4dC5jbGFzc0xpc3QuYWRkKCdoZWFkZXItdGV4dC1kYXJrJyk7XG5cdFx0Y2xlYXJBbGxUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKCdjbGVhci1idG4tZGFyaycpO1xuXHRcdGFkZENsZWFyQ2hlY2tlZEJ0bi5jbGFzc0xpc3QuYWRkKCdjbGVhci1idG4tZGFyaycpO1xuXHRcdGNsb3NlRXJyb3JXaW5kb3cuY2xhc3NMaXN0LmFkZCgnZXJyb3ItYmFja2dyb3VuZCcpO1xuXHRcdC8vLy9cblx0XHQvLy9cblx0XHQvLy9cblx0XHQvLy9cblx0fSBlbHNlIHtcblx0XHRkZXNjckxpbmVDb2xvci5jbGFzc0xpc3QudG9nZ2xlKCdqcy1kZXNjci1jb2xvcicpO1xuXHRcdGluZm9MaW5lQ29sb3IuY2xhc3NMaXN0LnRvZ2dsZSgnanMtZGVzY3ItY29sb3InKTtcblx0XHRjb2xvckJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrLWJ0bicpO1xuXHRcdGNvbG9yQnRuLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fdGl0bGUtY29sb3InKTtcblx0XHR0aXRsZVRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyLXRleHQtZGFyaycpO1xuXHRcdGNsZWFyQWxsVGFza3NCdG4uY2xhc3NMaXN0LnJlbW92ZSgnY2xlYXItYnRuLWRhcmsnKTtcblx0XHRhZGRDbGVhckNoZWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnY2xlYXItYnRuLWRhcmsnKTtcblx0XHRjbG9zZUVycm9yV2luZG93LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yLWJhY2tncm91bmQnKTtcblx0fVxuXG5cdGlmICh3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnanMtY29sb3JfX2NvbnRlbnQnKSkge1xuXHRcdGNvbnN0IGxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhc2tzX19saXN0Jyk7XG5cblx0XHRsaXN0cy5mb3JFYWNoKChsaXN0KSA9PiB7XG5cdFx0XHRjb25zdCBhY3RpdmVJdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhc2tzX19hY3RpdmUnKTtcblx0XHRcdGFjdGl2ZUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRcdFx0Y29uc3QgY2hlY2tib3ggPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5qcy10YXNrX19hY3RpdmUtY2hlY2snKTtcblx0XHRcdFx0aWYgKGNoZWNrYm94ICYmIGNoZWNrYm94LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2tfX3N0eWxlLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlLWRhcmstY2hlY2tlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndGFza19fc3R5bGUtZGFyaycpO1xuXHRcdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LmFkZCgndGFza19fc3R5bGUtZGFyaycpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBsaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10YXNrc19fbGlzdCcpO1xuXG5cdFx0bGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuXHRcdFx0Y29uc3QgYWN0aXZlSXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10YXNrc19fYWN0aXZlJyk7XG5cdFx0XHRhY3RpdmVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNoZWNrYm94ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuanMtdGFza19fYWN0aXZlLWNoZWNrJyk7XG5cdFx0XHRcdGlmIChjaGVja2JveCAmJiBjaGVja2JveC5jaGVja2VkKSB7XG5cdFx0XHRcdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrX19zdHlsZS1kYXJrLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlLWNoZWNrZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2tfX3N0eWxlLWRhcmsnKTtcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3N0eWxlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59KTtcbiIsInZhciBkZWZhdWx0V2lkdGggPSAxNDQwLFxuICBkZWZhdWx0Rm9udCA9IDE2LFxuICBtb2JpbGVGb250ID0gMTYsXG4gIG1pbldpZHRoID0gNzY4LFxuICBtaW5IZWlnaHQgPSA2MDAsXG4gIGRlZmF1bHRIZWlnaHQgPSA5MDA7XG5cbmZ1bmN0aW9uIGZTaXplKGRldmljZSwgdlcsIHZIKSB7XG4gIGlmICh2VyA8PSAzNzQpIHtcbiAgICByZXR1cm4gMTM7XG4gIH1cblxuICByZXR1cm4gZGV2aWNlXG4gICAgPyBtb2JpbGVGb250XG4gICAgOiBkZWZhdWx0Rm9udCAqXG4gICAgICAgIE1hdGgubWluKFxuICAgICAgICAgIE1hdGgubWF4KG1pbldpZHRoLCB2VykgLyBkZWZhdWx0V2lkdGgsXG4gICAgICAgICAgTWF0aC5tYXgobWluSGVpZ2h0LCB2SCkgLyBkZWZhdWx0SGVpZ2h0XG4gICAgICAgICk7XG59XG5cbmZ1bmN0aW9uIG1vZGlmaWVyRGV2aWNlKCkge1xuICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgdmFyIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgdmFyIGlzTW9iaWxlID0gd2luZG93V2lkdGggPD0gNzY3O1xuXG4gIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9XG4gICAgICBmU2l6ZShpc01vYmlsZSwgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCkgKyBcInB4XCI7XG4gIH1cblxuICBpZiAoaXNNb2JpbGUpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vYmlsZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1vYmlsZVwiKTtcbiAgfVxufVxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICBtb2RpZmllckRldmljZSgpO1xufTtcblxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICBtb2RpZmllckRldmljZSgpO1xufTtcblxubW9kaWZpZXJEZXZpY2UoKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO1xuXG5cblxucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQyFET0NUWVBFIGh0bWxcXHUwMDNFXFx1MDAzQ2h0bWwgbGFuZz1cXFwiZW5cXFwiXFx1MDAzRVxcdTAwM0NoZWFkXFx1MDAzRVxcdTAwM0NtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIlxcdTAwM0VcXHUwMDNDbWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCJcXHUwMDNFXFx1MDAzQ21ldGEgaHR0cC1lcXVpdj1cXFwiWC1VQS1Db21wYXRpYmxlXFxcIiBjb250ZW50PVxcXCJpZT1lZGdlXFxcIlxcdTAwM0VcXHUwMDNDbGlua1wiICsgKFwiIHJlbD1cXFwic2hvcnRjdXQgaWNvblxcXCJcIitwdWcuYXR0cihcImhyZWZcIiwgcmVxdWlyZShgLi4vYXNzZXRzL2ltYWdlcy9mYXZpY29uLnBuZ2ApLCB0cnVlLCB0cnVlKStcIiB0eXBlPVxcXCJpbWFnZVxcdTAwMkZwbmdcXFwiXCIpICsgXCJcXHUwMDNFXFx1MDAzQ3RpdGxlXFx1MDAzRUVtcHR5IFByb2plY3RcXHUwMDNDXFx1MDAyRnRpdGxlXFx1MDAzRVxcdTAwM0NcXHUwMDJGaGVhZFxcdTAwM0VcXHUwMDNDYm9keVxcdTAwM0UgXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY29udGVudCBjYXJkXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJwb3B1cCBqcy1wb3B1cFxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwicG9wdXBfX3dpbmRvd1xcXCJcXHUwMDNFXFx1MDAzQ2lucHV0IGNsYXNzPVxcXCJwb3B1cF9faW5wdXQganMtcG9wdXBfX2lucHV0XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRWRpdGUgWW91ciB0YXNrXFxcIlxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJwb3B1cF9fY2xvc2UganMtcG9wdXBfX2Nsb3NlXFxcIlxcdTAwM0VjbG9zZVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcInBvcHVwX19hY2NlcHQganMtcG9wdXBfX2FjY2VwdFxcXCJcXHUwMDNFYWNjZXB0XFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwid3JhcHBlciBqcy10aGVtZUNoYW5nZVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwicGFnZVxcXCJcXHUwMDNFXFx1MDAzQ2hlYWRlciBjbGFzcz1cXFwiaGVhZGVyXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJoZWFkZXJfX3RpdGxlXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJoZWFkZXJfX3RpdGxlLWNvbG9yIGpzLWNvbG9yX19jaGFuZ2VcXFwiXFx1MDAzRUNvbG9yXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiaGVhZGVyX190aXRsZS10ZXh0XFxcIlxcdTAwM0VcXHUwMDNDcCBjbGFzcz1cXFwiaGVhZGVyX190aXRsZS10ZXh0LW1haW5cXFwiXFx1MDAzRUhlbGxvICEgV3JpdGUgeW91ciB0YXNrXFx1MDAzQ1xcdTAwMkZwXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImhlYWRlcl9fdGl0bGUtZXJyb3JcXFwiXFx1MDAzRVxcdTAwM0NwIGNsYXNzPVxcXCJoZWFkZXJfX3RpdGxlLXRleHQtZXJyb3IganMtZXJyb3ItZm9ybVxcXCJcXHUwMDNFV3JpdGUgeW91ciB0YXNrIGZpcnN0XFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwiaGVhZGVyX190aXRsZS10ZXh0LWVycm9yLWNsb3NlXFxcIiBpZD1cXFwianMtZXJyb3JcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGcFxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJoZWFkZXJfX2Zvcm1cXFwiXFx1MDAzRVxcdTAwM0NpbnB1dCBjbGFzcz1cXFwiaGVhZGVyX19mb3JtLWlucHV0ZSBqcy1pbnB1dGUtZm9ybVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkhlcmUuLi5cXFwiXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImhlYWRlcl9fZm9ybS1idG5cXFwiIGlkPVxcXCJqcy1pbnB1dC1idG5cXFwiXFx1MDAzRVBpblxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGaGVhZGVyXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImRlc2NyXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJkZXNjcl9fbGluZVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiZGVzY3JfX2NvdW50IGpzLWRlc2NyX19jb3VudFxcXCJcXHUwMDNFVG9kYXk6XFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiaW5mbyBqcy1pbmZvXFxcIlxcdTAwM0VBZGQgeW91ciBmaXJzdCB0YXNrXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwidGFza3NcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcInRhc2tzX19saXN0IGpzLXRhc2tzX19saXN0XFxcIiBpZD1cXFwianMtYWRkVGFza1xcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY2xlYXJcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNsZWFyX19idG4ganMtY2xlYXJfX2J0biBqcy12aXNpYmlsaXR5LWhpZGVcXFwiXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImNsZWFyX19idG4tYWxsIGNsZWFyQWxsXFxcIlxcdTAwM0VDbGVhciBBbGxcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJjbGVhcl9fYnRuIGpzLWNsZWFyX19jaGVja2VkIGpzLXZpc2liaWxpdHktaGlkZSBqcy1jbGVhckNoZWNrZWRcXFwiXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImNsZWFyX19idG4tY2hlY2tlZCBjbGVhckNoZWNrZWRcXFwiXFx1MDAzRUNsZWFyIERvbmVcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDc2NyaXB0IHNyYz1cXFwiXFx1MDAyRnNjLmpzXFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRnNjcmlwdFxcdTAwM0VcXHUwMDNDXFx1MDAyRmJvZHlcXHUwMDNFXFx1MDAzQ1xcdTAwMkZodG1sXFx1MDAzRVwiOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVnX2hhc19vd25fcHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBwdWdfbWVyZ2U7XG5mdW5jdGlvbiBwdWdfbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IHB1Z19tZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzJykge1xuICAgICAgdmFyIHZhbEEgPSBhW2tleV0gfHwgW107XG4gICAgICBhW2tleV0gPSAoQXJyYXkuaXNBcnJheSh2YWxBKSA/IHZhbEEgOiBbdmFsQV0pLmNvbmNhdChiW2tleV0gfHwgW10pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICB2YXIgdmFsQSA9IHB1Z19zdHlsZShhW2tleV0pO1xuICAgICAgdmFsQSA9IHZhbEEgJiYgdmFsQVt2YWxBLmxlbmd0aCAtIDFdICE9PSAnOycgPyB2YWxBICsgJzsnIDogdmFsQTtcbiAgICAgIHZhciB2YWxCID0gcHVnX3N0eWxlKGJba2V5XSk7XG4gICAgICB2YWxCID0gdmFsQiAmJiB2YWxCW3ZhbEIubGVuZ3RoIC0gMV0gIT09ICc7JyA/IHZhbEIgKyAnOycgOiB2YWxCO1xuICAgICAgYVtrZXldID0gdmFsQSArIHZhbEI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBhcnJheSwgb2JqZWN0LCBvciBzdHJpbmcgYXMgYSBzdHJpbmcgb2YgY2xhc3NlcyBkZWxpbWl0ZWQgYnkgYSBzcGFjZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhbiBhcnJheSwgYWxsIG1lbWJlcnMgb2YgaXQgYW5kIGl0cyBzdWJhcnJheXMgYXJlIGNvdW50ZWQgYXNcbiAqIGNsYXNzZXMuIElmIGBlc2NhcGluZ2AgaXMgYW4gYXJyYXksIHRoZW4gd2hldGhlciBvciBub3QgdGhlIGl0ZW0gaW4gYHZhbGAgaXNcbiAqIGVzY2FwZWQgZGVwZW5kcyBvbiB0aGUgY29ycmVzcG9uZGluZyBpdGVtIGluIGBlc2NhcGluZ2AuIElmIGBlc2NhcGluZ2AgaXNcbiAqIG5vdCBhbiBhcnJheSwgbm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhbiBvYmplY3QsIGFsbCB0aGUga2V5cyB3aG9zZSB2YWx1ZSBpcyB0cnV0aHkgYXJlIGNvdW50ZWQgYXNcbiAqIGNsYXNzZXMuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYSBzdHJpbmcsIGl0IGlzIGNvdW50ZWQgYXMgYSBjbGFzcy4gTm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBAcGFyYW0geyhBcnJheS48c3RyaW5nPnxPYmplY3QuPHN0cmluZywgYm9vbGVhbj58c3RyaW5nKX0gdmFsXG4gKiBAcGFyYW0gez9BcnJheS48c3RyaW5nPn0gZXNjYXBpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbGFzc2VzID0gcHVnX2NsYXNzZXM7XG5mdW5jdGlvbiBwdWdfY2xhc3Nlc19hcnJheSh2YWwsIGVzY2FwaW5nKSB7XG4gIHZhciBjbGFzc1N0cmluZyA9ICcnLCBjbGFzc05hbWUsIHBhZGRpbmcgPSAnJywgZXNjYXBlRW5hYmxlZCA9IEFycmF5LmlzQXJyYXkoZXNjYXBpbmcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgIGNsYXNzTmFtZSA9IHB1Z19jbGFzc2VzKHZhbFtpXSk7XG4gICAgaWYgKCFjbGFzc05hbWUpIGNvbnRpbnVlO1xuICAgIGVzY2FwZUVuYWJsZWQgJiYgZXNjYXBpbmdbaV0gJiYgKGNsYXNzTmFtZSA9IHB1Z19lc2NhcGUoY2xhc3NOYW1lKSk7XG4gICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBjbGFzc05hbWU7XG4gICAgcGFkZGluZyA9ICcgJztcbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlc19vYmplY3QodmFsKSB7XG4gIHZhciBjbGFzc1N0cmluZyA9ICcnLCBwYWRkaW5nID0gJyc7XG4gIGZvciAodmFyIGtleSBpbiB2YWwpIHtcbiAgICBpZiAoa2V5ICYmIHZhbFtrZXldICYmIHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwodmFsLCBrZXkpKSB7XG4gICAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgcGFkZGluZyArIGtleTtcbiAgICAgIHBhZGRpbmcgPSAnICc7XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGFzc1N0cmluZztcbn1cbmZ1bmN0aW9uIHB1Z19jbGFzc2VzKHZhbCwgZXNjYXBpbmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIHJldHVybiBwdWdfY2xhc3Nlc19hcnJheSh2YWwsIGVzY2FwaW5nKTtcbiAgfSBlbHNlIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbCB8fCAnJztcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgb2JqZWN0IG9yIHN0cmluZyB0byBhIHN0cmluZyBvZiBDU1Mgc3R5bGVzIGRlbGltaXRlZCBieSBhIHNlbWljb2xvbi5cbiAqXG4gKiBAcGFyYW0geyhPYmplY3QuPHN0cmluZywgc3RyaW5nPnxzdHJpbmcpfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5leHBvcnRzLnN0eWxlID0gcHVnX3N0eWxlO1xuZnVuY3Rpb24gcHVnX3N0eWxlKHZhbCkge1xuICBpZiAoIXZhbCkgcmV0dXJuICcnO1xuICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgc3R5bGUgaW4gdmFsKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwodmFsLCBzdHlsZSkpIHtcbiAgICAgICAgb3V0ID0gb3V0ICsgc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdICsgJzsnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgKyAnJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gcHVnX2F0dHI7XG5mdW5jdGlvbiBwdWdfYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKHZhbCA9PT0gZmFsc2UgfHwgdmFsID09IG51bGwgfHwgIXZhbCAmJiAoa2V5ID09PSAnY2xhc3MnIHx8IGtleSA9PT0gJ3N0eWxlJykpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKCh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2YgdmFsLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhbCA9IHZhbC50b0pTT04oKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgIGlmICghZXNjYXBlZCAmJiB2YWwuaW5kZXhPZignXCInKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVxcJycgKyB2YWwucmVwbGFjZSgvJy9nLCAnJiMzOTsnKSArICdcXCcnO1xuICAgIH1cbiAgfVxuICBpZiAoZXNjYXBlZCkgdmFsID0gcHVnX2VzY2FwZSh2YWwpO1xuICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0ZXJzZSB3aGV0aGVyIHRvIHVzZSBIVE1MNSB0ZXJzZSBib29sZWFuIGF0dHJpYnV0ZXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IHB1Z19hdHRycztcbmZ1bmN0aW9uIHB1Z19hdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGF0dHJzID0gJyc7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PT0ga2V5KSB7XG4gICAgICAgIHZhbCA9IHB1Z19jbGFzc2VzKHZhbCk7XG4gICAgICAgIGF0dHJzID0gcHVnX2F0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkgKyBhdHRycztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoJ3N0eWxlJyA9PT0ga2V5KSB7XG4gICAgICAgIHZhbCA9IHB1Z19zdHlsZSh2YWwpO1xuICAgICAgfVxuICAgICAgYXR0cnMgKz0gcHVnX2F0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dHJzO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBwdWdfbWF0Y2hfaHRtbCA9IC9bXCImPD5dLztcbmV4cG9ydHMuZXNjYXBlID0gcHVnX2VzY2FwZTtcbmZ1bmN0aW9uIHB1Z19lc2NhcGUoX2h0bWwpe1xuICB2YXIgaHRtbCA9ICcnICsgX2h0bWw7XG4gIHZhciByZWdleFJlc3VsdCA9IHB1Z19tYXRjaF9odG1sLmV4ZWMoaHRtbCk7XG4gIGlmICghcmVnZXhSZXN1bHQpIHJldHVybiBfaHRtbDtcblxuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBpLCBsYXN0SW5kZXgsIGVzY2FwZTtcbiAgZm9yIChpID0gcmVnZXhSZXN1bHQuaW5kZXgsIGxhc3RJbmRleCA9IDA7IGkgPCBodG1sLmxlbmd0aDsgaSsrKSB7XG4gICAgc3dpdGNoIChodG1sLmNoYXJDb2RlQXQoaSkpIHtcbiAgICAgIGNhc2UgMzQ6IGVzY2FwZSA9ICcmcXVvdDsnOyBicmVhaztcbiAgICAgIGNhc2UgMzg6IGVzY2FwZSA9ICcmYW1wOyc7IGJyZWFrO1xuICAgICAgY2FzZSA2MDogZXNjYXBlID0gJyZsdDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjI6IGVzY2FwZSA9ICcmZ3Q7JzsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmVzdWx0ICs9IGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gICAgbGFzdEluZGV4ID0gaSArIDE7XG4gICAgcmVzdWx0ICs9IGVzY2FwZTtcbiAgfVxuICBpZiAobGFzdEluZGV4ICE9PSBpKSByZXR1cm4gcmVzdWx0ICsgaHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LCBpKTtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBwdWcgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgb3JpZ2luYWwgc291cmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBwdWdfcmV0aHJvdztcbmZ1bmN0aW9uIHB1Z19yZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBwdWdfcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ1B1ZycpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuIiwiLyogKGlnbm9yZWQpICovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybCArIFwiLi4vXCI7IiwiLy8gbnB4IHByZXR0aWVyIC0td3JpdGUgXCIqKi8qLnB1Z1wiXG5pbXBvcnQgXCIuL3Njc3MvYXBwLnNjc3NcIjtcbmltcG9ydCBcIi4vY29yZS9yZXNpemVyXCI7XG5pbXBvcnQgXCIuL2NvcmUvbWFpblwiO1xuaW1wb3J0IFwiLi92aWV3cy9pbmRleC5wdWdcIjtcbiJdLCJuYW1lcyI6WyJ3cmFwcGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5wdXRCdG4iLCJ0YXNrc0xpc3QiLCJjb2xvckJ0biIsImJvZHkiLCJwaW5CdXR0b24iLCJnZXRFbGVtZW50QnlJZCIsInRhc2tzRm9ybSIsInRhc2tUb0VkaXRJZCIsInNlbGVjdGVkVGFza3NBcnIiLCJjbG9zZUVycm9yTWVzc2FnZSIsImNsb3NlRXJyb3JXaW5kb3ciLCJjcmVhdGVUYXNrIiwiaW5mb0Jsb2NrIiwiY2xlYXJBbGxUYXNrc0J0biIsImNsZWFyT25seUNoZWNrZWRCdG4iLCJ0YXNrc0FyciIsInRhc2tNb2NrIiwiaWQiLCJ2YWx1ZSIsInN0YXR1cyIsInRpbWUiLCJlcnJvckNvbnRyb2xsZXIiLCJtZXNzYWdlIiwiY29uc29sZSIsImxvZyIsImVkaXRlVGFza1BhcnJlbnQiLCJlZGl0VGFzayIsInNob3dQb3B1cCIsImNsb3NlUG9wdXAiLCJhY2NlcHRQb3B1cCIsInRha2VDb3JyVGFzayIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5IiwiYWNjZXB0TmV3IiwidGFza3NDb3VudCIsImFkZENsZWFyQ2hlY2tlZEJ0biIsInRpbWVyQXBlYXIiLCJ0aXRsZVRleHQiLCJhZGROZXdUYXNrIiwiY2xvc2VFcnJvciIsImNsZWFyQWxsVGFza3MiLCJvcGVuUG9wdXAiLCJjaGFuZ2VTdGF0dXMiLCJkZWxpdGVPbmVUYXNrIiwidXVpZHY0IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsImZvcm1hdFNlY29uZHMiLCJzZWNvbmRzIiwibWludXRlcyIsImZsb29yIiwicmVtYWluaW5nU2Vjb25kcyIsImZvcm1hdHRlZE1pbnV0ZXMiLCJmb3JtYXR0ZWRTZWNvbmRzIiwicHJldmVudERlZmF1bHQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0YXNrSWQiLCJpbnB1dFRleHQiLCJ0YXNrT2JqIiwicHVzaCIsImN1cnJlbnRUYXNrIiwiZmluZCIsIml0ZW0iLCJ0YXNrSHRtbCIsImluc2VydEFkamFjZW50SFRNTCIsInN0YXJ0QnV0dG9uIiwic3RhcnRUZXh0IiwicGF1c2VUZXh0IiwiaXNSdW5UaW1lciIsInRpbWVySW50ZXJ2YWwiLCJ1cGRhdGVUYXNrVGltZSIsImZvcm1hdHRlZFRpbWUiLCJ0aW1lciIsImlubmVySFRNTCIsInN0eWxlIiwiZGlzcGxheSIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInJlbW92ZSIsImNvdW50T2ZUYXNrcyIsImZvcm1Db2xvciIsImNvbnRhaW5zIiwidGFza0NhcmQiLCJjaGFuZ2VUYXNrQ29sb3IiLCJ0YXNrQ29sb3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHVzaENvcnJUZXh0IiwibGVuZ3RoIiwiZmluZFRhc2tPYmplY3QiLCJpZFRvRmluZCIsImNoZWNrYm94ZXMiLCJpc0NoZWNrZWQiLCJjaGVja2JveCIsInRhcmdldCIsImNsb3Nlc3QiLCJwYXJlbnQiLCJzZWxlY3RlZFRhc2siLCJkYXRhc2V0IiwiYmxvY2tpZCIsImNoZWNrZWQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpIiwiYmFja2dyb3VuZCIsImNvbG9yIiwiaWRkZCIsImlucHV0UG9wdXAiLCJlZGl0VmFsdWUiLCJmb2N1cyIsInVwZGF0ZVRhc2tBcnJheSIsIm1hcCIsInRhc2tUZXh0RWxlbWVudCIsInRpbWVDb3VudGVyIiwiZGVsZXRlQnRuIiwiZmlsdGVyIiwidGFzayIsImJsb2NrVG9EZWxldGUiLCJjbGVhckNoZWNrZWRUYXNrcyIsImNoZWNrZWRJdGVtcyIsImZvckVhY2giLCJ0YXNrSXRlbSIsImFjdGl2ZVRhc2siLCJjaGVja2VkSXRlbXNMZW5ndGgiLCJwYXJyZW50Q2FyZHMiLCJjYXJkc0luc2lkZSIsInRvZ2dsZSIsImRlc2NyTGluZUNvbG9yIiwiaW5mb0xpbmVDb2xvciIsImxpc3RzIiwibGlzdCIsImFjdGl2ZUl0ZW1zIiwiZGVmYXVsdFdpZHRoIiwiZGVmYXVsdEZvbnQiLCJtb2JpbGVGb250IiwibWluV2lkdGgiLCJtaW5IZWlnaHQiLCJkZWZhdWx0SGVpZ2h0IiwiZlNpemUiLCJkZXZpY2UiLCJ2VyIsInZIIiwibWluIiwibWF4IiwibW9kaWZpZXJEZXZpY2UiLCJ3aW5kb3dXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ3aW5kb3dIZWlnaHQiLCJpbm5lckhlaWdodCIsImlzTW9iaWxlIiwiZm9udFNpemUiLCJkb2N1bWVudEVsZW1lbnQiLCJvbmxvYWQiLCJvbnJlc2l6ZSJdLCJzb3VyY2VSb290IjoiIn0=