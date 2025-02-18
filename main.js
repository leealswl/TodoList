//우저가 값을 입력한다
// +버튼을 클릭하면 task부분 추가된다
//delete버튼을 누르면 task부분 삭제
//check버튼을 누르면 할일끝나서 밑줄그어짐 왔다갔다
//not done, done 탭을 누르면, 언더바가 이동
//done 끝난 아이템만 ,not done탭은 진행중 아이템만
//all 누르면 다시 전체로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton =document.getElementById("add-button");
let taskList=[]

addButton.addEventListener("click",addTask);

function addTask() {
    let taskContent =taskInput.value
    taskList.push(taskContent)
    console.log(taskList);
    render();
}

function render() {
    let resultHTML ='';
    for(let i=0; i<taskList.length; i++) {
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
            <div>
                <button>Check</button>
                <button>Delete</button>
            </div>
    </div>`;
    }
    document.getElementById("task-board").innerHTML=resultHTML; //inderhtml 찾아보기

}