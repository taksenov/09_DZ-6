// ДЗ 2:
//
// Загрузить города при помощи AJAX
// из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json (сервер поддерживает AJAX CORS)
// Отсортировать города по алфавиту и вывести на странице.
// Использование промисов обязательно.
// Запрещено использование любых библиотек (включая jQuery) и фреймворков.

// задать переменные
let downloadBtn = document.getElementById('download_order_btn');
let parentHTMLUl = document.getElementById('workspace__board_id');
let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
let method = 'GET';
let flatList = []; // плоский список городов

//вспомогательные функции
function getFlatListElem(node){
    let result = [];
    for(let city of node){
        if (city['name']){
            result.push(city['name']);
        }
    }
    return result;
} //getFlatListElem

function addNewLi(content, parent) {
    var newLi = document.createElement('li');
    newLi.textContent = content;
    parent.appendChild(newLi);
} // addNewLi

// handler для обработки загрузки даных и размещение на странице
function downloadJSON(e, methodXHR, urlXHR) {
    return new Promise(( resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open( methodXHR, urlXHR, true );
        xhr.send();
        xhr.addEventListener(
            'load',
            () => { resolve( xhr.response ); }
        );
        xhr.addEventListener(
            'error',
            () => { reject(); }
        );
    });

} // downloadJSON

//Вызвать событие обработки клика по кнопке
downloadBtn.addEventListener(
    'click',
    (e) => { downloadJSON(e, method, url)
                .then(
                    (result) => {
                        flatList = getFlatListElem(result);
                        flatList = flatList.slice().sort();
                        for (let i = 0; i < flatList.length; i++) {
                            addNewLi(flatList[i], parentHTMLUl);
                        }
                    }
                )
            }
);
