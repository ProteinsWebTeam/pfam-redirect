import { interproURL, test, basepath } from "../config.json";
import getNewURL from "./get-new-url";

(async () => {
  document.querySelector(".redirect").classList.add("show");
  const url = new URL(document.location.href);
  let pathname = url.pathname;

  if (url.pathname.startsWith(basepath)) {
    pathname = url.pathname.slice(basepath.length);
  } else if (basepath === "?") {
    pathname = url.search.slice(2);
  } else {
    console.error("The pathname doesn't start with the given base path");
  }

  const urlParts = pathname.split("/");

  let resolvedURL = await getNewURL(urlParts);

  if (!resolvedURL) {
    resolvedURL = urlParts?.[1]
      ? `${interproURL}/search/text/${urlParts[1]}`
      : interproURL;
  }

  if (test) {
    console.log(resolvedURL);
  } else {
    window.location.replace(resolvedURL);
  }
})();
