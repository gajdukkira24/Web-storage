
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];


function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}


function renderContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.classList.add('contact-item');
    li.innerHTML = `
      <span>${contact.name} ${contact.surname} — 📞 ${contact.phone}, ✉️ ${contact.email}</span>
      <div class="actions">
        <button class="edit" onclick="editContact(${index})">✏️</button>
        <button onclick="deleteContact(${index})">🗑️</button>
      </div>
    `;
    contactList.appendChild(li);
  });
}


contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  contacts.push({ name, surname, phone, email });
  saveContacts();
  renderContacts();
  contactForm.reset();
});

function deleteContact(index) {
  contacts.splice(index, 1);
  saveContacts();
  renderContacts();
}


function editContact(index) {
  const contact = contacts[index];
  document.getElementById('name').value = contact.name;
  document.getElementById('surname').value = contact.surname;
  document.getElementById('phone').value = contact.phone;
  document.getElementById('email').value = contact.email;

  contacts.splice(index, 1); 
  saveContacts();
  renderContacts();
}

renderContacts();
