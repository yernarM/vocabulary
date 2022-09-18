const engWord = document.querySelector('#eng');

const rusWord = document.querySelector('#rus');

const inputs = document.querySelectorAll('.input');

const addButton = document.querySelector('#add-word-btn');

const table = document.querySelector('#table');

let words;

let btnDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = (index) => {

    table.innerHTML += `
     <tr class="tr">
          <td class="en-word">${words[index].english}</td>
          <td class="rus-word">${words[index].russian}</td>
          <td>
               <button class="btn-delete"></button>          
          </td>
     </tr> 
    `
}

words.forEach((item, i) => {

    addWordToTable(i);

})

addButton.addEventListener('click', () => {

    if (!engWord.value || !rusWord.value || !isNaN(+engWord.value) || !isNaN(+rusWord.value)) {

        inputs.forEach(item => {

            item.classList.add('error');

        })

    } else {

        inputs.forEach(item => {

            item.classList.remove('error')

        })

        words.push(new CreateWord(engWord.value, rusWord.value));

        localStorage.setItem('words', JSON.stringify(words));

        addWordToTable(words.length - 1);

        engWord.value = '';

        rusWord.value = '';

    }

})

function CreateWord(english, russian) {

    this.english = english;

    this.russian = russian;

}

const deleteWord = event => {

    const rowIndex = event.target.parentNode.parentNode.rowIndex;

    event.target.parentNode.parentNode.parentNode.remove();

    words.splice(rowIndex, 1);

    localStorage.removeItem('words');

    localStorage.setItem('words', JSON.stringify(words));
}

const addEventDelete = () => {

    if (words.length > 0) {

        btnDelete = document.querySelectorAll('.btn-delete');

        btnDelete.forEach(item => {

            item.addEventListener('click', function(event) {

                deleteWord(event);

            })

        })

    }

}

addEventDelete();