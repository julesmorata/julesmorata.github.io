// Show Modal for a Team Member with Animation
function showMemberDetails(memberId) {
    // Hide all modals
    let allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('open');
    });

    // Show the selected modal
    const modal = document.getElementById(memberId);
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('open');
    }, 10);

    // Add animation to the photo
    const photo = document.getElementById(`${memberId}-photo`);
    photo.classList.add('clicked');
}

// Close the modal
function closeModal(memberId) {
    const modal = document.getElementById(memberId);
    modal.style.display = 'none';
    modal.classList.remove('open');

    // Remove the photo animation
    const photo = document.getElementById(`${memberId}-photo`);
    photo.classList.remove('clicked');
}

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
});