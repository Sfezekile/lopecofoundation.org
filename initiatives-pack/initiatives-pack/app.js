/* LOPECO initiatives: category cards + category pages (hash routed).
   Needs in index.html:  <div id="cats" class="cats"></div>  inside #initiatives,
   <div id="home"> wrapping the page inside <main>, and <div id="catview" hidden></div> after it. */
(function () {
  var IMG = {
    pre: "Icons/initiatives/pre.webp", parcel: "Icons/initiatives/parcel.webp", brains: "Icons/initiatives/brains.webp",
    walks: "Icons/initiatives/walks.webp", card: "Icons/initiatives/card.webp", diary: "Icons/initiatives/diary.webp",
    crx: "Icons/initiatives/crx.webp", ylamp: "Icons/initiatives/ylamp.webp", men: "Icons/initiatives/men.webp",
    women: "Icons/initiatives/women.webp", young: "Icons/initiatives/young.webp", actors: "Icons/initiatives/actors.webp",
    oyw: "Icons/initiatives/oyw.webp", tiny: "Icons/initiatives/tiny.webp", kona: "Icons/initiatives/kona.webp"
  };

  var CATS = [
    { id: "health", name: "Health & Relief",
      color: "#d4147a", hero: "Icons/heroes/health.jpg",
      desc: "Health and safety advocacy, emergency relief and immunisation-focused programmes.",
      items: [["PrEpidemics", "Health & Safety Advocacy", "pre"],
              ["PeaceParcel", "Emergency relief and psychosocial support", "parcel"],
              ["Tiny Heroes & Big Shields", "Focuses on immunizations and mother-to-child health", "tiny"]] },
    { id: "gender", name: "Women, Men & Gender",
      color: "#29a9e0", hero: "Icons/heroes/gender.jpg",
      desc: "Women's leadership, men's peacebuilding and positive bystanders against violence on women and girls.",
      items: [["Women4Peace", "Supports women's leadership and inclusion", "women"],
              ["Men4Peace", "Men's Peacebuilding Programme", "men"],
              ["16 Actors on EVAWG", "Positive Bystanders", "actors"]] },
    { id: "youth", name: "Youth & Children",
      color: "#8dc63f", hero: "Icons/heroes/youth.jpg",
      desc: "Youth peace conversations, young women peacebuilders and peacebuilding for children.",
      items: [["Youth-Led Mechanism for Peace (YLAMP)", "Youth Peace Conversations", "ylamp"],
              ["Young Women Peacebuilders", "Young women leading community peacebuilding", "young"],
              ["Orange Your World", "Peacebuilding for children", "oyw"]] },
    { id: "mind", name: "Mind & Wellbeing",
      color: "#f28c28", hero: "Icons/heroes/mind.jpg",
      desc: "Positive thoughts, peace walks and digital emotional literacy.",
      items: [["Brains4Peace", "Positive Thoughts Programme", "brains"],
              ["Peace Walks", "Individual and community peace walks", "walks"],
              ["Orange Diary", "Peacebuilding TECH: promotes digital emotional literacy", "diary"]] },
    { id: "community", name: "Community & Co-existence",
      color: "#2f3338", hero: "Icons/heroes/community.jpg",
      desc: "Community-centred peacebuilding, peace games and indigenous sports, and combating racism and xenophobia.",
      items: [["PeaceKona Community Club", "Community-centered peacebuilding programme", "kona"],
              ["Peace Card", "Peace Games and Indigenous Sports", "card"],
              ["Combating Racism and Xenophobia 24:7", "CRX Combatants (Co-existence)", "crx"]] }
  ];

  var q = function (s) { return document.querySelector(s); };
  var TITLE = 'LOPECO Foundation | Lady of Peace Community Foundation';
  var CHEV = '<i class="ri-arrow-right-s-line"></i>';

  function tiles() {
    var box = q('#cats');
    if (!box) return;
    box.innerHTML = CATS.map(function (c) {
      return '<a class="cat" href="#cat-' + c.id + '">' +
        '<div class="top"><span class="ttl">' + c.name + '</span></div><div class="bar"></div>' +
        '<p>' + c.desc + '</p><span class="xbtn">Explore More ' + CHEV + '</span></a>';
    }).join('') +
      '<a class="cat more-tile" href="mailto:info@lopecofoundation.org?subject=Initiatives%20enquiry">' +
      '<div class="top"><span class="ttl">Something else?</span></div><div class="bar"></div>' +
      '<p>Looking for another programme, or want to collaborate? Message the foundation.</p>' +
      '<span class="xbtn">Message Us ' + CHEV + '</span></a>';
  }

  function view() {
    var home = q('#home'), cv = q('#catview');
    if (!home || !cv) return;

    var h = location.hash.slice(1);
    var c = CATS.find(function (x) { return 'cat-' + x.id === h; });

    if (c) {
      var cards = c.items.map(function (i) {
        return `<article class="card icard">
          <div class="logo"><img src="${IMG[i[2]]}" alt="${i[0]} logo"></div>
          <div class="bar"></div>
          <h3>${i[0]}</h3>
          <p>${i[1]}</p>
          <a class="xbtn" href="mailto:info@lopecofoundation.org?subject=${encodeURIComponent(i[0])}">Enquire ${CHEV}</a>
        </article>`;
      }).join('');

      cv.innerHTML = `
        <div class="chero" style="--hc:${c.color};background-image:linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,.68)),url('${c.hero}')">
          <div class="wrap">
            <a class="back" href="#initiatives"><i class="ri-arrow-left-s-line"></i></a>
            <h2>${c.name}</h2>
            <p class="cdesc">${c.desc}</p>
          </div>
        </div>
        <div class="strip"></div>
        <section><div class="wrap"><div class="grid" style="gap:28px">${cards}</div></div></section>`;

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