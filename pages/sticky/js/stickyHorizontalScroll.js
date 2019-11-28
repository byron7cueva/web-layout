const stickySection = document.querySelector('#sticky-section');
const scrollableSection = document.querySelector('#scrollable-section');
window.addEventListener('scroll', () => {
    //console.log(window.scrollY);
    console.log(stickySection.offsetTop);
    if(window.scrollY > stickySection.offsetTop &&  window.scrollY < stickySection.offsetHeight) {
        let xPos = (window.scrollY - stickySection.offsetTop) * -1;
        setTraslateX(xPos, scrollableSection);
    }
});

function setTraslateX(x,el) {
    el.style.transform = `translate3d(${x}px,0px,0px)`;
}