/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const advertize = document.querySelectorAll('.promo__adv img'),
        promoBg = document.querySelector('.promo__bg'),
        movieList = document.querySelector('.promo__interactive-list'),
        form = document.querySelector('form.add'),
        movieItems = movieList.querySelectorAll('.promo__interactive-item'),
        checkbox = form.querySelector('input[type="checkbox"]');

    const removeItems = (items) => {
        items.forEach(function (item) {
            item.remove();
        });
    };
    removeItems(movieItems);
    removeItems(advertize);

    const someChanges = () => {
        promoBg.querySelector('.promo__genre').textContent = 'ДРАМА';
        promoBg.style.cssText = `background: url(../img/bg.jpg) center center/cover no-repeat;`;
    };
    someChanges();

    const sortArr = (arr) => {
        arr.sort();
    };

    addMovies(movieDB.movies, movieList);

    function addMovies(arrMovies, parent) {
        removeItems(movieList.querySelectorAll('.promo__interactive-item'));
        sortArr(arrMovies);
        let newItem,
            newSubItem;
        arrMovies.forEach(function (item, index) {
            newItem = document.createElement('li');
            newItem.textContent = item;
            newSubItem = document.createElement('div');
            newItem.classList.add('promo__interactive-item');
            newSubItem.classList.add('delete');
            newItem.append(newSubItem);
            newItem.insertAdjacentText('afterbegin', `${index + 1}: `);
            parent.append(newItem);
        });

        document.querySelectorAll('.delete').forEach(function (item, index) {
            item.addEventListener('click', e => {
                e.target.parentElement.remove();
                arrMovies.splice(index, 1);
                addMovies(arrMovies, parent);
            });
        });
    }

    form.querySelector('button').addEventListener('click', e => {
            e.preventDefault();
            const filmInput = form.querySelector('.adding__input');
            if (filmInput.value != '') {
                filmInput.value = filmInput.value.length > 21 ? filmInput.value.slice(0, 21) + '...' : filmInput.value;
                movieDB.movies.push(filmInput.value);
                if(checkbox.checked) {
                    console.log('Любимый фильм');
                }
                addMovies(movieDB.movies, movieList);
                form.reset();
            }
        });
});