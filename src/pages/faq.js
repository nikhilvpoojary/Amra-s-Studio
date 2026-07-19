// FAQ Page
import { faqs } from '../data/faq.js';

export function renderFaq() {
  return `
    <div class="page-header">
      <div class="container">
        <span class="section-subtitle">Got Questions?</span>
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about our handcrafted everlasting flowers</p>
      </div>
    </div>

    <section class="section" style="padding-top: var(--space-xl);">
      <div class="container container-narrow">
        <div id="faq-accordion">
          ${faqs.map((faq, index) => `
            <div class="faq-item" data-index="${index}">
              <button class="faq-question">
                <span>Q: ${faq.question}</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <div class="faq-answer-inner">
                  A: ${faq.answer}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Bind FAQ click event
document.addEventListener('click', (e) => {
  const item = e.target.closest('.faq-item');
  if (item && (e.target.closest('.faq-question') || e.target.classList.contains('faq-question'))) {
    const isOpen = item.classList.contains('open');
    
    // Close all FAQs first
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const answer = i.querySelector('.faq-answer');
      if (answer) answer.style.maxHeight = '0px';
    });

    // Toggle selected FAQ
    if (!isOpen) {
      item.classList.add('open');
      const answer = item.querySelector('.faq-answer');
      const inner = item.querySelector('.faq-answer-inner');
      if (answer && inner) {
        answer.style.maxHeight = `${inner.scrollHeight + 30}px`;
      }
    }
  }
});
