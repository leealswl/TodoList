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

// 1.할일을 입력하고 나면 입력창이 자동으로 비워짐
// 2.엔터를 통해 할일을 입력할 수 있음
// 3.입력한 할일이 없다면 할일 추가가 안됨 (즉 비어있는 할일 추가가 안됨)
// 4.tab에 슬라이드바 또는 내가 어떤 탭에 있는지 표시가 되어야함
// 5.진행중 또는 완료 탭에서 체크 버튼을 클릭하면 상태에 맞게 바로 사라지거나 다른 탭에 보여야 한다
// 6.진행중 또는 끝남 탭에서 아이템을 삭제하면 바로 UI에 적용이 되어야 함
// 7.기본 스타일이아닌 할일앱이 꾸며져 있어야함 + 모바일까지 반드시 되어있어야함

let taskInput = document.getElementById("task-input");
let addButton =document.getElementById("add-button");
let taskList=[]
let tabs =document.querySelectorAll(".task-tabs div")
let mode = 'all'
let filterList =[]

for (let i=1; i<tabs.length; i++ ) {
    tabs[i].addEventListener("click",function(event){
        filter(event)})
}
//언더라인 슬라이드
const tab = document.querySelectorAll(".tab"); // 모든 탭 선택
const underLine = document.getElementById("under-line");

// 언더라인 초기 위치 설정(초기 상태로 ALL 탭 아래에 설정)
function setUnderLine(target) {
    underLine.style.width = `${target.offsetWidth}px`;
    underLine.style.left = `${target.offsetLeft}px`;
}
// 페이지 로드 시 초기 언더라인 설정
window.addEventListener("load", () => setUnderLine(tab[0]));

// 탭 클릭 시 언더라인 이동 & active 클래스 추가
tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        tabs.forEach((t) => t.classList.remove("active")); // ✅ 수정됨!
        e.target.classList.add("active");
        setUnderLine(e.target);
    });
});

// 창 크기 변경 시 언더라인 크기 조정 (모바일 대응)
window.addEventListener("resize", () => {
    setTimeout(() => {
        let activeTab = document.querySelector(".tab.active") || tab[0]; // 현재 선택된 탭 찾기
        setUnderLine(activeTab);
    }, 100); // 작은 지연 추가
});
// tabs[0]은 첫 번째 탭 (ALL 탭)을 의미합니다.
// tabs[0].offsetWidth는 첫 번째 탭의 너비를 가져옵니다.언더라인의 너비를 첫 번째 탭의 너비와 동일하게 설정합니다.
//tabs[0].offsetLeft는 첫 번째 탭의 왼쪽 끝 위치(부모 요소 기준)를 가져옵니다.언더라인의 left 값을 탭의 왼쪽 끝에 맞추어 배치합니다.


function filter(event) {
    console.log(filter,event.target.id);
    mode =event.target.id
    filterList =[]
    if (mode ==="all"){
//전체 리스트 보여줌
        render();
    }else if (mode ==="not-done") {
//진행중인 아이템을 보여준다 task.isComplete=false
        for (let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete ===false) {
                filterList.push(taskList[i]);
            }
        }
        console.log("진행중",filterList);
        render();
    }else if(mode ==="done") {
        //끝나는 케이스를 보여줌 task.isComplete=true
        for (let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete ===true) {
                filterList.push(taskList[i]);
            }
        } 
        render();
    }
}
// 입력창 클릭 시 초기화
taskInput.addEventListener("focus", () => (taskInput.value = "")); 
addButton.addEventListener("click",addTask);

// 엔터 버튼 입력 시 addTask 실행
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
//input 내용추가
function addTask() {
    let task={
        id: randomIdGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    if(task.taskContent ===''){
        alert("할 일을 입력하세요!");
        taskInput.focus();
        return;
    } else {
        taskList.push(task)
    }
    console.log(taskList);
    render();
}


function render() {
    //내가 선택한 탭에 따라 리스트를 달리 보여준다.
    let list=[]
    if (mode ==="all") {
        list = taskList; //모든할일 표시
    } else if (mode ==="not-done"){  
       // 미완료 상태의 할 일만 필터링
        list = taskList.filter((task) => !task.isComplete);
    } else if (mode ==="done"){  
      // 완료 상태의 할 일만 필터링
        list = taskList.filter((task) => task.isComplete);
    }   
    
    let resultHTML ='';
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete ==true) {
            resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">
                <i class="fa-solid fa-undo"></i>
                </button>

                <button onclick="deleteTask('${list[i].id}')">
                <i class="fa-solid fa-trash"></i>
                </button>
            </div>
    </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">
                <i class="fa-solid fa-check"></i>
                </button>

                <button onclick="deleteTask('${list[i].id}')">
                <i class="fa-solid fa-trash"></i>
                </button>
            </div>
    </div>`;

        }
    }
    document.getElementById("task-board").innerHTML=resultHTML; //inderhtml 찾아보기
}
//상태변경기능
function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    render();
}
//id값 랜덤으로 가져오기
function randomIdGenerate() {
    return '_' +Math.random().toString(36).substr(2,9);
}
//삭제
function deleteTask (id) {
       for (let i=0; i<taskList.length; i++){
        if(taskList[i].id ==id) {
            taskList.splice(i,1)
        break;
        }           
        }
        render()
}