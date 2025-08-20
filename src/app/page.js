// import components
import Pizza from "./components/Pizza";
import Drink from "./components/Drink/Drink";

import Banner from "./components/Banner";
import CartMobile from "./components/CartMobile";
import CartMobileIcon from "./components/CartMobileIcon";
import CartDesktop from "./components/CartDesktop";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// const pizzas = [
//   {
//     id: 1,
//     name: "Capricciosa",
//     description:
//       "A timeless Italian classic topped with a perfect blend of artichokes, olives, mushrooms, and ham for a hearty and flavorful experience.",
//     image: "/capricciosa.webp",
//     priceSm: 9.99,
//     priceMd: 10.99,
//     priceLg: 11.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Cheesy",
//     description:
//       "A cheese lover’s dream! Overflowing with mozzarella, cheddar, and a hint of parmesan for the ultimate creamy indulgence.",
//     image: "/cheesy.webp",
//     priceSm: 10.99,
//     priceMd: 11.99,
//     priceLg: 12.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 3,
//     name: "Hawaii",
//     description:
//       "A tropical treat featuring the perfect balance of sweet pineapple and savory ham, all on a cheesy base.",
//     image: "/hawaii.webp",
//     priceSm: 10.99,
//     priceMd: 11.99,
//     priceLg: 12.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 4,
//     name: "Italian",
//     description:
//       "A celebration of Italian flavors with fresh basil, mozzarella, and a drizzle of olive oil on a thin crust.",
//     image: "/italian.webp",
//     priceSm: 11.99,
//     priceMd: 12.99,
//     priceLg: 13.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 5,
//     name: "Margherita",
//     description:
//       "A simple yet elegant combination of fresh tomatoes, mozzarella, and fragrant basil leaves for a true Italian classic.",
//     image: "/margherita.webp",
//     priceSm: 9.99,
//     priceMd: 10.99,
//     priceLg: 11.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 6,
//     name: "Pepperoni",
//     description:
//       "A fan favorite with a generous layer of zesty pepperoni slices atop a bed of melted cheese and tangy tomato sauce.",
//     image: "/pepperoni.webp",
//     priceSm: 10.99,
//     priceMd: 11.99,
//     priceLg: 12.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 7,
//     name: "Quattro Formaggi",
//     description:
//       "A luxurious blend of four cheeses—mozzarella, gorgonzola, parmesan, and fontina—for a rich and creamy delight.",
//     image: "/quattro-formaggi.webp",
//     priceSm: 12.99,
//     priceMd: 13.99,
//     priceLg: 14.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 8,
//     name: "Quattro Stagioni",
//     description:
//       "A unique pizza divided into four sections, each representing a season with artichokes, ham, mushrooms, and olives.",
//     image: "/quattro-stagioni.webp",
//     priceSm: 11.99,
//     priceMd: 12.99,
//     priceLg: 13.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 9,
//     name: "Tonno",
//     description:
//       "A savory seafood sensation with tuna, onions, and a sprinkle of fresh herbs for a unique and flavorful pizza.",
//     image: "/tonno.webp",
//     priceSm: 10.99,
//     priceMd: 11.99,
//     priceLg: 12.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
//   {
//     id: 10,
//     name: "Vegetarian",
//     description:
//       "A garden-fresh delight with bell peppers, mushrooms, olives, and cherry tomatoes for a wholesome experience.",
//     image: "/vegetarian.webp",
//     priceSm: 9.99,
//     priceMd: 10.99,
//     priceLg: 11.99,
//     toppings: [
//       { image: "/cherry.png", name: "cherry tomatoes", price: 2 },
//       { image: "/corn.png", name: "corn", price: 2 },
//       { image: "/fresh-tomatoes.png", name: "fresh tomatoes", price: 2 },
//       { image: "/jalapeno.png", name: "jalapeno", price: 2 },
//       { image: "/parmesan.png", name: "parmesan", price: 2 },
//     ],
//   },
// ];

//Drinks
// const drinks = [
//   {
//     id: 201,
//     name: "Pepsi",
//     // description:
//     //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae dolorum enim eveniet. Mollitia laudantium, sunt blanditiis ratione quam delectus.",
//     image: "/drinks/pepsi.png",
//     imageMd: "/drinks/pepsi1L.webp",
//     imageLg: "/drinks/pepsi2.5L.webp",
//     priceSm: 2.5,
//     priceMd: 7.0,
//     priceLg: 11.0,
//   },
//   {
//     id: 202,
//     name: "Pepsi diet",
//     // description:
//     //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae dolorum enim eveniet. Mollitia laudantium, sunt blanditiis ratione quam delectus.",
//     image: "/drinks/PEPSIDI.png",
//     priceSm: 2.5,
//     priceMd: 7.0,
//     priceLg: 11.0,
//   },
//   {
//     id: 203,
//     name: "Mirinda",
//     // description:
//     //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae dolorum enim eveniet. Mollitia laudantium, sunt blanditiis ratione quam delectus.",
//     image: "/drinks/MIRO.png",
//     imageMd: "/drinks/mirinda1L.jpg",
//     imageLg: "/drinks/mirinda2.5.jpg",
//     priceSm: 2.5,
//     priceMd: 7.0,
//     priceLg: 11.0,
//   },
//   {
//     id: 204,
//     name: "7UP",
//     // description:
//     //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae dolorum enim eveniet. Mollitia laudantium, sunt blanditiis ratione quam delectus.",
//     image: "/drinks/7UP.png",
//     imageMd: "/drinks/7up1L.webp",
//     imageLg: "/drinks/7up2.5L.webp",
//     priceSm: 2.5,
//     priceMd: 7.0,
//     priceLg: 11.0,
//   },

//   {
//     id: 205,
//     name: "7UP Diet",
//     // description:
//     //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae dolorum enim eveniet. Mollitia laudantium, sunt blanditiis ratione quam delectus.",
//     image: "/drinks/DIET7UP.png",
//     priceSm: 2.5,
//     priceMd: 7.0,
//     priceLg: 11.0,
//   },
//   {
//     id: 206,
//     name: "MIRC",
//     // description:
//     //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae dolorum enim eveniet. Mollitia laudantium, sunt blanditiis ratione quam delectus.",
//     image: "/drinks/MIRC.png",
//     priceSm: 2.5,
//     priceMd: 7.0,
//     priceLg: 11.0,
//   },
//   {
//     id: 207,
//     name: "Water",
//     // description:
//     //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae dolorum enim eveniet. Mollitia laudantium, sunt blanditiis ratione quam delectus.",
//     image: "/drinks/BCWA.png",
//     priceSm: 2.5,
//     priceMd: 7.0,
//     priceLg: 11.0,
//   },
// ];

const pizzas = [
  {
    id: 1,
    name: "كابريتشوزا",
    description:
      "كلاسيكية إيطالية خالدة مزينة بمزيج مثالي من الخرشوف والزيتون والفطر ولحم الخنزير لتجربة غنية ولذيذة.",
    image: "/capricciosa.webp",
    priceSm: 9.99,
    priceMd: 10.99,
    priceLg: 11.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 2,
    name: "تشيزّي",
    description:
      "حلم عشاق الجبن! مليئة بالموزاريلا والشيدر ولمسة من البارميزان لتجربة كريمية فاخرة.",
    image: "/cheesy.webp",
    priceSm: 10.99,
    priceMd: 11.99,
    priceLg: 12.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 3,
    name: "هاواي",
    description:
      "لمسة استوائية تجمع بين التوازن المثالي بين الأناناس الحلو ولحم الخنزير اللذيذ فوق قاعدة جبنية.",
    image: "/hawaii.webp",
    priceSm: 10.99,
    priceMd: 11.99,
    priceLg: 12.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 4,
    name: "إيطاليان",
    description:
      "احتفال بالنكهات الإيطالية مع الريحان الطازج والموزاريلا ورشة من زيت الزيتون على عجينة رفيعة.",
    image: "/italian.webp",
    priceSm: 11.99,
    priceMd: 12.99,
    priceLg: 13.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 5,
    name: "مارغريتا",
    description:
      "مزيج بسيط وأنيق من الطماطم الطازجة والموزاريلا وأوراق الريحان العطرية لتجربة إيطالية أصيلة.",
    image: "/margherita.webp",
    priceSm: 9.99,
    priceMd: 10.99,
    priceLg: 11.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 6,
    name: "بيبروني",
    description:
      "المفضلة لدى الجميع مع طبقة سخية من شرائح البيبروني الحارة فوق طبقة من الجبن الذائب وصلصة الطماطم الشهية.",
    image: "/pepperoni.webp",
    priceSm: 10.99,
    priceMd: 11.99,
    priceLg: 12.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 7,
    name: "كواترو فورماجي",
    description:
      "مزيج فاخر من أربعة أنواع جبن: الموزاريلا، الغورغونزولا، البارميزان، والفونتينا لتجربة غنية وكريمية.",
    image: "/quattro-formaggi.webp",
    priceSm: 12.99,
    priceMd: 13.99,
    priceLg: 14.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 8,
    name: "كواترو ستاجيوني",
    description:
      "بيتزا فريدة مقسمة إلى أربعة أقسام، كل قسم يمثل فصلاً من السنة مع الخرشوف ولحم الخنزير والفطر والزيتون.",
    image: "/quattro-stagioni.webp",
    priceSm: 11.99,
    priceMd: 12.99,
    priceLg: 13.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 9,
    name: "تونّو",
    description:
      "تجربة بحرية لذيذة مع التونة والبصل ورشة من الأعشاب الطازجة لبيتزا مميزة وغنية بالنكهات.",
    image: "/tonno.webp",
    priceSm: 10.99,
    priceMd: 11.99,
    priceLg: 12.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
  {
    id: 10,
    name: "فيجيتاريان",
    description:
      "لذة نباتية طازجة مع الفلفل الملون والفطر والزيتون والطماطم الكرزية لتجربة صحية وشهية.",
    image: "/vegetarian.webp",
    priceSm: 9.99,
    priceMd: 10.99,
    priceLg: 11.99,
    toppings: [
      { image: "/cherry.png", name: "طماطم كرزية", price: 2 },
      { image: "/corn.png", name: "ذرة", price: 2 },
      { image: "/fresh-tomatoes.png", name: "طماطم طازجة", price: 2 },
      { image: "/jalapeno.png", name: "هالبينو", price: 2 },
      { image: "/parmesan.png", name: "جبن بارميزان", price: 2 },
    ],
  },
];

const drinks = [
  {
    id: 201,
    name: "بيبسي",
    description:
      "المشروب الغازي الكلاسيكي المنعش بطعمه المميز الذي يعشقه الجميع.",
    image: "/drinks/pepsi.png",
    imageMd: "/drinks/pepsi1L.webp",
    imageLg: "/drinks/pepsi2.5L.webp",
    priceSm: 2.5,
    priceMd: 7.0,
    priceLg: 11.0,
  },
  {
    id: 202,
    name: "بيبسي دايت",
    description: "انتعاش البيبسي الكلاسيكي مع خيار خفيف وخالٍ من السكر.",
    image: "/drinks/PEPSIDI.png",
    priceSm: 2.5,
    priceMd: 7.0,
    priceLg: 11.0,
  },
  {
    id: 203,
    name: "ميرندا",
    description: "مشروب غازي بنكهة البرتقال المنعشة لمحبي الطعم الفاكهي القوي.",
    image: "/drinks/MIRO.png",
    imageMd: "/drinks/mirinda1L.jpg",
    imageLg: "/drinks/mirinda2.5.jpg",
    priceSm: 2.5,
    priceMd: 7.0,
    priceLg: 11.0,
  },
  {
    id: 204,
    name: "سفن أب",
    description: "مشروب غازي بنكهة الليمون والنعناع لانتعاش فريد وخفيف.",
    image: "/drinks/7UP.png",
    imageMd: "/drinks/7up1L.webp",
    imageLg: "/drinks/7up2.5L.webp",
    priceSm: 2.5,
    priceMd: 7.0,
    priceLg: 11.0,
  },
  {
    id: 205,
    name: "سفن أب دايت",
    description: "انتعاش سفن أب مع خيار صحي وخالٍ من السكر.",
    image: "/drinks/DIET7UP.png",
    priceSm: 2.5,
    priceMd: 7.0,
    priceLg: 11.0,
  },
  {
    id: 206,
    name: "ميرك",
    description: "مشروب غازي بطعم مميز ومختلف لعشاق النكهات الخاصة.",
    image: "/drinks/MIRC.png",
    priceSm: 2.5,
    priceMd: 7.0,
    priceLg: 11.0,
  },
  {
    id: 207,
    name: "مياه",
    description: "مياه نقية منعشة مثالية لإرواء عطشك في أي وقت.",
    image: "/drinks/BCWA.png",
    priceSm: 2.5,
    priceMd: 7.0,
    priceLg: 11.0,
  },
];

export default function Home() {
  return (
    <section>
      <Nav />
      <CartMobileIcon />
      <CartMobile />
      <Banner />
      <div className="container mx-auto">
        {/* Pizza Grid  */}
        <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 xl:grid-cols-4 xl:gap-[30px] py-12">
          {pizzas.map((pizza, index) => {
            return <Pizza pizza={pizza} key={index} />;
          })}

          {drinks.map((drink, index) => {
            return <Drink drink={drink} key={index} />;
          })}
        </div>
      </div>
      <CartDesktop />
      <Footer />
    </section>
  );
}
