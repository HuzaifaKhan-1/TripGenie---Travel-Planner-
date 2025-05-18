// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize itinerary planner
    initItineraryPlanner();
    
    // Initialize destinations
    initDestinations();
    
    // Initialize flights
    initFlights();
    
    // Initialize tour locations
    initTourLocations();
    
    // Initialize testimonials
    initTestimonials();
    
    // Initialize tabs
    initTabs();
    
    // Initialize voice modal
    initVoiceModal();
    
    // Initialize multilingual support
    initMultilingualSupport();
    
    // Initialize 360-degree tours
    init360Tours();
    
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false,
        mirror: true
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    const nav = header.querySelector('nav');
    const navButtons = header.querySelectorAll('.nav-buttons button:not(#voiceButton)');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    const featureRowCards = document.querySelectorAll('.feature-row-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => observer.observe(card));
    featureRowCards.forEach(card => observer.observe(card));
}

// Itinerary planner functionality
function initItineraryPlanner() {
    const itineraryContainer = document.getElementById('itinerary-container');
    const addDayButton = document.getElementById('addDayButton');
    const destinationSelect = document.getElementById('destination');
    const itineraryDestination = document.getElementById('itineraryDestination');
    const decreaseTravelersBtn = document.getElementById('decreaseTravelers');
    const increaseTravelersBtn = document.getElementById('increaseTravelers');
    const travelersInput = document.getElementById('travelers');
    
    // Sample itinerary days
    const sampleDays = [
        {
            id: 1,
            title: "Day 1 - Arrival & Botanical Gardens",
            activities: [
                {
                    time: "09:00 AM",
                    icon: "fa-suitcase-rolling",
                    iconColor: "primary",
                    title: "Arrive at Coimbatore Airport",
                    description: "Private transfer to Ooty (2 hours)"
                },
                {
                    time: "12:00 PM",
                    icon: "fa-hotel",
                    iconColor: "secondary",
                    title: "Check-in at Savoy Hotel",
                    description: "Historic colonial hotel with garden views"
                },
                {
                    time: "02:00 PM",
                    icon: "fa-tree",
                    iconColor: "success",
                    title: "Ooty Botanical Gardens",
                    description: "Explore 55-acre gardens with rare trees and flowers"
                },
                {
                    time: "07:00 PM",
                    icon: "fa-utensils",
                    iconColor: "accent",
                    title: "Dinner at Earl's Secret",
                    description: "Local Nilgiri cuisine with mountain views"
                }
            ]
        },
        {
            id: 2,
            title: "Day 2 - Tea Plantations & Doddabetta Peak",
            activities: [
                {
                    time: "08:30 AM",
                    icon: "fa-coffee",
                    iconColor: "secondary",
                    title: "Tea Factory & Plantation Tour",
                    description: "Learn about tea production and sample fresh teas"
                },
                {
                    time: "12:00 PM",
                    icon: "fa-utensils",
                    iconColor: "accent",
                    title: "Lunch at Tea Nest",
                    description: "Scenic lunch spot with tea-infused dishes"
                },
                {
                    time: "02:30 PM",
                    icon: "fa-mountain",
                    iconColor: "success",
                    title: "Doddabetta Peak Excursion",
                    description: "Visit the highest peak in the Nilgiris for panoramic views"
                }
            ]
        },
        {
            id: 3,
            title: "Day 3 - Toy Train & Pykara Lake",
            activities: [
                {
                    time: "09:00 AM",
                    icon: "fa-train",
                    iconColor: "primary",
                    title: "Nilgiri Mountain Railway",
                    description: "Scenic toy train ride through the mountains (UNESCO heritage)"
                },
                {
                    time: "01:30 PM",
                    icon: "fa-water",
                    iconColor: "secondary",
                    title: "Pykara Lake & Waterfall",
                    description: "Boating on the serene lake and short hike to the falls"
                },
                {
                    time: "07:00 PM",
                    icon: "fa-shopping-bag",
                    iconColor: "accent",
                    title: "Ooty Market & Farewell Dinner",
                    description: "Shop for chocolates, oils, and teas before departure"
                }
            ]
        }
    ];
    
    // Generate itinerary day HTML
    function generateDayHTML(day) {
        let activitiesHTML = '';
        
        day.activities.forEach(activity => {
            activitiesHTML += `
                <div class="timeline-item">
                    <div class="timeline-time">${activity.time}</div>
                    <div class="timeline-content">
                        <div class="timeline-icon ${activity.iconColor}">
                            <i class="fas ${activity.icon}"></i>
                        </div>
                        <div class="timeline-details">
                            <h5>${activity.title}</h5>
                            <p>${activity.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        return `
            <div class="itinerary-card" draggable="true" data-id="${day.id}">
                <div class="itinerary-day-header">
                    <h4>${day.title}</h4>
                    <div class="drag-handle">
                        <i class="fas fa-grip-lines"></i>
                    </div>
                </div>
                <div class="itinerary-day-content">
                    ${activitiesHTML}
                </div>
            </div>
        `;
    }
    
    // Render initial itinerary days
    function renderItinerary() {
        itineraryContainer.innerHTML = '';
        sampleDays.forEach(day => {
            itineraryContainer.innerHTML += generateDayHTML(day);
        });
        setupDragAndDrop();
    }
    
    // Set up drag and drop functionality
    function setupDragAndDrop() {
        const draggableItems = document.querySelectorAll('.itinerary-card');
        let draggedItem = null;
        
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', function() {
                draggedItem = this;
                setTimeout(() => {
                    this.style.opacity = '0.5';
                    this.style.border = '2px dashed #1A73E8';
                }, 0);
            });
            
            item.addEventListener('dragend', function() {
                this.style.opacity = '';
                this.style.border = '';
                draggedItem = null;
            });
            
            item.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            
            item.addEventListener('dragenter', function(e) {
                e.preventDefault();
                if (this !== draggedItem) {
                    this.classList.add('drag-over');
                }
            });
            
            item.addEventListener('dragleave', function() {
                if (this !== draggedItem) {
                    this.classList.remove('drag-over');
                }
            });
            
            item.addEventListener('drop', function(e) {
                e.preventDefault();
                if (this !== draggedItem) {
                    const allItems = Array.from(itineraryContainer.querySelectorAll('.itinerary-card'));
                    const draggedIndex = allItems.indexOf(draggedItem);
                    const targetIndex = allItems.indexOf(this);
                    
                    if (draggedIndex < targetIndex) {
                        itineraryContainer.insertBefore(draggedItem, this.nextSibling);
                    } else {
                        itineraryContainer.insertBefore(draggedItem, this);
                    }
                    
                    // Update the sampleDays array to reflect the new order
                    const movedDay = sampleDays.splice(draggedIndex, 1)[0];
                    sampleDays.splice(targetIndex, 0, movedDay);
                    
                    // Rerender to update day numbers
                    draggableItems.forEach(item => {
                        this.classList.remove('drag-over');
                    });
                }
            });
        });
    }
    
    // Add new day
    addDayButton.addEventListener('click', function() {
        const newDayId = sampleDays.length + 1;
        const newDay = {
            id: newDayId,
            title: `Day ${newDayId} - Custom Day`,
            activities: [
                {
                    time: "09:00 AM",
                    icon: "fa-map-marker-alt",
                    iconColor: "primary",
                    title: "Add Your Activity",
                    description: "Click to edit this activity"
                }
            ]
        };
        
        sampleDays.push(newDay);
        itineraryContainer.innerHTML += generateDayHTML(newDay);
        setupDragAndDrop();
    });
    
    // Update itinerary destination
    destinationSelect.addEventListener('change', function() {
        itineraryDestination.textContent = `Your ${this.value} Itinerary`;
    });
    
    // Travelers control
    decreaseTravelersBtn.addEventListener('click', function() {
        const currentValue = parseInt(travelersInput.value);
        if (currentValue > 1) {
            travelersInput.value = currentValue - 1;
        }
    });
    
    increaseTravelersBtn.addEventListener('click', function() {
        const currentValue = parseInt(travelersInput.value);
        travelersInput.value = currentValue + 1;
    });
    
    // Initialize
    renderItinerary();
}

// Destinations functionality
function initDestinations() {
    const destinationsGrid = document.querySelector('.destinations-grid');
    
    // Sample destinations
    const destinations = [
        {
            id: 1,
            name: "Ooty",
            country: "India",
            description: "Experience the \"Queen of Hill Stations\" with scenic tea plantations and colonial charm.",
            price: "From $499/person",
            rating: 4.8,
            badge: "Featured",
            badgeColor: "accent",
            image: "https://experiencekerala.in/image-uploads/1468473509.Ooty_Lake.jpg"
        },
        {
            id: 2,
            name: "Bali",
            country: "Indonesia",
            description: "Discover tropical beaches, ancient temples, and vibrant cultural experiences.",
            price: "From $799/person",
            rating: 4.9,
            badge: "Popular",
            badgeColor: "primary",
            image: "https://images.unsplash.com/photo-1557093793-e196ae071479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
        },
        {
            id: 3,
            name: "Paris",
            country: "France",
            description: "Experience art, cuisine, and romance in the iconic City of Light.",
            price: "From $1,299/person",
            rating: 4.7,
            badge: "Popular",
            badgeColor: "primary",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
        }
    ];
    
    // Generate destination HTML
    function generateDestinationHTML(destination, index) {
        return `
            <div class="destination-card" data-delay="${index * 200}">
                <div class="destination-image">
                    <img src="${destination.image}" alt="${destination.name}, ${destination.country}">
                    <div class="destination-rating">
                        <i class="fas fa-star" style="color: #f1c40f;"></i> ${destination.rating}
                    </div>
                </div>
                <div class="destination-details">
                    <div class="destination-header">
                        <div class="destination-title">
                            <h3>${destination.name}, ${destination.country}</h3>
                        </div>
                        <span class="destination-badge ${destination.badgeColor}">${destination.badge}</span>
                    </div>
                    <p class="destination-description">${destination.description}</p>
                    <div class="destination-footer">
                        <span class="destination-price">${destination.price}</span>
                        <button class="primary-button">
                            <i class="fas fa-compass"></i> Explore
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render destinations
    let destinationsHTML = '';
    destinations.forEach((destination, index) => {
        destinationsHTML += generateDestinationHTML(destination, index);
    });
    destinationsGrid.innerHTML = destinationsHTML;
    
    // Animate destination cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => observer.observe(card));
}

// Flights functionality
function initFlights() {
    const flightsResults = document.getElementById('flights-results');
    const tripTypeRadios = document.querySelectorAll('input[name="tripType"]');
    const returnDateInput = document.getElementById('returnDate');
    
    // Sample flights
    const flights = [
        {
            id: 1,
            airline: "IndiGo Airlines",
            flightNumber: "6E 237",
            icon: "fa-plane",
            iconColor: "primary",
            departure: "08:15",
            departureCode: "DEL",
            arrival: "10:45",
            arrivalCode: "CJB",
            duration: "2h 30m",
            stops: "Non-stop",
            price: "₹5,499"
        },
        {
            id: 2,
            airline: "Air India",
            flightNumber: "AI 657",
            icon: "fa-plane",
            iconColor: "error",
            departure: "11:30",
            departureCode: "BOM",
            arrival: "13:15",
            arrivalCode: "CJB",
            duration: "1h 45m",
            stops: "Non-stop",
            price: "₹6,250"
        }
    ];
    
    // Generate flight HTML
    function generateFlightHTML(flight) {
        return `
            <div class="flight-card">
                <div class="flight-content">
                    <div class="airline">
                        <div class="airline-logo">
                            <i class="fas ${flight.icon}"></i>
                        </div>
                        <div>
                            <div class="airline-name">${flight.airline}</div>
                            <div class="airline-flight">${flight.flightNumber}</div>
                        </div>
                    </div>
                    
                    <div class="flight-details">
                        <div class="flight-time">
                            <div class="flight-time-value">${flight.departure}</div>
                            <div class="flight-time-code">${flight.departureCode}</div>
                        </div>
                        
                        <div class="flight-duration">
                            <div class="flight-duration-line"></div>
                            <div class="flight-duration-time">${flight.duration}</div>
                            <div class="flight-duration-stops">${flight.stops}</div>
                        </div>
                        
                        <div class="flight-time">
                            <div class="flight-time-value">${flight.arrival}</div>
                            <div class="flight-time-code">${flight.arrivalCode}</div>
                        </div>
                    </div>
                    
                    <div class="flight-price">
                        <div class="flight-price-value">${flight.price}</div>
                        <button class="primary-button">Select</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render flights
    let flightsHTML = '';
    flights.forEach(flight => {
        flightsHTML += generateFlightHTML(flight);
    });
    flightsResults.innerHTML = flightsHTML;
    
    // Handle trip type change
    tripTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'oneWay') {
                returnDateInput.disabled = true;
            } else {
                returnDateInput.disabled = false;
            }
        });
    });
}

// Tour locations functionality
function initTourLocations() {
    const tourLocationsList = document.getElementById('tour-locations-list');
    const tourImage = document.getElementById('tourImage');
    const tourName = document.getElementById('tourName');
    const tourDescription = document.getElementById('tourDescription');
    
    // Sample tour locations
    const tourLocations = [
        {
            id: 1,
            name: "Ooty Botanical Gardens",
            description: "Experience the 55-acre garden with over 650 species of plants and flowers.",
            type: "Virtual walking tour",
            hasVR: true,
            image: "https://experiencekerala.in/image-uploads/1468473509.Ooty_Lake.jpg",
            isActive: true
        },
        {
            id: 2,
            name: "Doddabetta Peak",
            description: "Panoramic views from the highest peak in the Nilgiris mountain range.",
            type: "Panoramic viewpoint tour",
            hasVR: true,
            image: "https://images.trvl-media.com/media/content/shared/images/travelguides/destination/6049947/Tamil-Nadu-97368.jpg",
            isActive: false
        },
        {
            id: 3,
            name: "Nilgiri Mountain Railway",
            description: "UNESCO heritage train journey through scenic mountain landscapes.",
            type: "UNESCO heritage train ride",
            hasVR: true,
            image: "https://th.bing.com/th/id/OIP.ThC0fGUX9wvIiH-6nZlO9AHaE8?cb=iwc2&rs=1&pid=ImgDetMain",
            isActive: false
        },
        {
            id: 4,
            name: "Pykara Lake",
            description: "Serene lake surrounded by shola forests with boating opportunities.",
            type: "Lake and waterfall tour",
            hasVR: true,
            image: "https://ootytours.in/images/tours/one-day-ooty-pykara-tour/one-day-ooty-pykara-tour-pykara-lake-boatclub-local-sightseeing-tour-package-pykara-lake-boat-club-ooty.jpg",
            isActive: false
        }
    ];
    
    // Generate tour location HTML
    function generateTourLocationHTML(location) {
        return `
            <div class="tour-location-item ${location.isActive ? 'active' : ''}" data-id="${location.id}">
                <div class="tour-location-image">
                    <img src="${location.image}" alt="${location.name}">
                </div>
                <div class="tour-location-details">
                    <h4>${location.name}</h4>
                    <p class="tour-location-type">${location.type}</p>
                    ${location.hasVR ? `
                        <div class="tour-vr-badge">
                            <i class="fas fa-vr-cardboard"></i>
                            <span>360° Experience</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // Render tour locations
    let tourLocationsHTML = '';
    tourLocations.forEach(location => {
        tourLocationsHTML += generateTourLocationHTML(location);
    });
    tourLocationsList.innerHTML = tourLocationsHTML;
    
    // Set up location selection
    const locationItems = document.querySelectorAll('.tour-location-item');
    locationItems.forEach(item => {
        item.addEventListener('click', function() {
            const locationId = parseInt(this.getAttribute('data-id'));
            const location = tourLocations.find(loc => loc.id === locationId);
            
            // Update active state
            locationItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Update preview
            tourImage.src = location.image;
            tourName.textContent = location.name;
            tourDescription.textContent = location.description;
            
            // Update location data
            tourLocations.forEach(loc => loc.isActive = loc.id === locationId);
        });
    });
}

// Testimonials functionality
function initTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    
    // Sample testimonials
    const testimonials = [
        {
            id: 1,
            content: "The drag-and-drop itinerary planner made organizing our family trip to Ooty so easy! We could visualize our entire journey and make changes on the fly.",
            author: "Priya Sharma",
            rating: 5,
            borderColor: "border-primary",
            quoteColor: "text-primary"
        },
        {
            id: 2,
            content: "The virtual tour feature helped us decide which places to visit in Ooty before we even arrived. It saved us time and helped us prioritize the best spots!",
            author: "Raj Mehta",
            rating: 4.5,
            borderColor: "border-secondary",
            quoteColor: "text-secondary"
        },
        {
            id: 3,
            content: "Voice commands made planning so much easier! I could add activities while packing for my trip. The language translation also came in handy during our stay in Ooty.",
            author: "Anita Desai",
            rating: 5,
            borderColor: "border-accent",
            quoteColor: "text-accent"
        }
    ];
    
    // Generate testimonial HTML
    function generateTestimonialHTML(testimonial, index) {
        const fullStars = Math.floor(testimonial.rating);
        const hasHalfStar = testimonial.rating % 1 !== 0;
        
        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        return `
            <div class="testimonial-card" style="border-color: var(--${testimonial.borderColor.split('-')[1]})" data-delay="${index * 200}">
                <div class="testimonial-quote ${testimonial.quoteColor}">
                    <i class="fas fa-quote-left"></i>
                </div>
                <p class="testimonial-content">${testimonial.content}</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <div class="testimonial-name">${testimonial.author}</div>
                        <div class="testimonial-stars">
                            ${starsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render testimonials
    let testimonialsHTML = '';
    testimonials.forEach((testimonial, index) => {
        testimonialsHTML += generateTestimonialHTML(testimonial, index);
    });
    testimonialsGrid.innerHTML = testimonialsHTML;
    
    // Animate testimonial cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => observer.observe(card));
}

// Tabs functionality
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// Multilingual support
function initMultilingualSupport() {
    const languageButton = document.getElementById('languageButton');
    const mobileLanguageButton = document.getElementById('mobileLanguageButton');
    
    // Translation data for different languages
    const translations = {
        english: {
            // Navigation
            'nav_planner': 'Planner',
            'nav_destinations': 'Destinations',
            'nav_flights_hotels': 'Flights & Hotels',
            'nav_virtual_tours': 'Virtual Tours',
            'nav_voice': 'Voice',
            
            // Hero section
            'hero_title': 'Let AI Plan Your Perfect Trip',
            'hero_subtitle': 'Create, customize, and share your travel itineraries with TripGenie\'s smart planning tools.',
            'hero_button_plan': 'Start Planning Now',
            'hero_button_watch': 'Watch How It Works',
            'hero_discover': 'Discover More',
            
            // Features section
            'features_title': 'Plan Your Trip Like Never Before',
            'features_subtitle': 'Our AI-powered tools help you create the perfect itinerary, find the best deals, and explore destinations before you even arrive.',
            'feature_itinerary': 'Interactive Itinerary',
            'feature_itinerary_desc': 'Drag and drop to create, customize, and reorder your daily plans with our intuitive interface.',
            'feature_flights': 'Flights & Hotels',
            'feature_flights_desc': 'Find and book the best travel options all in one place, with smart recommendations.',
            'feature_tours': 'Virtual Tours',
            'feature_tours_desc': 'Explore destinations virtually before you travel, with immersive 360° experiences of popular spots.',
            'feature_voice': 'Voice Control',
            'feature_voice_desc': 'Control the app using voice commands for a hands-free planning experience when you\'re busy packing.',
            'feature_language': 'Language Translation',
            'feature_language_desc': 'Break the language barrier with integrated translation tools powered by Google\'s advanced NLP technology.',
            
            // Planner section
            'planner_badge': 'INTERACTIVE PLANNER',
            'planner_title': 'Create Your Perfect Itinerary',
            'planner_subtitle': 'Drag and drop activities to build your ideal trip schedule.',
            'planner_trip_details': 'Trip Details',
            'planner_destination': 'Destination',
            'planner_start_date': 'Start Date',
            'planner_end_date': 'End Date',
            'planner_travelers': 'Travelers',
            'planner_travel_style': 'Travel Style',
            'planner_style_adventure': 'Adventure',
            'planner_style_culture': 'Culture',
            'planner_style_relaxation': 'Relaxation',
            'planner_style_food': 'Food & Drink',
            'planner_generate': 'Generate Itinerary',
            'planner_share': 'Share',
            'planner_export': 'Export',
            'planner_add_day': 'Add Another Day',
            
            // Voice assistant
            'voice_title': 'Voice Assistant',
            'voice_listening': 'Listening...',
            'voice_speak': 'Speak your command...',
            'voice_tap': 'Tap microphone to speak',
            'voice_cancel': 'Cancel',
            'voice_send': 'Send'
        },
        hindi: {
            // Navigation
            'nav_planner': 'योजनाकार',
            'nav_destinations': 'गंतव्य',
            'nav_flights_hotels': 'उड़ानें और होटल',
            'nav_virtual_tours': 'आभासी यात्राएँ',
            'nav_voice': 'आवाज़',
            
            // Hero section
            'hero_title': 'एआई से अपनी सही यात्रा की योजना बनाएं',
            'hero_subtitle': 'ट्रिपजीनी के स्मार्ट प्लानिंग टूल्स के साथ अपने यात्रा कार्यक्रम बनाएं, अनुकूलित करें और साझा करें।',
            'hero_button_plan': 'अभी योजना बनाना शुरू करें',
            'hero_button_watch': 'देखें कैसे काम करता है',
            'hero_discover': 'और खोजें',
            
            // Features section
            'features_title': 'अपनी यात्रा की योजना पहले कभी नहीं की गई',
            'features_subtitle': 'हमारे एआई-संचालित उपकरण आपको सही कार्यक्रम बनाने, सर्वोत्तम सौदे खोजने और आपके पहुंचने से पहले ही गंतव्यों का पता लगाने में मदद करते हैं।',
            'feature_itinerary': 'इंटरैक्टिव यात्रा कार्यक्रम',
            'feature_itinerary_desc': 'हमारे सहज इंटरफेस के साथ अपने दैनिक कार्यक्रमों को बनाने, अनुकूलित करने और पुनर्व्यवस्थित करने के लिए खींचें और छोड़ें।',
            'feature_flights': 'उड़ानें और होटल',
            'feature_flights_desc': 'स्मार्ट अनुशंसाओं के साथ, एक ही स्थान पर सर्वोत्तम यात्रा विकल्प खोजें और बुक करें।',
            'feature_tours': 'आभासी यात्राएँ',
            'feature_tours_desc': 'लोकप्रिय स्थानों के इमर्सिव 360° अनुभवों के साथ यात्रा करने से पहले गंतव्यों का आभासी रूप से पता लगाएं।',
            'feature_voice': 'आवाज़ नियंत्रण',
            'feature_voice_desc': 'जब आप पैकिंग में व्यस्त हों तो हैंड्स-फ्री योजना अनुभव के लिए आवाज़ कमांड का उपयोग करके ऐप को नियंत्रित करें।',
            'feature_language': 'भाषा अनुवाद',
            'feature_language_desc': 'Google की उन्नत NLP तकनीक द्वारा संचालित एकीकृत अनुवाद उपकरणों के साथ भाषा बाधा को तोड़ें।',
            
            // Planner section
            'planner_badge': 'इंटरैक्टिव योजनाकार',
            'planner_title': 'अपना सही यात्रा कार्यक्रम बनाएं',
            'planner_subtitle': 'अपने आदर्श यात्रा कार्यक्रम का निर्माण करने के लिए गतिविधियों को खींचें और छोड़ें।',
            'planner_trip_details': 'यात्रा विवरण',
            'planner_destination': 'गंतव्य',
            'planner_start_date': 'आरंभ तिथि',
            'planner_end_date': 'अंतिम तिथि',
            'planner_travelers': 'यात्री',
            'planner_travel_style': 'यात्रा शैली',
            'planner_style_adventure': 'साहसिक',
            'planner_style_culture': 'संस्कृति',
            'planner_style_relaxation': 'आराम',
            'planner_style_food': 'भोजन और पेय',
            'planner_generate': 'यात्रा कार्यक्रम उत्पन्न करें',
            'planner_share': 'साझा करें',
            'planner_export': 'निर्यात करें',
            'planner_add_day': 'एक और दिन जोड़ें',
            
            // Voice assistant
            'voice_title': 'आवाज़ सहायक',
            'voice_listening': 'सुन रहा है...',
            'voice_speak': 'अपना कमांड बोलें...',
            'voice_tap': 'बोलने के लिए माइक्रोफोन टैप करें',
            'voice_cancel': 'रद्द करें',
            'voice_send': 'भेजें'
        },
        tamil: {
            // Navigation
            'nav_planner': 'திட்டமிடுபவர்',
            'nav_destinations': 'இடங்கள்',
            'nav_flights_hotels': 'விமானங்கள் & ஹோட்டல்கள்',
            'nav_virtual_tours': 'மெய்நிகர் சுற்றுலாக்கள்',
            'nav_voice': 'குரல்',
            
            // Hero section
            'hero_title': 'AI உங்கள் சரியான பயணத்தை திட்டமிட விடுங்கள்',
            'hero_subtitle': 'டிரிப்ஜீனியின் ஸ்மார்ட் திட்டமிடல் கருவிகளுடன் உங்கள் பயண அட்டவணைகளை உருவாக்கவும், தனிப்பயனாக்கவும், பகிரவும்.',
            'hero_button_plan': 'இப்போது திட்டமிட தொடங்குங்கள்',
            'hero_button_watch': 'எப்படி செயல்படுகிறது என்பதை பார்க்கவும்',
            'hero_discover': 'மேலும் கண்டுபிடியுங்கள்',
            
            // Voice assistant
            'voice_title': 'குரல் உதவியாளர்',
            'voice_listening': 'கேட்கிறது...',
            'voice_speak': 'உங்கள் கட்டளையைப் பேசுங்கள்...',
            'voice_tap': 'பேச மைக்ரோஃபோனைத் தட்டவும்',
            'voice_cancel': 'ரத்து செய்',
            'voice_send': 'அனுப்பு'
        }
    };
    
    // Current language (default English)
    let currentLanguage = 'english';
    
    // Function to update text content based on selected language
    function updateLanguage(language) {
        currentLanguage = language;
        
        // Store language preference
        localStorage.setItem('preferredLanguage', language);
        
        // Update navigation links
        document.querySelectorAll('nav a').forEach(link => {
            if (link.textContent.includes('Planner')) {
                link.textContent = translations[language]['nav_planner'];
            } else if (link.textContent.includes('Destinations')) {
                link.textContent = translations[language]['nav_destinations'];
            } else if (link.textContent.includes('Flights')) {
                link.textContent = translations[language]['nav_flights_hotels'];
            } else if (link.textContent.includes('Virtual')) {
                link.textContent = translations[language]['nav_virtual_tours'];
            }
        });
        
        // Update mobile menu links
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            if (link.textContent.includes('Planner')) {
                link.textContent = translations[language]['nav_planner'];
            } else if (link.textContent.includes('Destinations')) {
                link.textContent = translations[language]['nav_destinations'];
            } else if (link.textContent.includes('Flights')) {
                link.textContent = translations[language]['nav_flights_hotels'];
            } else if (link.textContent.includes('Virtual')) {
                link.textContent = translations[language]['nav_virtual_tours'];
            }
        });
        
        // Update voice button text
        const voiceButtons = document.querySelectorAll('#voiceButton span, #mobileVoiceButton span');
        voiceButtons.forEach(button => {
            button.textContent = translations[language]['nav_voice'];
        });
        
        // Update hero section
        const heroTitle = document.querySelector('#hero h2');
        const heroSubtitle = document.querySelector('#hero p');
        const heroButtons = document.querySelectorAll('#hero button');
        const heroDiscover = document.querySelector('#hero .scroll-down p');
        
        if (heroTitle) heroTitle.textContent = translations[language]['hero_title'];
        if (heroSubtitle) heroSubtitle.textContent = translations[language]['hero_subtitle'];
        if (heroButtons.length >= 2) {
            heroButtons[0].textContent = translations[language]['hero_button_plan'];
            let watchText = translations[language]['hero_button_watch'];
            heroButtons[1].innerHTML = `<i class="fas fa-play-circle mr-2"></i> ${watchText}`;
        }
        if (heroDiscover) heroDiscover.textContent = translations[language]['hero_discover'];
        
        // Update voice assistant modal
        const voiceTitle = document.querySelector('#voiceModal h3');
        const voiceSpeak = document.querySelector('#voiceModal p');
        const voiceCancel = document.querySelector('#cancelVoice');
        const voiceSend = document.querySelector('#sendVoice');
        const voiceFooter = document.querySelector('.voice-ui-footer');
        
        if (voiceTitle) voiceTitle.textContent = translations[language]['voice_title'];
        if (voiceSpeak) voiceSpeak.textContent = translations[language]['voice_speak'];
        if (voiceCancel) voiceCancel.textContent = translations[language]['voice_cancel'];
        if (voiceSend) voiceSend.textContent = translations[language]['voice_send'];
        if (voiceFooter) voiceFooter.textContent = translations[language]['voice_tap'];
        
        // Update language button text
        if (language === 'english') {
            languageButton.innerHTML = '<i class="fas fa-language text-xl"></i>';
            mobileLanguageButton.innerHTML = '<i class="fas fa-language text-xl"></i>';
        } else if (language === 'hindi') {
            languageButton.innerHTML = '<span>हिन्दी</span>';
            mobileLanguageButton.innerHTML = '<span>हिन्दी</span>';
        } else if (language === 'tamil') {
            languageButton.innerHTML = '<span>தமிழ்</span>';
            mobileLanguageButton.innerHTML = '<span>தமிழ்</span>';
        }
    }
    
    // Cycle through languages
    function cycleLanguage() {
        if (currentLanguage === 'english') {
            updateLanguage('hindi');
        } else if (currentLanguage === 'hindi') {
            updateLanguage('tamil');
        } else {
            updateLanguage('english');
        }
    }
    
    // Event listeners for language buttons
    languageButton.addEventListener('click', cycleLanguage);
    mobileLanguageButton.addEventListener('click', cycleLanguage);
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        updateLanguage(savedLanguage);
    }
}

// 360-degree tours functionality
function init360Tours() {
    // 360-degree panorama viewer using Pannellum library
    const virtualTourContainer = document.querySelector('.tour-preview');
    const panoramaContainer = document.getElementById('panorama-container');
    
    if (!virtualTourContainer || !panoramaContainer) return;
    
    // Public panorama images from pannellum.org demo site
    const panoramas = {
        'Ooty Botanical Gardens': 'https://pannellum.org/images/cerro-toco-0.jpg',
        'Doddabetta Peak': 'https://pannellum.org/images/alma.jpg',
        'Nilgiri Mountain Railway': 'https://pannellum.org/images/bma-1.jpg',
        'Pykara Lake': 'https://pannellum.org/images/jfk.jpg'
    };
    
    // Initialize the viewer
    let viewer = null;
    
    // Function to start a 360 tour
    function start360Tour(location) {
        console.log("Starting 360 tour for:", location);
        
        // Get the panorama image
        let panoramaImage = panoramas[location];
        if (!panoramaImage) {
            panoramaImage = fallbackPanoramas[location];
            if (!panoramaImage) {
                console.error("No panorama found for location:", location);
                return;
            }
        }
        
        // Show loading indicator
        panoramaContainer.innerHTML = '<div class="loading-spinner"></div>';
        panoramaContainer.style.display = 'block';
        panoramaContainer.classList.add('active');
        
        // Create the panorama viewer container
        const viewerContainer = document.createElement('div');
        viewerContainer.id = 'panorama';
        viewerContainer.style.width = '100%';
        viewerContainer.style.height = '100%';
        panoramaContainer.appendChild(viewerContainer);
        
        // Initialize panorama
        setTimeout(() => {
            try {
                viewer = pannellum.viewer(viewerContainer.id, {
                    type: 'equirectangular',
                    panorama: panoramaImage,
                    autoLoad: true,
                    autoRotate: -2,
                    compass: true,
                    title: location,
                    author: 'TripGenie',
                    preview: document.getElementById('tourImage').src,
                    showFullscreenCtrl: true,
                    showControls: true,
                    keyboardZoom: true,
                    mouseZoom: true,
                    hfov: 100,
                    minHfov: 50,
                    maxHfov: 120
                });
                
                // Add close button
                const closeButton = document.createElement('button');
                closeButton.className = 'close-panorama';
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                panoramaContainer.appendChild(closeButton);
                
                closeButton.addEventListener('click', function() {
                    closePanorama();
                });
                
                // Log success
                console.log("360 tour initialized successfully");
            } catch (error) {
                console.error("Error initializing panorama:", error);
                panoramaContainer.innerHTML = `
                    <div style="color: white; text-align: center; padding: 20px;">
                        <h3>Error loading 360° tour</h3>
                        <p>Please try again later.</p>
                        <button class="close-panorama">Close</button>
                    </div>
                `;
                
                // Add event listener to the newly created close button
                const errorCloseBtn = panoramaContainer.querySelector('.close-panorama');
                if (errorCloseBtn) {
                    errorCloseBtn.addEventListener('click', closePanorama);
                }
            }
        }, 500);
    }
    
    // Function to close the panorama
    function closePanorama() {
        if (viewer) {
            viewer.destroy();
            viewer = null;
        }
        panoramaContainer.innerHTML = '';
        panoramaContainer.style.display = 'none';
        panoramaContainer.classList.remove('active');
    }
    
    // Attach click event to play button
    const playButton = virtualTourContainer.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            const tourName = document.getElementById('tourName').textContent;
            start360Tour(tourName);
        });
    }
    
    // Attach click event to tour location items
    const tourLocationItems = document.querySelectorAll('.tour-location-item');
    tourLocationItems.forEach(item => {
        item.addEventListener('click', function() {
            const locationName = this.querySelector('h4').textContent;
            const locationDescription = this.getAttribute('data-description');
            
            // Update preview image
            document.getElementById('tourImage').src = this.querySelector('img').src;
            document.getElementById('tourName').textContent = locationName;
            document.getElementById('tourDescription').textContent = locationDescription;
            
            // Remove active class from all items
            tourLocationItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add keyboard event to close panorama with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && panoramaContainer.style.display === 'block') {
            closePanorama();
        }
    });
}

// Voice modal functionality with real voice recognition
function initVoiceModal() {
    const voiceButton = document.getElementById('voiceButton');
    const tryVoiceAssistant = document.getElementById('tryVoiceAssistant');
    const mobileVoiceButton = document.getElementById('mobileVoiceButton');
    const voiceModal = document.getElementById('voiceModal');
    const cancelVoice = document.getElementById('cancelVoice');
    const sendVoice = document.getElementById('sendVoice');
    const voiceTranscript = document.getElementById('voiceTranscript');
    const voiceResponse = document.getElementById('voiceResponse');
    
    let recognition = null;
    let isListening = false;
    
    // Initialize speech recognition
    function initSpeechRecognition() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            
            recognition.onstart = function() {
                isListening = true;
                voiceTranscript.textContent = 'Listening...';
                voiceTranscript.classList.remove('has-text');
                document.querySelector('.voice-inner-button').classList.add('listening');
            };
            
            recognition.onresult = function(event) {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                
                voiceTranscript.textContent = transcript;
                voiceTranscript.classList.add('has-text');
                
                // Process the voice command
                if (event.results[0].isFinal) {
                    processVoiceCommand(transcript);
                }
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
                isListening = false;
                document.querySelector('.voice-inner-button').classList.remove('listening');
            };
            
            recognition.onend = function() {
                isListening = false;
                document.querySelector('.voice-inner-button').classList.remove('listening');
            };
            
            return true;
        } else {
            console.warn('Speech recognition not supported in this browser');
            return false;
        }
    }
    
    // Process voice command
    function processVoiceCommand(command) {
        let response = '';
        
        // Process command based on keywords
        const lowerCommand = command.toLowerCase();
        
        if (lowerCommand.includes('ooty')) {
            response = 'Ooty is a beautiful hill station in India known for its tea plantations and botanical gardens. The best time to visit is between October and June.';
        } else if (lowerCommand.includes('hotel') || lowerCommand.includes('stay')) {
            response = 'I found 3 top hotels in Ooty: Savoy Hotel, Taj Ooty Resort & Spa, and Pine Forest Cottages. Would you like more details?';
        } else if (lowerCommand.includes('flight') || lowerCommand.includes('travel')) {
            response = 'The nearest airport to Ooty is Coimbatore International Airport. There are daily flights from major cities like Delhi and Mumbai.';
        } else if (lowerCommand.includes('translate')) {
            response = 'What would you like me to translate and to which language?';
        } else if (lowerCommand.includes('virtual tour') || lowerCommand.includes('360')) {
            response = 'We have virtual tours available for Ooty Botanical Gardens, Doddabetta Peak, Nilgiri Mountain Railway, and Pykara Lake. Which would you like to explore?';
        } else if (lowerCommand.includes('itinerary') || lowerCommand.includes('plan')) {
            response = 'I recommend a 3-day trip to Ooty. Day 1: Botanical Gardens and Ooty Lake. Day 2: Tea Plantations and Doddabetta Peak. Day 3: Nilgiri Mountain Railway and Pykara Lake.';
        } else {
            response = 'I can help you with information about destinations, planning your itinerary, booking flights and hotels, or providing virtual tours. What would you like to know?';
        }
        
        // Display response
        setTimeout(() => {
            voiceResponse.textContent = response;
            voiceResponse.classList.remove('hidden');
        }, 500);
    }
    
    function openVoiceModal() {
        voiceModal.classList.add('show');
        voiceTranscript.textContent = 'Listening...';
        voiceTranscript.classList.remove('has-text');
        voiceResponse.classList.add('hidden');
        
        // Start speech recognition if available
        if (recognition) {
            try {
                recognition.start();
            } catch (e) {
                console.error('Error starting speech recognition:', e);
                
                // Fallback to simulation if there's an error
                simulateVoiceRecognition();
            }
        } else {
            // Try to initialize speech recognition
            if (!initSpeechRecognition()) {
                // If not supported, fall back to simulation
                simulateVoiceRecognition();
            } else {
                recognition.start();
            }
        }
    }
    
    // Simulation fallback
    function simulateVoiceRecognition() {
        document.querySelector('.voice-inner-button').classList.add('listening');
        
        // Simulate listening after a delay
        setTimeout(() => {
            document.querySelector('.voice-inner-button').classList.remove('listening');
            voiceTranscript.textContent = 'Show me the best time to visit Ooty';
            voiceTranscript.classList.add('has-text');
            
            // Simulate response after a delay
            setTimeout(() => {
                voiceResponse.textContent = 'The best time to visit Ooty is between October and June, with peak season during April-May when the flowers are in full bloom.';
                voiceResponse.classList.remove('hidden');
            }, 1000);
        }, 2000);
    }
    
    function closeVoiceModal() {
        voiceModal.classList.remove('show');
        
        // Stop recognition if it's running
        if (recognition && isListening) {
            recognition.stop();
        }
    }
    
    document.querySelector('.voice-inner-button').addEventListener('click', function() {
        if (isListening) {
            if (recognition) recognition.stop();
        } else {
            if (recognition) {
                try {
                    recognition.start();
                } catch (e) {
                    console.error('Error starting speech recognition:', e);
                }
            }
        }
    });
    
    voiceButton.addEventListener('click', openVoiceModal);
    tryVoiceAssistant.addEventListener('click', openVoiceModal);
    mobileVoiceButton.addEventListener('click', openVoiceModal);
    cancelVoice.addEventListener('click', closeVoiceModal);
    sendVoice.addEventListener('click', closeVoiceModal);
    
    // Initialize speech recognition
    initSpeechRecognition();
}

const textElement = document.getElementById('hero3DText');
let glowClasses = ['glow-1', 'glow-2', 'glow-3', 'glow-4'];
let currentGlow = 0;

setInterval(() => {
  textElement.classList.remove(...glowClasses);
  currentGlow = (currentGlow + 1) % glowClasses.length;
  textElement.classList.add(glowClasses[currentGlow]);
}, 5000); // every 5 seconds, matches slideshow timing


// Signup Form
const signupOverlay = document.getElementById('signupOverlay');
const showLoginBtn = document.getElementById('showLoginBtn');
const showSignupBtn = document.getElementById('showSignupBtn');
const signupSection = document.getElementById('signupSection');
const loginSection = document.getElementById('loginSection');

// Show overlay on Sign Up button click
document.querySelector('.action-button').addEventListener('click', function (e) {
  e.preventDefault();
  signupOverlay.classList.remove('hidden');
  document.body.classList.add('blurred');
  signupSection.classList.remove('hidden');
  loginSection.classList.add('hidden');
});

// Close modal
document.getElementById('closeSignup').addEventListener('click', function () {
  signupOverlay.classList.add('hidden');
  document.body.classList.remove('blurred');
});

// Toggle Login
showLoginBtn.addEventListener('click', function () {
  signupSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
});

// Toggle Signup
showSignupBtn.addEventListener('click', function () {
  loginSection.classList.add('hidden');
  signupSection.classList.remove('hidden');
});

