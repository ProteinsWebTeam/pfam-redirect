import { interproURL, test, basepath } from "../config.json";
import getNewURL from "./get-new-url";

const url = new URL(document.location.href);
let pathname = url.pathname;
if (url.pathname.startsWith(basepath)) {
  pathname = url.pathname.slice(basepath.length);
} else if (basepath === "?") {
  pathname = url.search.slice(2);
} else {
  console.error("the pathname doesn't start with the given base path");
}
const urlParts = pathname.split("/");

let newURL = getNewURL(urlParts);

if (newURL) {
  document.querySelector(".redirect").classList.add("show");

  let seqLeft = 5;
  let playing = true;

  const counterID = setInterval(() => {
    if (!playing) return;
    seqLeft = Math.max(seqLeft - 1, 0);
    document
      .querySelectorAll(".sec-left")
      .forEach((element) => (element.innerHTML = seqLeft));
    if (seqLeft === 0) {
      if (test) console.log(newURL);
      else window.location.replace(newURL);
      clearInterval(counterID);
    }
  }, 1000);

  const setNewURL = (theNewURL) => {
    if (theNewURL === null) {
      theNewURL = urlParts?.[1]
        ? `${interproURL}/search/text/${urlParts[1]}`
        : interproURL;
    }
    const iproLink = document.getElementById("linkToInterPro");
    iproLink.setAttribute("href", theNewURL);
    iproLink.innerHTML = theNewURL;
    newURL = theNewURL;
  };

  const svg = document.getElementById("countdown");
  svg.addEventListener("click", () => {
    playing = !playing;
    if (playing) {
      svg.classList.remove("paused");
    } else {
      svg.classList.add("paused");
    }
  });

  if (typeof newURL?.then === "function") {
    newURL.then((theNewURL) => setNewURL(theNewURL));
  } else {
    setNewURL(newURL);
  }
} else {
  document.querySelector(".fake-home").classList.add("show");
}
