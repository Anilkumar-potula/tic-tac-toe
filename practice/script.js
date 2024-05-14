const showPopup = document.querySelector('.show-popup');
const popupContainer = document.querySelector('.popup-container');
const resetButton = document.querySelector('.reset-button');

showPopup.onclick = () =>{
    popupContainer.classList.add('active');
}

resetButton.onclick= () =>{
    popupContainer.classList.remove('active')
}