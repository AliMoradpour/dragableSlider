const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".container svg");

let isDragStrat = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

function showHideIcons() {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting scroll max width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // if clicked icon is left , reduce width value frome the carousel scroll left else add to it
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width && adding 14 px margin value
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

function autoSlide() {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;
  positionDiff = Math.abs(positionDiff); //makeing positionDiff value positive
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;
  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  } else {
    carousel.scrollLeft -=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
}

function dragStart(e) {
  // Updating global variables value on mouse down event
  isDragStrat = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
  // Scrolling img/carousel to left according mouse pointer
  if (!isDragStrat) return;
  e.preventDefault();
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  carousel.classList.add("dragging");
  isDragging = true;
  showHideIcons();
}

function dragStop() {
  isDragStrat = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
// mobile
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("mousemove", dragging);
// mobile
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
// mobile
carousel.addEventListener("touchend", dragStop);
