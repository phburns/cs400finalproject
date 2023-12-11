document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addBtn = document.getElementById("add");
    const taskList = document.getElementById("taskList");

    let taskId = 0;

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('indexTasks')) || [];
    tasks.forEach(taskText => createTask(taskText));

    // Add task
    addBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            createTask(taskText);
            tasks.push(taskText);
            localStorage.setItem('indexTasks', JSON.stringify(tasks));
            taskInput.value = "";
        }
    });

    function createTask(text) {
        taskId++;
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <div class="task-content">
                
                <label for="completed-${taskId}">${text}</label>
            </div>
            <div class="task-buttons">
                <button class="delete">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);

        // Add CSS class to buttons
        const buttons = taskItem.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.add('button-class');
        });

        var deleteModal = document.getElementById('deleteModal');
        var confirmDelete = document.getElementById('confirmDelete');
        var cancelDelete = document.getElementById('cancelDelete');

        // Delete task
        const deleteBtn = taskItem.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            deleteModal.style.display = 'block';
        });

        // Hide the modal and delete the item when the Yes button is clicked
        confirmDelete.onclick = function () {
            deleteModal.style.display = 'none';
            taskItem.remove();

            // Find the index of the task in the tasks array and remove it
            const index = tasks.indexOf(text);
            if (index > -1) {
                tasks.splice(index, 1);
            }

            // Update localStorage
            localStorage.setItem('indexTasks', JSON.stringify(tasks));
        }

        // Hide the modal without deleting the item when the No button is clicked
        cancelDelete.onclick = function () {
            deleteModal.style.display = 'none';
        }
    }
});