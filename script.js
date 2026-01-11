const form = document.getElementById('feedbackform');
const feedbackList = document.getElementById('feedbackList');
const toastEl = document.getElementById('successToast');
const toast = new bootstrap.Toast(toastEl);

let savedComments = JSON.parse(localStorage.getItem('comments')) || [];

// Load comments
savedComments.forEach((comment, index) => addCommentCard(comment, index));

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!name || !comment) {
        alert("All fields are required!");
        return;
    }

    if (comment.length > 200) {
        alert("Comment too long!");
        return;
    }

    const newComment = {
        id: Date.now(),
        name,
        comment,
        date: new Date().toLocaleString()
    };

    savedComments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(savedComments));

    addCommentCard(newComment, savedComments.length - 1);
    toast.show();
    form.reset();
});

function addCommentCard({ id, name, comment, date }) {
    const div = document.createElement('div');
    div.classList.add('feedback-card', 'fade-in');

    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
        <div>
            <h6 class="fw-bold mb-1">${name}</h6>
            <small class="text-muted">${date}</small>
        </div>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
        </div>
        <p class="mt-2 mb-0">${comment}</p>
    `;

    div.querySelector('.delete-btn').addEventListener('click', () => {
        savedComments = savedComments.filter(c => c.id !== id);
        localStorage.setItem('comments', JSON.stringify(savedComments));
        div.remove();
    });

    feedbackList.prepend(div);
}



//scroll active 

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// menu 
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});


