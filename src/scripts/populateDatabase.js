import { createCar } from "@/services/api/carService";
import { createChatRoom } from "@/services/api/chatService";
import { createNews } from "@/services/api/newsService";

// Enhanced car data with 20 records
const carsData = [
  {
    Name: "Mercedes-AMG GT 63 S",
    brand: "Mercedes-Benz",
    model: "AMG GT 63 S",
    year: 2024,
    price: 185000,
    image_url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    description: "The Mercedes-AMG GT 63 S represents the pinnacle of performance luxury, combining breathtaking acceleration with sophisticated comfort. Its handcrafted AMG engine delivers exhilarating power while maintaining the refined elegance Mercedes-Benz is known for.",
    category: "Performance Luxury",
    horsepower: 630,
    acceleration: 3.1,
    mpg: 18,
    seating: 4,
    engine_type: "4.0L V8 Biturbo",
    transmission: "9-Speed AMG Speedshift",
    fuel_type: "Gasoline",
    length: 196,
    width: 76,
    height: 53,
    weight: 4630,
    Tags: "luxury,performance,AMG,mercedes"
  },
  {
    Name: "BMW M8 Competition",
    brand: "BMW",
    model: "M8 Competition",
    year: 2024,
    price: 155000,
    image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    description: "The BMW M8 Competition is engineered for those who demand the ultimate driving experience. With its aggressive styling and track-tuned performance, this grand tourer delivers both comfort for long journeys and precision for spirited driving.",
    category: "High Performance GT",
    horsepower: 617,
    acceleration: 3.0,
    mpg: 16,
    seating: 4,
    engine_type: "4.4L V8 Twin-Turbo",
    transmission: "8-Speed M Steptronic",
    fuel_type: "Gasoline",
    length: 195,
    width: 75,
    height: 52,
    weight: 4595,
    Tags: "BMW,M-Series,competition,performance"
  },
  {
    Name: "Audi RS e-tron GT",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    price: 142000,
    image_url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    description: "The Audi RS e-tron GT represents the future of performance vehicles, combining instant electric torque with Audi's legendary quattro all-wheel drive. This fully electric grand tourer proves that sustainable driving doesn't mean compromising on excitement.",
    category: "Electric Performance",
    horsepower: 637,
    acceleration: 3.1,
    mpg: 107,
    seating: 4,
    engine_type: "Dual Electric Motors",
    transmission: "2-Speed Automatic",
    fuel_type: "Electric",
    length: 195,
    width: 76,
    height: 53,
    weight: 5060,
    Tags: "electric,audi,RS,quattro,sustainable"
  },
  {
    Name: "Porsche 911 Turbo S",
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2024,
    price: 225000,
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    description: "The Porsche 911 Turbo S is the ultimate expression of the iconic 911 formula. With its rear-engine layout and advanced turbocharging technology, it delivers mind-bending acceleration while maintaining the precise handling that makes every 911 special.",
    category: "Iconic Sports Car",
    horsepower: 640,
    acceleration: 2.6,
    mpg: 20,
    seating: 4,
    engine_type: "3.8L Flat-6 Twin-Turbo",
    transmission: "8-Speed PDK",
    fuel_type: "Gasoline",
    length: 177,
    width: 74,
    height: 51,
    weight: 3640,
    Tags: "porsche,911,turbo,iconic,sports"
  },
  {
    Name: "Ferrari F8 Tributo",
    brand: "Ferrari",
    model: "F8 Tributo",
    year: 2024,
    price: 280000,
    image_url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
    description: "The Ferrari F8 Tributo pays homage to Ferrari's most powerful V8 engine ever created. This mid-engine masterpiece combines Italian craftsmanship with cutting-edge aerodynamics, delivering an visceral driving experience that only Ferrari can provide.",
    category: "Exotic Supercar",
    horsepower: 710,
    acceleration: 2.9,
    mpg: 16,
    seating: 2,
    engine_type: "3.9L V8 Twin-Turbo",
    transmission: "7-Speed Dual-Clutch",
    fuel_type: "Gasoline",
    length: 180,
    width: 76,
    height: 47,
    weight: 3164,
    Tags: "ferrari,supercar,V8,italian,exotic"
  },
  {
    Name: "Lamborghini Huracán EVO",
    brand: "Lamborghini",
    model: "Huracán EVO",
    year: 2024,
    price: 265000,
    image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    description: "The Lamborghini Huracán EVO is evolution perfected. With its naturally aspirated V10 engine and advanced aerodynamics, this Italian bull delivers raw emotion and track-ready performance in a package that's as beautiful as it is fast.",
    category: "Italian Supercar",
    horsepower: 631,
    acceleration: 2.9,
    mpg: 15,
    seating: 2,
    engine_type: "5.2L V10 Natural",
    transmission: "7-Speed Dual-Clutch",
    fuel_type: "Gasoline",
    length: 175,
    width: 76,
    height: 45,
    weight: 3135,
    Tags: "lamborghini,V10,italian,bull,raw"
  },
  {
    Name: "McLaren 720S",
    brand: "McLaren",
    model: "720S",
    year: 2024,
    price: 310000,
    image_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    description: "The McLaren 720S represents British engineering at its finest. Built around McLaren's carbon fiber MonoCell chassis, this supercar combines lightweight construction with immense power, creating a driving experience that's both intense and refined.",
    category: "British Supercar",
    horsepower: 710,
    acceleration: 2.8,
    mpg: 18,
    seating: 2,
    engine_type: "4.0L V8 Twin-Turbo",
    transmission: "7-Speed Dual-Clutch",
    fuel_type: "Gasoline",
    length: 185,
    width: 76,
    height: 47,
    weight: 3186,
    Tags: "mclaren,british,carbon,monocell,precision"
  },
  {
    Name: "Bentley Continental GT",
    brand: "Bentley",
    model: "Continental GT",
    year: 2024,
    price: 245000,
    image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
    description: "The Bentley Continental GT epitomizes grand touring luxury. Handcrafted in England, this elegant coupe combines massive W12 power with sumptuous interior appointments, making it the perfect choice for those who appreciate both performance and refinement.",
    category: "Luxury Grand Tourer",
    horsepower: 626,
    acceleration: 3.6,
    mpg: 19,
    seating: 4,
    engine_type: "6.0L W12 Twin-Turbo",
    transmission: "8-Speed Dual-Clutch",
    fuel_type: "Gasoline",
    length: 185,
    width: 76,
    height: 54,
    weight: 4897,
    Tags: "bentley,luxury,W12,handcrafted,grand-touring"
  },
  {
    Name: "Rolls-Royce Cullinan",
    brand: "Rolls-Royce",
    model: "Cullinan",
    year: 2024,
    price: 395000,
    image_url: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80",
    description: "The Rolls-Royce Cullinan is the pinnacle of luxury SUVs. Named after the largest diamond ever discovered, this imposing vehicle offers unparalleled comfort and presence while maintaining the legendary Rolls-Royce ride quality across any terrain.",
    category: "Ultra-Luxury SUV",
    horsepower: 563,
    acceleration: 4.8,
    mpg: 14,
    seating: 5,
    engine_type: "6.75L V12 Twin-Turbo",
    transmission: "8-Speed Automatic",
    fuel_type: "Gasoline",
    length: 210,
    width: 84,
    height: 72,
    weight: 6069,
    Tags: "rolls-royce,luxury,SUV,diamond,presence"
  },
  {
    Name: "Aston Martin DB12",
    brand: "Aston Martin",
    model: "DB12",
    year: 2024,
    price: 248000,
    image_url: "https://images.unsplash.com/photo-1606016159991-b90d5735399f?w=800&q=80",
    description: "The Aston Martin DB12 is the latest evolution of the iconic DB lineage. Combining British elegance with devastating performance, this grand tourer features cutting-edge technology wrapped in timeless design that embodies the Aston Martin spirit.",
    category: "British Grand Tourer",
    horsepower: 671,
    acceleration: 3.5,
    mpg: 19,
    seating: 4,
    engine_type: "4.0L V8 Twin-Turbo",
    transmission: "8-Speed Automatic",
    fuel_type: "Gasoline",
    length: 185,
    width: 76,
    height: 50,
    weight: 3957,
    Tags: "aston-martin,DB,british,elegance,timeless"
  },
  {
    Name: "Bugatti Chiron",
    brand: "Bugatti",
    model: "Chiron",
    year: 2024,
    price: 3500000,
    image_url: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&q=80",
    description: "The Bugatti Chiron represents the absolute pinnacle of automotive engineering. With its quad-turbocharged W16 engine producing over 1,479 horsepower, this hypercar is as much a work of art as it is a feat of engineering, limited to just 500 examples worldwide.",
    category: "Hypercar",
    horsepower: 1479,
    acceleration: 2.4,
    mpg: 11,
    seating: 2,
    engine_type: "8.0L W16 Quad-Turbo",
    transmission: "7-Speed Dual-Clutch",
    fuel_type: "Gasoline",
    length: 175,
    width: 79,
    height: 47,
    weight: 4398,
    Tags: "bugatti,hypercar,W16,exclusive,art"
  },
  {
    Name: "Koenigsegg Jesko",
    brand: "Koenigsegg",
    model: "Jesko",
    year: 2024,
    price: 3200000,
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    description: "The Koenigsegg Jesko pushes the boundaries of what's possible in a road-legal vehicle. With its revolutionary Light Speed Transmission and aerodynamic innovations, this Swedish masterpiece is designed to be the fastest Koenigsegg ever produced.",
    category: "Hypercar",
    horsepower: 1600,
    acceleration: 2.5,
    mpg: 12,
    seating: 2,
    engine_type: "5.0L V8 Twin-Turbo",
    transmission: "9-Speed Light Speed",
    fuel_type: "Gasoline",
    length: 181,
    width: 78,
    height: 47,
    weight: 3131,
    Tags: "koenigsegg,swedish,fastest,revolutionary,boundaries"
  },
  {
    Name: "Pagani Huayra",
    brand: "Pagani",
    model: "Huayra",
    year: 2024,
    price: 2800000,
    image_url: "https://images.unsplash.com/photo-1563671604994-6cafe0d4d4cb?w=800&q=80",
    description: "The Pagani Huayra is automotive sculpture in motion. Each car is meticulously handcrafted in Italy with obsessive attention to detail, combining Mercedes-AMG powertrains with Pagani's artistic vision to create something truly extraordinary.",
    category: "Hypercar",
    horsepower: 764,
    acceleration: 3.2,
    mpg: 13,
    seating: 2,
    engine_type: "6.0L V12 Twin-Turbo",
    transmission: "7-Speed Single-Clutch",
    fuel_type: "Gasoline",
    length: 172,
    width: 80,
    height: 46,
    weight: 2976,
    Tags: "pagani,art,handcrafted,sculpture,extraordinary"
  },
  {
    Name: "Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 135000,
    image_url: "https://images.unsplash.com/photo-1617104551722-3b2dccb6eb73?w=800&q=80",
    description: "The Tesla Model S Plaid redefines performance expectations for electric vehicles. With its tri-motor setup delivering instant torque and cutting-edge autonomous features, this sedan proves that the future of high-performance driving is electric.",
    category: "Electric Performance Sedan",
    horsepower: 1020,
    acceleration: 1.99,
    mpg: 120,
    seating: 5,
    engine_type: "Tri-Motor Electric",
    transmission: "Single-Speed Direct",
    fuel_type: "Electric",
    length: 196,
    width: 77,
    height: 56,
    weight: 4766,
    Tags: "tesla,electric,plaid,autonomous,future"
  },
  {
    Name: "Lexus LC 500",
    brand: "Lexus",
    model: "LC 500",
    year: 2024,
    price: 105000,
    image_url: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    description: "The Lexus LC 500 combines Japanese precision with emotional design. Its naturally aspirated V8 engine delivers a spine-tingling soundtrack while the impeccable build quality and luxury appointments create an unforgettable grand touring experience.",
    category: "Luxury GT Coupe",
    horsepower: 471,
    acceleration: 4.4,
    mpg: 19,
    seating: 4,
    engine_type: "5.0L V8 Natural",
    transmission: "10-Speed Automatic",
    fuel_type: "Gasoline",
    length: 185,
    width: 75,
    height: 53,
    weight: 4280,
    Tags: "lexus,japanese,precision,V8,emotion"
  },
  {
    Name: "Chevrolet Corvette Z06",
    brand: "Chevrolet",
    model: "Corvette Z06",
    year: 2024,
    price: 110000,
    image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    description: "The Chevrolet Corvette Z06 brings American supercar performance to a new level. With its flat-plane crank V8 and track-focused aerodynamics, this mid-engine marvel delivers exotic car performance at a fraction of the price.",
    category: "American Supercar",
    horsepower: 670,
    acceleration: 2.6,
    mpg: 16,
    seating: 2,
    engine_type: "5.5L V8 Flat-Plane",
    transmission: "8-Speed Dual-Clutch",
    fuel_type: "Gasoline",
    length: 185,
    width: 77,
    height: 48,
    weight: 3434,
    Tags: "corvette,american,Z06,track,value"
  },
  {
    Name: "Nissan GT-R NISMO",
    brand: "Nissan",
    model: "GT-R NISMO",
    year: 2024,
    price: 215000,
    image_url: "https://images.unsplash.com/photo-1599971403907-9aa3bce7c91f?w=800&q=80",
    description: "The Nissan GT-R NISMO is Godzilla unleashed. This track-bred monster combines advanced AWD technology with aerodynamic perfection, creating a supercar that dominates both street and circuit with its relentless pursuit of performance.",
    category: "Japanese Supercar",
    horsepower: 600,
    acceleration: 2.5,
    mpg: 16,
    seating: 4,
    engine_type: "3.8L V6 Twin-Turbo",
    transmission: "6-Speed Dual-Clutch",
    fuel_type: "Gasoline",
    length: 185,
    width: 74,
    height: 54,
    weight: 3865,
    Tags: "nissan,GT-R,godzilla,AWD,monster"
  },
  {
    Name: "Honda NSX Type S",
    brand: "Honda",
    model: "NSX Type S",
    year: 2024,
    price: 175000,
    image_url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    description: "The Honda NSX Type S represents the pinnacle of hybrid supercar technology. With its Sport Hybrid SH-AWD system and precision engineering, this Japanese masterpiece delivers supercar performance with everyday usability and legendary Honda reliability.",
    category: "Hybrid Supercar",
    horsepower: 600,
    acceleration: 2.9,
    mpg: 21,
    seating: 2,
    engine_type: "3.5L V6 Hybrid",
    transmission: "9-Speed Dual-Clutch",
    fuel_type: "Hybrid",
    length: 176,
    width: 76,
    height: 47,
    weight: 3878,
    Tags: "honda,NSX,hybrid,precision,reliable"
  },
  {
    Name: "Toyota GR Supra 3.0",
    brand: "Toyota",
    model: "GR Supra 3.0",
    year: 2024,
    price: 58000,
    image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    description: "The Toyota GR Supra 3.0 brings back the legendary Supra nameplate with modern performance credentials. Developed in partnership with BMW, this sports car combines Japanese tuning culture heritage with cutting-edge BMW powertrains for pure driving excitement.",
    category: "Sports Car",
    horsepower: 382,
    acceleration: 3.9,
    mpg: 25,
    seating: 2,
    engine_type: "3.0L I6 Turbo",
    transmission: "8-Speed Automatic",
    fuel_type: "Gasoline",
    length: 172,
    width: 73,
    height: 51,
    weight: 3397,
    Tags: "toyota,supra,legendary,tuning,excitement"
  },
  {
    Name: "Mazda RX-7 Spirit R",
    brand: "Mazda",
    model: "RX-7 Spirit R",
    year: 2024,
    price: 85000,
    image_url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    description: "The Mazda RX-7 Spirit R represents the final evolution of rotary engine perfection. This lightweight sports car delivers an unmatched power-to-weight ratio and pure driving dynamics that have made it a legend among automotive enthusiasts worldwide.",
    category: "Rotary Sports Car",
    horsepower: 280,
    acceleration: 4.9,
    mpg: 18,
    seating: 2,
    engine_type: "1.3L Twin-Rotor",
    transmission: "5-Speed Manual",
    fuel_type: "Gasoline",
    length: 166,
    width: 70,
    height: 48,
    weight: 2756,
    Tags: "mazda,rotary,lightweight,legend,pure"
  }
];

// Chat rooms data (8 records)
const chatRoomsData = [
  {
    Name: "Mercedes-Benz Enthusiasts",
    topic: "Discussing the latest Mercedes-Benz models, AMG performance, and luxury features",
    participant_count: 1247,
    last_activity: "2024-01-15T10:30:00Z"
  },
  {
    Name: "BMW M Power",
    topic: "All things BMW M - from M2 to M8, track days, and performance modifications",
    participant_count: 892,
    last_activity: "2024-01-15T09:45:00Z"
  },
  {
    Name: "Porsche 911 Club",
    topic: "The iconic 911 in all its variants - from Carrera to Turbo S, classic to modern",
    participant_count: 756,
    last_activity: "2024-01-15T11:20:00Z"
  },
  {
    Name: "Ferrari Owners",
    topic: "Exclusive community for Ferrari owners and enthusiasts - sharing experiences and passion",
    participant_count: 634,
    last_activity: "2024-01-15T08:15:00Z"
  },
  {
    Name: "Lamborghini Talk",
    topic: "Italian bulls discussion - Huracán, Aventador, and the latest from Sant'Agata",
    participant_count: 523,
    last_activity: "2024-01-15T12:00:00Z"
  },
  {
    Name: "McLaren Supercar Chat",
    topic: "British precision engineering - discussing McLaren's latest supercars and technology",
    participant_count: 445,
    last_activity: "2024-01-15T07:30:00Z"
  },
  {
    Name: "Electric Supercars",
    topic: "The future is electric - discussing Tesla, Lucid, Rimac, and electric performance",
    participant_count: 1123,
    last_activity: "2024-01-15T11:30:00Z"
  },
  {
    Name: "Track Day Warriors",
    topic: "Track day experiences, lap times, circuit reviews, and performance driving tips",
    participant_count: 967,
    last_activity: "2024-01-15T10:15:00Z"
  }
];

// News articles data (8 records)
const newsData = [
  {
    title: "Mercedes-AMG Unveils Revolutionary Hybrid Powertrain for 2025",
    excerpt: "Mercedes-AMG announces groundbreaking E PERFORMANCE technology that combines their legendary V8 with electric motors for unprecedented performance and efficiency.",
    content: "Mercedes-AMG has officially unveiled its next-generation E PERFORMANCE hybrid technology, marking a significant milestone in the brand's electrification strategy. The new system, set to debut in 2025 models, combines the iconic hand-built 4.0-liter V8 biturbo engine with advanced electric motors, delivering a combined output exceeding 800 horsepower. This revolutionary powertrain promises to maintain the visceral AMG driving experience while significantly improving fuel efficiency and reducing emissions. The electric components include a high-performance battery pack specifically designed for track use, capable of providing electric-only driving for short distances in urban environments.",
    category: "launches",
    author: "Sarah Mitchell",
    published_at: "2024-01-15T08:00:00Z",
    reading_time: 5,
    image_url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"
  },
  {
    title: "BMW M Division Teases Next-Generation M3 with Electric Assistance",
    excerpt: "Spy shots reveal BMW's most iconic M car is getting electrified while maintaining its driver-focused DNA.",
    content: "BMW's M Division has confirmed that the next-generation M3 will feature electric assistance, marking a pivotal moment for the iconic sports sedan. Recent spy photographs show heavily camouflaged test mules equipped with additional cooling vents and modified exhaust systems, suggesting the integration of hybrid technology. BMW M CEO Frank van Meel emphasized that the electrification will enhance rather than compromise the M3's legendary driving dynamics. The new system is expected to provide instant torque fill and enable temporary power boosts during track sessions. Despite the hybrid powertrain, BMW promises to maintain the M3's rear-wheel-drive bias and manual transmission option for purists.",
    category: "industry",
    author: "Marcus Johnson",
    published_at: "2024-01-14T14:30:00Z",
    reading_time: 4,
    image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"
  },
  {
    title: "Porsche 911 Turbo S Review: The Ultimate Daily Driver Supercar",
    excerpt: "We spend a week with Porsche's flagship 911 to discover if it truly can be both a track weapon and daily companion.",
    content: "After a week behind the wheel of the Porsche 911 Turbo S, one thing becomes crystal clear: this is as close to automotive perfection as money can buy. The latest iteration of Porsche's flagship 911 manages to be simultaneously civilized enough for daily driving and devastating enough for track days. The 3.8-liter flat-six twin-turbo engine produces 640 horsepower, launching this rear-engine masterpiece from 0-60 mph in just 2.6 seconds. Yet, in comfort mode with the suspension raised, it glides over city streets with the refinement of a luxury sedan. The PDK transmission is telepathic, the all-wheel-drive system provides unshakeable confidence, and the build quality is exemplary. At $225,000, it's expensive, but for those seeking the ultimate all-weather supercar, nothing else comes close.",
    category: "reviews",
    author: "David Chen",
    published_at: "2024-01-13T10:15:00Z",
    reading_time: 8,
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
  },
  {
    title: "Ferrari's Bold Electric Future: SF90 Successor to Feature Solid-State Batteries",
    excerpt: "Maranello's next hybrid hypercar promises even more performance with revolutionary battery technology.",
    content: "Ferrari has announced that the successor to the SF90 Stradale will be the first production car to feature solid-state battery technology, representing a quantum leap in hybrid supercar performance. The new battery system, developed in partnership with a leading technology firm, promises 3x the energy density of current lithium-ion batteries while reducing weight by 40%. This breakthrough will enable the new hypercar to achieve over 50 miles of electric-only range while maintaining the instant power delivery that makes the SF90 so spectacular. Ferrari CEO Benedetto Vigna confirmed that the new model will exceed 1000 horsepower while meeting increasingly stringent emissions regulations. Production is slated to begin in late 2025, with deliveries starting in 2026.",
    category: "technology",
    author: "Isabella Romano",
    published_at: "2024-01-12T16:45:00Z",
    reading_time: 6,
    image_url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80"
  },
  {
    title: "Lamborghini Huracán Successor Spotted: V10 Lives On",
    excerpt: "Despite industry electrification trends, Lamborghini commits to keeping the naturally aspirated V10 alive in their next-generation supercar.",
    content: "In an era of widespread electrification, Lamborghini is bucking the trend with confirmation that the Huracán's successor will retain the beloved naturally aspirated V10 engine. Spy photographers have captured several test mules featuring the familiar V10 soundtrack, though with subtle modifications suggesting increased power output. Lamborghini's Chief Technical Officer has stated that while hybrid assistance may be added in the future, the pure V10 experience will remain at the heart of the brand's entry-level supercar. The new model, internally codenamed 'Project 634,' is expected to produce over 650 horsepower while maintaining the Huracán's accessible supercar character. Advanced aerodynamics and weight reduction measures will ensure the new model remains competitive against electrified rivals.",
    category: "launches",
    author: "Antonio Rossi",
    published_at: "2024-01-11T12:20:00Z",
    reading_time: 5,
    image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
  },
  {
    title: "McLaren Artura First Drive: British Engineering Perfection",
    excerpt: "McLaren's first series-production hybrid delivers on its promise of combining McLaren DNA with electrified efficiency.",
    content: "The McLaren Artura represents more than just another hybrid supercar; it's the crystallization of McLaren's decades of Formula 1 expertise applied to road cars. Our first drive reveals a machine that feels every bit as special as its predecessors while pointing toward a sustainable future. The 3.0-liter twin-turbo V6 hybrid system produces 671 horsepower, but more importantly, it delivers power with the linear progression that makes McLaren supercars so special. The electric motor fills in any turbo lag, creating seamless acceleration that builds relentlessly to the 8,500 rpm redline. The carbon fiber MonoCell-II chassis provides incredible structural rigidity while keeping weight to just 3,303 pounds. On track, the Artura displays the same surgical precision that defines all McLaren products, with steering that's perfectly weighted and suspension that balances compliance with control.",
    category: "reviews",
    author: "James Thompson",
    published_at: "2024-01-10T09:30:00Z",
    reading_time: 7,
    image_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80"
  },
  {
    title: "Audi e-tron GT Sales Surge as Electric Performance Gains Acceptance",
    excerpt: "Luxury electric vehicles are finding their audience as charging infrastructure improves and performance matches expectations.",
    content: "Audi's e-tron GT has become an unexpected success story, with sales figures significantly exceeding initial projections across global markets. The electric grand tourer, developed in partnership with Porsche and sharing the Taycan's J1 platform, has proven that luxury electric vehicles can successfully compete with traditional performance cars. Third-quarter sales data shows a 340% increase compared to the same period last year, with the RS e-tron GT variant accounting for nearly 60% of orders. Customers cite the combination of instant torque delivery, refined interior, and increasingly reliable charging infrastructure as key factors in their purchase decisions. Audi's investment in 350kW ultra-fast charging compatibility has paid dividends, with owners reporting minimal range anxiety during long-distance travel.",
    category: "industry",
    author: "Emma Wagner",
    published_at: "2024-01-09T11:45:00Z",
    reading_time: 4,
    image_url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"
  },
  {
    title: "Bentley Continental GT Speed: The Art of Grand Touring Refined",
    excerpt: "Bentley's flagship coupe receives updates that enhance both luxury and performance for the discerning driver.",
    content: "The latest Bentley Continental GT Speed represents the apex of grand touring refinement, combining devastating performance with unmatched luxury in a package that defines automotive excellence. The handcrafted W12 engine now produces 659 horsepower, propelling this 4,800-pound luxury coupe to 60 mph in just 3.5 seconds. Yet numbers tell only part of the story. Inside, the cabin showcases Bentley's commitment to traditional craftsmanship with modern technology seamlessly integrated. The diamond-quilted leather seats provide support during spirited driving while cocooning occupants in supreme comfort during long journeys. The rotating display panel, featuring three faces including analog gauges, exemplifies Bentley's ability to blend heritage with innovation. At $280,000, the Continental GT Speed isn't just a car; it's a rolling statement of success and refined taste.",
    category: "reviews",
    author: "Charlotte Windsor",
    published_at: "2024-01-08T15:20:00Z",
    reading_time: 6,
    image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80"
  }
];

// Function to populate cars table
async function populateCars() {
  console.log('Starting to populate Cars table with 20 records...');
  let successCount = 0;
  let failureCount = 0;
  
  for (let i = 0; i < carsData.length; i++) {
    try {
      const car = carsData[i];
      console.log(`Creating car ${i + 1}/20: ${car.Name}`);
      
      const result = await createCar(car);
      if (result) {
        successCount++;
        console.log(`✓ Successfully created: ${car.Name}`);
      } else {
        failureCount++;
        console.log(`✗ Failed to create: ${car.Name}`);
      }
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      failureCount++;
      console.error(`✗ Error creating car ${carsData[i].Name}:`, error.message);
    }
  }
  
  console.log(`Cars population completed: ${successCount} successful, ${failureCount} failed`);
  return { successCount, failureCount };
}

// Function to populate chat rooms table
async function populateChatRooms() {
  console.log('Starting to populate Chat Rooms table with 8 records...');
  let successCount = 0;
  let failureCount = 0;
  
  for (let i = 0; i < chatRoomsData.length; i++) {
    try {
      const room = chatRoomsData[i];
      console.log(`Creating chat room ${i + 1}/8: ${room.Name}`);
      
      const result = await createChatRoom(room);
      if (result) {
        successCount++;
        console.log(`✓ Successfully created: ${room.Name}`);
      } else {
        failureCount++;
        console.log(`✗ Failed to create: ${room.Name}`);
      }
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      failureCount++;
      console.error(`✗ Error creating chat room ${chatRoomsData[i].Name}:`, error.message);
    }
  }
  
  console.log(`Chat Rooms population completed: ${successCount} successful, ${failureCount} failed`);
  return { successCount, failureCount };
}

// Function to populate news articles table
async function populateNews() {
  console.log('Starting to populate News Articles table with 8 records...');
  let successCount = 0;
  let failureCount = 0;
  
  for (let i = 0; i < newsData.length; i++) {
    try {
      const article = newsData[i];
      console.log(`Creating news article ${i + 1}/8: ${article.title}`);
      
      const result = await createNews(article);
      if (result) {
        successCount++;
        console.log(`✓ Successfully created: ${article.title}`);
      } else {
        failureCount++;
        console.log(`✗ Failed to create: ${article.title}`);
      }
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      failureCount++;
      console.error(`✗ Error creating news article ${newsData[i].title}:`, error.message);
    }
  }
  
  console.log(`News Articles population completed: ${successCount} successful, ${failureCount} failed`);
  return { successCount, failureCount };
}

// Main function to populate all tables
export async function populateDatabase() {
  console.log('🚀 Starting database population process...');
  console.log('='.repeat(50));
  
  const startTime = Date.now();
  
  try {
    // Populate all tables
    const carsResult = await populateCars();
    console.log('');
    
    const chatRoomsResult = await populateChatRooms();
    console.log('');
    
    const newsResult = await populateNews();
    console.log('');
    
    // Summary
    const totalSuccess = carsResult.successCount + chatRoomsResult.successCount + newsResult.successCount;
    const totalFailures = carsResult.failureCount + chatRoomsResult.failureCount + newsResult.failureCount;
    const totalRecords = totalSuccess + totalFailures;
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('='.repeat(50));
    console.log('📊 DATABASE POPULATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`🚗 Cars: ${carsResult.successCount}/20 successful`);
    console.log(`💬 Chat Rooms: ${chatRoomsResult.successCount}/8 successful`);
    console.log(`📰 News Articles: ${newsResult.successCount}/8 successful`);
    console.log('');
    console.log(`✅ Total Successful: ${totalSuccess}/${totalRecords}`);
    console.log(`❌ Total Failed: ${totalFailures}/${totalRecords}`);
    console.log(`⏱️ Duration: ${duration} seconds`);
    console.log('='.repeat(50));
    
    if (totalFailures === 0) {
      console.log('🎉 All records populated successfully!');
    } else {
      console.log(`⚠️ ${totalFailures} records failed to populate. Check logs above for details.`);
    }
    
    return {
      cars: carsResult,
      chatRooms: chatRoomsResult,
      news: newsResult,
      summary: {
        totalSuccess,
        totalFailures,
        totalRecords,
        duration
      }
    };
    
  } catch (error) {
    console.error('💥 Fatal error during database population:', error);
    throw error;
  }
}

// Export individual functions for selective population
export { populateCars, populateChatRooms, populateNews };

// Note: Auto-run functionality removed for browser compatibility
// To run this script, call populateDatabase() manually from your application