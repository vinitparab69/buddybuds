// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const hamburgers = document.querySelectorAll('.hamburger');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    
    // Animate hamburger menu
    hamburgers.forEach((hamburger, index) => {
        if (mobileMenu.style.display === 'block') {
            if (index === 0) hamburger.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) hamburger.style.opacity = '0';
            if (index === 2) hamburger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburger.style.transform = 'none';
            hamburger.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on links
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        hamburgers.forEach(hamburger => {
            hamburger.style.transform = 'none';
            hamburger.style.opacity = '1';
        });
    });
});

const heroColorOptions = document.querySelectorAll('.hero .color-option');
const galleryColorOptions = document.querySelectorAll('#gallery .color-option');

function syncColorSelection(selectedKey) {
    // Remove active from all hero and gallery options
    heroColorOptions.forEach(opt => opt.classList.remove('active'));
    galleryColorOptions.forEach(opt => opt.classList.remove('active'));

    // Add active to selected in both hero and gallery
    heroColorOptions.forEach(opt => {
        if (opt.dataset.color === selectedKey) opt.classList.add('active');
    });
    galleryColorOptions.forEach(opt => {
        if (opt.dataset.color === selectedKey) opt.classList.add('active');
    });
}

function updateOrderNowButton(colorKey) {
    selectedColor = colorNameMap[colorKey] || colorKey;
    if (orderNowBtn) {
        orderNowBtn.textContent = `Order Now - $199 (${selectedColor})`;
        orderNowBtn.dataset.productName = `SoundWave Pro - Premium Edition (${selectedColor})`;
        // Add SVG icon back to button
        const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgIcon.setAttribute("width", "20");
        svgIcon.setAttribute("height", "20");
        svgIcon.setAttribute("viewBox", "0 0 24 24");
        svgIcon.setAttribute("fill", "none");
        svgIcon.setAttribute("stroke", "currentColor");
        svgIcon.setAttribute("stroke-width", "2");
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z");
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "3");
        line.setAttribute("y1", "6");
        line.setAttribute("x2", "21");
        line.setAttribute("y2", "6");
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "m16 10-4 4-4-4");
        svgIcon.appendChild(path1);
        svgIcon.appendChild(line);
        svgIcon.appendChild(path2);
        orderNowBtn.prepend(svgIcon);
    }
    showcaseProduct.className = `showcase-product ${colorKey}`;
    selectedColorKey = colorKey;
}

let selectedColorKey = 'black'; // default selected color key

heroColorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const key = option.dataset.color;
        syncColorSelection(key);
        updateOrderNowButton(key);
    });
});

galleryColorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const key = option.dataset.color;
        syncColorSelection(key);
        updateOrderNowButton(key);
    });
});

// Initialize with default selection
syncColorSelection(selectedColorKey);
updateOrderNowButton(selectedColorKey);

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.feature-card, .spec-category, .testimonial');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Hero product animation
const productCase = document.querySelector('.product-case');
if (productCase) {
    setInterval(() => {
        productCase.style.transform = 'rotateY(360deg)';
        setTimeout(() => {
            productCase.style.transform = 'rotateY(0deg)';
        }, 1000);
    }, 5000);
}

// Add hover effects to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .order-btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Cart functionality (enhanced)
const cartBtn = document.querySelector('.cart-btn');
const orderBtns = document.querySelectorAll('.btn-primary, .order-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartCloseBtn = document.querySelector('.cart-close-btn');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCountBadge = document.querySelector('.cart-count-badge');

let cartCount = 0;
let cartItems = [];

function updateCartCount() {
    if (cartCount > 0) {
        cartCountBadge.style.display = 'inline-block';
        cartCountBadge.textContent = cartCount;
    } else {
        cartCountBadge.style.display = 'none';
    }
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    if (cartItems.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'cart-empty';
        emptyMsg.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyMsg);
        return;
    }
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        const nameSpan = document.createElement('span');
        nameSpan.className = 'cart-item-name';
        nameSpan.textContent = item.name;
        const qtySpan = document.createElement('span');
        qtySpan.className = 'cart-item-qty';
        qtySpan.textContent = `x${item.qty}`;
        itemDiv.appendChild(nameSpan);
        itemDiv.appendChild(qtySpan);
        cartItemsContainer.appendChild(itemDiv);
    });
}

function addItemToCart(name) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cartItems.push({ name: name, qty: 1 });
    }
    cartCount++;
    updateCartCount();
    renderCartItems();
}

orderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productName = btn.dataset.productName || 'Product';
        addItemToCart(productName);
        // Open cart sidebar on add
        cartSidebar.classList.add('open');
    });
});

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
});

cartCloseBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

updateCartCount();
renderCartItems();

// Testimonial rotation
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function rotateTestimonials() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = index === currentTestimonial ? '1' : '0.7';
        testimonial.style.transform = index === currentTestimonial ? 'scale(1.02)' : 'scale(1)';
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

// Start testimonial rotation
if (testimonials.length > 0) {
    setInterval(rotateTestimonials, 3000);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));