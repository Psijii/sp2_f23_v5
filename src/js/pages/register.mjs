import { errorHtml, setLoader } from '../components/index.js';
import { getError } from '../storage/index.js';

const form = document.querySelector('form');
const signalContainer = document.querySelector('.signal');

form.onsubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  if (!profile.avatar) {
    delete profile.avatar;
  }


  signalContainer.innerHTML = setLoader();

  try {
    location.assign('login.html');
  } catch (error) {
    const { errors } = getError();
    signalContainer.innerHTML = errorHtml(errors[0].message);
    console.log(error);
    localStorage.removeItem('error');
  }
};