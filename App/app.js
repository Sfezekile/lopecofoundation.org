/* LOPECO initiatives: category tiles + category pages (hash routed).
   Needs in index.html:  <div id="cats" class="cats"></div>  inside #initiatives,
   <div id="home"> wrapping the page inside <main>, and <div id="catview" hidden></div> after it. */
(function () {
  var IMG = {
  "pre": "Icons/initiatives/pre.webp",
  "parcel": "Icons/initiatives/parcel.webp",
  "brains": "Icons/initiatives/brains.webp",
  "walks": "Icons/initiatives/walks.webp",
  "card": "Icons/initiatives/card.webp",
  "diary": "Icons/initiatives/diary.webp",
  "crx": "Icons/initiatives/crx.webp",
  "ylamp": "Icons/initiatives/ylamp.webp",
  "men": "Icons/initiatives/men.webp",
  "women": "Icons/initiatives/women.webp",
  "young": "Icons/initiatives/young.webp",
  "actors": "Icons/initiatives/actors.webp",
  "oyw": "Icons/initiatives/oyw.webp",
  "tiny": "Icons/initiatives/tiny.webp",
  "kona": "Icons/initiatives/kona.webp"
};
  var CATS = [
  {
    "id": "health",
    "name": "Health & Relief",
    "bg": "#d4147a",
    "ink": "#ffffff",
    "items": [
      [
        "PrEpidemics",
        "Health & Safety Advocacy",
        "pre"
      ],
      [
        "PeaceParcel",
        "Emergency relief and psychosocial support",
        "parcel"
      ],
      [
        "Tiny Heroes & Big Shields",
        "Focuses on immunizations and mother-to-child health",
        "tiny"
      ]
    ]
  },
  {
    "id": "gender",
    "name": "Women, Men & Gender",
    "bg": "#29a9e0",
    "ink": "#0b2533",
    "items": [
      [
        "Women4Peace",
        "Supports women's leadership and inclusion",
        "women"
      ],
      [
        "Men4Peace",
        "Men's Peacebuilding Programme",
        "men"
      ],
      [
        "16 Actors on EVAWG",
        "Positive Bystanders",
        "actors"
      ]
    ]
  },
  {
    "id": "youth",
    "name": "Youth & Children",
    "bg": "#8dc63f",
    "ink": "#222629",
    "items": [
      [
        "Youth-Led Mechanism for Peace (YLAMP)",
        "Youth Peace Conversations",
        "ylamp"
      ],
      [
        "Young Women Peacebuilders",
        "Young women leading community peacebuilding",
        "young"
      ],
      [
        "Orange Your World",
        "Peacebuilding for children",
        "oyw"
      ]
    ]
  },
  {
    "id": "mind",
    "name": "Mind & Wellbeing",
    "bg": "#f28c28",
    "ink": "#222629",
    "items": [
      [
        "Brains4Peace",
        "Positive Thoughts Programme",
        "brains"
      ],
      [
        "Peace Walks",
        "Individual and community peace walks",
        "walks"
      ],
      [
        "Orange Diary",
        "Peacebuilding TECH: promotes digital emotional literacy",
        "diary"
      ]
    ]
  },
  {
    "id": "community",
    "name": "Community & Co-existence",
    "bg": "#2f3338",
    "ink": "#ffffff",
    "items": [
      [
        "PeaceKona Community Club",
        "Community-centered peacebuilding programme",
        "kona"
      ],
      [
        "Peace Card",
        "Peace Games and Indigenous Sports",
        "card"
      ],
      [
        "Combating Racism and Xenophobia 24:7",
        "CRX Combatants (Co-existence)",
        "crx"
      ]
    ]
  }
];

 var q = function (s) { return document.querySelector(s); };
var TITLE = 'LOPECO Foundation | Lady of Peace Community Foundation';

function tiles() {
  var box = q('#cats');
  if (!box) return;
  box.innerHTML = CATS.map(function (c) {
    return '<a class="cat" href="#cat-' + c.id + '" style="--b:' + c.bg + ';--i:' + c.ink + '">' +
      '<b>' + c.name + '</b><small>' + c.items.length + ' initiatives &rarr;</small></a>';
  }).join('') +
    '<a class="cat more-tile" href="mailto:info@lopecofoundation.org?subject=Initiatives%20enquiry">' +
    '<b>Something else?</b><small>Message us &rarr;</small></a>';
}

function view() {
  var home = q('#home'), cv = q('#catview');
  if (!home || !cv) return;               // safety: do nothing if the wrappers are missing

  var h = location.hash.slice(1);
  var c = CATS.find(function (x) { return 'cat-' + x.id === h; });

  if (c) {
    var cards = c.items.map(function (i) {
      return `<article class="card">
        <div class="logo"><img src="${IMG[i[2]]}" alt="${i[0]} logo"></div>
        <h3>${i[0]}</h3>
        <p style="color:var(--muted)">${i[1]}</p>
        <a class="more" href="mailto:info@lopecofoundation.org?subject=${encodeURIComponent(i[0])}">Enquire &rarr;</a>
      </article>`;
    }).join('');

    cv.innerHTML = `<section><div class="wrap">
      <a class="back" href="#initiatives">&larr; All initiatives</a>
      <div class="ihead"><div>
        <p class="eyebrow" style="margin:0">Initiatives</p>
        <h2 style="margin:0">${c.name}</h2>
      </div></div>
      <div class="strip" style="width:120px;border-radius:4px;margin:14px 0 28px"></div>
      <div class="grid">${cards}</div>
    </div></section>`;

    home.hidden = true;
    cv.hidden = false;
    window.scrollTo(0, 0);
    document.title = c.name + ' | LOPECO Foundation';
  } else {
    var was = home.hidden;
    cv.hidden = true;
    home.hidden = false;
    document.title = TITLE;
    var t = h && document.getElementById(h);
    if (was) { if (t) t.scrollIntoView(); else window.scrollTo(0, 0); }
  }
}

tiles();
window.addEventListener('hashchange', view);
view();
})();