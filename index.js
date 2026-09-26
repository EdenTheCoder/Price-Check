const inItemName = document.getElementById("itemName");
const inQuantity = document.getElementById("quantity");
const inCost = document.getElementById("cost");
const addItemBtn = document.getElementById("addItem");
const table = document.getElementById("table");
const priceCheck = document.getElementById("checkPrice");
const cheapestItem = document.getElementById("cheapestItem");
let costPerRow = {};
let smallestPrice = Infinity;
let smallestPriceName = undefined;

function clearInputs() {
  inItemName.value = "";
  inQuantity.value = "";
  inCost.value = "";
}

clearInputs();

function addRow() {
  const itemName = inItemName.value.trim();
  const quantity = Number(inQuantity.value);
  const cost = Number(inCost.value);

  if (
    !itemName ||
    !Number.isFinite(quantity) ||
    quantity <= 0 ||
    !Number.isFinite(cost) ||
    cost < 0
  ) {
    return;
  }

  const row = document.createElement("tr");
  row.setAttribute("bgcolor", "black");
  row.setAttribute("align", "center");
  row.innerHTML = `
		<td class="smallertext tableItem">${itemName}</td>
		<td class="smallertext tableItem">${quantity}</td>
		<td class="smallertext tableItem">${cost}</td>
		<td><button type="button" class="removeRow">remove row</button></td>
	`;

  const removeButton = row.querySelector(".removeRow");
  if (removeButton) {
    removeButton.addEventListener("click", removeRow);
  }

  table.appendChild(row);
  clearInputs();
}

function removeRow(e) {
  const row = e.currentTarget.closest("tr");
  if (row) {
    row.remove();
  }
}

addItemBtn.addEventListener("click", addRow);

function checkThePrice() {
  smallestPriceName = undefined;
  smallestPrice = Infinity;
  costPerRow = {};
  let hasValidItem = false;

  for (let i = 0; i < table.rows.length; i += 1) {
    const row = table.rows[i];
    if (!row || row.cells.length < 3) {
      continue;
    }

    const itemName = row.cells[0].textContent.trim();
    const quantity = Number(row.cells[1].textContent);
    const cost = Number(row.cells[2].textContent);

    if (
      !itemName ||
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(cost) ||
      cost < 0
    ) {
      continue;
    }

    hasValidItem = true;
    costPerRow[i] = cost / quantity;
    if (costPerRow[i] < smallestPrice) {
      smallestPrice = costPerRow[i];
      smallestPriceName = itemName;
    }
  }

  if (!hasValidItem || smallestPriceName === undefined) {
    cheapestItem.innerText = "cheapest item is : no valid items";
    return;
  }

  cheapestItem.innerText = "cheapest item is : " + smallestPriceName;
}

priceCheck.addEventListener("click", checkThePrice);
