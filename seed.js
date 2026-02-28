const mongoose = require("mongoose");
require("dotenv").config();

const Brand = require("./models/Brand");
const Perfume = require("./models/Perfume");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB. Starting massive data seed...");

    await Brand.deleteMany();
    await Perfume.deleteMany();
    console.log("🧹 Cleared old brands and perfumes.");

    const createdBrands = await Brand.insertMany([
      { brandName: "Maison Francis Kurkdjian" },
      { brandName: "Le Labo" },
      { brandName: "Tom Ford" },
      { brandName: "Chanel" },
      { brandName: "Byredo" },
      { brandName: "Creed" },
    ]);
    console.log("✨ Added 6 Luxury Brands.");

    const getBrandId = (name) =>
      createdBrands.find((b) => b.brandName === name)._id;

    const perfumes = [
      // === MAISON FRANCIS KURKDJIAN (MFK) ===
      {
        perfumeName: "Baccarat Rouge 540",
        brand: getBrandId("Maison Francis Kurkdjian"),
        uri: "https://cdn.hstatic.net/products/200000977139/_c_hoa_unisex_maison_francis_kurkdjian_baccarat_rouge_540_edp_70ml__2__640f7603d91d48c1ab8bf29a5c857c18_master.png",
        price: 425,
        volume: 70,
        concentration: "Extrait",
        targetAudience: "unisex",
        ingredients: "Jasmine, Saffron, Cedarwood, Ambergris",
        description:
          "A highly condensed and graphic olfactory signature. Baccarat Rouge 540 Extrait de parfum augments the strength and radiance of the fragrance’s amber woody floral aura.",
      },
      {
        perfumeName: "Grand Soir",
        brand: getBrandId("Maison Francis Kurkdjian"),
        uri: "https://nuochoamc.com/upload/images/san-pham/1671/maison-francis-kurkdjian-grand-soir-4.webp",
        price: 240,
        volume: 70,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients:
          "Spanish Labdanum, Benzoin from Siam, Brazilian Tonka Bean, Vanilla",
        description:
          "Dress in your finest attire and polish your look. Wander in a never-ending night and enjoy the daring radiance of a magnificent Parisian evening.",
      },
      {
        perfumeName: "Oud Satin Mood",
        brand: getBrandId("Maison Francis Kurkdjian"),
        uri: "https://vitaperfume.com/image/catalog/san_pham/niche/satinedp.jpg",
        price: 475,
        volume: 70,
        concentration: "Extrait",
        targetAudience: "unisex",
        ingredients:
          "Bulgarian Rose, Turkish Rose, Vanilla, Laotian Oud, Violet",
        description:
          "Like a flowing fabric delicately draped over bare skin, Oud Satin Mood Extrait de Parfum wraps you in a sensual and enchanting warmth.",
      },
      {
        perfumeName: "Aqua Universalis",
        brand: getBrandId("Maison Francis Kurkdjian"),
        uri: "https://fandi-perfume.com/cdn/shop/files/maison-francis-kurkdjian-aqua-universalis-forte-unisex-eau-de-parfum-1217973165.png?v=1769544046&width=1024",
        price: 215,
        volume: 70,
        concentration: "EDT",
        targetAudience: "unisex",
        ingredients: "Bergamot, Sicilian Lemon, White Bouquet, Light Musks",
        description:
          "Simply fresh and airy, Aqua Universalis creates a bridge between skin and clothing as a fragrance meant to be shared by all.",
      },
      {
        perfumeName: "L'Homme À la Rose",
        brand: getBrandId("Maison Francis Kurkdjian"),
        uri: "https://apaniche.vn/wp-content/uploads/2024/12/mfk-l-eau-a-la-rose-chinh-hang-2025.png",
        price: 285,
        volume: 70,
        concentration: "EDP",
        targetAudience: "male",
        ingredients: "Grapefruit, Damask Rose, Amber Woods, Sage",
        description:
          "With L'Homme À la Rose, Maison Francis Kurkdjian gives men the power to wear a rose fragrance, combining fresh, green bursts with an amber wood trail.",
      },

      // === LE LABO ===
      {
        perfumeName: "Santal 33",
        brand: getBrandId("Le Labo"),
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMLnZWBVFtF0lnsaTCMBDytWYtBj773ZdD5Q&s",
        price: 320,
        volume: 100,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients: "Cardamom, Iris, Violet, Australian Sandalwood, Papyrus",
        description:
          "A perfume that touches the sensual universality of this icon... that would intoxicate a man as much as a woman.",
      },
      {
        perfumeName: "Another 13",
        brand: getBrandId("Le Labo"),
        uri: "https://apaniche.vn/wp-content/uploads/2023/05/Le-Labo-Another-13-EDP-tai-ha-noi.jpg",
        price: 320,
        volume: 100,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients: "Ambroxan, Jasmine, Moss, Ambrette Seeds",
        description:
          "Commissioned by AnOther Magazine, this is an addictive, hypnotic scent blending synthetic animal musk with jasmine and moss.",
      },
      {
        perfumeName: "Rose 31",
        brand: getBrandId("Le Labo"),
        uri: "https://kyo.vn/wp-content/uploads/2022/09/nuoc-hoa-unisex-le-labo-rose-31-5.jpg",
        price: 320,
        volume: 100,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients: "Rose, Cumin, Vetiver, Musks, Cedar, Agarwood",
        description:
          "The aim is clear: to transform the famous Grasse Rose, a symbol of voluptuousness and unqualified femininity, into an assertively virile fragrance.",
      },
      {
        perfumeName: "Bergamote 22",
        brand: getBrandId("Le Labo"),
        uri: "https://nuochoamc.com/upload/images/bai-viet/1101/review-nuoc-hoa-le-labo-bergamote-222.webp",
        price: 320,
        volume: 100,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients:
          "Bergamot, Grapefruit, Petitgrain, Orange Blossom, Vetiver",
        description:
          "This dazzling bergamot combines freshness, sweetness, and sensuality with acrobatic talent. The delicate floral character of petit grain sits next to the bitterness of grapefruit.",
      },
      {
        perfumeName: "Thé Noir 29",
        brand: getBrandId("Le Labo"),
        uri: "https://product.hstatic.net/200000104389/product/35f35318-bb60-49be-938f-1d2a93fab170_89ecfc5f7e5f44f7a677e57ce7bf7e44_1024x1024.jpg",
        price: 400,
        volume: 100,
        concentration: "Extrait",
        targetAudience: "unisex",
        ingredients: "Black Tea Leaves, Fig, Bay, Bergamot, Cedarwood, Musk",
        description:
          "Thé Noir 29 is an ode to the noble leaf and the craft that surrounds it, combining depth and freshness with softness and strength.",
      },

      // === TOM FORD ===
      {
        perfumeName: "Oud Wood",
        brand: getBrandId("Tom Ford"),
        uri: "https://nuochoamc.com/upload/images/san-pham/1727/tom-ford-oud-wood-2024-parfum2.webp",
        price: 395,
        volume: 50,
        concentration: "EDP",
        targetAudience: "male",
        ingredients:
          "Rare Oud Wood, Sandalwood, Chinese Pepper, Rosewood, Tonka Bean",
        description:
          "Rare. Exotic. Distinctive. One of the most rare, precious, and expensive ingredients in a perfumer’s arsenal, oud wood is often burned in incense-filled temples.",
      },
      {
        perfumeName: "Lost Cherry",
        brand: getBrandId("Tom Ford"),
        uri: "https://api.namefragrance.vn/v1/crop?file=10308/2024/July/132497-321401719973687-1719973687.jpg&width=350&height=350",
        price: 395,
        volume: 50,
        concentration: "EDP",
        targetAudience: "female",
        ingredients:
          "Black Cherry, Bitter Almond, Turkish Rose, Jasmine Sambac",
        description:
          "Lost Cherry is a full-bodied journey into the once-forbidden; a contrasting scent that reveals a tempting dichotomy of playful, candy-like gleam on the outside.",
      },
      {
        perfumeName: "Tobacco Vanille",
        brand: getBrandId("Tom Ford"),
        uri: "https://theperfume.vn/wp-content/uploads/2021/01/thiet-ke-tobac-co-vani-lle-100ml.png",
        price: 395,
        volume: 50,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients: "Tobacco Leaf, Vanilla, Ginger, Cocoa, Tonka Bean",
        description:
          "Opulent. Warm. Iconic. Tom Ford’s affection for London inspired this scent, reminiscent of an English gentleman’s club, redolent with spice.",
      },
      {
        perfumeName: "Tuscan Leather",
        brand: getBrandId("Tom Ford"),
        uri: "https://nuochoamc.com/upload/images/san-pham/975/tuscan-leather-1.webp",
        price: 520,
        volume: 50,
        concentration: "Extrait",
        targetAudience: "male",
        ingredients: "Saffron, Raspberry, Thyme, Olibanum, Leather, Suede",
        description:
          "Intense. Primal. Extravagant. Inspired by Tom Ford’s love of fine leather, this ultra-sexy interpretation captures the primal, animalistic scent of leather.",
      },
      {
        perfumeName: "Black Orchid",
        brand: getBrandId("Tom Ford"),
        uri: "https://nuochoamc.com/upload/images/san-pham/2211/tom-ford-black-orchid-2023-edt-100ml1.webp",
        price: 215,
        volume: 50,
        concentration: "EDP",
        targetAudience: "female",
        ingredients: "Black Truffle, Black Orchid, Patchouli, Incense, Vetiver",
        description:
          "Luxurious and sensual, Black Orchid is a rich, dark trace of custom-grown orchids and spices. A modern and timeless masterpiece.",
      },

      // === CHANEL ===
      {
        perfumeName: "Bleu de Chanel",
        brand: getBrandId("Chanel"),
        uri: "https://kyo.vn/wp-content/uploads/2022/08/nuoc-hoa-nam-chanel-bleu-de-chanel-parfum-2.png",
        price: 180,
        volume: 100,
        concentration: "Extrait",
        targetAudience: "male",
        ingredients: "Citrus, Labdanum, Sandalwood, Cedar",
        description:
          "An ode to masculine freedom expressed in an aromatic-woody fragrance with a captivating trail. A timeless, powerful fragrance housed in an enigmatic blue bottle.",
      },
      {
        perfumeName: "No. 5",
        brand: getBrandId("Chanel"),
        uri: "https://orchard.vn/wp-content/uploads/2014/06/chanel-no5-edp_5.jpg",
        price: 160,
        volume: 100,
        concentration: "EDP",
        targetAudience: "female",
        ingredients: "Aldehydes, Ylang-Ylang, Neroli, Rose, Jasmine, Vanilla",
        description:
          "The essence of femininity. A floral bouquet enhanced with aldehydes, housed in a minimalist bottle. A legendary, timeless fragrance.",
      },
      {
        perfumeName: "Coco Mademoiselle",
        brand: getBrandId("Chanel"),
        uri: "https://apaniche.vn/wp-content/uploads/2023/05/Chanel-Coco-Mademoiselle-EDP-chinh-hang.jpg",
        price: 160,
        volume: 100,
        concentration: "EDP",
        targetAudience: "female",
        ingredients: "Orange, Patchouli, Turkish Rose, White Musk",
        description:
          "Irresistibly sexy, irrepressibly spirited. A sparkling oriental fragrance that recalls a daring young Coco Chanel.",
      },
      {
        perfumeName: "Sycomore",
        brand: getBrandId("Chanel"),
        uri: "https://parfum.ae/cdn/shop/products/SYCOMORE_20100ml-500x500_82857de3-6906-436b-8dd7-6e00f00b5041.jpg?v=1700807041&width=2048",
        price: 350,
        volume: 75,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients: "Vetiver, Cypress, Juniper, Pink Pepper, Smoke",
        description:
          "Composed around the smoky scent of vetiver, Sycomore is a comforting, slightly spicy fragrance that evokes the earthiness of the forest.",
      },
      {
        perfumeName: "Allure Homme Sport",
        brand: getBrandId("Chanel"),
        uri: "https://nuochoamc.com/upload/images/san-pham/284/chanel-allure-homme-sport-edt-4.webp",
        price: 130,
        volume: 100,
        concentration: "EDT",
        targetAudience: "male",
        ingredients: "Mandarin, Sea Notes, Pepper, Cedar, Tonka Bean",
        description:
          "A fragrance that embodies motion and athletic grace. A fresh, woody, and invigorating composition.",
      },

      // === BYREDO ===
      {
        perfumeName: "Gypsy Water",
        brand: getBrandId("Byredo"),
        uri: "https://bbbeauty.com.hk/cdn/shop/files/byredo-gypsy-water-a-fragrance-for-every-season-994700_800x.png?v=1727840350",
        price: 225,
        volume: 50,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients: "Bergamot, Lemon, Pepper, Juniper Berries, Pine Needles",
        description:
          "Gypsy Water is an idealization of the Romani lifestyle. The scent of fresh soil, deep forests and campfires evokes the dream of a free, colorful lifestyle.",
      },
      {
        perfumeName: "Mojave Ghost",
        brand: getBrandId("Byredo"),
        uri: "https://www.woodberg.de/cdn/shop/files/Byredo-mojave-ghost-absolue-100ml-02.jpg?v=1727714332&width=1000",
        price: 225,
        volume: 50,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients: "Ambrette, Jamaican Nesberry, Violet, Sandalwood, Cedar",
        description:
          "A woody composition inspired by the soulful beauty of the Mojave Desert. In this xeric wilderness, rare are the plants that dare to blossom.",
      },
      {
        perfumeName: "Bal d'Afrique",
        brand: getBrandId("Byredo"),
        uri: "https://piger.vn/wp-content/uploads/2023/08/nuoc-hoa-unisex-byredo-bal-dafrique-piger-vn-02.jpg",
        price: 225,
        volume: 50,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients:
          "African Marigold, Bergamot, Cyclamen, Vetiver, Moroccan Cedarwood",
        description:
          "A warm and romantic vetiver inspired by Paris in the late 1920s and its infatuation with African culture, art, music, and dance.",
      },
      {
        perfumeName: "Blanche",
        brand: getBrandId("Byredo"),
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSblLoeHMgtqO45cFpB_yCf5Zl8of-ZycemVQ&s",
        price: 225,
        volume: 50,
        concentration: "EDP",
        targetAudience: "female",
        ingredients: "White Rose, Pink Pepper, Aldehyde, Violet, Blonde Woods",
        description:
          "An exploration of the color white. The scent is pure and simple in structure but extreme in character. Built around Ben Gorham's perception of innocence.",
      },
      {
        perfumeName: "Sellier",
        brand: getBrandId("Byredo"),
        uri: "https://parfum.qa/cdn/shop/products/our-creation-of-byredos-sellier-833551.jpg?v=1702915109&width=2048",
        price: 345,
        volume: 50,
        concentration: "Extrait",
        targetAudience: "unisex",
        ingredients: "Cashmeran, Black Tea, Leather, Oakmoss, Birch Tree",
        description:
          "Distinguished, somber, smoky. A truly unbridled concentration of leather. It teleports you to a vintage smoking room with precious tobacco leaves and antique books.",
      },

      // === CREED ===
      {
        perfumeName: "Aventus",
        brand: getBrandId("Creed"),
        uri: "https://lanperfume.com/wp-content/uploads/2024/07/thong-tin-nuoc-hoa-creed-aventus-for-men-edp-1.jpg",
        price: 495,
        volume: 100,
        concentration: "EDP",
        targetAudience: "male",
        ingredients:
          "Apple, Blackcurrant, Pineapple, Bergamot, Birch, Patchouli",
        description:
          "The exceptional Aventus was inspired by the dramatic life of a historic emperor, celebrating strength, power and success.",
      },
      {
        perfumeName: "Silver Mountain Water",
        brand: getBrandId("Creed"),
        uri: "https://laluz.vn/wp-content/uploads/2023/12/nuoc-hoa-unisex-Creed-Silver-Mountain-Water.jpg",
        price: 470,
        volume: 100,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients:
          "Bergamot, Mandarin, Green Tea, Blackcurrant, Galbanum, Musk",
        description:
          "A bestseller since its launch, this modern scent captures the purity of the mountains-soft, milky-sweet blackcurrants mixed with green tea, and bergamot.",
      },
      {
        perfumeName: "Green Irish Tweed",
        brand: getBrandId("Creed"),
        uri: "https://kyo.vn/wp-content/uploads/2022/08/nuoc-hoa-nam-creed-green-irish-tweed-edp-4.png",
        price: 470,
        volume: 100,
        concentration: "EDP",
        targetAudience: "male",
        ingredients:
          "Lemon, Peppermint, Violet Leaf, Florentine Iris, Sandalwood",
        description:
          "Like a perfectly tailored suit, Green Irish Tweed has been and continues to be worn by confident men at the peak of their field.",
      },
      {
        perfumeName: "Aventus for Her",
        brand: getBrandId("Creed"),
        uri: "https://alison.com.vn/file/upload/1001_1726042646_448845.png",
        price: 495,
        volume: 75,
        concentration: "Extrait",
        targetAudience: "female",
        ingredients:
          "Egyptian Green Apple, Pink Berries, Indonesian Patchouli, Bergamot",
        description:
          "The irresistible feminine counterpart to the legendary Aventus. An olfactory celebration of strong women, this is a masterful, fruity, and floral Eau de Parfum.",
      },
      {
        perfumeName: "Millésime Impérial",
        brand: getBrandId("Creed"),
        uri: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
        price: 470,
        volume: 100,
        concentration: "EDP",
        targetAudience: "unisex",
        ingredients: "Fruit Notes, Sea Salt, Lemon, Bergamot, Iris, Musk",
        description:
          "The gold standard in fragrance. This refreshing and invigorating scent evokes the citrus groves and lush landscape of a Sicilian seaside palace.",
      },
    ];

    await Perfume.insertMany(perfumes);
    console.log(`✨ Added ${perfumes.length} Luxury Perfumes (5 per Brand).`);

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
