/* =========================================================
   LEARNIFYNG — INTERACTIVE MVP
   Complete script for the current LearnifyNG HTML
   ========================================================= */


/* --------------------------------
   DEMO DATA
-------------------------------- */

const records = {
  mtn: {
    name: "MTN",
    claim:
      "Illustrative demo claim: strongest sample consistency for the Jabi scenario.",
    evidence: "9 demo items",
    verification: "Demo verified",
    confidence: "High",
    advisory:
      "Best fit when reliability is the main priority."
  },

  airtel: {
    name: "Airtel",
    claim:
      "Illustrative demo claim: value-led option with less consistent sample performance.",
    evidence: "6 demo items",
    verification: "Demo verified",
    confidence: "Medium",
    advisory:
      "Better fit when price is more important than consistency."
  },

  glo: {
    name: "Glo",
    claim:
      "Illustrative demo claim: mixed sample results; needs more verification.",
    evidence: "4 demo items",
    verification: "Needs verification",
    confidence: "Low",
    advisory:
      "Consider only after more local evidence is available."
  }
};


/* --------------------------------
   APPLICATION STATE
-------------------------------- */

let choice = "MTN";

let userQuestion =
  "Which network works best around Jabi?";

let selectedRecord = "mtn";


/* --------------------------------
   ROUTES
-------------------------------- */

const validRoutes = [
  "home",
  "ask",
  "intelligence",
  "evidence",
  "verification",
  "advisory",
  "compare",
  "decision",
  "community"
];


/* --------------------------------
   DOM HELPERS
-------------------------------- */

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}


/* --------------------------------
   LANDING PAGE SECTIONS
-------------------------------- */

function getLandingSections() {
  const main = qs("main");

  if (!main) {
    return [];
  }

  return Array.from(main.children).filter(
    element => element.id !== "mvp"
  );
}


/* --------------------------------
   ROUTING
-------------------------------- */

function go(route, options = {}) {
  const main = qs("main");
  const mvp = qs("#mvp");

  if (!main || !mvp) {
    return;
  }

  if (!validRoutes.includes(route)) {
    route = "home";
  }

  const isHome = route === "home";

  /*
    IMPORTANT:
    #mvp is INSIDE <main>.
    Therefore we must NOT hide <main> when opening
    an MVP route.
  */

  main.hidden = false;

  const landingSections = getLandingSections();

  landingSections.forEach(section => {
    section.hidden = !isHome;
  });

  mvp.hidden = isHome;

  qsa(".mvp-view").forEach(view => {
    view.hidden = true;
    view.classList.remove("active");
    view.style.display = "none";
  });

  if (!isHome) {
    const target = qs(`#${route}-view`);

    if (!target) {
      go("home", options);
      return;
    }

    target.hidden = false;
    target.classList.add("active");
    target.style.display = "block";
  }

  /*
    Keep the question visible throughout the workflow.
  */
  updateQuestionDisplays();

  /*
    Refresh dynamic sections whenever their route opens.
  */
  if (route === "intelligence") {
    cards();
  }

  if (route === "evidence") {
    detail(selectedRecord);
  }

  if (route === "compare") {
    table();
    selectOption(choice, false);
  }

  if (route === "decision") {
    updateDecision();
  }

  /*
    Update URL without creating a large browser history
    chain for every click.
  */
  if (!options.skipHistory) {
    const hash = isHome ? "#top" : `#${route}`;

    if (location.hash !== hash) {
      history.pushState(
        { route },
        "",
        hash
      );
    } else {
      history.replaceState(
        { route },
        "",
        hash
      );
    }
  }

  /*
    Start each route from the top.
  */
  if (!options.skipScroll) {
    window.scrollTo({
      top: 0,
      behavior: options.instant ? "auto" : "smooth"
    });
  }
}


/* --------------------------------
   LANDING PAGE SCROLL
-------------------------------- */

function scrollToSection(id) {
  const target = qs(`#${id}`);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* --------------------------------
   NAVIGATION — DATA-SCROLL
-------------------------------- */

function handleScrollNavigation(element) {
  const targetId = element.dataset.scroll;

  if (!targetId) {
    return;
  }

  /*
    If we are inside the MVP, return to the landing page first.
  */
  if (!qs("#mvp")?.hidden) {
    go("home", {
      skipScroll: true
    });

    setTimeout(() => {
      scrollToSection(targetId);
    }, 50);

    return;
  }

  scrollToSection(targetId);
}


/* --------------------------------
   NAVIGATION — DATA-VIEW
-------------------------------- */

function handleViewNavigation(element) {
  const route = element.dataset.view;

  if (!route) {
    return;
  }

  go(route);
}


/* --------------------------------
   RECORD CARDS
-------------------------------- */

function cards() {
  const list = qs("#record-list");

  if (!list) {
    return;
  }

  list.innerHTML = Object.entries(records)
    .map(([id, record]) => {
      return `
        <article class="record-card">

          <div class="record-top">
            <span class="demo-pill">DEMO DATA</span>
            <span class="confidence">${record.verification}</span>
          </div>

          <h3>${record.claim}</h3>

          <div class="record-meta">

            <span>
              <b>Claim</b>
              ${record.claim}
            </span>

            <span>
              <b>Location</b>
              Jabi, Abuja (demo)
            </span>

            <span>
              <b>Date</b>
              September 2026 (demo)
            </span>

            <span>
              <b>Source</b>
              Illustrative demo record
            </span>

            <span>
              <b>Evidence</b>
              ${record.evidence}
            </span>

            <span>
              <b>Verification</b>
              ${record.verification}
            </span>

            <span>
              <b>Confidence</b>
              ${record.confidence} (demo)
            </span>

            <span>
              <b>Last verified</b>
              September 2026 (demo)
            </span>

          </div>

          <button
            class="outline-dark"
            data-record-open="${id}"
            type="button"
          >
            Why should I trust this? →
          </button>

        </article>
      `;
    })
    .join("");
}


/* --------------------------------
   EVIDENCE DETAIL
-------------------------------- */

function detail(id) {
  const record = records[id];
  const target = qs("#record-detail");

  if (!record || !target) {
    return;
  }

  selectedRecord = id;

  qsa("[data-record]").forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.record === id
    );
  });

  target.innerHTML = `
    <div class="detail-claim">

      <span class="demo-pill">DEMO DATA</span>

      <h2>${record.name} evidence record</h2>

      <p>${record.claim}</p>

    </div>

    <div class="layer">

      <span>FACT</span>

      <p>
        ${record.claim}
        This is illustrative demo intelligence,
        not a real local claim.
      </p>

    </div>

    <div class="layer">

      <span>EVIDENCE</span>

      <div class="evidence-row">

        <b>${record.evidence}</b>

        <small>
          Demo screenshots, observations and documents;
          not real-world activity.
        </small>

      </div>

    </div>

    <div class="layer">

      <span>VERIFICATION</span>

      <p>
        Status: ${record.verification}.
        Method: demo internal consistency review.
        Reviewer role: demo reviewer.
        Date: September 2026.
        Confidence: ${record.confidence}.
      </p>

    </div>

    <div class="layer analysis">

      <span>ANALYSIS</span>

      <p>
        This record can inform comparison but is not
        advisory or a verified recommendation.
      </p>

    </div>
  `;
}


/* --------------------------------
   COMPARISON TABLE
-------------------------------- */

function table() {
  const target = qs("#comparison-table");

  if (!target) {
    return;
  }

  const rows = [
    [
      "Price",
      "Higher",
      "Moderate",
      "Lower"
    ],

    [
      "Local performance",
      "Strong / consistent",
      "Good / variable",
      "Mixed"
    ],

    [
      "Availability",
      "Demo: broad",
      "Demo: broad",
      "Demo: uncertain"
    ],

    [
      "Customer service",
      "Demo: not assessed",
      "Demo: not assessed",
      "Demo: not assessed"
    ],

    [
      "Evidence strength",
      "9 demo items",
      "6 demo items",
      "4 demo items"
    ],

    [
      "Verification",
      "Demo verified",
      "Demo verified",
      "Needs verification"
    ],

    [
      "Freshness",
      "Sep 2026 demo",
      "Sep 2026 demo",
      "Sep 2026 demo"
    ],

    [
      "Pros",
      "Reliability",
      "Value",
      "Low cost"
    ],

    [
      "Cons",
      "Higher price",
      "Less consistency",
      "More uncertainty"
    ],

    [
      "Suitability",
      "Video calls",
      "Balanced use",
      "Budget-first"
    ]
  ];

  target.innerHTML = rows
    .map(row => {
      return `
        <tr>
          <th>${row[0]}</th>

          ${row
            .slice(1)
            .map(value => `<td>${value}</td>`)
            .join("")}
        </tr>
      `;
    })
    .join("");
}


/* --------------------------------
   QUESTION STATE
-------------------------------- */

function setQuestion(value) {
  if (!value) {
    return;
  }

  userQuestion = value.trim();

  updateQuestionDisplays();
}


function updateQuestionDisplays() {
  const questionInput = qs("#question");
  const askInput = qs("#ask-question");
  const intelligenceQuestion = qs("#intelligence-question");

  if (questionInput && document.activeElement !== questionInput) {
    questionInput.value = userQuestion;
  }

  if (askInput) {
    askInput.value = userQuestion;
  }

  if (intelligenceQuestion) {
    intelligenceQuestion.textContent =
      userQuestion || "Your question";
  }
}


/* --------------------------------
   SELECT COMPARISON OPTION
-------------------------------- */

function selectOption(option, refreshDecision = true) {
  if (!option) {
    return;
  }

  const allowedOptions = [
    "MTN",
    "Airtel",
    "Glo"
  ];

  if (!allowedOptions.includes(option)) {
    return;
  }

  choice = option;

  qsa(".option-select").forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.option === choice
    );
  });

  const selectedOption = qs("#selected-option");

  if (selectedOption) {
    selectedOption.textContent =
      `${choice} selected`;
  }

  if (refreshDecision) {
    updateDecision();
  }
}


/* --------------------------------
   DECISION CONTENT
-------------------------------- */

function updateDecision() {
  const decisionTitle = qs("#decision-title");
  const decisionCopy = qs("#decision-copy");
  const confidence = qs("#decision-confidence");

  if (decisionTitle) {
    if (choice === "MTN") {
      decisionTitle.textContent =
        "MTN is the recommended fit.";
    } else {
      decisionTitle.textContent =
        `${choice} is your selected demo option.`;
    }
  }

  if (decisionCopy) {
    const record =
      Object.values(records).find(
        item => item.name === choice
      );

    decisionCopy.textContent =
      record
        ? record.advisory
        : "This is a demo decision summary based only on illustrative records.";
  }

  if (confidence) {
    if (choice === "MTN") {
      confidence.textContent = "Demo: high";
    } else if (choice === "Airtel") {
      confidence.textContent = "Demo: medium";
    } else {
      confidence.textContent = "Demo: low";
    }
  }
}


/* --------------------------------
   SAVE DECISION
-------------------------------- */

function saveDecision() {
  const status = qs("#saved-status");

  if (!status) {
    return;
  }

  status.textContent =
    `${choice} demo decision saved · intelligence status: demo verified, last reviewed September 2026.`;
}


/* --------------------------------
   DEMO ACTIONS
-------------------------------- */

function handleAction(action) {
  switch (action) {

    case "ask-community":
      go("community");
      break;

    case "priority":
      alert(
        "Priority investigation is part of the planned production workflow. This prototype does not create a real investigation."
      );
      break;

    case "signin":
      alert(
        "Sign in is part of the future production version of Learnify. This prototype does not create real accounts."
      );
      break;

    case "privacy":
      alert(
        "Privacy controls are part of the planned production version of Learnify. This prototype does not collect or create real investigation data."
      );
      break;

    default:
      break;
  }
}


/* --------------------------------
   CLICK EVENT DELEGATION
-------------------------------- */

document.addEventListener("click", event => {

  /*
    Find the closest relevant interactive element.
  */
  let element;


  /* --------------------------------
     DATA-ROUTE
  -------------------------------- */

  element = event.target.closest("[data-route]");

  if (element) {
    event.preventDefault();

    go(element.dataset.route);

    return;
  }


  /* --------------------------------
     DATA-VIEW
  -------------------------------- */

  element = event.target.closest("[data-view]");

  if (element) {
    event.preventDefault();

    handleViewNavigation(element);

    return;
  }


  /* --------------------------------
     DATA-SCROLL
  -------------------------------- */

  element = event.target.closest("[data-scroll]");

  if (element) {
    event.preventDefault();

    handleScrollNavigation(element);

    return;
  }


  /* --------------------------------
     EXAMPLE QUESTIONS
  -------------------------------- */

  element = event.target.closest(".example-question");

  if (element) {
    event.preventDefault();

    const value =
      element.textContent.trim();

    setQuestion(value);

    /*
      Examples are on the homepage.
      Send the user into the actual question screen.
    */
    go("ask");

    return;
  }


  /* --------------------------------
     RECORD OPEN
  -------------------------------- */

  element = event.target.closest(
    "[data-record-open]"
  );

  if (element) {
    event.preventDefault();

    const recordId =
      element.dataset.recordOpen;

    detail(recordId);

    go("evidence");

    return;
  }


  /* --------------------------------
     RECORD SELECTOR
  -------------------------------- */

  element = event.target.closest(
    "[data-record]"
  );

  if (element) {
    event.preventDefault();

    const recordId =
      element.dataset.record;

    detail(recordId);

    return;
  }


  /* --------------------------------
     COMPARISON OPTION
  -------------------------------- */

  element = event.target.closest(
    "[data-option]"
  );

  if (element) {
    event.preventDefault();

    selectOption(
      element.dataset.option
    );

    return;
  }


  /* --------------------------------
     SAVE DECISION
  -------------------------------- */

  element = event.target.closest(
    "#save-decision"
  );

  if (element) {
    event.preventDefault();

    saveDecision();

    return;
  }


  /* --------------------------------
     DEMO ACTION
  -------------------------------- */

  element = event.target.closest(
    "[data-action]"
  );

  if (element) {
    event.preventDefault();

    handleAction(
      element.dataset.action
    );

    return;
  }


  /* --------------------------------
     CLOSE OLD OVERLAY
     Safe support for existing markup.
  -------------------------------- */

  element = event.target.closest(
    "#app-close"
  );

  if (element) {
    event.preventDefault();

    const overlay = qs("#app-overlay");

    if (overlay) {
      overlay.classList.remove("open");
      overlay.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    return;
  }

});


/* --------------------------------
   HERO QUESTION FORM
-------------------------------- */

const questionForm =
  qs("#question-form");

if (questionForm) {

  questionForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const input =
        qs("#question");

      if (!input) {
        return;
      }

      const value =
        input.value.trim();

      if (!value) {
        input.focus();
        return;
      }

      setQuestion(value);

      go("ask");
    }
  );

}


/* --------------------------------
   ASK SCREEN — RUN QUESTION
-------------------------------- */

const runQuestion =
  qs("#run-question");

if (runQuestion) {

  runQuestion.addEventListener(
    "click",
    event => {

      event.preventDefault();

      const askInput =
        qs("#ask-question");

      if (askInput) {

        const value =
          askInput.value.trim();

        if (value) {
          setQuestion(value);
        }
      }

      go("intelligence");
    }
  );

}


/* --------------------------------
   BRAND HOME LINKS
-------------------------------- */

document.addEventListener("click", event => {

  const brand =
    event.target.closest(
      'a[href="#top"]'
    );

  if (!brand) {
    return;
  }

  /*
    Only intercept the brand links.
    This keeps About-style links harmless.
  */
  if (
    brand.classList.contains("brand")
  ) {
    event.preventDefault();

    go("home");

    return;
  }

});


/* --------------------------------
   BROWSER BACK / FORWARD
-------------------------------- */

function routeFromHash() {

  let route =
    location.hash
      .replace(/^#/, "")
      .trim();

  /*
    Empty hash means home.
  */
  if (!route) {
    route = "home";
  }

  /*
    #top is home.
  */
  if (route === "top") {
    route = "home";
  }

  /*
    Unknown hashes return home.
  */
  if (!validRoutes.includes(route)) {
    route = "home";
  }

  go(route, {
    skipHistory: true,
    skipScroll: false,
    instant: true
  });
}


window.addEventListener(
  "popstate",
  routeFromHash
);

window.addEventListener(
  "hashchange",
  routeFromHash
);


/* --------------------------------
   INITIALIZE
-------------------------------- */

function initialize() {

  /*
    Render dynamic content.
  */
  cards();

  detail("mtn");

  table();

  selectOption(
    choice,
    false
  );

  updateQuestionDisplays();

  updateDecision();


  /*
    Determine initial route.
  */
  let initialRoute =
    location.hash
      .replace(/^#/, "")
      .trim();

  if (!initialRoute) {
    initialRoute = "home";
  }

  if (initialRoute === "top") {
    initialRoute = "home";
  }

  if (!validRoutes.includes(initialRoute)) {
    initialRoute = "home";
  }

  go(initialRoute, {
    skipHistory: true,
    skipScroll: true,
    instant: true
  });

}


/* --------------------------------
   START APPLICATION
-------------------------------- */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initialize
  );

} else {

  initialize();

}
