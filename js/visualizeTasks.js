/* eslint-disable */

var visualize = (function () {
    function _visualizeLogic(tasks, isDoneCategory) {
        var counter = 0;
        var row = document.createElement('div');
        var itemsToShow;

        if (window.innerWidth >= 992) {
            itemsToShow = 3;
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            itemsToShow = 2;
        } else if (window.innerWidth < 768) {
            itemsToShow = 1;
        }

        document.getElementsByClassName('main')[0].appendChild(row);
        
        for (var i = 0; i < tasks.length; i += 1) {
            if (counter === itemsToShow) {
                row = document.createElement('div');
                document.getElementsByClassName('main')[0].appendChild(row)
                counter = 0;
            }
            var divCol = document.createElement('div');
            var thumbnail = document.createElement('div');
            var caption = document.createElement('div');
            var footer = document.createElement('div');
            var htmlTaskNameWrapper = document.createElement('div');
            var htmlTaskName = document.createElement('h5');
            var htmlTaskDueDate = document.createElement('h5');
            var htmlTtaskDueTime = document.createElement('h5');
            var htmlTaskPriority = document.createElement('h5');
            var button = document.createElement('button');
            var deleteIcon = document.createElement('i');
            var icon = document.createElement('i');
            var done = document.createElement('i');

            button.className = 'btn btn-primary show-more';
            thumbnail.className = 'thumbnail';
            caption.className = 'caption';
            divCol.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4';
            htmlTaskNameWrapper.className = 'taskNameWrapper';
            htmlTaskName.className = 'taskName';
            icon.className = 'fa fa-minus-square';
            done.className = 'fa fa-check-square done-icon';
            deleteIcon.className = 'fa fa-times delete-icon';
            deleteIcon.id = 'del-' + tasks[i].taskId;
            done.id = 'done-' + tasks[i].taskId;

            htmlTaskName.style.wordWrap = 'normal';
            htmlTaskName.style.display = 'inline';
            htmlTaskPriority.style.display = 'inline';
            htmlTaskPriority.style.padding = '0px 5px';

            var taskname = tasks[i].taskName;
            var fullTaskname = tasks[i].taskName;
            var taskduedate = tasks[i].taskDueDate;
            var taskduetime = tasks[i].taskDueTime;
            var taskpriority = tasks[i].taskPriority;
            
            var substr;
            if (window.innerWidth >= 1200) {
                if (taskname.length > 25) {
                    substr = taskname.substr(0, 25);
                    substr += '...';
                    taskname = substr;
                    button.innerHTML = 'More';
                    htmlTaskNameWrapper.appendChild(button);
                }
            } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                if (taskname.length > 18) {
                    substr = taskname.substr(0, 18);
                    substr += '...';
                    taskname = substr;
                    button.innerHTML = 'More';
                    htmlTaskNameWrapper.appendChild(button);
                }
            } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                if (taskname.length > 25) {
                    substr = taskname.substr(0, 25);
                    substr += '...';
                    taskname = substr;
                    button.innerHTML = 'More';
                    htmlTaskNameWrapper.appendChild(button);
                }
            } else if (window.innerWidth < 768) {
                htmlTaskName.style.wordWrap = 'break-word';
            }

            $(button).popover({
                placement: "bottom",
                html: true,
                content: `<p style='padding: 0px; word-wrap: break-word'>${fullTaskname}</p>`,
            });

            htmlTaskName.innerHTML = taskname;
            htmlTaskDueDate.innerHTML = taskduedate;
            htmlTtaskDueTime.innerHTML = taskduetime;
            htmlTaskPriority.innerHTML = taskpriority;

            if (taskpriority === 'high') {
                icon.style.color = '#F00';
            } else if (taskpriority === 'medium') {
                icon.style.color = '#FF8000';
            } else {
                icon.style.color = '#0eb511';
            }

            if (!isDoneCategory) {
                caption.appendChild(deleteIcon);
                caption.appendChild(done);
            }

            footer.appendChild(icon);
            footer.appendChild(htmlTaskPriority);
            htmlTaskNameWrapper.appendChild(htmlTaskName);     
            row.appendChild(divCol);
            divCol.appendChild(thumbnail);
            thumbnail.appendChild(caption);
            caption.appendChild(htmlTaskNameWrapper);
            caption.appendChild(htmlTaskDueDate);
            caption.appendChild(htmlTtaskDueTime);
            caption.appendChild(footer);

            counter += 1;
        }
    }

    function allTasks() {
        document.getElementsByClassName('main')[0].innerHTML = '';
        var tasks = database.getAllTasks();
        _visualizeLogic(tasks, false);
    }

    function tasksInCategory(id) {
        document.getElementsByClassName('main')[0].innerHTML = '';
        var tasks = database.getAllTasksInCategory(id);
        _visualizeLogic(tasks);
        return tasks;
    }

    function allDoneTasks() {
        document.getElementsByClassName('main')[0].innerHTML = '';
        var tasks = database.getDone();
        _visualizeLogic(tasks, true);
    }

    function categoryLength(id) {
        return database.getAllTasksInCategory(id).length;
    }

    function customTasks(tasks) {
        document.getElementsByClassName('main')[0].innerHTML = '';
        _visualizeLogic(tasks);
    }
 
    return {
        allTasks,
        tasksInCategory,
        categoryLength,
        customTasks,
        allDoneTasks
    }
})();
