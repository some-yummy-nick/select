var overlay = document.querySelector(".js-overlay");

var mq = window.matchMedia( "(min-width: 768px)" );
function customSelect(element) {
	var select = document.querySelectorAll(element);

	if (!select.length) {
		return false;
	}

	Array.prototype.forEach.call(select, function (item) {
		var selectInitial = item.querySelector(".select__initial");
		var selectWrapper = item.querySelector(".select__wrapper");
		var selectOptions = item.querySelectorAll(".select__option");
		var selected = item.querySelector("[selected]");
		var selectedValue = selected.getAttribute("value");
		var selectedText = selected.innerHTML;
		var selectHidden = item.querySelector(".select__changeme");
		selectHidden.setAttribute("value", selectedValue);

		var customSelect = document.createElement("div");
		customSelect.classList.add("select__custom");

		var selectTitle = document.createElement("button");
		selectTitle.setAttribute("type", "button");
		selectTitle.innerHTML = selectedText;
		selectTitle.classList.add("select__title");
		selectTitle.addEventListener("click", function () {
			overlay.classList.toggle("flag");
			item.classList.toggle("active");
			var overItems = item.querySelectorAll(".select__item");

			for (let j = 0; j < overItems.length; j++) {
				overItems[j].addEventListener("click", function () {
					for (let k = 0; k < overItems.length; k++) {
						overItems[k].classList.remove("active");
					}
					overItems[j].classList.add("active");
					item.classList.remove("active");
					overlay.classList.remove("flag");

					selectedValue = overItems[j].getAttribute("data-value");
					selectHidden.setAttribute("value", selectedValue);
					selectTitle.innerHTML = overItems[j].innerHTML;
				})
			}
		});

		overlay.addEventListener("click", function () {
			item.classList.remove("active");
			overlay.classList.remove("flag");
		});

		var selectList = document.createElement("ul");
		selectList.classList.add("select__list");

		for (let i = 0; i < selectOptions.length; i++) {
			var selectItem = document.createElement("li");
			var selectValue = selectOptions[i].getAttribute("value");
			var selectText = selectOptions[i].innerHTML;
			selectItem.classList.add("select__item");
			selectItem.setAttribute("data-value", selectValue);
			if (selectItem.getAttribute("data-value") == selectedValue) {
				selectItem.classList.add("active");
			}

			selectItem.innerHTML = selectText;
			selectList.appendChild(selectItem);
		}

		customSelect.appendChild(selectTitle);
		customSelect.appendChild(selectList);
		selectWrapper.appendChild(customSelect);
		if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || screen.width < 768) {
			selectInitial.addEventListener("click", function () {
				item.classList.toggle("active");
			});
			selectInitial.addEventListener("blur", function () {
				item.classList.remove("active");
			})
		}
		if (mq.matches) {
			selectWrapper.style.width = selectList.offsetWidth +"px";
		}

	});
}

customSelect(".js-select");