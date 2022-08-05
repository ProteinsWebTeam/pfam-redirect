import { basepath, interproURL, legacyURL } from "../config.json";

const pfamAccessionRegex = /pf\d{5}/i;
const clanAccessionRegex = /cl\d{4}/i;
const pdbAccessionRegex = /[a-zA-Z\d]{4}/i;
const uniprotAccessionRegex =
  /[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}/i;

let seqLeft = 9;
let playing = true;

const counterID = setInterval(() => {
  if (!playing) return;
  seqLeft = Math.max(seqLeft - 1, 0);
  document
    .querySelectorAll(".sec-left")
    .forEach((element) => (element.innerHTML = seqLeft));
  if (seqLeft === 0) {
    // window.location.replace(newURL);
    console.log(newURL);
    clearInterval(counterID);
  }
}, 1000);

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

let newURL = null;
switch (urlParts[0].toLowerCase()) {
  case "family":
    if (pfamAccessionRegex.test(urlParts?.[1])) {
      newURL = `${interproURL}/entry/pfam/${urlParts[1]}`;
    } else if (urlParts?.[1] === "browse") {
      newURL = `${interproURL}/entry/pfam/`;
    }
    break;
  case "protein":
    if (uniprotAccessionRegex.test(urlParts[1])) {
      newURL = `${interproURL}/protein/uniprot/${urlParts[1]}`;
    }
    break;
  case "clan":
    if (clanAccessionRegex.test(urlParts[1])) {
      newURL = `${interproURL}/set/pfam/${urlParts[1]}`;
    } else if (urlParts?.[1] === "browse") {
      newURL = `${interproURL}/set/pfam/`;
    }
    break;
  case "proteome":
    if (!urlParts?.[1] && url.searchParams.get("taxId")) {
      newURL = `${interproURL}/taxonomy/uniprot/${url.searchParams.get(
        "taxId"
      )}/entry/pfam/`;
    } else if (urlParts?.[1] === "browse") {
      newURL = `${interproURL}/taxonomy/uniprot/entry/pfam/`;
    }
    break;
  case "structure":
    if (pdbAccessionRegex.test(urlParts[1])) {
      newURL = `${interproURL}/structure/pdb/${urlParts[1]}`;
    }
    break;
  case "browse":
    newURL = `${interproURL}/entry/pfam`;
    break;
  case "search":
    switch (url.hash) {
      case "#tabview=tab0":
      case "#searchDomainBlock":
        newURL = `${interproURL}/search/sequence/`;
        break;
      case "#tabview=tab2":
      case "#searchKeywordBlock":
        newURL = `${interproURL}/search/text/`;
        break;
      case "#tabview=tab3":
      case "#searchDomainBlock":
        newURL = `${interproURL}/search/ida/`;
        break;
      case "#tabview=tab":
      case "#searchTaxBlock":
        newURL = `${interproURL}/taxonomy/uniprot/entry/pfam/`;
        break;
    }
}

if (newURL === null) {
  newURL = urlParts?.[2]
    ? `${interproURL}/search/text/${urlParts[1]}`
    : interproURL;
}

const svg = document.getElementById("countdown");
svg.addEventListener("click", () => {
  playing = !playing;
  if (playing) {
    svg.classList.remove("paused");
  } else {
    svg.classList.add("paused");
  }
});
const iproLink = document.getElementById("linkToInterPro");
iproLink.setAttribute("href", newURL);
iproLink.innerHTML = newURL;

const legacyNewURL = `${legacyURL}/${pathname}${url.search ?? ""}`;
const legacyLink = document.getElementById("linkToLegacy");
legacyLink.setAttribute("href", legacyNewURL);
legacyLink.innerHTML = legacyNewURL;
