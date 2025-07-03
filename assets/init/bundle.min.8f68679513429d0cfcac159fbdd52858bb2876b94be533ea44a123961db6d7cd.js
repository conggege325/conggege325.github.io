(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // ns-params:@params
  var params_default = { analytics: null, archive: { dateformat: "01-02", paginate: 20 }, author: { avatar: "images/avatar.jpg", bio: "\u4E00\u679A\u7A77\u82E6\u7684\u7801\u519C\uFF0C\u613F\u7528\u4EE3\u7801\u642D\u5EFA\u4E00\u4E2A\u68A6\u5E7B\u7684\u4E16\u754C\u3002", company: "\u65E0\u4E1A\u6E38\u6C11", location: "\u6E56\u5357\u957F\u6C99", name: "\u806A\u54E5\u54E5", params: {}, social: { email: "conggege325@qq.com", github: "https://conggege325.github.io/", rss: "" } }, baseURL: "//localhost:1313/", brand: "CGG", breadcrumb: true, carouselpostcount: 5, codeblock: { linenos: true }, color: "auto", contact: { accesskey: "6a89b8d3-10e5-41bf-8bea-ec779ca7cc20", endpoint: "https://api.staticforms.xyz/submit" }, counttaxonomyposts: true, creativecommons: null, customcss: null, customjs: null, dateformat: ":date_long", description: "", diagram: false, docs: { nav: { expand: false, reducefontsize: true } }, docsnav: { reducefontsize: true }, featuredpostcount: 5, fixedheader: true, fontsize: null, fullwidth: false, giscus: { category: "Announcements", categoryid: "DIC_kwDONgqRs84Cla-h", repo: "conggege325/giscus", repoid: "R_kgDONgqRsw" }, googleadsense: null, keywords: "", logo: "images/avatar-logo.jpg", mainsections: ["blog", "posts", "news", "family", "me", "other"], palette: "purple", palettes: ["blue", "blue gray", "brown", "cyan", "green", "indigo", "orange", "pink", "purple", "red", "teal", "yellow"], pinnedpost: true, pinnedpostcount: 3, post: { copyright: false, featuredimage: true, numberifyheadings: true, numberifyheadingsseparator: "." }, postdate: true, poweredby: false, pwa: { manifest: { short_name: "CGG" } }, readingtime: true, recentpostcount: 5, relatedpostcount: 5, repo: { branch: "main", url: "https://github.com/razonyang/hugo-theme-bootstrap-skeleton" }, reward: null, sass_transpiler: "libsass", search: { fuse: { threshold: 0.1 }, paginate: 5 }, searchbar: true, sidebar: { fixed: true }, sidebartaxonomies: ["series", "categories", "tags", "authors"], siteverification: { baidu: null, baiduunion: null, bing: null, google: null, shenma: null, so: null, sogou: null }, social: { email: "conggege325@qq.com", github: "https://conggege325.github.io/", rss: "" }, socialshare: false, taxonomypaginate: 10, taxonomypostcount: 20, titlecase: true, titleseparator: "-", tocwordcount: 1, topappbar: { social: { github: "https://conggege325.github.io/", rss: "" } }, viewer: true };

  // ns-hugo:D:\dev\workspaces\my-blog\themes\hugo-theme-bootstrap\assets\js\local-storage\index.ts
  var PathLocalStorage = class {
    constructor(baseURL) {
      this.baseURL = baseURL;
      __publicField(this, "prefix", "hbs:");
      if (baseURL.substring(0, 2) === "//") {
        baseURL = "http:" + baseURL;
      }
      let url;
      try {
        url = new URL(baseURL);
      } catch (e) {
        url = new URL(baseURL, location.protocol + "//" + location.host);
      }
      const pathname = url.pathname.replace(/^(\/+)/, "").replace(/(\/+)$/, "");
      if (pathname !== "") {
        this.prefix += pathname.replace("/", "-") + ":";
      }
    }
    getItem(key) {
      return localStorage.getItem(this.prefix + key);
    }
    setItem(key, value) {
      localStorage.setItem(this.prefix + key, value);
    }
    removeItem(key) {
      localStorage.removeItem(this.prefix + key);
    }
  };
  var local_storage_default = new PathLocalStorage(params_default.baseURL);

  // ns-hugo:D:\dev\workspaces\my-blog\themes\hugo-theme-bootstrap\assets\js\mode\index.ts
  var MODE_AUTO = "auto";
  var MODE_DARK = "dark";
  var MODE_LIGHT = "light";
  var modes = [MODE_AUTO, MODE_DARK, MODE_LIGHT];
  var ModeToggle = class _ModeToggle {
    constructor() {
      // Cache key.
      __publicField(this, "key", "mode");
      // Current color mode.
      __publicField(this, "mode");
      __publicField(this, "items");
      let mode = local_storage_default.getItem(this.key);
      if (!mode) {
        mode = params_default.color;
      }
      this.mode = modes.includes(mode) ? mode : MODE_AUTO;
    }
    run() {
      this.setMode(this.mode);
      window.addEventListener("load", () => {
        this.initListeners();
        this.active(this.mode);
      });
    }
    initListeners() {
      this.items = document.querySelectorAll(".mode-item");
      this.items.forEach((ele) => {
        ele.addEventListener("click", () => {
          const mode = ele.getAttribute("data-color-mode");
          this.setMode(mode);
          this.active(mode);
        });
      });
      window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => {
        if (this.isAuto()) {
          this.setMode(e.matches ? "dark" : "light");
        }
      });
    }
    isAuto() {
      return this.mode === MODE_AUTO;
    }
    // Active the relative HTML elements.
    active(mode) {
      var _a, _b;
      this.mode = mode;
      local_storage_default.setItem(this.key, mode);
      this.items.forEach((ele) => {
        const classList = ele.querySelector(".dropdown-item").classList;
        if (ele.getAttribute("data-color-mode") === mode) {
          classList.add("active");
        } else {
          classList.remove("active");
        }
      });
      const icon = (_a = document.querySelector('.mode-item[data-color-mode="' + mode + '"] .mode-icon')) == null ? void 0 : _a.cloneNode(true);
      if (!icon) {
        return;
      }
      icon.setAttribute("id", "modeIcon");
      (_b = document.querySelector("#modeIcon")) == null ? void 0 : _b.replaceWith(icon);
    }
    setMode(value) {
      if (value === "auto") {
        value = _ModeToggle.getPreferredMode();
      }
      console.debug(`Switch to ${value} mode`);
      document.documentElement.setAttribute("data-bs-theme", value);
      const event = new CustomEvent("hbs:mode", { detail: { mode: value } });
      document.dispatchEvent(event);
    }
    static getPreferredMode() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    }
  };
  var mode_default = ModeToggle;

  // ns-hugo:D:\dev\workspaces\my-blog\themes\hugo-theme-bootstrap\assets\js\palettes\index.ts
  var PaletteSelector = class {
    constructor() {
      __publicField(this, "key", "palette");
    }
    run() {
      const palette = this.getPalette();
      if (palette) {
        this.setPalette(palette);
      }
      window.addEventListener("load", () => {
        this.initPalette();
      });
    }
    initPalette() {
      const selected = this.getPalette();
      document.querySelectorAll(".palette").forEach((element) => {
        const paletteId = element.getAttribute("id").replace("palette-", "");
        if (paletteId === selected) {
          element.classList.add("active");
        }
        element.addEventListener("click", () => {
          this.setPalette(paletteId);
          document.querySelector(".palette.active").classList.remove("active");
          element.classList.add("active");
        });
      });
    }
    getPalette() {
      const palette = local_storage_default.getItem(this.key);
      if (palette) {
        return palette;
      }
      const paletteMeta = document.documentElement.getAttribute("data-palette");
      if (paletteMeta) {
        return paletteMeta;
      }
      return "";
    }
    setPalette(palette) {
      console.debug(`switch to palette: ${palette}`);
      document.documentElement.setAttribute("data-palette", palette);
      local_storage_default.setItem(this.key, palette);
    }
  };
  var palettes_default = PaletteSelector;

  // <stdin>
  new mode_default().run();
  new palettes_default().run();
})();
