import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('[name="email"]');
const message = document.querySelector('[name="message"]');

const saveFormData = () => {
  const formData = {
    email: input.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const restoreFormData = () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const formData = JSON.parse(savedData);
    input.value = formData.email;
    message.value = formData.message;
  }
};

const throttledSaveFormData = throttle(saveFormData, 500);

form.addEventListener('input', throttledSaveFormData);

restoreFormData();

form.addEventListener('submit', event => {
  event.preventDefault();

  localStorage.removeItem('feedback-form-state');

  event.target.reset();

  console.log({
    email: input.value,
    message: message.value,
  });
});
