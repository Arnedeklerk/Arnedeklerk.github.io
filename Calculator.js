document.addEventListener("DOMContentLoaded", function () {
    populateResourceSelection();
    updateSeatSliderLabel();
    attachEventListeners();
});

function populateResourceSelection() {
    const resources = [
        { name: "Pro Plan", commercialPa: 1350, commercialPm: 135, academicPa: 450, academicPm: 45 },
        { name: "Poaceae-S", commercialPa: 0, commercialPm: 0, academicPa: 0, academicPm: 0 },
        { name: "Poaceae-M", commercialPa: 1350, commercialPm: 135, academicPa: 450, academicPm: 45 },
        { name: "Poaceae-L", commercialPa: 3000, commercialPm: 300, academicPa: 1000, academicPm: 100 },
        { name: "Ascomycota-S", commercialPa: 0, commercialPm: 0, academicPa: 0, academicPm: 0 },
        { name: "Ascomycota-M", commercialPa: 1350, commercialPm: 135, academicPa: 450, academicPm: 45 },
        { name: "Solanaceae", commercialPa: 2400, commercialPm: 240, academicPa: 800, academicPm: 80 },
        { name: "Brassicaceae", commercialPa: 2400, commercialPm: 240, academicPa: 800, academicPm: 80 },
    ];

    const resourceSelection = document.getElementById("resource-selection");
    resources.forEach((resource, index) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `resource-checkbox-${index}`;
        checkbox.name = "resource";
        checkbox.value = index;
        checkbox.onchange = updatePriceSummary;

        const label = document.createElement("label");
        label.htmlFor = `resource-checkbox-${index}`;
        label.innerText = resource.name;

        resourceSelection.appendChild(checkbox);
        resourceSelection.appendChild(label);
        resourceSelection.appendChild(document.createElement("br"));
    });
}

function updateSeatSliderLabel() {
    const seatSlider = document.getElementById("seat-slider");
    const seatSliderLabel = document.getElementById("seat-slider-label");
    const seatDiscounts = [0, 5, 10, 11, 12];
    const discount = seatDiscounts[seatSlider.value - 1];
    seatSliderLabel.innerText = `${seatSlider.value} seat${seatSlider.value > 1 ? "s" : ""} - ${discount}% discount`;
    updatePriceSummary();
}

function updatePriceSummary() {
    const resources = getSelectedResources();
    const seats = parseInt(document.getElementById("seat-slider").value);
    const duration = parseInt(document.getElementById("duration-select").value);

    const prices = calculatePrices(resources, seats, duration);

    document.getElementById("summary-resources").innerText = resources.map(r => r.name).join(", ");
    document.getElementById("summary-seats").innerText = seats;
    document.getElementById("summary-duration").innerText = `${duration} month${duration > 1 ? "s" : ""}`;
    document.getElementById("summary-original-price").innerText = `${prices.originalPrice.toFixed(2)} pounds`;
    document.getElementById("summary-resource-discount").innerText = `${prices.resourceDiscount.toFixed(2)} pounds`;
    document.getElementById("summary-seat-discount").innerText = `${prices.seatDiscount.toFixed(2)} pounds`;
    document.getElementById("summary-duration-discount").innerText = `${prices.durationDiscount.toFixed(2)} pounds`;
    document.getElementById("summary-total-discount").innerText = `${prices.totalDiscount.toFixed(2)} pounds`;
    document.getElementById("summary-total-price").innerText = `${prices.totalPrice.toFixed(2)} pounds per month`;
}

function calculatePrice() {
    const resources = getSelectedResources();
    const seats = parseInt(document.getElementById("seat-slider").value);
    const duration = parseInt(document.getElementById("duration-select").value);

    const prices = calculatePrices(resources, seats, duration);

    // Perform final price calculation and proceed to checkout
    // For example, you can send the calculated price and other details to your server for further processing
    // ...

    alert(`Total price: ${prices.totalPrice.toFixed(2)} pounds per month`);

    return false; // Prevent form submission
}

function getSelectedResources() {
    const resourceCheckboxes = document.getElementsByName("resource");
    const resources = [
        { name: "Pro Plan", commercialPa: 1350, commercialPm: 135, academicPa: 450, academicPm: 45 },
        { name: "Poaceae-S", commercialPa: 0, commercialPm: 0, academicPa: 0, academicPm: 0 },
        { name: "Poaceae-M", commercialPa: 1350, commercialPm: 135, academicPa: 450, academicPm: 45 },
        { name: "Poaceae-L", commercialPa: 3000, commercialPm: 300, academicPa: 1000, academicPm: 100 },
        { name: "Ascomycota-S", commercialPa: 0, commercialPm: 0, academicPa: 0, academicPm: 0 },
        { name: "Ascomycota-M", commercialPa: 1350, commercialPm: 135, academicPa: 450, academicPm: 45 },
        { name: "Solanaceae", commercialPa: 2400, commercialPm: 240, academicPa: 800, academicPm: 80 },
        { name: "Brassicaceae", commercialPa: 2400, commercialPm: 240, academicPa: 800, academicPm: 80 },
    ];

    return Array.from(resourceCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => resources[checkbox.value]);
}

function calculatePrices(resources, seats, duration) {
    const userType = document.getElementById("user-type-select").value;

    const originalPrice = resources.reduce((total, resource) => {
        const price = userType === "commercial" ? resource.commercialPm : resource.academicPm;
        return total + price;
    }, 0);

    const paidResourcesCount = resources.filter(resource => {
        const price = userType === "commercial" ? resource.commercialPm : resource.academicPm;
        return price !== 0;
    }).length;

    const resourceDiscount = paidResourcesCount > 1 ? (0.05 * (paidResourcesCount - 1) * originalPrice) : 0;
    const seatDiscounts = [0, 5, 10, 11, 12];
    const seatDiscount = (seatDiscounts[seats - 1] / 100) * originalPrice;
    const durationDiscounts = [0, 5, 10, 15];
    const durationIndex = [1, 3, 6, 12].indexOf(duration);
    const durationDiscount = (durationDiscounts[durationIndex] / 100) * originalPrice;

    const totalDiscount = resourceDiscount + seatDiscount + durationDiscount;
    const totalPrice = originalPrice - totalDiscount;

    return {
        originalPrice: originalPrice,
        resourceDiscount: resourceDiscount,
        seatDiscount: seatDiscount,
        durationDiscount: durationDiscount,
        totalDiscount: totalDiscount,
        totalPrice: totalPrice
    };
}

function attachEventListeners() {
    // Attach event listener to the seat slider
    const seatSlider = document.getElementById("seat-slider");
    seatSlider.addEventListener("input", function () {
        updateSeatSliderLabel();
        updatePriceSummary();
    });

    // Attach event listener to the user type select element
    const userTypeSelect = document.getElementById("user-type-select");
    userTypeSelect.addEventListener("change", updatePriceSummary);

    // Attach event listener to the subscription duration dropdown
    const durationSelect = document.getElementById("duration-select");
    durationSelect.addEventListener("change", updatePriceSummary);

    // Attach event listeners to the resource checkboxes
    const resourceCheckboxes = document.getElementsByName("resource");
    resourceCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updatePriceSummary);
    });
}