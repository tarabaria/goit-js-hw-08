import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

// Функція для збереження стану форми в локальному сховищі
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formState));
}, 500);

// Відстеження події input на полях форми
emailInput.addEventListener('input', saveFormState);
messageTextarea.addEventListener('input', saveFormState);

// Перевірка стану сховища при завантаженні сторінки
const savedFormState = localStorage.getItem(localStorageKey);

if (savedFormState) {
  const parsedFormState = JSON.parse(savedFormState);
  emailInput.value = parsedFormState.email;
  messageTextarea.value = parsedFormState.message;
}

// Подія сабміту форми
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  // Очищення сховища
  localStorage.removeItem(localStorageKey);

  // Виведення об'єкта з даними на консоль
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formData);

  // Очищення полів форми
  emailInput.value = '';
  messageTextarea.value = '';
});
