import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.querySelector('input[name="email"]');
const message = form.querySelector('textarea[name="message"]');

const localStorageKey = 'feedback-form-state';

const saveFormData = throttle(() => {
  const formData = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}, 500);

const loadFormData = () => {
  const savedData = localStorage.getItem(localStorageKey);

  if (savedData) {
    const formData = JSON.parse(savedData);
    email.value = formData.email;
    message.value = formData.message;
  }
};

const handleInput = () => {
  saveFormData();
};

const handleSubmit = event => {
  event.preventDefault();

  const formData = {
    email: email.value,
    message: message.value,
  };
  console.log(formData);

  if (email.value === '' || message.value === '') {
    alert('Заповніть всі поля!');
    return;
  }

  localStorage.removeItem(localStorageKey);
  email.value = '';
  message.value = '';
};

email.addEventListener('input', handleInput);
message.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

loadFormData();
