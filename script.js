    const correctFlags = {
      1: "Bayroq{9K2x7PbQ4mT1VzLsF8Gw0RaYnJH5UeDOci}",
      2: "Flug{a2Z9Xk31232B45dVq5RW3nLmPaZ9Xk2BdVqW3nLmP}",
      3: "B4yroq{732cd7a58ce5589016208c397e912c2cS}",
      4: "B4yr0q{Farosatli_Inson_flag_sohibi}",
      5: "FLAG{here we go}",
      6: "CTF{Challenge6 hidden_file_found}",
      7: "FLAG{awdawdawd}",
      8: "FLAG{my Juliet}",
      9: "FLAG{MENMAN}",
      10: "FLAG{BUMENMAN}"
    };

    const challengeInfo = {
      1: { desc: "bash script ishga tushganda zshrc ga uzgartirish qoshiladi files papkasida commandlar ishlamaydi commandlar bilan birga flag turgan fileni comment qilib ketilgan", cmd: "nano ~/.zshrc qoshilgan commandlarni uchirib tashlash kerak " },
      2: { desc: "Romeo userini verona guruhiga qoshish kerak guruxda Juliet bor", cmd: "sudo usermod -aG verona Romeo" },
      3: { desc: "Juliet userini parolini topish va flag.txtga permission berish ", cmd: "su Juliet password:romeo123 cd ~, cd  Flag_is_here chmod 777 flag.txt cat flag.txt" },
      4: { desc: "flag pictures papkasida yashirilgan permission yoq oqishga Romeo userda bor va verona groupda bor", cmd: "su Romeo cat .empty" },
      5: { desc: "flag .flag.txt challenge5 papkasida yasirilgan uni Juliet va verona grouplari oqiy oladi malumot shifrlangan 5marta decode qilish kerak ", cmd: "su Juliet , cat .qwerty" },
      6: { desc: "2marta shifrlangan papkadan tashqarida yashirin joylashgan .flag.txt", cmd: "2marta shifrlanadi" },
      7: { desc: "Flagni olish uchun quizlarga javob berishi kerak", cmd: "icacls, cmd powershell, zsh bash powershell,rmdir ,set " },
      8: { desc: "Flagni faqat Romeo oqiy oladi", cmd: "su Romeo ./flag.sh" },
      9: { desc: "Os haqida malumotlar orqali flagni olish mumkin", cmd: "cat /etc/os-relaese" },
      10: { desc: "sherning katta harflari birlashadi flag hosil boladi uni Juliet oqiy oladi", cmd: "cat sher.txt" }
    };

    const adminPassword = "newretr1";
    let solved = JSON.parse(localStorage.getItem("solvedFlags")) || {};
    const container = document.getElementById("buttons");
    const toastContainer = document.getElementById("toastContainer");
    const adminPanel = document.getElementById("adminPanel");
    const adminContent = document.getElementById("adminContent");

    function showToast(message, success=true) {
      const toastEl = document.createElement('div');
      toastEl.className = `toast align-items-center text-bg-${success ? 'success' : 'danger'} border-0`;
      toastEl.setAttribute('role','alert');
      toastEl.setAttribute('aria-live','assertive');
      toastEl.setAttribute('aria-atomic','true');
      toastEl.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;
      toastContainer.appendChild(toastEl);
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
      toastEl.addEventListener('hidden.bs.toast', ()=>{ toastEl.remove(); });
    }

   // Create challenge buttons
for (let i = 1; i <= 10; i++) {
  const btn = document.createElement("button");
  btn.className = "btn btn-hack";
  btn.textContent = `Challenge ${i}`;
  btn.id = `challengeBtn${i}`; // buttonni identifikatsiya qilish

  // Agar oldin yechilgan bo‘lsa, tugmani yashil qil
  if (solved[i]) {
    btn.style.backgroundColor = "#00ff00";
    btn.style.color = "#0f111a";
    btn.style.boxShadow = "0 0 10px #00ff00";
  }

  btn.addEventListener("click", () => {
    const answer = prompt(`Challenge ${i}: Enter your flag`);
    if (!answer) return;

    if (answer === correctFlags[i]) {
      showToast(`✅ Challenge ${i} Success!`, true);
      solved[i] = true;

      // Tugmani yashil qil
      btn.style.backgroundColor = "#00ff00";
      btn.style.color = "#0f111a";
      btn.style.boxShadow = "0 0 10px #00ff00";
    } else {
      showToast(`❌ Challenge ${i} Wrong!`, false);
    }

    localStorage.setItem("solvedFlags", JSON.stringify(solved));
  });

  container.appendChild(btn);
}

  document.getElementById("adminBtn").addEventListener("click", () => {
      const pass = prompt("Enter admin password:");
      if (pass === adminPassword) {
        adminPanel.style.display = "block";

        let html = `<table class="table table-dark table-striped challenge-table">
                      <thead>
                        <tr>
                          <th>Challenge</th>
                          <th>Description</th>
                          <th>Command / Hint</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>`;

        for (let i = 1; i <= 10; i++) {
          const status = solved[i] ? "✅ Solved" : "❌ Unsolved";
          html += `<tr>
                      <td>${i}</td>
                      <td>${challengeInfo[i].desc}</td>
                      <td>${challengeInfo[i].cmd}</td>
                      <td>${status}</td>
                   </tr>`;
        }

        html += "</tbody></table>";
        adminContent.innerHTML = html;
        showToast("Admin access granted", true);
      } else {
        showToast("❌ Wrong password!", false);
      }
    });

    // Show previously solved challenges
    for (let i = 1; i <= 10; i++) {
      if (solved[i]) {
        showToast(`✅ Challenge ${i} previously solved!`, true);
      }
    }

    // Show previously solved challenges
  
