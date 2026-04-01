(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("contact-form-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  if (!statusEl || !submitBtn) return;

  function setStatus(type, message) {
    statusEl.hidden = false;
    statusEl.className = "contact-form__status contact-form__status--" + type;
    statusEl.textContent = message;
  }

  function clearStatus() {
    statusEl.hidden = true;
    statusEl.textContent = "";
    statusEl.className = "contact-form__status";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearStatus();

    var originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    var data = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        return res.text().then(function (text) {
          var body = {};
          if (text) {
            try {
              body = JSON.parse(text);
            } catch (ignore) {}
          }
          return { ok: res.ok, status: res.status, body: body };
        });
      })
      .then(function (result) {
        if (result.ok) {
          setStatus(
            "success",
            "Thanks — your message was sent. We'll get back to you soon."
          );
          form.reset();
        } else {
          var msg =
            (result.body && result.body.error) ||
            "Something went wrong. Please try again or email us directly.";
          if (result.body && result.body.errors) {
            var first = result.body.errors[0];
            if (first && first.message) msg = first.message;
          }
          setStatus("error", msg);
        }
      })
      .catch(function () {
        setStatus(
          "error",
          "We couldn't send your message. Check your connection and try again."
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
})();
