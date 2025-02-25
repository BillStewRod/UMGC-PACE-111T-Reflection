document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.unit-toggle');
    const unitCards = document.querySelectorAll('.unit-card');
    
    // Add hover effect on unit cards
    unitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.unit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }
        });
    });
    
    // Toggle content visibility
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click from interfering
            const unitCard = this.closest('.unit-card');
            const content = unitCard.querySelector('.unit-content');
            
            // Close other open cards
            document.querySelectorAll('.unit-content.active').forEach(openContent => {
                if (openContent !== content) {
                    openContent.classList.remove('active');
                    const openButton = openContent.closest('.unit-card').querySelector('.unit-toggle');
                    openButton.textContent = '+';
                }
            });
            
            // Toggle current card
            content.classList.toggle('active');
            this.textContent = content.classList.contains('active') ? '–' : '+';
            
            // Scroll into view if opened
            if (content.classList.contains('active')) {
                setTimeout(() => {
                    content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });
    
    // Make entire header clickable
    unitCards.forEach(card => {
        const header = card.querySelector('.unit-header');
        header.addEventListener('click', function(e) {
            if (!e.target.classList.contains('unit-toggle')) {
                const button = this.querySelector('.unit-toggle');
                button.click();
            }
        });
    });
    
    // Add subtle animation when scrolling
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.unit-card');
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.unit-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in view
    animateOnScroll();
});