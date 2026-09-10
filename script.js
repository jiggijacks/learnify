const records = {
  mtn: {
    name: "MTN",
    claim: "Illustrative demo claim: strongest sample consistency for the Jabi scenario.",
    evidence: "9 demo items",
    verification: "Demo verified",
    confidence: "High",
    advisory: "Best fit when reliability is the main priority."
  },

  airtel: {
    name: "Airtel",
    claim: "Illustrative demo claim: value-led option with less consistent sample performance.",
    evidence: "6 demo items",
    verification: "Demo verified",
    confidence: "Medium",
    advisory: "Better fit when price is more important than consistency."
  },

  glo: {
    name: "Glo",
    claim: "Illustrative demo claim: mixed sample results; needs more verification.",
    evidence: "4 demo items",
    verification: "Needs verification",
    confidence: "Low",
    advisory: "Consider only after more local evidence is available."
  }
};

let choice = "MTN";
let userQuestion = "Which network works best around Jabi?";

/* --------------------------------
   ROUTING
-------------------------------- */

function go(route) {
  const main = document.querySelector("main");
  const mvp = document.querySelector("#mvp");

  if (!main || !mvp) return;

  const home = route === "home";

  main.hidden = !home;
  mvp.hidden = home;

  document.querySelectorAll(".mvp-view").forEach(view => {
    view.style.display = "none";
  });

  if (!home) {
    const target = document.querySelector(`#${route}-view`);

    if (target) {
      target.style.display = "block";
    } else {
      main.hidden = false;
      mvp.hidden = true;
      return;
    }
  }

  history.replaceState(null, "", `#${route}`);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* --------------------------------
   RECORD CARDS
-------------------------------- */

function cards() {
  const list = document.querySelector("#record-list");

  if (!list) return;

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
  const target = document.querySelector("#record-detail");

  if (!record || !target) return;

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
  const target = document.querySelector("#comparison-table");

  if (!target) return;

  const rows = [
    ["Price", "Higher", "Moderate", "Lower"],
    ["Local performance", "Strong / consistent", "Good / variable", "Mixed"],
    ["Availability", "Demo: broad", "Demo: broad", "Demo: uncertain"],
    ["Customer service", "Demo: not assessed", "Demo: not assessed", "Demo: not assessed"],
    ["Evidence strength", "9 demo items", "6 demo items", "4 demo items"],
    ["Verification", "Demo verified", "Demo verified", "Needs verification"],
    ["Freshness", "Sep 2026 demo", "Sep 2026 demo", "Sep 2026 demo"],
    ["Pros", "Reliability", "Value", "Low cost"],
    ["Cons", "Higher price", "Less consistency", "More uncertainty"],
    ["Suitability", "Video calls", "Balanced use", "Budget-first"]
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
  userQuestion = value;

  const questionInput = document.querySelector("#question");
  const askInput = document.querySelector("#ask-question");

  if (questionInput) {
    questionInput.value = value;
  }

  if (askInput) {
    askInput.value = value;
  }
}

/* --------------------------------
   SELECT OPTION
-------------------------------- */

function selectOption(option) {
  choice = option;

  document
    .querySelectorAll(".option-select")
    .forEach(button => {
      button.classList.toggle(
        "selected",
        button.dataset.option === choice
      );
    });

  const selectedOption =
    document.querySelector("#selected-option");

  if (selectedOption) {
    selectedOption.textContent = `${choice} selected`;
  }

  const decisionTitle =
    document.querySelector("#decision-title");

  if (decisionTitle) {
    decisionTitle.textContent =
      choice === "MTN"
        ? "MTN is the recommended fit."
        : `${choice} is your selected demo option.`;
  }

  const decisionCopy =
    document.querySelector("#decision-copy");

  if (decisionCopy) {
    decisionCopy.textContent =
      "This is a demo decision summary based only on illustrative records.";
  }
}

/* --------------------------------
   EVENT DELEGATION
-------------------------------- */

document.addEventListener("click", event => {

  /* Navigation routes */

  let element = event.target.closest("[data-route]");

  if (element) {
    event.preventDefault();

    go(element.dataset.route);

    return;
  }

  /* Example questions */

  element = event.target.closest(".example-question");

  if (element) {
    event.preventDefault();

    setQuestion(element.textContent.trim());

    return;
  }

  /* Evidence record */

  element = event.target.closest("[data-record-open]");

  if (element) {
    event.preventDefault();

    const recordId = element.dataset.recordOpen;

    detail(recordId);

    go("evidence");

    return;
  }

  /* Record selection */

  element = event.target.closest("[data-record]");

  if (element) {
    event.preventDefault();

    detail(element.dataset.record);

    return;
  }

  /* Comparison option */

  element = event.target.closest("[data-option]");

  if (element) {
    event.preventDefault();

    selectOption(element.dataset.option);

    return;
  }

  /* Save decision */

  if (event.target.closest("#save-decision")) {
    event.preventDefault();

    const status =
      document.querySelector("#saved-status");

    if (status) {
      status.textContent =
        "Jabi demo decision saved · intelligence status: demo verified, last reviewed September 2026.";
    }

    return;
  }

  /* Continue buttons */

  element = event.target.closest("[data-next]");

  if (element) {
    event.preventDefault();

    go(element.dataset.next);

    return;
  }
});

/* --------------------------------
   HERO QUESTION FORM
-------------------------------- */

const questionForm =
  document.querySelector("#question-form");

if (questionForm) {
  questionForm.addEventListener("submit", event => {
    event.preventDefault();

    const input =
      document.querySelector("#question");

    if (!input) return;

    const value = input.value.trim();

    if (!value) {
      input.focus();
      return;
    }

    setQuestion(value);

    go("ask");
  });
}

/* --------------------------------
   ASK FORM
-------------------------------- */

const askForm =
  document.querySelector("#ask-form");

if (askForm) {
  askForm.addEventListener("submit", event => {
    event.preventDefault();

    go("intelligence");
  });
}

/* --------------------------------
   SIGN IN
-------------------------------- */

document.addEventListener("click", event => {
  const signIn =
    event.target.closest(".text-button");

  if (!signIn) return;

  if (signIn.textContent.trim() === "Sign in") {
    event.preventDefault();

    alert(
      "Sign in is part of the future production version of Learnify. This prototype does not create real accounts."
    );
  }
});

/* --------------------------------
   INITIALIZE
-------------------------------- */

cards();

detail("mtn");

table();

const initialRoute =
  location.hash.replace("#", "") || "home";

const validRoutes = [
  "home",
  "ask",
  "intelligence",
  "evidence",
  "advisory",
  "compare",
  "decision",
  "community"
];

go(
  validRoutes.includes(initialRoute)
    ? initialRoute
    : "home"
);
