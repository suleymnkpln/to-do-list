const ulElement = document.querySelector("#list")
const taskInput = document.querySelector("#task")
const addButton = document.getElementById('liveToastBtn')
const liveToast = document.querySelectorAll('#liveToast')
const close = document.querySelector(".close")
const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
/**Create Li and span element  */
const elementMaker = (input) => {
    const li = document.createElement("li")
    const span = document.createElement("span")
    span.classList.add("close")
    span.textContent = "x"
    li.textContent = input;
    li.appendChild(span)
    ulElement.appendChild(li)
}
/** this is create bew task */
const newElement = () => {
    let toast = null;
    if (taskInput.value.trim().length === 0) {
        toast = new bootstrap.Toast(liveToast[1])
        toast.show()
    } else {
        toast = new bootstrap.Toast(liveToast[0])
        toast.show()
        elementMaker(taskInput.value)
        tasks.push(taskInput.value);
        localStorage.setItem("tasks", JSON.stringify(tasks))
        taskInput.value = "";
    }

}
/* get all tasks if have on localstorage */
window.onload = (event) => {
    if (tasks)
        tasks.map(element => {
            elementMaker(element)
        })
};
/* ul element click listener  */
ulElement.addEventListener('click', (event) => {
    if (event.target.nodeName === "LI") {
        event.target.classList.toggle("checked")
    }
    if (event.target.nodeName === "SPAN") {
        task = event.target.parentNode.textContent.split('x')[0]
        let newTask = tasks.filter(t => t !== task)
        localStorage.setItem("tasks", JSON.stringify(newTask))
        event.target.parentNode.remove()
    }

})