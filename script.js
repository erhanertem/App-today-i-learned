const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');

// Eventhandler -> Share a Fact Button
btn.addEventListener('click', function () {
  // // #1.solution
  // if (form.classList.contains('hidden')) {
  //   form.classList.remove('hidden');
  //   btn.textContent = 'Close';
  // } else {
  //   form.classList.add('hidden');
  //   btn.textContent = 'Share a fact';
  // }
  // #2. solution
  form.classList.toggle('hidden');
  btn.textContent = form.classList.contains('hidden')
    ? 'Share a fact'
    : 'Close';
});
