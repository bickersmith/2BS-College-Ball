// src/scripts/errors/errorUI.js

export function renderErrorMessage(message = "Something went wrong.") {
  return `
    <div class="error-message">
      <h2>Oops</h2>
      <p>${message}</p>
    </div>
  `;
}
