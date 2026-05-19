const typingTarget = document.getElementById('typingText');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const loader = document.getElementById('loader');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const form = document.getElementById('contactForm');

const typingWords = [
  'AI Builder',
  'Web Developer',
  'Problem Solver',
  'Future-Ready Engineer'
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingTarget) {
    return;
  }

  const currentWord = typingWords[wordIndex];

  if (!deleting) {
    typingTarget.textContent = currentWord.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typingTarget.textContent = currentWord.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  const speed = deleting ? 45 : 90;
  setTimeout(typeLoop, speed);
}

function toggleMobileMenu() {
  if (!mobileMenu || !menuToggle) {
    return;
  }

  mobileMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open') ? 'true' : 'false');
}

function closeMobileMenu() {
  if (!mobileMenu) {
    return;
  }

  mobileMenu.classList.remove('is-open');

  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}

function handleScroll() {
  if (!scrollTopBtn) {
    return;
  }

  if (window.scrollY > 350) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

window.addEventListener('load', () => {
  if (loader) {
    setTimeout(() => loader.classList.add('is-hidden'), 650);
  }

  if (window.AOS) {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80
    });
  }

  if (typingTarget) {
    typeLoop();
  }

  handleScroll();
});

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMobileMenu);
}

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    closeMobileMenu();
  }
});

window.addEventListener('scroll', handleScroll);

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    const submitButton = form.querySelector('button[type="submit"]');

    if (!submitButton || !name || !email || !subject || !message) {
      return;
    }

    const originalLabel = submitButton.innerHTML;
    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    submitButton.innerHTML = '<i class="fa-solid fa-check"></i> Opening Draft';
    submitButton.disabled = true;

    window.location.href = `mailto:aashutoshraushan25@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => {
      submitButton.innerHTML = originalLabel;
      submitButton.disabled = false;
      form.reset();
    }, 1400);
  });
}
