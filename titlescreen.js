function contGame(){
  if (typeof(Storage) !== "undefined") {
    if(localStorage.taskNumber == null){
      alert("Sorry, you haven't finished any tasks yet!");
    } else {
      if(localStorage.taskNumber == 2){
          alert("You were on the second task");
          window.location = "./snake.html";
        }else{
          alert("You were on the third task");
          window.location = "./drag.html";
        }
      }
  }
}
