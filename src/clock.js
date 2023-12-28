const clock = document.querySelector(".clock"); 
const today = document.querySelector(".today");


window.getClock = function(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    clock.innerText = `${hours}:${minutes}:${seconds} `;
}


getClock(); 
setInterval(getClock, 1000); 

window.getToday = function(){

    const todaydate = new Date();
    const days = ['(Sun)', '(Mon)', '(Tue)', '(Wed)', '(Thr)', '(Fri)', '(Sat)'];
    const days_num = todaydate.getDay();

    const month = todaydate.getMonth() + 1;
    const date = todaydate.getDate();
    const day = days[days_num];


    today.innerText = `${month}/${date} ${day}`;

}
getToday();