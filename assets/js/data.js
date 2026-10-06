/* ===================== DATA ===================== */

const ARTICLES = [
  // DISHES
  {id:1, name:"Chicken Mandi", nameAr:"مندي دجاج", cat:"Dishes", price:35, rating:4.8, badge:"Popular", desc:"Fragrant basmati rice slow-cooked with tender chicken in a traditional clay oven.", img:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80"},
  {id:2, name:"Lamb Mandi", nameAr:"مندي لحم", cat:"Dishes", price:55, rating:4.9, badge:"Signature", desc:"Succulent lamb shank smoked with aromatic spices, served over golden rice.", img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80"},
  {id:3, name:"Chicken Kabsa", nameAr:"كبسة دجاج", cat:"Dishes", price:32, rating:4.7, badge:"", desc:"The classic Saudi rice dish with spiced chicken and roasted nuts.", img:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80"},
  {id:4, name:"Lamb Kabsa", nameAr:"كبسة لحم", cat:"Dishes", price:52, rating:4.8, badge:"", desc:"Tender lamb simmered with cardamom, saffron and cinnamon over basmati.", img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80"},
  {id:5, name:"Shrimp Machboos", nameAr:"مجبوس روبيان", cat:"Dishes", price:48, rating:4.6, badge:"New", desc:"Gulf-style spiced rice with plump shrimp and fresh herbs.", img:"https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80"},
  {id:6, name:"Chicken Shawarma", nameAr:"شاورما دجاج", cat:"Dishes", price:15, rating:4.8, badge:"Popular", desc:"Marinated chicken shaved from the spit, wrapped with garlic sauce and pickles.", img:"https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80"},
  {id:7, name:"Beef Shawarma", nameAr:"شاورما لحم", cat:"Dishes", price:18, rating:4.7, badge:"", desc:"Slow-roasted beef with tahini, tomatoes and crispy onions in warm bread.", img:"https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80"},
  {id:8, name:"Bab Al Khair Burger", nameAr:"برجر باب الخير", cat:"Dishes", price:28, rating:4.9, badge:"Chef's pick", desc:"Our signature double beef burger with smoked cheese and secret sauce.", img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
  {id:9, name:"Mixed Grill Platter", nameAr:"مشاوي مشكلة", cat:"Dishes", price:65, rating:5.0, badge:"Popular", desc:"A feast of lamb kofta, chicken tikka, beef kebab and grilled vegetables.", img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80"},
  {id:10, name:"Grilled Sea Bass", nameAr:"سمك القاروص المشوي", cat:"Dishes", price:50, rating:4.7, badge:"", desc:"Whole sea bass grilled with lemon, garlic and Mediterranean herbs.", img:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80"},
  // JUICES
  {id:11, name:"Fresh Orange Juice", nameAr:"عصير برتقال", cat:"Juices", price:12, rating:4.9, badge:"Fresh", desc:"Hand-squeezed oranges, nothing added. Pure sunshine in a glass.", img:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"},
  {id:12, name:"Mango Juice", nameAr:"عصير مانجو", cat:"Juices", price:15, rating:4.8, badge:"Popular", desc:"Thick, sweet Alphonso mango blended to perfection.", img:"https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800&q=80"},
  {id:13, name:"Pomegranate Juice", nameAr:"عصير رمان", cat:"Juices", price:18, rating:4.7, badge:"", desc:"Antioxidant-rich ruby juice, freshly pressed.", img:"https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=800&q=80"},
  {id:14, name:"Avocado Juice", nameAr:"عصير أفوكادو", cat:"Juices", price:20, rating:4.9, badge:"Signature", desc:"Creamy avocado blended with honey and a touch of milk.", img:"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80"},
  {id:15, name:"Strawberry Juice", nameAr:"عصير فراولة", cat:"Juices", price:14, rating:4.6, badge:"", desc:"Sweet ripe strawberries, blended fresh daily.", img:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80"},
  {id:16, name:"Mint Lemonade", nameAr:"ليموناضة بالنعناع", cat:"Juices", price:10, rating:4.9, badge:"Popular", desc:"Refreshing lemonade with crushed mint and ice.", img:"https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80"},
  {id:17, name:"Carrot Juice", nameAr:"عصير جزر", cat:"Juices", price:11, rating:4.5, badge:"", desc:"Sweet and earthy, packed with vitamins.", img:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"},
  {id:18, name:"Apple Juice", nameAr:"عصير تفاح", cat:"Juices", price:13, rating:4.6, badge:"", desc:"Crisp apples cold-pressed into a golden glass.", img:"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80"},
  {id:19, name:"Tropical Cocktail", nameAr:"كوكتيل استوائي", cat:"Juices", price:22, rating:5.0, badge:"Chef's pick", desc:"A vibrant mix of mango, pineapple, passion fruit and orange.", img:"https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&q=80"},
  {id:20, name:"Watermelon Juice", nameAr:"عصير بطيخ", cat:"Juices", price:12, rating:4.8, badge:"Fresh", desc:"Chilled watermelon, perfect for hot days.", img:"https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80"},
  // STARTERS
  {id:21, name:"Hummus", nameAr:"حمص", cat:"Starters", price:15, rating:4.7, badge:"Veggie", desc:"Silky chickpea purée with tahini, olive oil and warm pita.", img:"https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=800&q=80"},
  {id:22, name:"Fattoush Salad", nameAr:"فتوش", cat:"Starters", price:18, rating:4.8, badge:"Veggie", desc:"Crisp greens, sumac, pomegranate molasses and toasted bread.", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"},
  {id:23, name:"Sambousek", nameAr:"سمبوسك", cat:"Starters", price:14, rating:4.6, badge:"Popular", desc:"Golden pastry pockets filled with spiced meat or cheese.", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"},
  // DESSERTS
  {id:24, name:"Kunafa", nameAr:"كنافة", cat:"Desserts", price:20, rating:4.9, badge:"Signature", desc:"Crispy shredded pastry with sweet cheese and syrup.", img:"https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&q=80"},
  {id:25, name:"Umm Ali", nameAr:"أم علي", cat:"Desserts", price:18, rating:4.7, badge:"", desc:"Warm bread pudding with milk, nuts and raisins.", img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80"},
  {id:26, name:"Crème Caramel", nameAr:"كريم كراميل", cat:"Desserts", price:15, rating:4.6, badge:"", desc:"Classic silky custard with golden caramel.", img:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80"},
];

const CATS = [
  {id:"All",      en:"All",      ar:"الكل"},
  {id:"Dishes",   en:"Dishes",   ar:"الأطباق"},
  {id:"Juices",   en:"Juices",   ar:"العصائر"},
  {id:"Starters", en:"Starters", ar:"المقبلات"},
  {id:"Desserts", en:"Desserts", ar:"الحلويات"},
];

const WHATSAPP = "971561314938";
