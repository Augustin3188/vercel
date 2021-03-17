// Truy cập các thành phần
let productsEle = document.querySelector('.products');
let countEle = document.querySelector('.count');
let subTotalEle = document.querySelector('.subtotal span');
let vatEle = document.querySelector('.vat span');
let totalEle = document.querySelector('.total span');
let quantityEle = document.querySelector('input .quantity');
let inputPromoCode = document.querySelector('#promo-code');
let promoButton = document.querySelector('.promotion button');
let discount = document.querySelector('.discount');
let discountEle = document.querySelector('.discount span')

// Mock up danh sách sản phẩm  
let products = [
    {
        name: 'Áo thun unisex tay lỡ form rộng',
        id: getID(),
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, velit.',
        price: 350000,
        count: 2,
        image: 'https://cf.shopee.vn/file/83117dd2556f75c499c4f126eb42ccdf',
    },

    {
        name: 'Áo Phông Ngắn Tay Unisex Mickey',
        id: getID(),
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, velit.',
        price: 250000,
        count: 1,
        image: 'https://cf.shopee.vn/file/d2e0fb9d3e519c424ba86e0825d473d2_tn',
    },

    {
        name: 'Áo thun tay lỡ form rộng Hi Khủng Long',
        id: getID(),
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, velit.',
        price: 200000,
        count: 3,
        image: 'https://cf.shopee.vn/file/49eddea96e7dfedb902a7fdc25a9d36d',
    },

]

// Mockup mã giảm giá 
let promotionCode = {
    A: 10,
    B: 20,
    C: 30,
    D: 40,
}

// Tạo ID 
function getID() {
    return Math.floor(Math.random() * 10000)
}

// Hiển thị sản phẩm ra ngoài giao diện
function renderProducts(arr) {
    productsEle.innerHTML = '';
    // Cập nhật số lượng sản phẩm  
    countEle.innerText = `${updateTotalProducts(arr)} items in the bag`

    // Cập nhật tổng số tiền
    updateTotalMoney(arr)

    // Kiểm tra số lượng sản phẩm có hay không
    if (arr.length == 0) {
        document.querySelector('.option-container').classList.add('hide');
        productsEle.insertAdjacentHTML('afterbegin', '<li>Không có sản phẩm nào trong giỏ hàng!</li>');
        return
    }

    // Hiển thị sản phẩm

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        productsEle.innerHTML += `
        <li class="row">
            <div class="col left">
                <div class="thumbnail">
                    <a href="#">
                        <img src="${p.image}" alt="${p.name}">
                </a>
            </div>
                    <div class="detail">
                        <div class="name"><a href="#">${p.name}</a></div>
                        <div class="description">
                            ${p.description}
                        </div>
                        <div class="price">${convertMoney(p.price)}</div>
                    </div>
                </div>

                <div class="col right">
                    <div class="quantity">
                        <input  type="number"
                                class="quantity" 
                                step="1" 
                                value="${p.count}"
                                onchange="updateCountProduct(${p.id}, event)"
                        >
                    </div>

                    <div class="remove" onclick ='deleteProduct(${p.id})'>
                        <span class="close"><i class="fa fa-times" aria-hidden="true"></i></span>
                    </div>
                </div>
        </li>
        `
    }
}

// Cập nhật số lượng sản phẩm
function updateTotalProducts(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].count
    }
    return sum
}

// Cập nhật tổng số tiền
function updateTotalMoney(arr) {
    let subtotal = 0;
    let discountMoney = 0;;

    // Tổng tiền đơn hàng
    for (let i = 0; i < arr.length; i++) {
        subtotal += (arr[i].count * arr[i].price);
    }

    // Tính tiền giảm giá
    let data = checkPromotionCode();
    if (data.status) {
        discountMoney = (subtotal * (data.value / 100));
        discount.classList.remove('hide');
    }

    else {
        discount.classList.add('hide');
    }

    // Hiển thị tiền lên giao diện
    subTotalEle.innerText = convertMoney(subtotal);
    vatEle.innerText = convertMoney(subtotal * 0.1);
    discountEle.innerText = convertMoney(discountMoney);
    totalEle.innerText = convertMoney(Math.floor(subtotal * 1.1) - discountMoney);
}

function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// Xóa sản phẩm
function deleteProduct(id) {
    for (let i = 0; i < products.length; i++) {
        if (id == products[i].id) {
            products.splice(i, 1);
        }
    }
    renderProducts(products)
}

// Cập nhật số lượng sản phẩm trong input
function updateCountProduct(id, e) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].count = Number(e.target.value);
        }
    }
    renderProducts(products)
}

// Kiểm tra mã giảm giá hợp lệ hay không
function checkPromotionCode() {
    let code = inputPromoCode.value;
    if (promotionCode[code]) {
        return { status: true, value: promotionCode[code] };
    }
    else {
        return { status: false, value: 0 };
    }
}

promoButton.addEventListener('click', function () {
    updateTotalMoney(products)
});
window.onload = renderProducts(products)