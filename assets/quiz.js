// Quiz component shared by all lessons.
// Usage: add <div class="quiz" data-quiz='[...]'></div> where data-quiz is a JSON
// array of {prompt, options: [..], answer: <index>, why: "explanation"}.
// Options should be formatted identically (same word count) so formatting gives no clues.

document.querySelectorAll(".quiz").forEach((quizEl) => {
  const questions = JSON.parse(quizEl.dataset.quiz);
  questions.forEach((q, qi) => {
    const qEl = document.createElement("div");
    qEl.className = "quiz-q";

    const prompt = document.createElement("p");
    prompt.className = "prompt";
    prompt.textContent = `${qi + 1}. ${q.prompt}`;
    qEl.appendChild(prompt);

    const feedback = document.createElement("p");
    feedback.className = "feedback";

    q.options.forEach((opt, oi) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        qEl.querySelectorAll("button.option").forEach((b) => (b.disabled = true));
        if (oi === q.answer) {
          btn.classList.add("correct");
          feedback.className = "feedback ok";
          feedback.textContent = `✓ Correct. ${q.why}`;
        } else {
          btn.classList.add("wrong");
          qEl.querySelectorAll("button.option")[q.answer].classList.add("correct");
          feedback.className = "feedback no";
          feedback.textContent = `✗ Not quite. ${q.why}`;
        }
      });
      qEl.appendChild(btn);
    });

    qEl.appendChild(feedback);
    quizEl.appendChild(qEl);
  });
});
