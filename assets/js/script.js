// ---------- Edit your details here ----------
const owner = {
  phone: "+639611216861", // <- your number
  email: "urielnacorda07@gmail.com", // <- your email
  messenger: "https://www.facebook.com/uriel.nacorda.official", // <- your Messenger / IG link
};

const socialLinks = [
  {
    label: "Facebook",
    url: "https://www.facebook.com/uriel.nacorda.official",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4z"/></svg>',
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/urielnacorda?stkn=MWt3d3pkdDExaHh2OA==",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.8" r="1.2"/></svg>',
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@sp4derrr?_r=1&_t=ZS-9ANeJWLMebS",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 8.2a7 7 0 0 1-4.3-1.5v8.1a5.4 5.4 0 1 1-4.7-5.3v3.1a2.4 2.4 0 1 0 1.7 2.3V2.5h3.1c.2 2 1.7 3.6 4.2 3.8v1.9z"/></svg>',
  },
  {
    label: "Reclub",
    url: "https://reclub.co/players/@uriel-709",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V4h7a5 5 0 0 1 1.8 9.7L19 20h-4l-4.5-6H8.5v6H5zm3.5-9.2h3.3a1.8 1.8 0 1 0 0-3.6H8.5v3.6z"/></svg>',
  },
];

const posts = [
  {
    id: "pic2",
    image: "assets/images/Pic2.jpg",
    caption: "Getting started on the court! 🏓",
    liked: false,
    comments: [],
  },
  {
    id: "op1",
    image: "assets/images/OP1.jpg",
    caption: "Open play — learning one rally at a time.",
    liked: false,
    comments: [],
  },
  {
    id: "op2",
    image: "assets/images/OP2.jpg",
    caption: "Another great day for open play.",
    liked: false,
    comments: [],
  },

];

// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);
const sheet = $("sheet");

// ---------- Color themes ----------
const themePicker = $("themePicker");
const themeList = $("themeList");
const themeStatus = $("themeStatus");
const paletteStorageKey = "paddleIdPalette";
const palettes = [
  {
    id: "default",
    name: "Default Theme",
    colors: ["#0e3a2b", "#17553e", "#f6f3e8", "#0b2b20", "#dcea4a"],
  },
  {
    id: "court",
    name: "Classic Court",
    colors: ["#0e3a2b", "#17553e", "#f6f3e8", "#0b2b20", "#dcea4a"],
  },
  {
    id: "ocean",
    name: "Coastal Blue",
    colors: ["#102a43", "#1d4e89", "#f0f7ff", "#102a43", "#ffb703"],
  },
  {
    id: "rose",
    name: "Rosewood",
    colors: ["#3d1f2b", "#843b55", "#fff4f1", "#351824", "#f4a261"],
  },
  {
    id: "pink",
    name: "Pink",
    colors: ["#57243a", "#c65377", "#fff1f5", "#351824", "#f28cae"],
  },
  {
    id: "pastel-yellow",
    name: "Pastel Yellow",
    colors: ["#6b5a00", "#d1a900", "#fff9c9", "#3d3500", "#f6d84a"],
  },
  {
    id: "lavender",
    name: "Lavender Night",
    colors: ["#2e1a47", "#563879", "#f7f2ff", "#26143d", "#f2c14e"],
  },
  {
    id: "slate",
    name: "Slate & Citrus",
    colors: ["#243b53", "#486581", "#f5f7fa", "#1f2933", "#ff9f43"],
  },
];
let selectedPalette = palettes[0].id;

function applyPalette(id, save = true) {
  const palette = palettes.find((item) => item.id === id);
  if (!palette) return false;

  const [pine, court, paper, ink, ball] = palette.colors;
  const root = document.documentElement;
  selectedPalette = palette.id;
  root.dataset.palette = palette.id;

  root.style.setProperty("--pine", pine);
  root.style.setProperty("--court", court);
  root.style.setProperty("--paper", paper);
  root.style.setProperty("--card", `color-mix(in srgb, ${paper} 88%, white)`);
  root.style.setProperty("--ink", ink);
  root.style.setProperty("--mute", `color-mix(in srgb, ${ink} 62%, ${paper})`);
  root.style.setProperty("--hair", `color-mix(in srgb, ${ink} 14%, ${paper})`);
  root.style.setProperty("--ball", ball);

  if (save) {
    try {
      localStorage.setItem(paletteStorageKey, palette.id);
      themeStatus.textContent = `${palette.name} theme applied and saved on this device.`;
    } catch {
      themeStatus.textContent = `${palette.name} theme applied, but your browser could not save it.`;
    }
  }

  themeList.querySelectorAll(".theme-picker__option").forEach((option) => {
    option.setAttribute("aria-pressed", String(option.dataset.paletteId === selectedPalette));
  });
  return true;
}

function renderPalette(palette) {
  const option = document.createElement("button");
  option.className = "theme-picker__option";
  option.type = "button";
  option.dataset.paletteId = palette.id;
  option.setAttribute("aria-label", `Apply ${palette.name} color theme`);
  option.setAttribute("aria-pressed", String(palette.id === selectedPalette));

  const swatches = document.createElement("span");
  swatches.className = "theme-picker__swatches";
  swatches.setAttribute("aria-hidden", "true");
  palette.colors.forEach((color) => {
    const swatch = document.createElement("span");
    swatch.className = "theme-picker__swatch";
    swatch.style.backgroundColor = color;
    swatches.append(swatch);
  });

  const meta = document.createElement("span");
  meta.className = "theme-picker__meta";
  const label = document.createElement("span");
  label.textContent = palette.name;
  const colorCount = document.createElement("span");
  colorCount.textContent = "5 colors";
  meta.append(label, colorCount);
  option.append(swatches, meta);
  option.addEventListener("click", () => applyPalette(palette.id));
  themeList.append(option);
}

palettes.forEach(renderPalette);

try {
  const savedPalette = localStorage.getItem(paletteStorageKey);
  if (savedPalette && palettes.some((palette) => palette.id === savedPalette)) {
    applyPalette(savedPalette, false);
  } else {
    if (savedPalette) localStorage.removeItem(paletteStorageKey);
    applyPalette(palettes[0].id, false);
  }
} catch (error) {
  console.error("Unable to read the saved color theme. The default theme will be used.", error);
}

$("themeOpen").addEventListener("click", () => {
  themePicker.showModal();
});
$("themeClose").addEventListener("click", () => themePicker.close());
themePicker.addEventListener("click", (event) => {
  if (event.target === themePicker) themePicker.close();
});
function openSheet(title, bodyHTML) {
  $("sheetTitle").textContent = title;
  $("sheetBody").innerHTML = bodyHTML;
  if (!sheet.open) sheet.showModal();
}

// ---------- Paddle number from the link: ?id=0042 ----------
const id = new URLSearchParams(location.search).get("id");
if (id) {
  $("paddleNo").textContent = id;
  $("idNo").textContent = id;
}

// ---------- Build social links + grid ----------
socialLinks.forEach((social) => {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.className = "hl";
  link.href = social.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Visit ${social.label}`);
  const icon = document.createElement("span");
  icon.className = "hl__circle";
  icon.innerHTML = social.icon;
  const label = document.createElement("span");
  label.textContent = social.label;
  link.append(icon, label);
  li.append(link);
  $("highlights").appendChild(li);
});

const postFeed = $("postFeed");
const postViewer = $("postViewer");
const imageViewer = $("imageViewer");
const viewerPhoto = imageViewer.querySelector("img");
const profilePhotoSrc = viewerPhoto.src;
const profilePhotoAlt = viewerPhoto.alt;

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function updatePostCounts(post, likeCount, commentCount) {
  likeCount.textContent = `${post.liked ? 1 : 0} likes`;
  commentCount.textContent = `${post.comments.length} comments`;
}

function sharePost(post, status) {
  const url = new URL(post.image, location.href).href;
  if (navigator.share) {
    navigator
      .share({ title: "Uriel Nacorda", text: post.caption, url })
      .then(() => {
        status.textContent = "Post shared.";
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          status.textContent = "Unable to share this post.";
        }
      });
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        status.textContent = "Post link copied.";
      })
      .catch(() => {
        window.prompt("Copy this post link:", url);
        status.textContent = "Copy the post link to share it.";
      });
    return;
  }

  window.prompt("Copy this post link:", url);
  status.textContent = "Copy the post link to share it.";
}

function buildPost(post) {
  const article = makeElement("article", "post-card");
  article.id = `post-${post.id}`;

  const header = makeElement("header", "post-card__header");
  const avatar = makeElement("img", "post-card__avatar");
  avatar.src = "assets/images/Pic1.jpg";
  avatar.alt = "";
  header.append(avatar);
  const account = makeElement("div");
  account.append(makeElement("div", "post-card__account", "urielnacorda"));
  account.append(makeElement("span", "post-card__location", "Cebu, Philippines"));
  header.append(account);
  article.append(header);

  const photoButton = makeElement("button", "post-card__photo");
  photoButton.type = "button";
  photoButton.setAttribute("aria-label", `View photo: ${post.caption}`);
  const photo = makeElement("img");
  photo.src = post.image;
  photo.alt = post.caption;
  photoButton.append(photo);
  photoButton.addEventListener("click", () => {
    viewerPhoto.src = post.image;
    viewerPhoto.alt = post.caption;
    imageViewer.showModal();
  });
  article.append(photoButton);

  const body = makeElement("div", "post-card__body");
  const actions = makeElement("div", "post-card__actions");
  const likeButton = makeElement("button", "post-action post-action--like", "♡ Like");
  likeButton.type = "button";
  likeButton.setAttribute("aria-pressed", "false");
  const commentButton = makeElement("button", "post-action", "Comment");
  commentButton.type = "button";
  const shareButton = makeElement("button", "post-action", "Share");
  shareButton.type = "button";
  actions.append(likeButton, commentButton, shareButton);
  body.append(actions);

  const likeCount = makeElement("p", "post-card__likes");
  const caption = makeElement("p", "post-card__caption");
  caption.append(makeElement("strong", "", "urielnacorda"));
  caption.append(document.createTextNode(post.caption));
  const commentCount = makeElement("p", "post-card__share-status");
  const commentList = makeElement("ul", "post-card__comments");
  const status = makeElement("p", "post-card__share-status");
  status.setAttribute("aria-live", "polite");

  function renderComments() {
    commentList.replaceChildren();
    post.comments.forEach((comment) => {
      const item = makeElement("li", "post-card__comment");
      item.append(makeElement("strong", "", "You"));
      item.append(document.createTextNode(comment));
      commentList.append(item);
    });
  }

  updatePostCounts(post, likeCount, commentCount);
  body.append(likeCount, caption, commentCount, commentList);

  const form = makeElement("form", "post-card__comment-form");
  const input = makeElement("input", "post-card__comment-input");
  input.type = "text";
  input.placeholder = "Add a comment...";
  input.maxLength = 300;
  input.setAttribute("aria-label", "Add a comment");
  const submit = makeElement("button", "post-card__comment-submit", "Post");
  submit.type = "submit";
  form.append(input, submit);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    post.comments.push(value);
    input.value = "";
    renderComments();
    updatePostCounts(post, likeCount, commentCount);
  });
  body.append(form, status);
  article.append(body);

  likeButton.addEventListener("click", () => {
    post.liked = !post.liked;
    likeButton.textContent = post.liked ? "♥ Liked" : "♡ Like";
    likeButton.classList.toggle("is-liked", post.liked);
    likeButton.setAttribute("aria-pressed", String(post.liked));
    updatePostCounts(post, likeCount, commentCount);
  });
  commentButton.addEventListener("click", () => input.focus());
  shareButton.addEventListener("click", () => sharePost(post, status));

  return article;
}

posts.forEach((post, index) => {
  const tile = makeElement("button", "tile");
  tile.type = "button";
  tile.setAttribute("aria-label", `Open post ${index + 1}: ${post.caption}`);
  const thumbnail = makeElement("img");
  thumbnail.src = post.image;
  thumbnail.alt = "";
  tile.append(thumbnail);
  tile.addEventListener("click", () => {
    postViewer.showModal();
    requestAnimationFrame(() => {
      const target = $(`post-${post.id}`);
      postFeed.scrollTop = target.offsetTop - postFeed.offsetTop;
    });
  });
  $("grid").append(tile);
  postFeed.append(buildPost(post));
});

$("postClose").addEventListener("click", () => postViewer.close());
postViewer.addEventListener("click", (event) => {
  if (event.target === postViewer) postViewer.close();
});

// ---------- "Found this paddle?" sheet ----------
document.querySelector('[data-sheet="found"]').addEventListener("click", () => {
  openSheet(
    "Thanks for finding it!",
    `<p>This paddle belongs to Uriel Nacorda. Send a message and I'll come pick it up.</p>
     <div class="contact">
       <a href="tel:${owner.phone}">Call Uriel</a>
       <a class="alt" href="sms:${owner.phone}?body=Hi%20Uriel%2C%20I%20found%20your%20paddle.">Send a text</a>
       <a class="alt" href="${owner.messenger}">Message on Messenger</a>
       <a class="alt" href="mailto:${owner.email}?subject=Found%20your%20paddle">Email</a>
     </div>`,
  );
});


// ---------- Sheet close ----------
$("sheetClose").addEventListener("click", () => sheet.close());
sheet.addEventListener("click", (e) => {
  if (e.target === sheet) sheet.close();
});

// ---------- Profile image viewer ----------
$("imageOpen").addEventListener("click", () => {
  viewerPhoto.src = profilePhotoSrc;
  viewerPhoto.alt = profilePhotoAlt;
  imageViewer.showModal();
});
$("imageClose").addEventListener("click", () => imageViewer.close());
imageViewer.addEventListener("click", (e) => {
  if (e.target === imageViewer) imageViewer.close();
});

// ---------- Splash ----------
let splash = $("splash");
let timer;

function leave() {
  clearTimeout(timer);
  splash.classList.add("leave");
  document.body.classList.remove("locked");
}

function bind(el) {
  el.addEventListener("click", leave);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      leave();
    }
  });
}

function play() {
  // Cloning the node restarts every CSS animation from the beginning
  const fresh = splash.cloneNode(true);
  fresh.classList.remove("leave");
  splash.replaceWith(fresh);
  splash = fresh;
  bind(splash);
  window.scrollTo(0, 0);
  document.body.classList.add("locked");
  timer = setTimeout(leave, 6200);
}

bind(splash);
timer = setTimeout(leave, 6200);
$("replay").addEventListener("click", play);
