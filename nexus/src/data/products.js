export const CATEGORIES = {
  men: {
    label: "Men",
    subcategories: ["Clothing", "Shoes", "Perfumes", "Accessories", "Sportswear", "Watches"],
  },
  women: {
    label: "Women",
    subcategories: ["Clothing", "Shoes", "Perfumes", "Accessories", "Handbags", "Jewelry", "Sportswear"],
  },
  kids: {
    label: "Kids",
    subcategories: ["Boys Clothing", "Girls Clothing", "Shoes", "Toys", "School Bags", "Accessories"],
  },
};

const makeProduct = (id, name, gender, sub, price, originalPrice, rating, reviews, img, sizes, desc, brand) => ({
  id, name, gender, subcategory: sub, price, originalPrice, rating, reviews,
  img, sizes, description: desc, brand,
  discount: Math.round((1 - price / originalPrice) * 100),
  tags: [gender, sub, brand],
});

export const PRODUCTS = [
  // MEN - CLOTHING
  makeProduct("m-c-1","Classic Oxford Shirt","men","Clothing",1299,2499,4.3,1240,"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",["S","M","L","XL","XXL"],"Premium cotton Oxford shirt with a timeless design.","Arrow"),
  makeProduct("m-c-2","Slim Fit Chinos","men","Clothing",1799,2999,4.5,890,"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",["28","30","32","34","36"],"Stretch slim fit chinos for all-day comfort.","H&M"),
  makeProduct("m-c-3","Graphic Tee","men","Clothing",599,999,4.1,2100,"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",["S","M","L","XL"],"Bold graphic tee in 100% soft cotton.","Bewakoof"),
  makeProduct("m-c-4","Formal Blazer","men","Clothing",3499,5999,4.6,450,"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",["S","M","L","XL"],"Tailored slim-fit formal blazer in premium polyester blend.","Raymond"),
  makeProduct("m-c-5","Denim Jacket","men","Clothing",2199,3499,4.4,760,"https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400",["S","M","L","XL"],"Classic blue denim jacket with button-up front.","Levi's"),
  makeProduct("m-c-6","Jogger Track Pants","men","Clothing",899,1499,4.2,1890,"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400",["S","M","L","XL","XXL"],"Comfortable cotton-blend joggers for everyday wear.","Puma"),

  // MEN - SHOES
  makeProduct("m-s-1","White Sneakers","men","Shoes",2499,3999,4.7,3200,"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",["6","7","8","9","10","11"],"Clean white leather sneakers that go with everything.","Nike"),
  makeProduct("m-s-2","Formal Derby Shoes","men","Shoes",3299,5499,4.5,670,"https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=400",["6","7","8","9","10"],"Genuine leather formal derby shoes.","Clarks"),
  makeProduct("m-s-3","Running Shoes","men","Shoes",4499,6999,4.8,4500,"https://images.unsplash.com/photo-1606107557195-0a29a2e64ecf?w=400",["7","8","9","10","11"],"Lightweight mesh running shoes with responsive cushioning.","Adidas"),
  makeProduct("m-s-4","Leather Loafers","men","Shoes",2799,4299,4.3,890,"https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400",["6","7","8","9","10"],"Premium leather loafers for casual and semi-formal occasions.","Mochi"),

  // MEN - PERFUMES
  makeProduct("m-p-1","Noir Intense EDP","men","Perfumes",2999,4499,4.6,1100,"https://images.unsplash.com/photo-1541643600914-78b084683702?w=400",["One Size"],"Dark and intense oriental woody fragrance.","Yves Saint Laurent"),
  makeProduct("m-p-2","Aqua Sport EDT","men","Perfumes",1899,2999,4.4,780,"https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400",["One Size"],"Fresh aquatic fragrance perfect for summer.","Giorgio Armani"),
  makeProduct("m-p-3","Oud Royal EDP","men","Perfumes",3499,5999,4.7,430,"https://images.unsplash.com/photo-1592945403244-b3faa2693bfd?w=400",["One Size"],"Rich oud and rose combination, long-lasting.","Ajmal"),

  // MEN - ACCESSORIES
  makeProduct("m-a-1","Leather Bifold Wallet","men","Accessories",899,1499,4.5,2300,"https://images.unsplash.com/photo-1627123424574-724758594913?w=400",["One Size"],"Slim genuine leather bifold wallet with RFID protection.","Tommy Hilfiger"),
  makeProduct("m-a-2","Canvas Backpack","men","Accessories",1799,2999,4.3,1560,"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",["One Size"],"Durable 25L canvas backpack with laptop compartment.","F Gear"),
  makeProduct("m-a-3","Polarized Sunglasses","men","Accessories",1299,2199,4.4,980,"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",["One Size"],"UV400 protection polarized aviator sunglasses.","Ray-Ban"),

  // MEN - WATCHES
  makeProduct("m-w-1","Chronograph Watch","men","Watches",5999,9999,4.7,2100,"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",["One Size"],"Stainless steel chronograph with sapphire crystal glass.","Fastrack"),
  makeProduct("m-w-2","Smart Watch","men","Watches",8999,12999,4.6,3400,"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",["One Size"],"Fitness smart watch with heart rate and SpO2 monitor.","boAt"),

  // WOMEN - CLOTHING
  makeProduct("w-c-1","Floral Wrap Dress","women","Clothing",1499,2499,4.6,2100,"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",["XS","S","M","L","XL"],"Flowy floral wrap dress perfect for any occasion.","Zara"),
  makeProduct("w-c-2","High Waist Jeans","women","Clothing",1799,2999,4.4,1890,"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",["26","28","30","32","34"],"Stretchable high-waist skinny jeans.","Pepe Jeans"),
  makeProduct("w-c-3","Printed Kurti","women","Clothing",799,1299,4.5,3400,"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400",["XS","S","M","L","XL","XXL"],"Beautiful block-printed cotton kurti.","Libas"),
  makeProduct("w-c-4","Blazer Suit Set","women","Clothing",3999,6499,4.7,670,"https://images.unsplash.com/photo-1548624313-0396a50dcbe9?w=400",["S","M","L","XL"],"Power dressing blazer and trouser co-ord set.","AND"),
  makeProduct("w-c-5","Summer Crop Top","women","Clothing",599,999,4.2,2890,"https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=400",["XS","S","M","L"],"Ribbed cotton crop top in multiple colors.","H&M"),
  makeProduct("w-c-6","Maxi Skirt","women","Clothing",1299,2199,4.3,1200,"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400",["XS","S","M","L","XL"],"Flowy satin maxi skirt with elastic waist.","Vero Moda"),

  // WOMEN - SHOES
  makeProduct("w-s-1","Block Heel Sandals","women","Shoes",1899,3199,4.5,1670,"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",["5","6","7","8","9"],"Comfortable block-heel sandals for all-day wear.","Steve Madden"),
  makeProduct("w-s-2","White Sneakers","women","Shoes",2299,3499,4.7,2890,"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",["5","6","7","8","9"],"Minimalist platform white sneakers.","Adidas"),
  makeProduct("w-s-3","Pointed Toe Heels","women","Shoes",2599,4199,4.4,890,"https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400",["5","6","7","8","9"],"Classic pointed-toe stiletto heels.","Aldo"),
  makeProduct("w-s-4","Flat Juttis","women","Shoes",899,1499,4.6,3200,"https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400",["5","6","7","8","9"],"Embroidered mojari juttis in beautiful designs.","Jaipur Kurti"),

  // WOMEN - PERFUMES
  makeProduct("w-p-1","La Vie Est Belle EDP","women","Perfumes",4999,7499,4.8,1890,"https://images.unsplash.com/photo-1588514912908-e7e05a3e1b0a?w=400",["One Size"],"Sweet iris, praline and vanilla fragrance.","Lancôme"),
  makeProduct("w-p-2","Rose Gold EDT","women","Perfumes",2499,3999,4.5,1230,"https://images.unsplash.com/photo-1547994770-a5f5f3ab13d4?w=400",["One Size"],"Delicate rose and musk fragrance for everyday wear.","Engage"),
  makeProduct("w-p-3","Floral Mist","women","Perfumes",1299,1999,4.3,780,"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",["One Size"],"Light and fresh floral mist with jasmine notes.","The Body Shop"),

  // WOMEN - HANDBAGS
  makeProduct("w-h-1","Tote Bag","women","Handbags",2999,4999,4.6,1560,"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",["One Size"],"Spacious vegan leather tote with inner pockets.","Lavie"),
  makeProduct("w-h-2","Sling Bag","women","Handbags",1599,2599,4.4,2100,"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",["One Size"],"Compact crossbody sling bag for daily use.","Caprese"),
  makeProduct("w-h-3","Clutch","women","Handbags",999,1699,4.2,890,"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400",["One Size"],"Elegant party clutch with gold chain strap.","Aldo"),

  // WOMEN - JEWELRY
  makeProduct("w-j-1","Gold Layered Necklace","women","Jewelry",1499,2499,4.7,2340,"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",["One Size"],"Dainty gold-plated layered necklace set.","Zaveri Pearls"),
  makeProduct("w-j-2","Pearl Earrings","women","Jewelry",799,1299,4.5,1780,"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",["One Size"],"Classic freshwater pearl drop earrings.","Accessorize"),

  // KIDS - BOYS CLOTHING
  makeProduct("k-bc-1","Superhero Tee","kids","Boys Clothing",399,699,4.5,3400,"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400",["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"],"Soft cotton superhero print tee for boys.","H&M Kids"),
  makeProduct("k-bc-2","Cargo Shorts","kids","Boys Clothing",599,999,4.3,1890,"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"],"Multi-pocket cargo shorts in durable cotton.","United Colors of Benetton"),
  makeProduct("k-bc-3","School Uniform Set","kids","Boys Clothing",899,1499,4.6,2100,"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"],"Crisp white shirt and navy trouser school set.","Van Heusen Junior"),

  // KIDS - GIRLS CLOTHING
  makeProduct("k-gc-1","Tutu Party Dress","kids","Girls Clothing",999,1699,4.7,2560,"https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400",["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"],"Sparkly tutu party dress with bow detail.","Hopscotch"),
  makeProduct("k-gc-2","Floral Lehenga","kids","Girls Clothing",1499,2499,4.6,1230,"https://images.unsplash.com/photo-1622122201714-77da0ca8e5d2?w=400",["4-5Y","6-7Y","8-9Y","10-11Y"],"Festive floral lehenga choli set.","Ethnicity"),
  makeProduct("k-gc-3","Casual Dungaree","kids","Girls Clothing",799,1299,4.4,1890,"https://images.unsplash.com/photo-1543087903-1ac2364a7bf4?w=400",["2-3Y","4-5Y","6-7Y","8-9Y"],"Cute denim dungaree with floral inner shirt.","Gini & Jony"),

  // KIDS - SHOES
  makeProduct("k-s-1","Light-Up Sneakers","kids","Shoes",899,1499,4.8,4200,"https://images.unsplash.com/photo-1562183241-b937e9102d1a?w=400",["C6","C7","C8","C9","C10","C11"],"Fun light-up sneakers kids love.","Sparx"),
  makeProduct("k-s-2","School Shoes","kids","Shoes",799,1299,4.5,2890,"https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=400",["C6","C7","C8","C9","C10","C11"],"Durable black school shoes with velcro strap.","Bata"),

  // KIDS - TOYS
  makeProduct("k-t-1","LEGO Classic Set","kids","Toys",2499,3499,4.9,5600,"https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",["One Size"],"750-piece classic LEGO building set.","LEGO"),
  makeProduct("k-t-2","Remote Control Car","kids","Toys",1499,2499,4.6,3200,"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",["One Size"],"High-speed RC car with 2.4GHz remote.","Maisto"),

  // KIDS - SCHOOL BAGS
  makeProduct("k-b-1","Cartoon Backpack","kids","School Bags",699,1199,4.5,2800,"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",["One Size"],"Lightweight cartoon print school backpack with water bottle pocket.","Wildcraft"),
];

export const getProductsByGenderAndSub = (gender, sub) =>
  PRODUCTS.filter(p => p.gender === gender && (!sub || p.subcategory === sub));

export const getProductById = (id) => PRODUCTS.find(p => p.id === id);

export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q) ||
    p.gender.toLowerCase().includes(q)
  );
};