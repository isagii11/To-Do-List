document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.addEventListener('click', toggleTaskCompletion);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function(event) {
            event.stopPropagation(); 
            deleteTask(event);
        });
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
        saveTasks();
    }

    function toggleTaskCompletion(event) {
        const task = event.target;
        if (task.tagName === 'LI') {
            task.classList.toggle('completed');
            saveTasks();

            if (task.classList.contains('completed')) {
                showCongratsMessage();
            }
        }
    }

    function deleteTask(event) {
        const task = event.target.parentElement;
        task.remove();
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.getElementsByTagName('li');
        for (let taskItem of taskItems) {
            tasks.push({
                text: taskItem.textContent.replace('Delete', '').trim(),
                completed: taskItem.classList.contains('completed')
            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(function(task) {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', toggleTaskCompletion);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                deleteTask(event);
            });
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
    }

    clearCompletedBtn.addEventListener('click', function() {
        const completedTasks = taskList.querySelectorAll('.completed');
        completedTasks.forEach(function(task) {
            task.remove();
        });
        saveTasks();
    });

    
    function showCongratsMessage() {
        const congratsMessage = document.createElement('div');
        congratsMessage.classList.add('congrat-message');
        congratsMessage.textContent = 'Congrats on completing a task!';
        document.body.appendChild(congratsMessage);

        
        setTimeout(() => {
            congratsMessage.remove();
        }, 2000);
    }
});
