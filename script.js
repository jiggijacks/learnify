const records = {
  mtn: {
    name: "MTN",
    claim: "Strongest sample consistency for the Jabi scenario.",
    evidence: "9 demo items",
    verification: "Demo verified",
    confidence: "High",
    advisory: "Best fit when reliability is the main priority."
  },
  airtel: {
    name: "Airtel",
    claim: "Value led option with less consistent sample performance.",
    evidence: "6 demo items",
    verification: "Demo verified",
    confidence: "Medium",
    advisory: "Better fit when price is more important than consistency."
  },
  glo: {
    name: "Glo",
    claim: "Mixed sample results and requires more verification.",
    evidence: "4 demo items",
    verification: "Needs verification",
    confidence: "Low",
    advisory: "Consider only after more local evidence is available."
  }
};

let choice = "MTN";
let userQuestion = "Which network works best around Jabi?";

function go(route) {
  const home = route === "home";

  document.querySelector("main").hidden = !home;
  document.querySelector("#mvp").hidden = home;

  document.querySelectorAll(".mvp-view").forEach(view => {
    view.style.display = "none";
  });

  if (!home) {
    const target = document.querySelector("#" + route + "-view");
    if (target) target.style.display = "block";
  }

  history.replaceState(null, "", "#" + route);
  window.scrollTo(0, 0);
}

function cards() {
  document.querySelector("#record-list").innerHTML =
    Object.entries(records).map(([id, record]) => `
      <article class="record-card">
        <div class="record-top">
          <span class="demo-pill">DEMO DATA</span>
          <span class="confidence">${record.verification}</span>
        </div>

        <h3>${record.name}</h3>

        <p>${record.claim}</p>

        <div class="record-meta">
          <span><b>Question</b>${userQuestion}</span>
          <span><b>Location</b>Jabi, Abuja (demo)</span>
          <span><b>Evidence</b>${record.evidence}</span>
          <span><b>Verification</b>${record.verification}</span>
          <span><b>Confidence</b>${record.confidence}</span>
          <span><b>Last reviewed</b>September 2026 (demo)</span>
        </div>

        <button class="outline-dark" data-record-open="${id}">
          Why should I trust this? →
        </button>
      </article>
    `).join("");
}

function detail(id) {
  const record = records[id];

  if (!record) return;

  document.querySelector("#record-detail").innerHTML = `
    <div class="detail-claim">
      <span class="demo-pill">DEMO DATA</span>
      <h2>${record.name} evidence record</h2>
      <p>${record.claim}</p>
    </div>

    <div class="layer">
      <span>FACT</span>
      <p>
        ${record.claim}
        This is illustrative demo intelligence, not a verified real world claim.
      </p>
    </div>

    <div class="layer">
      <span>EVIDENCE</span>
      <div class="evidence-row">
        <b>${record.evidence}</b>
        <small>
          Illustrative screenshots, observations and documents used for this demo.
        </small>
      </div>
    </div>

    <div class="layer">
      <span>VERIFICATION</span>
      <p>
        Status: ${record.verification}.
        Method: demo internal consistency review.
        Confidence: ${record.confidence}.
      </p>
    </div>

    <div class="layer analysis">
      <span>ANALYSIS</span>
      <p>
        This evidence can inform a comparison, but it is not itself a recommendation.
      </p>
    </div>

    <div class="layer advice">
      <span>ADVISORY</span>
      <p>${record.advisory}</p>
    </div>
  `;
}

function table() {
  const rows = [
    ["Price", "Higher", "Moderate", "Lower"],
    ["Local performance", "Strong / consistent", "Good / variable", "Mixed"],
    ["Availability", "Demo: broad", "Demo: broad", "Demo: uncertain"],
    ["Customer service", "Not assessed", "Not assessed", "Not assessed"],
    ["Evidence strength", "9 demo items", "6 demo items", "4 demo items"],
    ["Verification", "Demo verified", "Demo verified", "Needs verification"],
    ["Freshness", "Sep 2026 demo", "Sep 2026 demo", "Sep 2026 demo"],
    ["Best for", "Reliability", "Value", "Budget"],
    ["Main tradeoff", "Higher price", "Less consistency", "More uncertainty"]
  ];

  document.querySelector("#comparison-table").innerHTML =
    rows.map(row => `
      <tr>
        <th>${row[0]}</th>
        ${row.slice(1).map(value => `<td>${value}</td>`).join("")}
      </tr>
    `).join("");
}

function updateDecision() {
  const record = Object.values(records).find(
    record => record.name === choice
  );

  document.querySelector("#selected-option").textContent =
    choice + " selected";

  document.querySelector("#decision-title").textContent =
    choice === "MTN"
      ? "MTN is the recommended fit."
      : choice + " is your selected demo option.";

  document.querySelector("#decision-copy").textContent =
    record.advisory;

  const confidence = document.querySelector(".final-confidence");

  if (confidence) {
    confidence.innerHTML = `
      <span class="mini-label">DECISION · CONFIDENCE</span>
      <strong>Demo: ${record.confidence.toLowerCase()}</strong>
      <p>Based on illustrative intelligence only.</p>
    `;
  }
}

document.addEventListener("click", event => {

  let element = event.target.closest("[data-route]");

  if (element) {
    event.preventDefault();
    go(element.dataset.route);
  }

  element = event.target.closest(".example-question");

  if (element) {
    const question = element.textContent;

    document.querySelector("#question").value = question;
    userQuestion = question;
  }

  element = event.target.closest("[data-record-open]");

  if (element) {
    detail(element.dataset.recordOpen);
    go("evidence");
  }

  element = event.target.closest("[data-record]");

  if (element) {
    detail(element.dataset.record);
  }

  element = event.target.closest("[data-option]");

  if (element) {
    choice = element.dataset.option;

    document.querySelectorAll(".option-select").forEach(button => {
      button.classList.toggle(
        "selected",
        button.dataset.option === choice
      );
    });

    updateDecision();
  }

  if (event.target.id === "save-decision") {
    document.querySelector("#saved-status").textContent =
      `${choice} demo decision saved · intelligence status: demo only.`;
  }
});

document.querySelector("#question-form").onsubmit = event => {
  event.preventDefault();

  userQuestion =
    document.querySelector("#question").value.trim() ||
    "Which network works best around Jabi?";

  document.querySelector("#ask-question").value = userQuestion;

  go("ask");
};

document.querySelector("#ask-form").onsubmit = event => {
  event.preventDefault();

  userQuestion =
    document.querySelector("#ask-question").value.trim() ||
    userQuestion;

  cards();
  go("intelligence");
};

cards();
detail("mtn");
table();
updateDecision();

go(
  location.hash.slice(1) || "home"
);
