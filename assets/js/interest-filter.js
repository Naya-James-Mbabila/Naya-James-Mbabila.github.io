document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and interest tags
    const filterBtns = document.querySelectorAll('.filter-btn');
    const interestTags = document.querySelectorAll('.interest-tag');
    const tagsContainer = document.querySelector('.interest-tags');
    
    // Add click event to each filter button
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filter = this.getAttribute('data-filter');
            console.log("Filter selected: " + filter);
            
            // First pass - mark tags for hiding/showing with smooth transition
            interestTags.forEach(tag => {
                const category = tag.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    tag.classList.add('show-tag');
                    tag.classList.remove('hide-tag');
                    tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                } else {
                    tag.classList.add('hide-tag');
                    tag.classList.remove('show-tag');
                    tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }
            });
            
            // Allow time for fade out before display change
            setTimeout(() => {
                interestTags.forEach(tag => {
                    if (tag.classList.contains('hide-tag')) {
                        tag.style.display = 'none';
                    } else {
                        tag.style.display = 'flex';
                        tag.style.opacity = '0';
                        tag.style.transform = 'scale(0.8)';
                        
                        // Animate back in with bounce effect
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'scale(1)';
                        }, 100 + Math.random() * 200); // Randomized delay for a natural effect
                    }
                });
            }, 300); // Wait for fade out animation to complete
        });
    });
    
    // Initialize all tags as visible with entrance animation
    interestTags.forEach(tag => {
        tag.classList.add('show-tag');
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, 100 + Math.random() * 300);
    });
    
    console.log('Enhanced interest tag filtering initialized! 🎉');
});
