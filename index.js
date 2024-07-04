const inItemName = document.getElementById("itemName");
const inQuantity = document.getElementById("quantity");
const inCost = document.getElementById("cost");
const addItemBtn = document.getElementById("addItem");
const table = document.getElementById("table");
const removeBtn = document.getElementsByClassName("removeRow");
const priceCheck = document.getElementById("checkPrice");
const cheapestItem = document.getElementById("cheapestItem");
let costPerRow = {};
let smallestPrice = Infinity;
let smallestPriceName = undefined;
inItemName.value = "";
inQuantity.value = "";
inCost.value = "";
function addRow() {
	if (inItemName.value == "" || inQuantity.value == "" || inCost.value == "") {
		return;
	}
	table.innerText += `        <tr bgcolor="black" align="center">
    <td class="smallertext tableItem">${inItemName.value}</td>
    <td class="smallertext tableItem">${inQuantity.value}</td>
    <td class="smallertext tableItem">${inCost.value}</td>
    <td><button class="removeRow" onclick="removeRow(event)">remove row</button></td>
</tr>`;
	inItemName.value = "";
	inQuantity.value = "";
	inCost.value = "";
}

function removeRow(e) {
	e.target.closest("tr").remove();
}

addItemBtn.addEventListener("click", addRow);

function checkThePrice() {
	smallestPriceName = undefined;
	smallestPrice = Infinity;
	costPerRow = {};
	for (let i = 1; i < table.rows.length; i += 1) {
		let cellsInRow = table.rows[i].cells;
		costPerRow[i] = cellsInRow[2].innerText / cellsInRow[1].innerText;
		if (costPerRow[i] < smallestPrice) {
			smallestPrice = costPerRow[i];
			smallestPriceName = cellsInRow[0].innerText;
			console.log(smallestPriceName);
		}
	}
	console.log(smallestPriceName);
	cheapestItem.innerText = "cheapest item is : " + smallestPriceName;
}

priceCheck.addEventListener("click", checkThePrice);
