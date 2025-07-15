const products = [
  { id: 1, name: 'گوشی هوشمند سامسونگ', price: 18500000, image: 'https://via.placeholder.com/400x250?text=Smartphone', category: 'smartphone', description: 'گوشی هوشمند با صفحه نمایش AMOLED و عملکرد بالا', featured: true },
  { id: 2, name: 'هدفون بی‌سیم سونی', price: 3200000, image: 'https://via.placeholder.com/400x250?text=Headphones', category: 'headphones', description: 'هدفون بی‌سیم با کیفیت صدای عالی', featured: true },
  { id: 3, name: 'لپ‌تاپ ASUS', price: 28900000, image: 'https://via.placeholder.com/400x250?text=Laptop', category: 'laptop', description: 'لپ‌تاپ قدرتمند برای گیمینگ و کارهای حرفه‌ای', featured: false },
  { id: 4, name: 'ساعت هوشمند اپل', price: 13500000, image: 'https://via.placeholder.com/400x250?text=Smartwatch', category: 'smartwatch', description: 'ساعت هوشمند با امکانات پیشرفته', featured: true },
  { id: 5, name: 'تلویزیون ۴K ال‌جی', price: 23500000, image: 'https://via.placeholder.com/400x250?text=TV+4K', category: 'tv', description: 'تلویزیون ۴K با کیفیت تصویر فوق‌العاده', featured: false },
  { id: 6, name: 'دوربین دیجیتال کانن', price: 16500000, image: 'https://via.placeholder.com/400x250?text=Camera', category: 'camera', description: 'دوربین حرفه‌ای برای عکاسی و فیلم‌برداری', featured: false }
];

let cart = [];
let selectedProduct = null;
let isCartVisible = false;

function renderProducts(filteredProducts = products) {
  const productList = document.getElementById('product-list');
  const featuredList = document.getElementById('featured-list');
  productList.innerHTML = '';
  featuredList.innerHTML = '';

  filteredProducts.forEach((p, index) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.style.animationDelay = `${index * 0.2}s`;
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <div class="product-content">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString('fa-IR')} تومان</p>
        <div class="product-buttons">
          <button onclick="addToCart(${p.id})">افزودن به سبد خرید</button>
          <button onclick="showProductModal(${p.id})">مشاهده جزئیات</button>
        </div>
      </div>
    `;
    if (p.featured) {
      featuredList.appendChild(div.cloneNode(true));
    }
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  showNotification(`${product.name} به سبد خرید اضافه شد!`);
  if (!isCartVisible) toggleCart();
}

function addToCartFromModal() {
  if (selectedProduct) {
    cart.push(selectedProduct);
    updateCart();
    showNotification(`${selectedProduct.name} به سبد خرید اضافه شد!`);
    closeModal();
    if (!isCartVisible) toggleCart();
  }
}

function removeFromCart(id) {
  const product = cart[id];
  cart = cart.filter((_, index) => index !== id);
  updateCart();
  showNotification(`${product.name} از سبد خرید حذف شد.`);
}

function updateCart() {
  const count = cart.length;
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  document.getElementById('cart-count').innerText = count;
  document.getElementById('cart-total').innerText = total.toLocaleString('fa-IR');

  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach((p, index) => {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <span>${p.name}</span>
      <span>${p.price.toLocaleString('fa-IR')} تومان
        <button onclick="removeFromCart(${index})">حذف</button>
      </span>
    `;
    cartItems.appendChild(item);
  });
}

function showProductModal(id) {
  selectedProduct = products.find(p => p.id === id);
  const modal = document.getElementById('product-modal');
  document.getElementById('modal-image').src = selectedProduct.image;
  document.getElementById('modal-name').innerText = selectedProduct.name;
  document.getElementById('modal-price').innerText = `${selectedProduct.price.toLocaleString('fa-IR')} تومان`;
  document.getElementById('modal-description').innerText = selectedProduct.description;
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
  selectedProduct = null;
}

function filterProducts() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-filter').value;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}

function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email').value;
  if (email) {
    showNotification('با موفقیت در خبرنامه ثبت‌نام کردید!');
    document.getElementById('newsletter-email').value = '';
  } else {
    showNotification('لطفاً ایمیل خود را وارد کنید.');
  }
}

function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('active');
}

function toggleCart() {
  const cart = document.getElementById('cart');
  const cartToggle = document.getElementById('cart-toggle');
  isCartVisible = !isCartVisible;
  cart.classList.toggle('hidden', !isCartVisible);
  cartToggle.classList.toggle('hidden', isCartVisible);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '50%';
  notification.style.transform = 'translateX(50%)';
  notification.style.background = '#22c55e';
  notification.style.color = 'white';
  notification.style.padding = '1rem 2rem';
  notification.style.borderRadius = '0.5rem';
  notification.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
  notification.style.zIndex = '2000';
  notification.style.animation = 'fadeInOut 3s ease';
  notification.style.textAlign = 'right';
  notification.innerText = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Keyframe for notification
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateX(50%) translateY(-20px); }
    10% { opacity: 1; transform: translateX(50%) translateY(0); }
    90% { opacity: 1; transform: translateX(50%) translateY(0); }
    100% { opacity: 0; transform: translateX(50%) translateY(-20px); }
  }
`;
document.head.appendChild(styleSheet);

// Initialize
window.onload = () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1000);
  renderProducts();
};