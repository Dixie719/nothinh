document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    let isDrawing = false;
    let brushSize = 5;
    let brushColor = "black"; // Default brush color

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function startDrawing(event) {
        isDrawing = true;
        draw(event);
    }

    function endDrawing() {
        isDrawing = false;
    }

    function draw(event) {
        if (!isDrawing) return;

        context.lineWidth = brushSize;
        context.lineCap = "round";
        context.strokeStyle = brushColor;

        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);

    const brushes = document.querySelectorAll(".brush");
    brushes.forEach(brush => {
        brush.addEventListener("click", function() {
            brushSize = parseInt(brush.style.width) / 2;
            brushColor = brush.style.backgroundColor;
        });
    });

    const eraser = document.getElementById("eraser");
    eraser.addEventListener("input", function() {
        brushColor = "white"; // Set the color to white for erasing
        context.lineWidth = this.value;
        context.strokeStyle = brushColor;
    });

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });
});
