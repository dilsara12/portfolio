
document.addEventListener('DOMContentLoaded', () => {
 
  const profileUpload = document.getElementById('profileUpload');
  const profileImage = document.getElementById('profileImage');
  const resetBtn = document.getElementById('resetProfile');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  
  const saved = localStorage.getItem('portfolio_profile');
  if (saved) {
    profileImage.src = saved;
  }

  
  if (profileUpload) {
    profileUpload.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        profileImage.src = dataUrl;
        try {
          localStorage.setItem('portfolio_profile', dataUrl);
        } catch (err) {
          console.warn('Could not save image to localStorage (size?). Use a smaller photo.', err);
          alert('Image is too large to save in browser storage. Try a smaller image or replace images/profile.jpg in your repo.');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('portfolio_profile');
      profileImage.src = 'images/profile.jpg';
    });
  }

  
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      navLinks.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      if (navList.classList.contains('open')) navList.classList.remove('open');
    });
  });

  
  const sections = document.querySelectorAll('main section[id]');
  const setActiveOnScroll = () => {
    const fromTop = window.scrollY + 80;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"], .nav-link[href="${location.pathname.split('/').pop()}#${id}"]`);
      if (!link) return;
      if (fromTop >= top && fromTop < bottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };
  window.addEventListener('scroll', setActiveOnScroll);
  setActiveOnScroll();
});

const filters = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('#projectGrid .project-card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.filter;

    projects.forEach(card => {
      card.style.display =
        category === 'all' || card.dataset.category === category
          ? 'flex'
          : 'none';
    });
  });
});


const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const msg = document.getElementById('formMsg');

    if (!name || !email || !message) {
      msg.textContent = '⚠️ Please fill out all fields.';
      msg.style.color = 'orange';
      return;
    }

    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      msg.textContent = '❌ Please enter a valid email.';
      msg.style.color = 'red';
      return;
    }

    msg.textContent = ' Message sent successfully!';
    msg.style.color = 'lightgreen';
    contactForm.reset();
  });
}

