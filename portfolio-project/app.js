const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controls");
const sectBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");
const downloadCV = document.querySelector(".main-btn");

function pageTransition() {
  //Button click active

  for (let i = 0; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener("click", function () {
      let currentBtn = document.querySelectorAll(".active-btn");
      currentBtn[0].className = currentBtn[0].className.replace(
        "active-btn",
        ""
      );
      this.className += " active-btn";
    });
  }
  //sections Active class
  allSections.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
      //remove selected from the other buttons
      sectBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");
      //hide other sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
  //toggle theme
  const themeBtn = document.querySelector(".theme-btn");
  themeBtn.addEventListener("click", function () {
    let element = document.body;
    element.classList.toggle("light-mode");
  });
  //Download CV
  downloadCV.addEventListener("click", convertToPDF);
}

pageTransition();

async function convertToPDF(e) {
  e.preventDefault();
  const content = document.body;
  const options = {
    margin: 10,
    filename: "converted_file.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().from(content).set(options).save();
}
