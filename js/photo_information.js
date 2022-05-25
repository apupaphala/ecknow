// multiple select function
(function () {
  var element = document.querySelector(".multiple-select");
  var selects = document.querySelectorAll(
    '.multiple-select input[type="checkbox"]'
  );
  var button = document.querySelector(".multiple-select > button");
  var list = document.querySelector(".multiple-select ul");
  var listItems = document.querySelector(".multiple-select ul li");
  var isActive = false;
  var defaultLabel = button.innerHTML.toString();

  button.addEventListener("click", toggleActive);
  /* listItems.addEventListener("click", function(e){
     var input = this.querySelector('input');
     
     if(input){
       input.click();
     }
   });*/

  for (var i = 0; i < selects.length; i++) {
    initMultipleSelect(selects[i]);
  }

  function initMultipleSelect(selectElement) {
    selectElement.addEventListener("change", processName);
  }

  function processName() {
    var selectedValues = [];
    for (var i = 0; i < selects.length; i++) {
      if (selects[i].checked) {
        selectedValues.push(selects[i].value);
      }

      this.setAttribute('aria-selected', selects[i].checked);
    }

    if (selectedValues.length === 0) {
      selectedValues.push(defaultLabel);
    }

    button.innerHTML = selectedValues.join(", ");
  }

  function toggleActive() {
    isActive = !isActive;

    if (isActive) {
      element.classList.add("active");
      list.setAttribute('aria-expanded', true);
    } else {
      element.classList.remove("active");
      list.setAttribute('aria-expanded', false);
    }
  }
})();
  // multiple select function end