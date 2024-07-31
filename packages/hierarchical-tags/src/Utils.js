import { sanitizeUrl as braintreeSanitizeUrl } from "@braintree/sanitize-url";
import cssEscape from "css.escape";

/**
 * This entire file is composed of pieces copied directly from swagger-ui core utils
 */

export function isAbsoluteUrl(url) {
  return url.match(/^(?:[a-z]+:)?\/\//i); // Matches http://, HTTP://, https://, ftp://, //example.com,
}

export function addProtocol(url) {
  if (!url.match(/^\/\//i)) return url; // Checks if protocol is missing e.g. //example.com

  return `${window.location.protocol}${url}`;
}

export function buildBaseUrl(selectedServer, specUrl) {
  if (!selectedServer) return specUrl;
  if (isAbsoluteUrl(selectedServer)) return addProtocol(selectedServer);

  return new URL(selectedServer, specUrl).href;
}

export function buildUrl(url, specUrl, { selectedServer = "" } = {}) {
  if (!url) return;
  if (isAbsoluteUrl(url)) return url;

  const baseUrl = buildBaseUrl(selectedServer, specUrl);
  if (!isAbsoluteUrl(baseUrl)) {
    return new URL(url, window.location.href).href;
  }
  return new URL(url, baseUrl).href;
}

export function isFunc(thing) {
  return typeof thing === "function";
}

// suitable for use in URL fragments
export const createDeepLinkPath = (str) =>
  typeof str == "string" || str instanceof String
    ? str.trim().replace(/\s/g, "%20")
    : "";
// suitable for use in CSS classes and ids
export const escapeDeepLinkPath = (str) =>
  cssEscape(createDeepLinkPath(str).replace(/%20/g, "_"));

export function sanitizeUrl(url) {
  if (typeof url !== "string" || url === "") {
    return "";
  }

  return braintreeSanitizeUrl(url);
}

export const parseNestedNeepLinkHash =
  (rawHash) =>
  ({ layoutActions, layoutSelectors, getConfigs }) => {
    if (!getConfigs().deepLinking) {
      return;
    }

    if (rawHash) {
      let hash = rawHash.slice(1); // # is first character

      if (hash[0] === "!") {
        // Parse UI 2.x shebangs
        hash = hash.slice(1);
      }

      if (hash[0] === "/") {
        // "/pet/addPet" => "pet/addPet"
        // makes the split result cleaner
        // also handles forgotten leading slash
        hash = hash.slice(1);
      }

      const hashArray = hash.split("/").map((val) => val || "");

      const isShownKey = layoutSelectors.isShownKeyFromUrlHashArray(hashArray);

      const [type, tagId = "", maybeOperationId = ""] = isShownKey;

      const pathParts = tagId.split(" _ ");
      if (pathParts.length === 1) {
        return;
      }
      pathParts.forEach((value, index) => {
        const pathToShow = pathParts.slice(0, index + 1).join(" _ ");
        const parentTagToShowKey = layoutSelectors.isShownKeyFromUrlHashArray([
          pathToShow,
        ]);
        layoutActions.show(parentTagToShowKey, true);
      });

      if (type === "operations") {
        // we're going to show an operation, so we need to expand the tag as well
        const tagIsShownKey = layoutSelectors.isShownKeyFromUrlHashArray([
          tagId,
        ]);
        layoutActions.show(tagIsShownKey, true);
      }

      layoutActions.show(isShownKey, true);

      // Scroll to the newly expanded entity
      const scrollToKey = isShownKey.map((v) => v.split(" _ ").slice(-1)[0]);
      layoutActions.scrollTo(scrollToKey);
      layoutActions.scrollTo(["operations-tag", "benefits___schedules"]);
    }
  };
