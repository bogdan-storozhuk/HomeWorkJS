$(document).ready(()=>{
    $('.main_btna').on('click',modalToggle);
    $('.main_btn').on('click',modalToggle);
    $('.main_nav>nav>ul>li').eq(1).on('click',modalToggle);
    $('.close').on('click',modalToggle);
    function modalToggle(){
        $('.overlay').animate({opacity: "toggle"},2000);
        $('.modal').animate({height:"toggle"},2000);
    }
});