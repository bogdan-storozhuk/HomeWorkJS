let newElem=document.createElement('li');
newElem.textContent="Пятый пункт";
newElem.classList="menu-item";
let menu=document.querySelectorAll(".menu")[0],
    temp=menu.children[1];
menu.replaceChild(menu.children[2],menu.children[1]);
menu.insertBefore(temp,menu.children[2]);
menu.appendChild(newElem);
title=document.getElementById("title");
title.textContent="Мы продаем только подлинную технику Apple";
adv=document.getElementsByClassName("adv")[0];
column=document.getElementsByClassName("column")[1].removeChild(adv);
// let question=prompt("Отношение к технике apple:","");
let question=document.getElementById("prompt");
question.textContent=prompt("Отношение к технике apple:","");
document.body.style.background="url('/img/apple_true.jpg')";