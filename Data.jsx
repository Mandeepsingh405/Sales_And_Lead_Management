import { format, subDays } from 'date-fns';

// Generate dates for the last 30 days
const generateDates = (count) => {
  return Array.from({ length: count }).map((_, i) => {
    return format(subDays(new Date(), i), 'yyyy-MM-dd');
  }).reverse();
};

const dates = generateDates(30);

// Dummy Sales Data
export const salesData = Array.from({ length: 100 }).map((_, i) => ({
  id: `sale-${i + 1}`,
  date: dates[Math.floor(Math.random() * dates.length)],
  amount: Math.floor(Math.random() * 1000) + 50,
  product: ["Laptop", "Smartphone", "Tablet", "Headphones", "Monitor"][Math.floor(Math.random() * 5)],
  category: ["Electronics", "Accessories", "Software"][Math.floor(Math.random() * 3)],
  customer: `Customer ${Math.floor(Math.random() * 50) + 1}`,
  region: ["North America", "Europe", "Asia", "South America", "Africa", "Australia"][Math.floor(Math.random() * 6)],
  referral: Math.random() > 0.7 ? ["Google", "Facebook", "Twitter", "Instagram", "Direct"][Math.floor(Math.random() * 5)] : null
}));

// Dummy Product Data
export const productData = [
  { id: "prod-1", name: "Premium Laptop", category: "Electronics", price: 1299, stock: 45, sales: 78, revenue: 101322 },
  { id: "prod-2", name: "Smartphone Pro", category: "Electronics", price: 899, stock: 120, sales: 156, revenue: 140244 },
  { id: "prod-3", name: "Wireless Headphones", category: "Accessories", price: 249, stock: 200, sales: 310, revenue: 77190 },
  { id: "prod-4", name: "Ultra HD Monitor", category: "Electronics", price: 549, stock: 65, sales: 42, revenue: 23058 },
  { id: "prod-5", name: "Productivity Software", category: "Software", price: 199, stock: 999, sales: 230, revenue: 45770 }
];

// Dummy Currency Data
export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 150.23 }
];

export const taxRates = [
    { region: "North America", rate: 0.1 },
    { region: "Europe", rate: 0.15 },
    { region: "Asia", rate: 0.08 },
    { region: "South America", rate: 0.12 },
    { region: "Africa", rate: 0.05 },
    { region: "Australia", rate: 0.09 },
  ];
  
  export const referralData = [
    { source: "Google", leads: 120 },
    { source: "Facebook", leads: 85 },
    { source: "Twitter", leads: 50 },
    { source: "Instagram", leads: 40 },
    { source: "Direct", leads: 70 }
  ];
  
