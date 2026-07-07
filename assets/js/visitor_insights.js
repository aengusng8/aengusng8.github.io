(function () {
  "use strict";

  var SAFE_UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var DOC_RE = /\.(pdf|zip|bib|pptx?|docx?|xlsx?|csv)$/i;
  var SCROLL_MILESTONES = [25, 50, 75, 90];
  var TIME_MILESTONES = [15, 30, 60, 120];

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

  function bucketCount(count) {
    if (count <= 1) return "new";
    if (count <= 3) return "2-3";
    if (count <= 7) return "4-7";
    return "8+";
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
    claritySet("landing_path", sessionStorage.getItem("insight_landing_path") || window.location.pathname);
    claritySet("screen_size", [window.screen.width, window.screen.height].join("x"));

    SAFE_UTM_KEYS.forEach(function (key) {
      var stored = sessionStorage.getItem("insight_" + key);
      if (stored) claritySet(key, stored);
    });
  }

  function setVisitTags() {
    var visitCount = 1;

    if (!sessionStorage.getItem("insight_landing_path")) {
      sessionStorage.setItem("insight_landing_path", window.location.pathname);
    }

    try {
      visitCount = Number(localStorage.getItem("insight_visit_count") || "0") + 1;
      localStorage.setItem("insight_visit_count", String(visitCount));
    } catch (error) {
      visitCount = 1;
    }

    claritySet("returning_visitor", visitCount > 1 ? "yes" : "no");
    claritySet("visit_count_bucket", bucketCount(visitCount));
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

  function bindScrollTracking() {
    var sent = {};

    function onScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      var doc = document.documentElement;
      var maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      var depth = Math.min(100, Math.round((scrollTop / maxScroll) * 100));

      SCROLL_MILESTONES.forEach(function (milestone) {
        if (depth >= milestone && !sent[milestone]) {
          sent[milestone] = true;
          claritySet("max_scroll_depth", milestone + "%");
          sendEvent("scroll_depth", {
            depth: milestone + "%",
            page_type: getPageType(window.location.pathname)
          });
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function bindEngagedTimeTracking() {
    var activeSeconds = 0;
    var sent = {};
    var lastActivity = Date.now();

    ["click", "keydown", "mousemove", "scroll", "touchstart"].forEach(function (eventName) {
      window.addEventListener(eventName, function () {
        lastActivity = Date.now();
      }, { passive: true });
    });

    window.setInterval(function () {
      if (document.hidden) return;
      if (Date.now() - lastActivity > 30000) return;

      activeSeconds += 5;
      TIME_MILESTONES.forEach(function (milestone) {
        if (activeSeconds >= milestone && !sent[milestone]) {
          sent[milestone] = true;
          claritySet("engaged_time_bucket", milestone + "s+");
          sendEvent("engaged_time", {
            seconds: milestone + "s+",
            page_type: getPageType(window.location.pathname)
          });
        }
      });
    }, 5000);
  }

  function bindSectionTracking() {
    if (!("IntersectionObserver" in window)) return;

    var seen = {};
    var targets = Array.prototype.slice.call(document.querySelectorAll("h2[id], h3[id], section[id], .publications[id]"));
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || !entry.target.id || seen[entry.target.id]) return;
        seen[entry.target.id] = true;
        sendEvent("section_view", {
          section: entry.target.id,
          page_type: getPageType(window.location.pathname)
        });
      });
    }, { threshold: 0.45 });

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function init() {
    try {
      storeUtmParams();
      setVisitTags();
      setPageTags();
      bindLinkTracking();
      bindScrollTracking();
      bindEngagedTimeTracking();
      bindSectionTracking();
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
