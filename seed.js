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
        uri: "https://images.unsplash.com/photo-1616949312104-e343b6dc0cc3?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1615486171448-43398dbac22b?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1592914610354-fd354d00cea4?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1587440871874-8845bb11cb2f?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&q=80&w=600",
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
        uri: "",
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
        uri: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
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
        uri: "",
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
        uri: "",
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
        uri: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&q=80&w=600",
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
        uri: "",
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
        uri: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
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
        uri: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
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
        uri: "",
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
        uri: "",
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
        uri: "",
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
        uri: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
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
        uri: "",
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
        uri: "",
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
        uri: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&q=80&w=600",
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
        uri: "",
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
        uri: "",
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
        uri: "",
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
        uri: "",
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
