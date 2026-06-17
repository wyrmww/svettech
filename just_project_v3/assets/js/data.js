// assets/js/data.js
const products = [
    { 
        id: 1, 
        name: "iPhone 16 Pro", 
        category: "smartphone", 
        price: 124990, 
        oldPrice: 139990, 
        rating: 4.8, 
        reviews: 124, 
        image: "https://images.biggeek.ru/1/originals/1bd1/28463-951iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium@2x.jpg", 
        inStock: true,
        brand: "Apple",
        specs: {
            screen: "6.3\" Super Retina XDR OLED",
            processor: "A18 Pro",
            ram: "8 ГБ",
            storage: "256 ГБ",
            camera: "48 МП + 48 МП + 12 МП",
            battery: "3582 мАч, до 27 часов"
        }
    },
    { 
        id: 2, 
        name: "Samsung Galaxy S25 Ultra", 
        category: "smartphone", 
        price: 114990, 
        oldPrice: null, 
        rating: 4.7, 
        reviews: 89, 
        image: "https://divizion.com/image/cache/catalog/samsung/Galaxy%20S25%20Ultra/GalaxyS25Ultra5GTitaniumGray-230x230.jpg", 
        inStock: true,
        brand: "Samsung",
        specs: {
            screen: "6.8\" Dynamic AMOLED 2X",
            processor: "Snapdragon 8 Gen 4",
            ram: "16 ГБ",
            storage: "512 ГБ",
            camera: "200 МП + 50 МП + 10 МП",
            battery: "5000 мАч"
        }
    },
    { 
        id: 3, 
        name: "MacBook Air M3", 
        category: "laptop", 
        price: 109990, 
        oldPrice: 119990, 
        rating: 4.9, 
        reviews: 203, 
        image: "https://ir-5.ozone.ru/s3/multimedia-1-6/wc1000/9290655582.jpg", 
        inStock: true,
        brand: "Apple",
        specs: {
            screen: "13.6\" Liquid Retina",
            processor: "Apple M3",
            ram: "16 ГБ",
            storage: "512 ГБ SSD",
            battery: "До 18 часов"
        }
    },
    { 
        id: 4, 
        name: "Sony WH-1000XM5", 
        category: "headphones", 
        price: 32990, 
        oldPrice: 39990, 
        rating: 4.6, 
        reviews: 156, 
        image: "https://ir-5.ozone.ru/s3/multimedia-1-4/wc1000/7569900580.jpg", 
        inStock: true,
        brand: "Sony",
        specs: {
            type: "Накладные",
            noiseCancel: "Активное (лучшее в классе)",
            battery: "30 часов с ANC",
            weight: "250 г"
        }
    },
    { 
        id: 5, 
        name: "Apple Watch Ultra 2", 
        category: "watch", 
        price: 74990, 
        oldPrice: null, 
        rating: 4.8, 
        reviews: 67, 
        image: "https://ir-5.ozone.ru/s3/multimedia-1-q/wc1000/8040166478.jpg", 
        inStock: false,
        brand: "Apple",
        specs: {
            screen: "1.93\" Always-On Retina",
            processor: "S9 SiP",
            battery: "До 36 часов",
            protection: "IP6X + WR100"
        }
    },
    { 
        id: 6, 
        name: "Dell XPS 14", 
        category: "laptop", 
        price: 149990, 
        oldPrice: 169990, 
        rating: 4.5, 
        reviews: 44, 
        image: "https://ir-5.ozone.ru/s3/multimedia-c/wc1000/6056686548.jpg", 
        inStock: true,
        brand: "Dell",
        specs: {
            screen: "14.5\" OLED 3.2K",
            processor: "Intel Core Ultra 7",
            ram: "32 ГБ",
            storage: "1 ТБ SSD"
        }
    },
    { 
        id: 7, 
        name: "AirPods Max", 
        category: "headphones", 
        price: 45990, 
        oldPrice: 54990, 
        rating: 4.4, 
        reviews: 98, 
        image: "https://ir-5.ozone.ru/s3/multimedia-1-r/wc1000/8666312715.jpg", 
        inStock: true,
        brand: "Apple",
        specs: {
            type: "Накладные",
            noiseCancel: "Активное",
            battery: "20 часов",
            weight: "385 г"
        }
    },
    { 
        id: 8, 
        name: "Samsung Galaxy Watch 7", 
        category: "watch", 
        price: 28990, 
        oldPrice: 32990, 
        rating: 4.6, 
        reviews: 52, 
        image: "https://ir-5.ozone.ru/s3/multimedia-1-1/wc1000/9080793037.jpg", 
        inStock: true,
        brand: "Samsung",
        specs: {
            screen: "1.3\" Super AMOLED",
            processor: "Exynos W930",
            battery: "До 40 часов",
            protection: "IP68 + 5ATM"
        }
    },
    { 
        id: 9, 
        name: "Lenovo Legion Pro 7", 
        category: "laptop", 
        price: 189990, 
        oldPrice: 209990, 
        rating: 4.7, 
        reviews: 31, 
        image: "https://ir-5.ozone.ru/s3/multimedia-1-b/wc1000/9194480723.jpg", 
        inStock: true,
        brand: "Lenovo",
        specs: {
            screen: "16\" IPS 240Hz",
            processor: "Intel Core i9",
            ram: "32 ГБ",
            storage: "1 ТБ SSD",
            gpu: "RTX 4070"
        }
    },
    { 
        id: 10, 
        name: "Sony WF-1000XM5", 
        category: "headphones", 
        price: 24990, 
        oldPrice: 29990, 
        rating: 4.5, 
        reviews: 78, 
        image: "https://ir-5.ozone.ru/s3/multimedia-1-1/wc1000/9571758985.jpg", 
        inStock: true,
        brand: "Sony",
        specs: {
            type: "Внутриканальные",
            noiseCancel: "Активное",
            battery: "8 ч + 24 ч с кейсом"
        }
    },

    // Остальные товары
    { id: 11, name: "iPhone 16", category: "smartphone", price: 89990, oldPrice: 99990, rating: 4.6, reviews: 87, image: "https://ir-5.ozone.ru/s3/multimedia-1-5/wc1000/7340368361.jpg", inStock: true, brand: "Apple", specs: { screen: "6.1\" Super Retina XDR", processor: "A18", ram: "8 ГБ", storage: "128 ГБ", camera: "48 МП" } },
    { id: 12, name: "Xiaomi 14 Pro", category: "smartphone", price: 64990, oldPrice: 74990, rating: 4.4, reviews: 65, image: "https://ir-5.ozone.ru/s3/multimedia-1-e/wc1000/7561224230.jpg", inStock: true, brand: "Xiaomi", specs: { screen: "6.73\" LTPO AMOLED", processor: "Snapdragon 8 Gen 3", ram: "16 ГБ", storage: "512 ГБ" } },
    { id: 13, name: "MacBook Pro 16 M3", category: "laptop", price: 249990, oldPrice: 269990, rating: 4.9, reviews: 112, image: "https://ir-5.ozone.ru/s3/multimedia-1-4/wc1000/9290502580.jpg", inStock: true, brand: "Apple", specs: { screen: "16.2\" Liquid Retina XDR", processor: "M3 Pro", ram: "18 ГБ", storage: "512 ГБ" } },
    { id: 14, name: "Asus ROG Strix", category: "laptop", price: 179990, oldPrice: 199990, rating: 4.7, reviews: 48, image: "https://ir-5.ozone.ru/s3/multimedia-1-c/wc1000/8566799088.jpg", inStock: true, brand: "Asus", specs: { screen: "16\" QHD 240Hz", processor: "AMD Ryzen 9", ram: "32 ГБ", gpu: "RTX 4070" } },
    { id: 15, name: "Bose QC Ultra", category: "headphones", price: 42990, oldPrice: 49990, rating: 4.8, reviews: 134, image: "https://ir-5.ozone.ru/s3/multimedia-1-4/wc1000/7506194152.jpg", inStock: true, brand: "Bose", specs: { type: "Накладные", noiseCancel: "Immersive Audio", battery: "24 часа" } },
    { id: 16, name: "Samsung Galaxy Buds 3 Pro", category: "headphones", price: 18990, oldPrice: 22990, rating: 4.3, reviews: 92, image: "https://ir-5.ozone.ru/s3/multimedia-1-r/wc1000/9104404383.jpg", inStock: true, brand: "Samsung", specs: { type: "Внутриканальные", noiseCancel: "Активное", battery: "7 ч + 30 ч" } },
    { id: 17, name: "Apple Watch Series 10", category: "watch", price: 44990, oldPrice: 49990, rating: 4.7, reviews: 156, image: "https://ir-5.ozone.ru/s3/multimedia-1-x/wc1000/10351956993.jpg", inStock: true, brand: "Apple", specs: { screen: "1.9\" Retina", battery: "До 18 часов" } },
    { id: 18, name: "Garmin Fenix 8", category: "watch", price: 89990, oldPrice: null, rating: 4.8, reviews: 41, image: "https://ir-5.ozone.ru/s3/multimedia-1-e/wc1000/7316501810.jpg", inStock: true, brand: "Garmin", specs: { screen: "1.4\" AMOLED", battery: "До 29 дней", protection: "10 ATM" } },
    { id: 19, name: "Huawei MatePad Pro", category: "laptop", price: 79990, oldPrice: 89990, rating: 4.5, reviews: 67, image: "https://ir-5.ozone.ru/s3/multimedia-1-p/wc1000/9060000829.jpg", inStock: true, brand: "Huawei", specs: { screen: "12.2\" OLED", processor: "Kirin 9000S", ram: "16 ГБ" } },
    { id: 20, name: "Sony LinkBuds S", category: "headphones", price: 22990, oldPrice: 27990, rating: 4.4, reviews: 73, image: "https://ir-5.ozone.ru/s3/multimedia-1-3/wc1000/7572115263.jpg", inStock: true, brand: "Sony", specs: { type: "Внутриканальные", noiseCancel: "Да", battery: "20 часов" } },

    { id: 21, name: "Google Pixel 9 Pro", category: "smartphone", price: 99990, oldPrice: 109990, rating: 4.6, reviews: 54, image: "https://ir-5.ozone.ru/s3/multimedia-1-e/wc1000/8284358102.jpg", inStock: true, brand: "Google", specs: { screen: "6.3\" LTPO OLED", processor: "Tensor G4", ram: "16 ГБ" } },
    { id: 22, name: "OnePlus 13", category: "smartphone", price: 74990, oldPrice: 84990, rating: 4.5, reviews: 38, image: "https://ir-5.ozone.ru/s3/multimedia-1-n/wc1000/7572140843.jpg", inStock: true, brand: "OnePlus", specs: { screen: "6.82\" AMOLED", processor: "Snapdragon 8 Elite", ram: "16 ГБ" } },
    { id: 23, name: "Dell Alienware m18", category: "laptop", price: 229990, oldPrice: 249990, rating: 4.8, reviews: 29, image: "https://ir-5.ozone.ru/s3/multimedia-y/wc1000/6265586974.jpg", inStock: true, brand: "Dell", specs: { screen: "18\" QHD+", processor: "Intel Core i9", gpu: "RTX 4090" } },
    { id: 24, name: "JBL Tour One M2", category: "headphones", price: 18990, oldPrice: 22990, rating: 4.3, reviews: 81, image: "https://ir-5.ozone.ru/s3/multimedia-1-z/wc1000/7349594723.jpg", inStock: true, brand: "JBL", specs: { type: "Накладные", noiseCancel: "Да", battery: "50 часов" } },
    { id: 25, name: "Huawei Watch GT 5", category: "watch", price: 24990, oldPrice: 29990, rating: 4.6, reviews: 45, image: "https://ir-5.ozone.ru/s3/multimedia-1-t/wc1000/7135656545.jpg", inStock: true, brand: "Huawei", specs: { screen: "1.43\" AMOLED", battery: "До 14 дней" } },
    { id: 26, name: "Samsung Galaxy Tab S10", category: "laptop", price: 89990, oldPrice: 99990, rating: 4.7, reviews: 33, image: "https://ir-5.ozone.ru/s3/multimedia-1-w/wc1000/7940015024.jpg", inStock: true, brand: "Samsung", specs: { screen: "11\" Dynamic AMOLED", processor: "Snapdragon", storage: "128 ГБ" } },
    { id: 27, name: "Nothing Ear (a)", category: "headphones", price: 12990, oldPrice: 15990, rating: 4.4, reviews: 67, image: "https://ir-5.ozone.ru/s3/multimedia-1-f/wc1000/10230941355.jpg", inStock: true, brand: "Nothing", specs: { type: "Внутриканальные", noiseCancel: "Да", battery: "42.5 часа" } },
    { id: 28, name: "iPhone 15 Pro", category: "smartphone", price: 94990, oldPrice: 109990, rating: 4.7, reviews: 203, image: "https://ir-5.ozone.ru/s3/multimedia-1-o/wc1000/7238610096.jpg", inStock: true, brand: "Apple", specs: { screen: "6.1\" Super Retina XDR", processor: "A17 Pro", ram: "8 ГБ" } },
    { id: 29, name: "MacBook Pro 14 M3", category: "laptop", price: 189990, oldPrice: 209990, rating: 4.9, reviews: 87, image: "https://ir-5.ozone.ru/s3/multimedia-1-s/wc1000/9291284740.jpg", inStock: true, brand: "Apple", specs: { screen: "14.2\" Liquid Retina XDR", processor: "M3", ram: "16 ГБ" } },
    { id: 30, name: "Sony WH-1000XM4", category: "headphones", price: 25990, oldPrice: 32990, rating: 4.8, reviews: 312, image: "https://ir-5.ozone.ru/s3/multimedia-1-3/wc1000/7125947499.jpg", inStock: true, brand: "Sony", specs: { type: "Накладные", noiseCancel: "Активное", battery: "30 часов" } }
];

export default products;