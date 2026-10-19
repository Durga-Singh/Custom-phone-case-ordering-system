// Function to handle the uploaded file
function handleFile(file, callback) {
    if (!file) {
        console.error('No file provided!');
        return;
    }

    showUploadingMessage(); // Show loading message

    const reader = new FileReader();
    reader.onload = (event) => {
        localStorage.setItem('uploadedImage', event.target.result); // Store image in localStorage

        setTimeout(() => { // Delay for animation effect
            if (callback) {
                callback();
            }
        }, 1500); // 1.5 seconds delay
    };

    reader.readAsDataURL(file);
}

// Function to show "Uploading Photo..." animation
function showUploadingMessage() {
    const uploadContainer = document.querySelector('.upload-area');
    if (uploadContainer) {
        uploadContainer.innerHTML = `
            <div class="uploading-message">
                <div class="spinner"></div>
                <p>Uploading Photo...</p>
            </div>
        `;
    }
}

// Selectors for Uploading
const createCaseUploadArea = document.querySelector('.upload-area');
const createCaseImageUpload = document.getElementById('upload');

if (createCaseUploadArea && createCaseImageUpload) {
    createCaseUploadArea.addEventListener('click', () => {
        createCaseImageUpload.click();
    });

    createCaseImageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Fix: Select only first file
        if (file) {
            handleFile(file, () => {
                window.location.href = 'customize.php'; // Redirect after storing image
            });
        }
    });

    createCaseUploadArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        createCaseUploadArea.classList.add('highlight');
    });

    createCaseUploadArea.addEventListener('dragleave', () => {
        createCaseUploadArea.classList.remove('highlight');
    });

    createCaseUploadArea.addEventListener('drop', (event) => {
        event.preventDefault();
        createCaseUploadArea.classList.remove('highlight');
        const file = event.dataTransfer.files[0]; // Fix: Ensure file is selected
        if (file) {
            handleFile(file, () => {
                window.location.href = 'customize.php';
            });
        }
    });
}

// For customize.php: Load uploaded image
const customizeUploadImage = document.querySelector('.uploaded-image');

if (customizeUploadImage) {
    const uploadedImageData = localStorage.getItem('uploadedImage');
    if (uploadedImageData) {
        customizeUploadImage.innerHTML = `<img src="${uploadedImageData}" alt="Uploaded Image">`;
    }
}

// Customize controls only run on the customization page.
(function initializeCaseControls() {
    if (!document.getElementById('canvas') || !document.getElementById('card')) return;

const modelSelect = document.getElementById('model');
const phoneCaseImage = document.getElementById('phoneCaseImage');

// Add an event listener to the model dropdown
modelSelect.addEventListener('change', () => {
    // Check if iPhone 11 is selected
    if (modelSelect.value === 'iphone12') {
        // Change the image source to image2.png
        phoneCaseImage.src = 'image2.png';
    } else {
        // Reset to the original image if needed
        phoneCaseImage.src = 'image.png';
    }
});


// Select the canvas and the parent card container
const canvas = document.getElementById('canvas');
const card = document.getElementById('card');
const colorOptions = document.querySelectorAll('.color-option');

// Loop through each color option
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Change the card background color
        card.style.backgroundColor = option.dataset.color;

        // Hide the canvas
        if (canvas) {
            canvas.style.display = 'none';
        }
    });
});


// Define base price
const basePrice = 500; // Example base price for the phone case

// Define additional prices for materials and finishes
const materialPrices = {
    silicone: 100,
    polycarbonate: 120,
};

const finishPrices = {
    glossy: 150,
    matte: 200,
};

// Select elements
const materialSelect = document.getElementById('material');
const finishSelect = document.getElementById('finish');
const priceDisplay = document.querySelector('.price');

// Function to calculate and update the total price
function updateTotalPrice() {
    const selectedMaterial = materialSelect.value;
    const selectedFinish = finishSelect.value;

    const materialPrice = materialPrices[selectedMaterial] || 0;
    const finishPrice = finishPrices[selectedFinish] || 0;

    const totalPrice = basePrice + materialPrice + finishPrice;

    priceDisplay.textContent = `₹${totalPrice.toFixed(2)}`; // Update the displayed price
}

// Attach event listeners to dropdowns
materialSelect.addEventListener('change', updateTotalPrice);
finishSelect.addEventListener('change', updateTotalPrice);

// Initialize the price on page load
updateTotalPrice();


const continueButton = document.querySelector('.continue-button');

continueButton.addEventListener('click', () => {
    // Disable the button to prevent multiple clicks
    continueButton.disabled = true;

    // Start the animation with "Saving"
    continueButton.innerHTML = 'Saving<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';

    // Add animation class
    continueButton.classList.add('saving-animation');

    // Simulate a save process (e.g., redirect after 2 seconds)
    setTimeout(() => {
        // Example: Redirect to summary page (optional)
        window.location.href = 'summary.php';
    }, 2000); // Adjust the time as needed
});


// resizable 


function updateOrderTotal() {
    let total = 500;

    if (selectedMaterial) {
        total += selectedMaterial === 'silicone' ? 100 : 120;
    }
    if (selectedFinish) {
        total += selectedFinish === 'glossy' ? 150 : 200;
    }

    // Assuming you have an element to display total price
    const totalPriceElement = document.querySelector('.order-total');
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total: ₹${total.toFixed(2)}`;
    }
}


// Initialize Fabric once. The frame is decorative and must not catch mouse input.
function initializeCanvas() {
    const card = document.getElementById('card');
    const canvas = new fabric.Canvas('canvas', {
        width: card.clientWidth,
        height: card.clientHeight,
        selection: false,
        backgroundColor: 'transparent',
        transparentCorners: false,
        defaultCursor: 'grab',
        hoverCursor: 'grab',
        moveCursor: 'grabbing',
    });
    let uploadedImage = null;
    let minimumScale = 1;

    function keepImageInCase() {
        if (!uploadedImage) return;
        uploadedImage.set({
            left: Math.min(0, Math.max(canvas.width - uploadedImage.getScaledWidth(), uploadedImage.left)),
            top: Math.min(0, Math.max(canvas.height - uploadedImage.getScaledHeight(), uploadedImage.top)),
        });
        uploadedImage.setCoords();
    }

    function zoomImage(nextScale, point) {
        if (!uploadedImage) return;
        point = point || { x: canvas.width / 2, y: canvas.height / 2 };
        const scale = Math.max(minimumScale, Math.min(minimumScale * 5, nextScale));
        const ratio = scale / uploadedImage.scaleX;
        uploadedImage.set({
            left: point.x - (point.x - uploadedImage.left) * ratio,
            top: point.y - (point.y - uploadedImage.top) * ratio,
            scaleX: scale,
            scaleY: scale,
        });
        keepImageInCase();
        canvas.requestRenderAll();
    }

    const uploadedImageData = localStorage.getItem('uploadedImage');
    if (uploadedImageData) {
        fabric.Image.fromURL(uploadedImageData, function (img, error) {
            if (error || !img || !img.width || !img.height) return;
            minimumScale = Math.max(canvas.width / img.width, canvas.height / img.height);
            img.scale(minimumScale);
            img.set({
                left: (canvas.width - img.getScaledWidth()) / 2,
                top: (canvas.height - img.getScaledHeight()) / 2,
                selectable: true,
                evented: true,
                hasControls: false,
                hasBorders: false,
                lockRotation: true,
                hoverCursor: 'grab',
                moveCursor: 'grabbing',
            });
            uploadedImage = img;
            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.requestRenderAll();
        });
    }

    // Fabric handles dragging, including dragging outside the canvas until release.
    canvas.on('object:moving', keepImageInCase);
    canvas.on('mouse:wheel', function (event) {
        if (!uploadedImage) return;
        event.e.preventDefault();
        event.e.stopPropagation();
        const units = event.e.deltaMode === 1 ? 16 : event.e.deltaMode === 2 ? canvas.height : 1;
        zoomImage(uploadedImage.scaleX * Math.exp(-event.e.deltaY * units * 0.001), canvas.getPointer(event.e));
    });
    canvas.upperCanvasEl.addEventListener('wheel', function (event) {
        if (uploadedImage) event.preventDefault();
    }, { passive: false });

    // Retain the existing buttons as optional controls.
    document.getElementById('increaseSize').addEventListener('click', () => {
        if (uploadedImage) zoomImage(uploadedImage.scaleX * 1.1);
    });
    document.getElementById('decreaseSize').addEventListener('click', () => {
        if (uploadedImage) zoomImage(uploadedImage.scaleX / 1.1);
    });
    const moveStep = 10;
    [['moveUp', 0, -moveStep], ['moveDown', 0, moveStep],
     ['moveLeft', -moveStep, 0], ['moveRight', moveStep, 0]].forEach(([id, x, y]) => {
        document.getElementById(id).addEventListener('click', () => {
            if (!uploadedImage) return;
            uploadedImage.set({ left: uploadedImage.left + x, top: uploadedImage.top + y });
            keepImageInCase();
            canvas.requestRenderAll();
        });
    });
}

if (document.readyState === 'complete') initializeCanvas();
else window.addEventListener('load', initializeCanvas, { once: true });
})();
