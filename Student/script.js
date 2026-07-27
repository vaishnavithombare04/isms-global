// ─── ISMS Global Edu Student Portal JavaScript Logic ───

// ─── App Global State ───
const state = {
  user: {
    fullName: "Varun Mehta",
    dob: "2003-05-14",
    phone: "+91 98765 43210",
    email: "varun.mehta@gmail.com",
    address: "45, Park Street, New Delhi, India",
    degree: "B.Tech Computer Science",
    institution: "Delhi Technological University",
    gradYear: "2025",
    cgpa: "8.2 CGPA",
    testScore: "Pending Score",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    targetCountries: ["Ireland", "UK"]
  },
  
  documents: [
    { id: 1, name: "10th_Marksheet.pdf", category: "academics", date: "2026-04-12", size: "1.4 MB", status: "Approved" },
    { id: 2, name: "12th_Marksheet.pdf", category: "academics", date: "2026-04-12", size: "1.8 MB", status: "Approved" },
    { id: 3, name: "Passport_Copy.pdf", category: "id", date: "2026-04-15", size: "2.1 MB", status: "Approved" },
    { id: 4, name: "SOP_Draft_V1.pdf", category: "sop", date: "2026-07-20", size: "850 KB", status: "Under Review" },
    { id: 5, name: "IELTS_Scorecard_Placeholder.pdf", category: "scores", date: "2026-07-25", size: "1.2 MB", status: "Action Required" }
  ],
  
  applications: [
    {
      id: 1,
      uni: "Trinity College Dublin",
      logo: "TC",
      course: "MSc in Data Science",
      country: "Ireland",
      flag: "🇮🇪",
      intake: "Fall 2026",
      deadline: "2026-11-30",
      fee: "€22,800",
      status: "Conditional Offer Received",
      statusClass: "badge-success",
      offerLetter: true,
      accepted: false
    },
    {
      id: 2,
      uni: "University College Dublin",
      logo: "UC",
      course: "MSc in Business Analytics",
      country: "Ireland",
      flag: "🇮🇪",
      intake: "Fall 2026",
      deadline: "2026-12-15",
      fee: "€20,500",
      status: "Under Review",
      statusClass: "badge-warning",
      offerLetter: false,
      accepted: false
    },
    {
      id: 3,
      uni: "Leeds Beckett University",
      logo: "LB",
      course: "MSc in Data Science",
      country: "UK",
      flag: "🇬🇧",
      intake: "Fall 2026",
      deadline: "2026-10-31",
      fee: "£16,000",
      status: "Unconditional Offer Received",
      statusClass: "badge-success",
      offerLetter: true,
      accepted: false
    },
    {
      id: 4,
      uni: "Bristol University",
      logo: "BU",
      course: "MSc in Computer Science",
      country: "UK",
      flag: "🇬🇧",
      intake: "Fall 2026",
      deadline: "2026-09-30",
      fee: "£27,500",
      status: "Pending Submission",
      statusClass: "badge-info",
      offerLetter: false,
      accepted: false
    }
  ],
  
  meetings: [
    {
      id: 1,
      topic: "Course Selection & Shortlist Review",
      date: "Tomorrow",
      time: "4:00 PM",
      counselor: "Anjali Sharma",
      link: "https://meet.google.com/abc-defg-hij",
      status: "upcoming"
    },
    {
      id: 2,
      topic: "Profile Assessment & Intake Strategy",
      date: "2026-07-20",
      time: "2:00 PM",
      counselor: "Anjali Sharma",
      notes: "Checked Varun's CGPA. Advised pursuing Ireland as the primary option due to post-study work regulations.",
      status: "past"
    }
  ],
  
  scholarships: [
    {
      id: 1,
      name: "Government of Ireland Postgraduate Scholarship",
      amount: "€10,000 Tuition + €16,000 Stipend",
      rule: "Open to non-EU students applying to MSc courses. Outstanding academic background required.",
      applied: false
    },
    {
      id: 2,
      name: "Trinity College Global Excellence Scholarship",
      amount: "€5,000 Tuition Waiver",
      rule: "Automatically evaluated during Trinity College MSc application review.",
      applied: false
    }
  ]
};

// ─── DOM Elements & Initialization ───
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  renderDocumentsTable();
  renderApplications();
  renderMeetings();
  renderScholarships();
  setupEventListeners();
  updateStats();
  
  // Connect Hash links for reloading or direct access
  const hash = window.location.hash.replace("#", "");
  if (hash && ["dashboard", "journey", "documents", "applications", "counselling", "finance", "profile"].includes(hash)) {
    switchPage(hash);
  }
}

// ─── SPA Tab Switching & Routing ───
function switchPage(pageId) {
  // Update section visibility
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.classList.remove("active");
  });
  
  const targetSec = document.getElementById(`page-${pageId}`);
  if (targetSec) {
    targetSec.classList.add("active");
  }
  
  // Update sidebar active menu state
  document.querySelectorAll(".sidebar-menu .menu-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-page") === pageId) {
      item.classList.add("active");
    }
  });
  
  // Update breadcrumb
  const currentBreadcrumb = document.getElementById("breadcrumb-current");
  if (currentBreadcrumb) {
    // Format label nicely
    let label = pageId.charAt(0).toUpperCase() + pageId.slice(1);
    if (pageId === "counselling") label = "Counselling Scheduler";
    if (pageId === "finance") label = "Financials & Loans";
    currentBreadcrumb.textContent = label;
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update URL hash
  window.location.hash = pageId;
}

// Global page switcher hook
window.switchPage = switchPage;

// ─── Event Listeners & Interaction ───
function setupEventListeners() {
  // Sidebar items click
  document.querySelectorAll(".sidebar-menu .menu-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const page = item.getAttribute("data-page");
      switchPage(page);
    });
  });
  
  // User profile click (go to profile)
  document.querySelectorAll("[data-goto]").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = item.getAttribute("data-goto");
      switchPage(target);
    });
  });
  
  // Mobile navigation drawer toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const sidebar = document.getElementById("sidebar");
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }
  
  // Close sidebar clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 1024) {
      if (sidebar && sidebar.classList.contains("active") && 
          !sidebar.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        sidebar.classList.remove("active");
      }
    }
  });
  
  // Header profile dropdown menu toggle
  const profileTrigger = document.getElementById("profile-dropdown-trigger");
  const profileMenu = document.getElementById("profile-dropdown-menu");
  if (profileTrigger && profileMenu) {
    profileTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle("active");
    });
    
    document.addEventListener("click", () => {
      profileMenu.classList.remove("active");
    });
  }
  
  // Document category filter tabs
  const filterBtns = document.querySelectorAll("#doc-tabs .tab-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active", "active-red"));
      // Add red active class for visual contrast
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderDocumentsTable(filter);
    });
  });
  
  // Drag and drop events
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("file-input");
  
  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());
    
    fileInput.addEventListener("change", (e) => {
      handleFiles(e.target.files);
    });
    
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
    
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });
    
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      handleFiles(e.dataTransfer.files);
    });
  }
  
  // Scheduler time slot select
  const slots = document.querySelectorAll("#time-slots-wrapper .slot-pill");
  const selectedSlotInput = document.getElementById("selected-time-slot");
  slots.forEach(slot => {
    slot.addEventListener("click", () => {
      slots.forEach(s => s.classList.remove("active"));
      slot.classList.add("active");
      if (selectedSlotInput) {
        selectedSlotInput.value = slot.getAttribute("data-time");
      }
    });
  });
  
  // Book meeting form submit
  const meetingForm = document.getElementById("book-meeting-form");
  if (meetingForm) {
    meetingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const topic = document.getElementById("meeting-topic").value;
      const date = document.getElementById("meeting-date").value;
      const time = document.getElementById("selected-time-slot").value;
      const notes = document.getElementById("meeting-notes").value;
      
      if (!time) {
        showToast("Please select a time slot first!", "danger");
        return;
      }
      
      // Add meeting to state
      const newMeeting = {
        id: state.meetings.length + 1,
        topic,
        date,
        time,
        counselor: "Anjali Sharma",
        link: "https://meet.google.com/abc-defg-hij",
        status: "upcoming"
      };
      
      state.meetings.unshift(newMeeting);
      renderMeetings();
      updateStats();
      meetingForm.reset();
      slots.forEach(s => s.classList.remove("active"));
      if (selectedSlotInput) selectedSlotInput.value = "";
      
      showToast("Counselling session booked successfully!", "success");
    });
  }
  
  // Education Loan form submit
  const loanForm = document.getElementById("loan-application-form");
  const bankCards = document.querySelectorAll("#bank-selector .bank-card");
  let selectedBank = "HDFC Credila";
  
  bankCards.forEach(card => {
    card.addEventListener("click", () => {
      bankCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      selectedBank = card.getAttribute("data-bank");
    });
  });
  
  if (loanForm) {
    loanForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const amount = document.getElementById("loan-amount").value;
      const collateral = document.getElementById("collateral-type").value;
      
      // Update Loan Checklist Status
      showToast(`Loan application of ₹${Number(amount).toLocaleString()} submitted to ${selectedBank}!`, "success");
      loanForm.reset();
    });
  }
  
  // Personal Info Form
  const personalForm = document.getElementById("personal-info-form");
  if (personalForm) {
    personalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      state.user.fullName = document.getElementById("prof-fullname").value;
      state.user.phone = document.getElementById("prof-phone").value;
      state.user.email = document.getElementById("prof-email").value;
      state.user.address = document.getElementById("prof-address").value;
      
      // Update headers
      document.getElementById("header-username").textContent = state.user.fullName;
      document.getElementById("hero-student-name").textContent = state.user.fullName.split(" ")[0];
      
      showToast("Personal information updated!", "success");
    });
  }
  
  // Academic Form
  const academicForm = document.getElementById("academic-history-form");
  if (academicForm) {
    academicForm.addEventListener("submit", (e) => {
      e.preventDefault();
      state.user.degree = document.getElementById("acad-degree").value;
      state.user.institution = document.getElementById("acad-institution").value;
      state.user.gradYear = document.getElementById("acad-year").value;
      state.user.cgpa = document.getElementById("acad-cgpa").value;
      state.user.testScore = document.getElementById("acad-test").value;
      
      showToast("Academic history saved!", "success");
    });
  }
  
  // Country Target chips
  const countryChips = document.querySelectorAll("#country-preferences .preference-chip");
  countryChips.forEach(chip => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
    });
  });
  
  // Avatar upload mock
  const changeAvatarBtn = document.getElementById("change-avatar-btn");
  const avatarInput = document.getElementById("avatar-input");
  if (changeAvatarBtn && avatarInput) {
    changeAvatarBtn.addEventListener("click", () => avatarInput.click());
    
    avatarInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          document.getElementById("profile-avatar-large").src = event.target.result;
          document.getElementById("header-avatar").src = event.target.result;
          showToast("Profile photo updated successfully!", "success");
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }
  
  // Offer modal triggers
  const offerModal = document.getElementById("offer-modal");
  const offerClose = document.getElementById("offer-modal-close");
  const offerCancel = document.getElementById("offer-modal-cancel");
  const offerSubmit = document.getElementById("offer-modal-submit");
  const offerCheck = document.getElementById("chk-offer-confirm");
  
  if (offerModal && offerClose) {
    offerClose.addEventListener("click", () => offerModal.classList.remove("active"));
    offerCancel.addEventListener("click", () => offerModal.classList.remove("active"));
    
    offerCheck.addEventListener("change", () => {
      offerSubmit.disabled = !offerCheck.checked;
    });
    
    offerSubmit.addEventListener("click", () => {
      const uniName = document.getElementById("offer-uni-name").textContent;
      const app = state.applications.find(a => a.uni === uniName);
      if (app) {
        app.accepted = true;
        app.status = "Offer Accepted";
        app.statusClass = "badge-success";
      }
      renderApplications();
      offerModal.classList.remove("active");
      showToast(`Offer for ${uniName} accepted successfully!`, "success");
    });
  }
  
  // Journey tracker stage 3 checklist connection to stepper
  const chkS3_1 = document.getElementById("chk-journey-s3-1");
  const chkS3_2 = document.getElementById("chk-journey-s3-2");
  const progressLine = document.getElementById("stepper-progress-line");
  
  function updateJourneyProgress() {
    let count = 0;
    if (chkS3_1 && chkS3_1.checked) count++;
    if (chkS3_2 && chkS3_2.checked) count++;
    
    // Stage 3 progress adjuster
    if (count === 0) {
      progressLine.style.width = "28.5%"; // Baseline (end of stage 2)
    } else if (count === 1) {
      progressLine.style.width = "35.7%"; // Mid stage 3
    } else if (count === 2) {
      progressLine.style.width = "42.8%"; // Complete stage 3 (reaches node 4)
    }
  }
  
  if (chkS3_1) chkS3_1.addEventListener("change", updateJourneyProgress);
  if (chkS3_2) chkS3_2.addEventListener("change", updateJourneyProgress);
}

// ─── Journey Timeline Toggling ───
function toggleTimeline(headerElement) {
  const item = headerElement.closest(".timeline-item");
  const isActive = item.classList.contains("active");
  
  // Collapse all
  document.querySelectorAll(".timeline-item").forEach(itm => {
    itm.classList.remove("active");
  });
  
  // Open target if not already active
  if (!isActive) {
    item.classList.add("active");
  }
}
window.toggleTimeline = toggleTimeline;

// ─── Rendering Helpers ───

// Stats Update
function updateStats() {
  const appsCount = state.applications.filter(a => a.status !== "Pending Submission").length;
  const offersCount = state.applications.filter(a => a.status.includes("Offer")).length;
  const approvedDocs = state.documents.filter(d => d.status === "Approved").length;
  
  document.getElementById("stat-apps-count").textContent = appsCount;
  document.getElementById("stat-offers-count").textContent = offersCount;
  document.getElementById("stat-docs-count").textContent = `${approvedDocs}/${state.documents.length}`;
  
  // Next meeting calculations
  const nextMeet = state.meetings.find(m => m.status === "upcoming");
  const meetWidget = document.getElementById("stat-next-meeting");
  const meetLabel = meetWidget.nextElementSibling;
  
  if (nextMeet) {
    meetWidget.textContent = nextMeet.date === "Tomorrow" ? "Tomorrow" : nextMeet.date;
    meetLabel.textContent = `Next Meeting: ${nextMeet.time}`;
  } else {
    meetWidget.textContent = "None Scheduled";
    meetLabel.textContent = "Schedule a session below";
  }
}

// Document Vault Table Render
function renderDocumentsTable(filter = "all") {
  const tbody = document.getElementById("documents-tbody");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  
  const filteredDocs = filter === "all" ? 
        state.documents : 
        state.documents.filter(d => d.category === filter);
        
  if (filteredDocs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px 0;">No documents in this category.</td></tr>`;
    return;
  }
  
  filteredDocs.forEach(doc => {
    let statusClass = "badge-warning";
    if (doc.status === "Approved") statusClass = "badge-success";
    if (doc.status === "Action Required") statusClass = "badge-danger";
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <span style="font-weight:600;">${doc.name}</span>
        </div>
      </td>
      <td style="text-transform: capitalize;">${doc.category === "id" ? "Passport & ID" : doc.category}</td>
      <td>${doc.date}</td>
      <td>${doc.size}</td>
      <td><span class="badge ${statusClass}">${doc.status}</span></td>
      <td style="text-align: right;">
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button class="action-icon-btn" onclick="viewDocument('${doc.name}')" title="View Document">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button class="action-icon-btn" onclick="deleteDocument(${doc.id})" title="Delete Document">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Applications Render
function renderApplications() {
  const grid = document.getElementById("applications-grid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  state.applications.forEach(app => {
    const card = document.createElement("div");
    card.className = "card";
    
    // Add offer letter action box if applicable
    let offerBoxHTML = "";
    if (app.offerLetter && !app.accepted) {
      offerBoxHTML = `
        <div class="offer-box">
          <div class="offer-title">🔥 Official Offer Received!</div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-primary btn-sm" onclick="downloadOffer('${app.uni}')" style="padding: 6px 12px; font-size: 0.8rem;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download
            </button>
            <button class="btn btn-success btn-sm" onclick="triggerAcceptOffer('${app.uni}')" style="padding: 6px 12px; font-size: 0.8rem;">
              Accept Offer
            </button>
          </div>
        </div>
      `;
    } else if (app.accepted) {
      offerBoxHTML = `
        <div class="offer-box" style="background-color: var(--color-success-bg); border-color: var(--color-success);">
          <div class="offer-title" style="color: var(--color-success);">✓ You accepted this offer</div>
          <p style="font-size: 0.75rem; color: var(--text-secondary);">Your seat reservation process is underway. Anjali will coordinate next steps.</p>
        </div>
      `;
    }
    
    card.innerHTML = `
      <div class="app-card-header">
        <div class="app-card-uni">
          <div class="uni-logo-box">${app.logo}</div>
          <div>
            <h3 class="uni-info-name">${app.uni}</h3>
            <span class="uni-info-course">${app.course}</span>
          </div>
        </div>
        <span class="badge ${app.statusClass}">${app.status}</span>
      </div>
      
      <div class="app-details-grid">
        <div class="app-detail-item">
          <span class="app-detail-label">Country</span>
          <span class="app-detail-val flag-tag">${app.flag} ${app.country}</span>
        </div>
        <div class="app-detail-item">
          <span class="app-detail-label">Intake Term</span>
          <span class="app-detail-val">${app.intake}</span>
        </div>
        <div class="app-detail-item">
          <span class="app-detail-label">Application Deadline</span>
          <span class="app-detail-val">${app.deadline}</span>
        </div>
        <div class="app-detail-item">
          <span class="app-detail-label">Est. Tuition Fee</span>
          <span class="app-detail-val">${app.fee}</span>
        </div>
      </div>
      
      <div class="app-card-actions">
        <button class="btn btn-outline" style="width: 100%;" onclick="viewAppDetails('${app.uni}')">Details & Checklist</button>
      </div>
      
      ${offerBoxHTML}
    `;
    
    grid.appendChild(card);
  });
}

// Meetings Render
function renderMeetings() {
  const upcomingWrapper = document.getElementById("upcoming-meetings-wrapper");
  const pastWrapper = document.getElementById("past-meetings-wrapper");
  
  if (upcomingWrapper) upcomingWrapper.innerHTML = "";
  if (pastWrapper) pastWrapper.innerHTML = "";
  
  const upcomingMeetings = state.meetings.filter(m => m.status === "upcoming");
  const pastMeetings = state.meetings.filter(m => m.status === "past");
  
  if (upcomingMeetings.length === 0 && upcomingWrapper) {
    upcomingWrapper.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); padding: 12px 0;">No upcoming meetings scheduled.</p>`;
  } else if (upcomingWrapper) {
    upcomingMeetings.forEach(meet => {
      const card = document.createElement("div");
      card.className = "reminder-item meeting-card";
      card.innerHTML = `
        <div class="meeting-card-header">
          <div>
            <span class="meeting-datetime">${meet.date} at ${meet.time}</span>
            <div class="meeting-topic">${meet.topic}</div>
            <span style="font-size:0.75rem; color: var(--text-muted);">With ${meet.counselor}</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px; align-items:flex-end;">
            <a href="${meet.link}" target="_blank" class="btn btn-primary btn-sm" style="padding: 6px 12px; font-size: 0.8rem;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              Google Meet
            </a>
            <button class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 0.75rem;" onclick="cancelMeeting(${meet.id})">Cancel</button>
          </div>
        </div>
      `;
      upcomingWrapper.appendChild(card);
    });
  }
  
  if (pastMeetings.length === 0 && pastWrapper) {
    pastWrapper.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); padding: 12px 0;">No session history found.</p>`;
  } else if (pastWrapper) {
    pastMeetings.forEach(meet => {
      const card = document.createElement("div");
      card.className = "reminder-item meeting-card";
      card.style.borderLeftColor = "var(--text-muted)";
      card.innerHTML = `
        <div>
          <span class="meeting-datetime" style="font-size:0.9rem; color: var(--text-secondary);">${meet.date}</span>
          <div class="meeting-topic" style="font-weight:600; margin-top:2px;">${meet.topic}</div>
          <p style="font-size:0.8rem; color: var(--text-secondary); margin-top:8px; line-height: 1.4; font-style: italic;">
            " ${meet.notes} "
          </p>
          <span style="font-size:0.75rem; color: var(--text-muted); display:block; margin-top:4px;">Advisor Summary by ${meet.counselor}</span>
        </div>
      `;
      pastWrapper.appendChild(card);
    });
  }
}

// Scholarships Render
function renderScholarships() {
  const wrapper = document.getElementById("scholarships-wrapper");
  if (!wrapper) return;
  
  wrapper.innerHTML = "";
  
  state.scholarships.forEach(sc => {
    const card = document.createElement("div");
    card.className = "reminder-item";
    card.style.borderLeftColor = "var(--color-info)";
    card.style.display = "flex";
    card.style.justifyContent = "space-between";
    card.style.alignItems = "flex-start";
    
    card.innerHTML = `
      <div style="flex: 1; padding-right: 16px;">
        <h4 style="font-size:0.95rem; color: var(--secondary); font-weight:700;">${sc.name}</h4>
        <span style="font-size:0.85rem; color: var(--primary); font-weight:600; display:block; margin: 4px 0;">Award Value: ${sc.amount}</span>
        <p style="font-size:0.8rem; color: var(--text-secondary); line-height: 1.4;">${sc.rule}</p>
      </div>
      <div>
        <button class="btn btn-outline btn-sm" onclick="applyScholarship(${sc.id})" id="sc-btn-${sc.id}">
          ${sc.applied ? "Applied ✓" : "Apply via Counselor"}
        </button>
      </div>
    `;
    wrapper.appendChild(card);
  });
}

// ─── Action Functions (Interface Triggers) ───

// Drag and drop mock file upload flow
function handleFiles(files) {
  if (files.length === 0) return;
  const file = files[0];
  
  // Show uploading Modal
  const modal = document.getElementById("upload-modal");
  const filenameSpan = document.getElementById("upload-filename");
  const progressBar = document.getElementById("upload-progress-bar");
  const percentageText = document.getElementById("upload-percentage");
  
  if (modal && filenameSpan && progressBar && percentageText) {
    filenameSpan.textContent = file.name;
    progressBar.style.width = "0%";
    percentageText.textContent = "0% Complete";
    modal.classList.add("active");
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = `${progress}%`;
      percentageText.textContent = `${progress}% Complete`;
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          modal.classList.remove("active");
          
          // Add document to state
          const newDoc = {
            id: state.documents.length + 1,
            name: file.name,
            category: "sop", // default category for drop uploads
            date: new Date().toISOString().split("T")[0],
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            status: "Under Review"
          };
          
          state.documents.push(newDoc);
          renderDocumentsTable();
          updateStats();
          showToast(`File "${file.name}" uploaded successfully!`, "success");
        }, 600);
      }
    }, 150);
  }
}

// Dialog Close Hooks
document.getElementById("upload-modal-close").addEventListener("click", () => {
  document.getElementById("upload-modal").classList.remove("active");
});

// View Document Mock
function viewDocument(name) {
  showToast(`Mock Opening File Preview for: ${name}`, "info");
}
window.viewDocument = viewDocument;

// Delete Document
function deleteDocument(id) {
  const index = state.documents.findIndex(d => d.id === id);
  if (index !== -1) {
    const docName = state.documents[index].name;
    state.documents.splice(index, 1);
    renderDocumentsTable();
    updateStats();
    showToast(`Removed "${docName}" from Vault.`, "success");
  }
}
window.deleteDocument = deleteDocument;

// Download Offer Letter Mock
function downloadOffer(uniName) {
  showToast(`Initiating download for ${uniName} Offer Letter...`, "success");
}
window.downloadOffer = downloadOffer;

// Accept Offer Modal Trigger
function triggerAcceptOffer(uniName) {
  const modal = document.getElementById("offer-modal");
  const uniSpan = document.getElementById("offer-uni-name");
  if (modal && uniSpan) {
    uniSpan.textContent = uniName;
    document.getElementById("chk-offer-confirm").checked = false;
    document.getElementById("offer-modal-submit").disabled = true;
    modal.classList.add("active");
  }
}
window.triggerAcceptOffer = triggerAcceptOffer;

// Cancel Meeting
function cancelMeeting(id) {
  const index = state.meetings.findIndex(m => m.id === id);
  if (index !== -1) {
    state.meetings.splice(index, 1);
    renderMeetings();
    updateStats();
    showToast("Scheduled meeting has been cancelled.", "warning");
  }
}
window.cancelMeeting = cancelMeeting;

// Apply scholarship
function applyScholarship(id) {
  const sc = state.scholarships.find(s => s.id === id);
  if (sc) {
    sc.applied = true;
    renderScholarships();
    showToast(`Inquiry request for ${sc.name} sent to Counselor!`, "success");
  }
}
window.applyScholarship = applyScholarship;

// View University Detail card checklist
function viewAppDetails(uniName) {
  showToast(`Displaying internal checklist & conditions for ${uniName}...`, "info");
}
window.viewAppDetails = viewAppDetails;

// Toast Notification Engine
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast badge-${type}`;
  
  // Icon selector
  let icon = "";
  if (type === "success") {
    icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === "warning" || type === "danger") {
    icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }
  
  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);
  
  // Auto-dismiss
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
window.showToast = showToast;
