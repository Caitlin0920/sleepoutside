// formElem.onsubmit = async (e) => {
//     e.preventDefault();

//     let response = await fetch('/article/formdata/post/user', {
//       method: 'POST',
//       body: new FormData(formElem)
//     });

//     let result = await response.json();

//     alert(result.message);
//   };
document.addEventListener("DOMContentLoaded", () => {
  // selects the element
  const formElem = document.getElementById("formElem");
  // listening for the submit click event
  formElem.addEventListener("submit", (event) => {
    // The preventDefault() method of the Event interface tells the user agent that if the event
    // does not get explicitly handled, its default action should not be taken as it normally would be.
    event.preventDefault();
    // provides a way to construct a set of key/value pairs representing form fields and their values,
    // which can be sent using the fetch() or XMLHttpRequest.send() method.
    const formData = new FormData(formElem);
    formData.append("submitted", new Date());
    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }
  });
});