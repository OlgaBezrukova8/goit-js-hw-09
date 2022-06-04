const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

let timeIntervalId = null;

function onSubmitForm(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.target;

  setTimeout(() => {
    let position = 0;

    timeIntervalId = setInterval(() => {
      if (amount.value <= position) {
        clearInterval(timeIntervalId);
      } else {
        const localDelay = position * Number(step.value) + Number(delay.value);
        position += 1;

        createPromise(position, localDelay)
          .then(({ position, delay }) => {
            console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }
    }, step.value);
  }, delay.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
