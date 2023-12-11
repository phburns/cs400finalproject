document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    var deleteModal = document.getElementById('deleteModal');
    var confirmDelete = document.getElementById('confirmDelete');
    var cancelDelete = document.getElementById('cancelDelete');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskId = tasks.length;

    function createTask(text, isDestination = false, currentTaskId = taskId) {
        if (isDestination) {
            // Create a new header for the destination
            const destinationHeader = document.createElement("h2");
            destinationHeader.textContent = text;

            // Create a delete button for the destination
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.float = "right"; // Position the button to the right

            // Append the delete button to the destination header
            destinationHeader.appendChild(deleteBtn);

            taskList.appendChild(destinationHeader);

            deleteBtn.addEventListener("click", () => {
                deleteModal.style.display = 'block';

                // Hide the modal and delete the destination when the Yes button is clicked
                confirmDelete.onclick = function () {
                    deleteModal.style.display = 'none';
                    const taskIndex = tasks.findIndex(task => task.id === currentTaskId);
                    tasks.splice(taskIndex, 1);
                    saveTasks();
                    destinationHeader.remove();
                    document.getElementById(`list-${currentTaskId}`).remove();
                    deleteBtn.remove();
                    document.getElementById(`task-${currentTaskId}`).remove();
                    document.getElementById(`add-${currentTaskId}`).remove();
                }

                // Hide the modal without deleting the destination when the No button is clicked
                cancelDelete.onclick = function () {
                    deleteModal.style.display = 'none';
                }
            });

            // Create a new list for the destination
            const destinationList = document.createElement("ul");
            destinationList.id = `list-${currentTaskId}`;
            taskList.appendChild(destinationList);

            // Create a new task input and add button for the destination
            const taskInput = document.createElement("input");
            taskInput.type = "text";
            taskInput.placeholder = "Add a new task...";
            taskInput.id = `task-${currentTaskId}`;
            taskList.appendChild(taskInput);

            const addBtn = document.createElement("button");
            addBtn.textContent = "Add";
            addBtn.id = `add-${currentTaskId}`;
            addBtn.style.marginLeft = "10px";
            taskList.appendChild(addBtn);

            // Add task
            addBtn.addEventListener("click", () => {
                const taskText = taskInput.value.trim();
                if (taskText !== "") {
                    createTask(taskText, false, currentTaskId);
                    tasks.find(task => task.id === currentTaskId).tasks.push(taskText);
                    saveTasks();
                    taskInput.value = "";
                }
            });
        } else {
            // Create a new task
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
    <div class="task-content">
        <input type="checkbox" id="completed-${currentTaskId}">
        <label for="completed-${currentTaskId}">${text}</label>
    </div>
    <div class="task-buttons">
        
        <button class="btn btn-danger delete">Delete</button>
    </div>
    `;

            // Add the task to the current destination's list
            const currentList = document.getElementById(`list-${currentTaskId}`);
            currentList.appendChild(taskItem);

            // Add CSS class to buttons
            const buttons = taskItem.querySelectorAll('button');
            buttons.forEach(button => {
                button.classList.add('button-class');

                // Delete task
                if (button.classList.contains("delete")) {
                    button.addEventListener("click", () => {
                        deleteModal.style.display = 'block';

                        // Hide the modal and delete the item when the Yes button is clicked
                        confirmDelete.onclick = function () {
                            deleteModal.style.display = 'none';
                            const taskIndex = tasks.find(task => task.id === currentTaskId).tasks.indexOf(text);
                            tasks.find(task => task.id === currentTaskId).tasks.splice(taskIndex, 1);
                            saveTasks();
                            taskItem.remove();
                        }

                        // Hide the modal without deleting the item when the No button is clicked
                        cancelDelete.onclick = function () {
                            deleteModal.style.display = 'none';
                        }
                    });
                }
            });
        }
    }

    // Add destination
    document.getElementById('addDestination').addEventListener('click', function () {
        // Get the destination name
        var destinationName = document.getElementById('destinationName').value;

        if (destinationName !== '') {
            // Add the destination name as a header, create a new list for it, and create a new task input and add button for it
            taskId++;
            const currentTaskId = taskId;
            createTask(destinationName, true, currentTaskId);
            tasks.push({ id: currentTaskId, name: destinationName, tasks: [] });
            saveTasks();
            document.getElementById('destinationName').value = '';
        }
    });

    // Load tasks from localStorage
    tasks.forEach(task => {
        createTask(task.name, true, task.id);
        task.tasks.forEach(subtask => {
            createTask(subtask, false, task.id);
        });
    });

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});