import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
/* 
// ============ MENU CATEGORIES ============
const menuCategories = [
  "Polévky",
  "Na chuť",
  "Kuřecí",
  "Vepřové",
  "Hovězí",
  "Speciality",
  "Játra",
  "Čerstvé ryby",
  "Masové směsi",
  "Zeleninové saláty",
  "Bezmasá jídla",
  "Přílohy",
  "Omáčky",
  "Moučníky",
  "Zmrzlinové poháry",
];

// ============ DRINK CATEGORIES ============
const drinkCategories = [
  "Pivo",
  "Nealko",
  "Víno",
  "Teplé nápoje",
  "Aperitivy",
  "Destiláty",
];

// ============ DAILY MENU DISH TYPES ============
const dailyMenuDishTypes = [
  { value: "SOUP", label: "Polévky" },
  { value: "GAME", label: "Zvěřina" },
  { value: "PORK", label: "Vepřové" },
  { value: "BEEF", label: "Hovězí" },
  { value: "POULTRY", label: "Drůbež" },
  { value: "FISH", label: "Ryby" },
  { value: "MEATLESS", label: "Bezmasá" },
  { value: "SWEET", label: "Sladká" },
  { value: "DESSERT", label: "Dezerty" },
  { value: "DRINK", label: "Nápoje" },
];

// ============ MENU ITEMS ============
const menuItems = [
  // Polévky
  {
    name: "Hovězí vývar s domácími játrovými knedlíčky a nudlemi",
    price: 59,
    category: "Polévky",
    weight: "0,33l",
    allergens: "1,3,7,9,13",
  },
  {
    name: "Další dle denní nabídky",
    price: 0,
    category: "Polévky",
    note: "Cena dle nabídky",
  },

  // Na chuť
  {
    name: "Topinka s masovou směsí, vajíčkem a sýrem",
    price: 199,
    category: "Na chuť",
    weight: "1ks",
  },
  {
    name: "Čerstvý smažený candát hranolky",
    price: 259,
    category: "Na chuť",
    weight: "200g",
  },
  {
    name: "Tatarský biftek, 6 ks topinek, česnek",
    price: 299,
    category: "Na chuť",
    weight: "200g",
  },

  // Kuřecí
  {
    name: "Grilovaný kuřecí steak s restovanými fazolkami se slaninou",
    price: 239,
    category: "Kuřecí",
    weight: "200g",
  },
  {
    name: "Grilovaná prsíčka plněná šunkou, sýrem, žampiony, kapií",
    price: 239,
    category: "Kuřecí",
    weight: "200g",
  },
  {
    name: "Smažená prsíčka plněná šunkou, sýrem, žampiony, kapií",
    price: 239,
    category: "Kuřecí",
    weight: "200g",
  },
  {
    name: "Grilovaná prsíčka zapečená hermelínem",
    price: 229,
    category: "Kuřecí",
    weight: "200g",
  },
  {
    name: "Čínské biftečky",
    price: 239,
    category: "Kuřecí",
    weight: "200g",
  },

  // Vepřové
  {
    name: "Farmářská panenka na grilu s vajíčkem",
    price: 259,
    category: "Vepřové",
    weight: "200g",
  },
  {
    name: "Grilovaná panenka plněná hermelínem",
    price: 259,
    category: "Vepřové",
    weight: "200g",
  },
  {
    name: "Grilované medailonky z panenky s anglickou slaninou",
    price: 259,
    category: "Vepřové",
    weight: "200g",
  },
  {
    name: "Grilovaný steak z krkovičky, restované fazolky se slaninou",
    price: 249,
    category: "Vepřové",
    weight: "200g",
  },
  {
    name: "Poctivý smažený řízek z krkovice",
    price: 239,
    category: "Vepřové",
    weight: "200g",
  },

  // Hovězí
  {
    name: "Grilovaný steak z pravé svíčkové, pepřová omáčka, vajíčko",
    price: 389,
    category: "Hovězí",
    weight: "200g",
  },
  {
    name: "Grilovaný steak z vysokého roštěnce, grilovaný chřest",
    price: 289,
    category: "Hovězí",
    weight: "200g",
  },
  {
    name: "Vídeňská rostěná s osmaženou cibulkou",
    price: 279,
    category: "Hovězí",
    weight: "200g",
  },

  // Speciality
  {
    name: "Šimáková kapsa",
    description:
      "Hovězí roštěná s kuřecím masem plněné šunkou, sýrem, žampiony, kapií, pórkem",
    price: 289,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Dračí tlama",
    description: "Hovězí svíčková plněná masovou směsí",
    price: 369,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Grilovaná panenka špikovaná hovězí svíčkovou",
    price: 359,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Radotínský talíř se třemi druhy masa",
    description: "Kuřecí prso, hovězí roštěná, vepřová kotleta",
    price: 269,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Radostínské roládky",
    description:
      "Plněné tři druhy masa šunkou, sýrem, žampiony, pórkem, paprikou",
    price: 279,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Moravská kotleta se žampiony",
    description: "Kotleta zapečená sýrem, šunkou a žampiony",
    price: 269,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Šamanovi prsa",
    description: "Grilované kuřecí prsa plněná banánem",
    price: 259,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Kuře kamokery",
    description:
      "Kuřecích a hovězí nudličky se žampiony kapií, oříšky a smetanovo vínovou omáčkou",
    price: 279,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Hovězí stroganov",
    description:
      "Hovězí svíčková s cibulí kyselou okurkou, kapií, žampiony, a smetanovou omáčkou",
    price: 369,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Čertovo kuře",
    description: "Kořeněná kuřecí prsa špikované hovězí roštěnou",
    price: 279,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Tajemství šéfkuchaře",
    description: "Obalovaný špíz, šunka, vepřové maso, žampiony, sýr",
    price: 269,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Malajské kuře",
    description: "Kuřecí prso špikované biftekem, sypané žampiony",
    price: 369,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Kuřecí pařížský řízek",
    price: 249,
    category: "Speciality",
    weight: "200g",
  },
  {
    name: "Lomská jednohubka",
    description:
      "Kuřeci prsa, vepřová kotleta, hovězí roštěná přoložená sýrem, banán",
    price: 259,
    category: "Speciality",
    weight: "200g",
  },

  // Játra
  {
    name: "Smažená vepřová játra",
    price: 199,
    category: "Játra",
    weight: "200g",
  },
  {
    name: "Grilovaná vepřová játra s cibulí a hořčicí",
    price: 199,
    category: "Játra",
    weight: "200g",
  },

  // Čerstvé ryby
  {
    name: "Grilovaný losos s vínovou omáčkou",
    price: 349,
    category: "Čerstvé ryby",
    weight: "200g",
  },
  {
    name: "Pomalu pečený pstruh na másle",
    price: 239,
    category: "Čerstvé ryby",
    weight: "200g",
  },
  {
    name: "Filet z candáta s variací listových salátu a rajčaty",
    price: 289,
    category: "Čerstvé ryby",
    weight: "200g",
  },

  // Masové směsi
  {
    name: "Svratecký guláš z hovězí roštěné",
    price: 249,
    category: "Masové směsi",
    weight: "200g",
  },
  {
    name: "Pikantní masová směs",
    price: 229,
    category: "Masové směsi",
    weight: "200g",
  },

  // Zeleninové saláty
  {
    name: "Směs listových salátů s rajčaty a grilovanou panenkou",
    price: 249,
    category: "Zeleninové saláty",
    weight: "200g",
  },
  {
    name: "Caesar salát s kuřecím masem, slanina, sýr Gran Moravia",
    price: 259,
    category: "Zeleninové saláty",
    weight: "200g",
  },
  {
    name: "Šopský salát s balkánským sýrem",
    price: 150,
    category: "Zeleninové saláty",
    weight: "300g",
  },
  {
    name: "Rajčatový salát s cibulkou",
    price: 80,
    category: "Zeleninové saláty",
    weight: "150g",
  },
  {
    name: "Okurkový salát",
    price: 80,
    category: "Zeleninové saláty",
    weight: "150g",
  },

  // Bezmasá jídla
  {
    name: "Smažený sýr (gouda)",
    price: 175,
    category: "Bezmasá jídla",
    weight: "150g",
    isVegetarian: true,
  },
  {
    name: "Smažený hermelín",
    price: 175,
    category: "Bezmasá jídla",
    weight: "100g",
    isVegetarian: true,
  },
  {
    name: "Smažené žampiony",
    price: 175,
    category: "Bezmasá jídla",
    weight: "200g",
    isVegetarian: true,
  },
  {
    name: "Smažené olomoucké tvarůžky",
    price: 175,
    category: "Bezmasá jídla",
    weight: "100g",
    isVegetarian: true,
  },
  {
    name: "Restovaná brokolice na másle",
    price: 175,
    category: "Bezmasá jídla",
    weight: "200g",
    isVegetarian: true,
  },

  // Přílohy
  {
    name: "Smažené hranolky",
    price: 49,
    category: "Přílohy",
    weight: "150g",
  },
  {
    name: "Smažené bramborové krokety",
    price: 49,
    category: "Přílohy",
    weight: "150g",
  },
  {
    name: "Americké brambory",
    price: 49,
    category: "Přílohy",
    weight: "150g",
  },
  {
    name: "Americké brambory s česnekem",
    price: 55,
    category: "Přílohy",
    weight: "150g",
  },
  {
    name: "Šťouchané brambory s cibulkou a slaninou",
    price: 55,
    category: "Přílohy",
    weight: "150g",
  },
  {
    name: "Domácí bramboráčky",
    price: 49,
    category: "Přílohy",
    weight: "3 ks",
  },
  {
    name: "Vařené brambory s máslem",
    price: 45,
    category: "Přílohy",
    weight: "150g",
  },
  {
    name: "Pečivo (chléb, rohlík)",
    price: 7,
    category: "Přílohy",
    weight: "1 ks",
  },
  {
    name: "Restované fazolky se slaninou",
    price: 55,
    category: "Přílohy",
    weight: "150g",
  },

  // Omáčky
  { name: "Kečup", price: 25, category: "Omáčky" },
  { name: "Tatarská omáčka", price: 25, category: "Omáčky" },
  { name: "Sweet chilli pálivá omáčka", price: 40, category: "Omáčky" },
  { name: "Pepřová omáčka s barevným pepřem", price: 35, category: "Omáčky" },

  // Moučníky
  {
    name: "Domácí palačinka se zmrzlinou a ovocem a čokoládou",
    price: 155,
    category: "Moučníky",
    weight: "1 ks",
  },
  {
    name: "Rakvička se zmrzlinou, šlehačkou, čokoládou",
    price: 55,
    category: "Moučníky",
    weight: "1 ks",
  },
  { name: "Medovník", price: 70, category: "Moučníky", weight: "1 ks" },

  // Zmrzlinové poháry
  {
    name: "Jožin z bažin",
    description: "ananas, kiwi, griotka",
    price: 120,
    category: "Zmrzlinové poháry",
  },
  { name: "Jahodový pohár", price: 99, category: "Zmrzlinové poháry" },
  { name: "Ananasový pohár", price: 99, category: "Zmrzlinové poháry" },
  { name: "Broskvový pohár", price: 99, category: "Zmrzlinové poháry" },
  { name: "Mandarinkový pohár", price: 99, category: "Zmrzlinové poháry" },
  { name: "Míchaný pohár", price: 99, category: "Zmrzlinové poháry" },
];

// ============ DRINKS ============
const drinkItems = [
  // Pivo
  { name: "Pilsner Urquell", category: "Pivo", size: "0,5l", price: 55 },
  { name: "Bernard", category: "Pivo", size: "0,5l", price: 55 },
  { name: "Radegast", category: "Pivo", size: "0,5l", price: 50 },

  // Nealko
  {
    name: "Kofola čepovaná",
    category: "Nealko",
    size: "0,5l",
    price: 40,
    description: "Pravá čepovaná Kofola",
  },
  { name: "Coca-Cola", category: "Nealko", size: "0,33l", price: 45 },
  { name: "Sprite", category: "Nealko", size: "0,33l", price: 45 },
  { name: "Fanta", category: "Nealko", size: "0,33l", price: 45 },
  { name: "Tonic", category: "Nealko", size: "0,33l", price: 45 },
  { name: "Džus pomerančový", category: "Nealko", size: "0,2l", price: 35 },
  { name: "Džus jablečný", category: "Nealko", size: "0,2l", price: 35 },
  { name: "Minerální voda", category: "Nealko", size: "0,33l", price: 30 },
  { name: "Minerální voda", category: "Nealko", size: "0,75l", price: 55 },

  // Víno
  { name: "Rulandské bílé", category: "Víno", size: "0,2l", price: 45 },
  { name: "Chardonnay", category: "Víno", size: "0,2l", price: 50 },
  { name: "Sauvignon", category: "Víno", size: "0,2l", price: 50 },
  { name: "Frankovka", category: "Víno", size: "0,2l", price: 45 },
  { name: "Modrý Portugal", category: "Víno", size: "0,2l", price: 50 },
  { name: "Cabernet Sauvignon", category: "Víno", size: "0,2l", price: 50 },
  { name: "Víno sudové bílé", category: "Víno", size: "0,2l", price: 35 },
  { name: "Víno sudové červené", category: "Víno", size: "0,2l", price: 35 },
  { name: "Víno sudové bílé", category: "Víno", size: "1l", price: 150 },
  { name: "Víno sudové červené", category: "Víno", size: "1l", price: 150 },

  // Teplé nápoje
  { name: "Turecká káva", category: "Teplé nápoje", price: 45 },
  { name: "Vídeňská káva", category: "Teplé nápoje", price: 55 },
  { name: "Instantní káva", category: "Teplé nápoje", price: 45 },
  { name: "Espresso", category: "Teplé nápoje", price: 55 },
  { name: "Cappuccino", category: "Teplé nápoje", price: 70 },
  { name: "Latté", category: "Teplé nápoje", price: 70 },
  { name: "Čaj", category: "Teplé nápoje", price: 40 },
  { name: "Grog", category: "Teplé nápoje", price: 55 },

  // Aperitivy
  { name: "Cinzano Bianco", category: "Aperitivy", size: "0,1l", price: 60 },
  { name: "Martini Dry", category: "Aperitivy", size: "0,1l", price: 60 },
  { name: "Metropol Bílý", category: "Aperitivy", size: "0,1l", price: 60 },
  { name: "Campari Bitte", category: "Aperitivy", size: "0,1l", price: 60 },

  // Destiláty
  { name: "Becherovka", category: "Destiláty", size: "0,04l", price: 45 },
  { name: "Fernet", category: "Destiláty", size: "0,04l", price: 45 },
  { name: "Slivovice", category: "Destiláty", size: "0,04l", price: 50 },
  { name: "Vodka", category: "Destiláty", size: "0,04l", price: 50 },
  { name: "Rum", category: "Destiláty", size: "0,04l", price: 50 },
  { name: "Whisky", category: "Destiláty", size: "0,04l", price: 60 },
  { name: "Gin", category: "Destiláty", size: "0,04l", price: 55 },
];

// ============ DAILY MENU DISHES ============
const dailyMenuDishes = [
  // Polévky (100+)
  { name: "Domácí dršťková", price: 65, type: "SOUP", sortOrder: 100 },
  { name: "Silný husí vývar s nudlemi a játrovými knedlíčky", price: 65, type: "SOUP", sortOrder: 101 },
  { name: "Hovězí vývar s masem a nudlemi", price: 59, type: "SOUP", sortOrder: 102 },
  { name: "Česnečka se sýrem a opečeným chlebem", price: 55, type: "SOUP", sortOrder: 103 },
  { name: "Gulášová polévka", price: 65, type: "SOUP", sortOrder: 104 },

  // Zvěřina (200+)
  { name: "Kančí gulášek s cibulkou, domácí houskové knedlíky", weight: "200g", price: 269, type: "GAME", sortOrder: 200 },
  { name: "Dančí plec na smetaně, domácí houskové knedlíky, brusinky", weight: "200g", price: 289, type: "GAME", sortOrder: 201 },
  { name: "Dančí grilovaný biftek na tymiánu, americké brambory", weight: "200g", price: 349, type: "GAME", sortOrder: 202 },
  { name: "Dančí medailonky na brusinkách, šťouchané brambory s cibulkou", weight: "200g", price: 299, type: "GAME", sortOrder: 203 },
  { name: "Jelení guláš s houskovým knedlíkem", weight: "200g", price: 279, type: "GAME", sortOrder: 204 },

  // Vepřové (300+)
  { name: "Domácí pečený prejt, kysané zelí, vařené brambory", weight: "200g", price: 229, type: "PORK", sortOrder: 300 },
  { name: "Řízečky z vepřové panenky, domácí bramborový salát", weight: "200g", price: 299, type: "PORK", sortOrder: 301 },
  { name: "Grilovaná panenka s chřestem, americké brambory, pepřová omáčka", weight: "200g", price: 299, type: "PORK", sortOrder: 302 },
  { name: "Vepřový řízek, bramborový salát", weight: "200g", price: 229, type: "PORK", sortOrder: 303 },
  { name: "Vepřová krkovice na grilu, hranolky", weight: "200g", price: 239, type: "PORK", sortOrder: 304 },
  { name: "Moravský vrabec, zelí, knedlík", weight: "200g", price: 219, type: "PORK", sortOrder: 305 },

  // Hovězí (400+)
  { name: "Vídeňská roštěná s osmaženou cibulkou, šťouchané brambory", weight: "200g", price: 299, type: "BEEF", sortOrder: 400 },
  { name: "Grilovaný hovězí biftek s vejcem, americké brambory", weight: "200g", price: 389, type: "BEEF", sortOrder: 401 },
  { name: "Hovězí guláš, houskový knedlík", weight: "200g", price: 229, type: "BEEF", sortOrder: 402 },
  { name: "Svíčková na smetaně, houskový knedlík", weight: "200g", price: 259, type: "BEEF", sortOrder: 403 },

  // Drůbež (500+)
  { name: "Kuřecí řízek, bramborová kaše", weight: "200g", price: 199, type: "POULTRY", sortOrder: 500 },
  { name: "Kuřecí steak s grilovanou zeleninou", weight: "200g", price: 229, type: "POULTRY", sortOrder: 501 },
  { name: "Kuřecí kapsa plněná sýrem a šunkou, hranolky", weight: "200g", price: 239, type: "POULTRY", sortOrder: 502 },

  // Ryby (600+)
  { name: "Smažený čerstvý kapr, domácí bramborový salát", weight: "200g", price: 269, type: "FISH", sortOrder: 600 },
  { name: "Čerstvý kapr na česneku, šťouchané brambory s cibulkou", weight: "200g", price: 269, type: "FISH", sortOrder: 601 },
  { name: "Čerstvý pstruh na másle, šťouchané brambory", weight: "250g", price: 285, type: "FISH", sortOrder: 602 },
  { name: "Smažené filé, domácí bramborový salát", weight: "200g", price: 249, type: "FISH", sortOrder: 603 },
  { name: "Candátí hranolky, domácí bramborový salát", weight: "200g", price: 299, type: "FISH", sortOrder: 604 },
  { name: "Směs listových salátů s grilovaným tuňákem", weight: "200g", price: 289, type: "FISH", sortOrder: 605 },

  // Bezmasá (700+)
  { name: "Smažený květák, vařené brambory", weight: "200g", price: 229, type: "MEATLESS", sortOrder: 700 },
  { name: "Smažený sýr, hranolky, tatarská omáčka", weight: "150g", price: 199, type: "MEATLESS", sortOrder: 701 },
  { name: "Grilovaná zelenina s bylinkovým máslem", weight: "250g", price: 189, type: "MEATLESS", sortOrder: 702 },

  // Sladká (800+)
  { name: "Domácí bramborové knedlíky plněné škvarkami, kysané zelí", weight: "200g", price: 199, type: "SWEET", sortOrder: 800 },
  { name: "Domácí kynuté knedlíky plněné borůvkami, máslo, kakao, cukr, čokoláda", weight: "200g", price: 199, type: "SWEET", sortOrder: 801 },
  { name: "Palačinky s tvarohem a rozinkami", weight: "200g", price: 169, type: "SWEET", sortOrder: 802 },
  { name: "Ovocné knedlíky s mákem a cukrem", weight: "200g", price: 179, type: "SWEET", sortOrder: 803 },

  // Dezerty (900+)
  { name: "Medovník se šlehačkou a čokoládou", price: 70, type: "DESSERT", sortOrder: 900 },
  { name: "Palačinka s ovocem a zmrzlinou", price: 89, type: "DESSERT", sortOrder: 901 },
  { name: "Domácí jablečný závin se šlehačkou", price: 65, type: "DESSERT", sortOrder: 902 },

  // Nápoje (1000+)
  { name: "Radotínský čajíček s rumem", price: 70, type: "DRINK", sortOrder: 1000 },
  { name: "Svařené víno", price: 60, type: "DRINK", sortOrder: 1001 },
  { name: "Horká čokoláda se šlehačkou", price: 65, type: "DRINK", sortOrder: 1002 },
]; */

// ============ OPENING HOURS ============
const openingHours = [
  { dayOfWeek: 0, dayName: "Pondělí", isOpen: false, openTime: null, closeTime: null, sortOrder: 0 },
  { dayOfWeek: 1, dayName: "Úterý", isOpen: true, openTime: "11:00", closeTime: "22:00", sortOrder: 1 },
  { dayOfWeek: 2, dayName: "Středa", isOpen: true, openTime: "11:00", closeTime: "22:00", sortOrder: 2 },
  { dayOfWeek: 3, dayName: "Čtvrtek", isOpen: true, openTime: "11:00", closeTime: "22:00", sortOrder: 3 },
  { dayOfWeek: 4, dayName: "Pátek", isOpen: true, openTime: "11:00", closeTime: "23:00", sortOrder: 4 },
  { dayOfWeek: 5, dayName: "Sobota", isOpen: true, openTime: "11:00", closeTime: "23:00", sortOrder: 5 },
  { dayOfWeek: 6, dayName: "Neděle", isOpen: true, openTime: "11:00", closeTime: "23:00", sortOrder: 6 },
];

// ============ MAIN FUNCTION ============
async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  console.log("🗑️ Clearing existing data...");
  /*   await prisma.dailyMenuToItem.deleteMany();
    await prisma.dailyMenu.deleteMany();
    await prisma.dailyMenuDish.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.drink.deleteMany();
    await prisma.menuCategory.deleteMany();
    await prisma.drinkCategory.deleteMany(); */
  /* 
    // Seed menu categories
    console.log("📂 Seeding menu categories...");
    for (let i = 0; i < menuCategories.length; i++) {
      await prisma.menuCategory.create({
        data: {
          name: menuCategories[i],
          sortOrder: i,
        },
      });
    }
  
    // Seed drink categories
    console.log("📂 Seeding drink categories...");
    for (let i = 0; i < drinkCategories.length; i++) {
      await prisma.drinkCategory.create({
        data: {
          name: drinkCategories[i],
          sortOrder: i,
        },
      });
    }
  
    // Seed menu items
    console.log("🍽️ Seeding menu items...");
    for (let i = 0; i < menuItems.length; i++) {
      await prisma.menuItem.create({
        data: {
          ...menuItems[i],
          sortOrder: i,
          isVegetarian: menuItems[i].isVegetarian || false,
        },
      });
    }
  
    // Seed drinks
    console.log("🍺 Seeding drinks...");
    for (let i = 0; i < drinkItems.length; i++) {
      await prisma.drink.create({
        data: {
          ...drinkItems[i],
          sortOrder: i,
        },
      });
    }
  
    // Seed daily menu dishes
    console.log("🍽️ Seeding daily menu dishes...");
    for (const dish of dailyMenuDishes) {
      await prisma.dailyMenuDish.create({
        data: dish,
      });
    }

    
  
    // Create default admin user (change password after first login!)
    console.log("👤 Creating admin user...");
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await prisma.user.upsert({
      where: { email: "admin@usimaka.cz" },
      update: {},
      create: {
        email: "admin@usimaka.cz",
        password: hashedPassword,
        name: "Administrátor",
        phone: "+420 123 456 789",
        isAdmin: true,
      },
    }); */

  console.log("🕐 Seeding opening hours...");
  await prisma.openingHours.deleteMany();
  for (const hours of openingHours) {
    await prisma.openingHours.create({ data: hours });
  }

  console.log("✅ Seeding completed!");
  console.log("");
  console.log("📊 Summary:");
  /*   console.log(`   - Menu categories: ${menuCategories.length}`);
    console.log(`   - Drink categories: ${drinkCategories.length}`);
    console.log(`   - Menu items: ${menuItems.length}`);
    console.log(`   - Drinks: ${drinkItems.length}`);
    console.log(`   - Daily menu dishes: ${dailyMenuDishes.length}`); */
  console.log("");
  console.log("🔐 Admin login: admin@usimaka.cz / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });