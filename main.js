//우저가 값을 입력한다
// +버튼을 클릭하면 task부분 추가된다
//delete버튼을 누르면 task부분 삭제
//check버튼을 누르면 할일끝나서 밑줄그어짐 왔다갔다
//-- check버튼을 클릭하는 순간 iscomplete의 true 를 false로 바꿔줌
//-- true 이면 끝난걸로 간주하고 밑줄 보여주기
//-- false 이면 안끝난걸로 간주하고 그대로.

//not done, done 탭을 누르면, 언더바가 이동
//done 끝난 아이템만 ,not done탭은 진행중 아이템만
//all 누르면 다시 전체로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton =document.getElementById("add-button");
let taskList=[]

taskInput.addEventListener("focus", () => (taskInput.value = "")); // 입력창 클릭 시 초기화

addButton.addEventListener("click",addTask);

function addTask() {
    let task={
        id: randomIdGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task)
    console.log(taskList);
    render();
}

function render() {
    let resultHTML ='';
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].isComplete ==true) {
            resultHTML += `<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">
                <i class="fa-solid fa-undo"></i>
                </button>

                <button onclick="deleteTask('${taskList[i].id}')">
                <i class="fa-solid fa-trash"></i>
                </button>
            </div>
    </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">
                <i class="fa-solid fa-check"></i>
                </button>

                <button onclick="deleteTask('${taskList[i].id}')">
                <i class="fa-solid fa-trash"></i>
                </button>
            </div>
    </div>`;

        }
    }
    document.getElementById("task-board").innerHTML=resultHTML; //inderhtml 찾아보기

}

function toggleComplete(id) {
    
    console.log("id:",id)
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    render();
}

function randomIdGenerate() {
    return '_' +Math.random().toString(36).substr(2,9);
}


function deleteTask (id) {
    console.log("삭제삭제삭제삭제",id)
       for (let i=0; i<taskList.length; i++){
        if(taskList[i].id ==id) {
            taskList.splice(i,1)
        break;
        }           
        }
        render()

}