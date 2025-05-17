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
                    this.style.background = '#f8f9fa';
                }
            });
            
            item.addEventListener('dragleave', function() {
                if (this !== draggedItem) {
                    this.style.background = '';
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
                        item.style.background = '';
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
            image: "https://pixabay.com/get/g9a76e870294abd833ad63249ccd4c6fbdf4ed9cbc54bd1eba85f0daedffedf08eb896e460b8440b699bc3c4a6379cd2c8a3274ce6932f6b3cb9d83c4be669ef2_1280.jpg"
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
            image: "https://pixabay.com/get/g80a39ef22a8960cb226de4d8d9c951bf838822e9a25b0255f854bf1f07f03a013e82d928a5f3923b75b293a5b778d7f37794c19e4913922b733e95c7f62f2b6b_1280.jpg",
            isActive: true
        },
        {
            id: 2,
            name: "Doddabetta Peak",
            description: "Panoramic views from the highest peak in the Nilgiris mountain range.",
            type: "Panoramic viewpoint tour",
            hasVR: true,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
            isActive: false
        },
        {
            id: 3,
            name: "Nilgiri Mountain Railway",
            description: "UNESCO heritage train journey through scenic mountain landscapes.",
            type: "UNESCO heritage train ride",
            hasVR: true,
            image: "https://images.unsplash.com/photo-1516383607781-913a19294fd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
            isActive: false
        },
        {
            id: 4,
            name: "Pykara Lake",
            description: "Serene lake surrounded by shola forests with boating opportunities.",
            type: "Lake and waterfall tour",
            hasVR: true,
            image: "https://pixabay.com/get/g15a312a5fbfe3ae3d9fd50cb4b869ccc63e54afcd236018166df7a653d2673df3979c32788628e1eba01a45c9650abe2e2acf10db4f30144f14b0bf263e1118e_1280.jpg",
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

// Voice modal functionality
function initVoiceModal() {
    const voiceButton = document.getElementById('voiceButton');
    const tryVoiceAssistant = document.getElementById('tryVoiceAssistant');
    const mobileVoiceButton = document.getElementById('mobileVoiceButton');
    const voiceModal = document.getElementById('voiceModal');
    const cancelVoice = document.getElementById('cancelVoice');
    const sendVoice = document.getElementById('sendVoice');
    const voiceTranscript = document.getElementById('voiceTranscript');
    const voiceResponse = document.getElementById('voiceResponse');
    
    function openVoiceModal() {
        voiceModal.classList.add('show');
        voiceTranscript.textContent = 'Listening...';
        voiceTranscript.classList.remove('has-text');
        voiceResponse.classList.add('hidden');
        
        // Simulate listening after a delay
        setTimeout(() => {
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
    }
    
    voiceButton.addEventListener('click', openVoiceModal);
    tryVoiceAssistant.addEventListener('click', openVoiceModal);
    mobileVoiceButton.addEventListener('click', openVoiceModal);
    cancelVoice.addEventListener('click', closeVoiceModal);
    sendVoice.addEventListener('click', closeVoiceModal);
}
