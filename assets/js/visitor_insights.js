(function () {
  "use strict";

  var SAFE_UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var DOC_RE = /\.(pdf|zip|bib|pptx?|docx?|xlsx?|csv)$/i;

  function sanitize(value) {
    return String(value || "")
      .trim()
      .slice(0, 96)
      .replace(/[^\w .:/?#[\]@!$&'()*+,;=%-]/g, "");
  }

  function claritySet(key, value) {
    if (typeof window.clarity === "function" && value !== undefined && value !== null && value !== "") {
      window.clarity("set", key, sanitize(value));
    }
  }

  function sendEvent(name, props) {
    var cleanName = sanitize(name).replace(/\s+/g, "_").toLowerCase();
    var cleanProps = {};

    Object.keys(props || {}).forEach(function (key) {
      var value = props[key];
      if (value !== undefined && value !== null && value !== "") {
        cleanProps[key] = sanitize(value);
      }
    });

    if (typeof window.clarity === "function") {
      window.clarity("event", cleanName);
      Object.keys(cleanProps).forEach(function (key) {
        window.clarity("set", key, cleanProps[key]);
      });
    }

    if (typeof window.plausible === "function") {
      window.plausible(cleanName, { props: cleanProps });
    }

    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track(cleanName, cleanProps);
    }
  }

  function getPageType(path) {
    if (path === "/" || path === "") return "home";
    if (path.indexOf("/publications") === 0) return "publications";
    if (path.indexOf("/cv") === 0) return "cv";
    if (path.indexOf("/news") === 0) return "news";
    if (path.indexOf("/projects") === 0) return "projects";
    if (path.indexOf("/repositories") === 0) return "repositories";
    if (path.indexOf("/blog") === 0) return "blog";
    return "other";
  }

  function getDeviceClass() {
    var width = window.innerWidth || document.documentElement.clientWidth || 0;
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  function classifyUrl(url) {
    var host = url.hostname.replace(/^www\./, "");
    var path = url.pathname.toLowerCase();

    if (url.protocol === "mailto:") return "email";
    if (DOC_RE.test(path)) return "document";
    if (host.indexOf("github.com") !== -1) return "github";
    if (host.indexOf("scholar.google.") !== -1) return "scholar";
    if (host.indexOf("arxiv.org") !== -1) return "arxiv";
    if (host.indexOf("linkedin.com") !== -1) return "linkedin";
    if (host.indexOf("twitter.com") !== -1 || host === "x.com") return "social";
    if (host && host !== window.location.hostname.replace(/^www\./, "")) return "external";
    if (url.hash && url.pathname === window.location.pathname) return "section_jump";
    return "internal";
  }

  function closestPublicationKey(link) {
    var container = link.closest(".bibliography li, .publications li, [id]");
    if (!container) return "";
    return container.id || "";
  }

  function storeUtmParams() {
    var params = new URLSearchParams(window.location.search);
    var found = false;

    SAFE_UTM_KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) {
        sessionStorage.setItem("insight_" + key, sanitize(value));
        claritySet(key, value);
        found = true;
      }
    });

    if (found) {
      sendEvent("campaign_visit", {
        source: params.get("utm_source"),
        medium: params.get("utm_medium"),
        campaign: params.get("utm_campaign")
      });
    }
  }

  function setPageTags() {
    var pageType = getPageType(window.location.pathname);
    var referrer = "";

    try {
      referrer = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "direct";
    } catch (error) {
      referrer = "unknown";
    }

    claritySet("page_type", pageType);
    claritySet("device_class", getDeviceClass());
    claritySet("referrer_host", referrer);
    claritySet("visitor_timezone", Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown");

    SAFE_UTM_KEYS.forEach(function (key) {
      var stored = sessionStorage.getItem("insight_" + key);
      if (stored) claritySet(key, stored);
    });
  }

  function bindLinkTracking() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("a[href]");
      if (!link) return;

      var url;
      try {
        url = new URL(link.getAttribute("href"), window.location.href);
      } catch (error) {
        return;
      }

      var category = classifyUrl(url);
      var label = (link.getAttribute("aria-label") || link.getAttribute("title") || link.textContent || category).trim();

      sendEvent("link_click", {
        link_category: category,
        link_label: label,
        link_host: url.hostname.replace(/^www\./, ""),
        page_type: getPageType(window.location.pathname),
        publication: closestPublicationKey(link)
      });
    }, { capture: true });
  }

  function init() {
    try {
      storeUtmParams();
      setPageTags();
      bindLinkTracking();
    } catch (error) {
      /* Analytics should never break the site. */
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
