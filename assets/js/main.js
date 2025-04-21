
(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

	});

})(jQuery);

// For Script.js
// Add this to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and interest tags
    const filterButtons = document.querySelectorAll('.filter-btn');
    const interestTags = document.querySelectorAll('.interest-tag');
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter interests
            interestTags.forEach(tag => {
                if (filterValue === 'all') {
                    tag.classList.remove('hidden');
                } else {
                    if (tag.getAttribute('data-category') === filterValue) {
                        tag.classList.remove('hidden');
                    } else {
                        tag.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    // Add hover effect and click animation to interest tags
    interestTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Add pulse animation
            this.classList.add('pulse');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 600);
        });
    });
    
    // Additional animation: make tags slightly move on hover
    const addHoverEffect = () => {
        interestTags.forEach(tag => {
            const randomAngle = Math.random() * 3 - 1.5; // Random value between -1.5 and 1.5
            tag.addEventListener('mouseover', function() {
                this.style.transform = `translateY(-5px) rotate(${randomAngle}deg)`;
            });
            tag.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0) rotate(0)';
            });
        });
    };
    
    addHoverEffect();
});

// Add this to create a pulse animation in CSS
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
.pulse {
    animation: pulse 0.6s ease-in-out;
}
</style>
`);

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and interest tags
    const filterBtns = document.querySelectorAll('.filter-btn');
    const interestTags = document.querySelectorAll('.interest-tag');
    
    // Add click event to each filter button
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter the interest tags
            interestTags.forEach(tag => {
                if (filter === 'all' || tag.getAttribute('data-category') === filter) {
                    // Show this tag with animation
                    tag.classList.remove('hidden');
                    tag.style.opacity = '1';
                    tag.style.transform = 'scale(1)';
                } else {
                    // Hide this tag with animation
                    tag.classList.add('hidden');
                    tag.style.opacity = '0.3';
                    tag.style.transform = 'scale(0.9)';
                }
            });
            
            // Optional: animate the rearrangement
            setTimeout(() => {
                const container = document.querySelector('.interest-tags');
                const visibleTags = document.querySelectorAll('.interest-tag:not(.hidden)');
                
                // This causes a reflow, which triggers the CSS transitions
                container.style.height = container.offsetHeight + 'px';
            }, 50);
        });
    });
});