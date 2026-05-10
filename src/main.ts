import "./style.css";
import axios from "axios";
import { Product } from "./assets/Product";


type ProductType = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
};


const productsDiv = document.querySelector("#products") as HTMLDivElement;
const searchInput = document.querySelector("#search") as HTMLInputElement;
const categorySelect = document.querySelector("#category") as HTMLSelectElement;

let products: Product[] = [];



const getProducts = async () => {
  const response = await axios.get("https://dummyjson.com/products");

  const data: ProductType[] = response.data.products;

  products = data.map((p) => {
    return new Product(
      p.id,
      p.title,
      p.price,
      p.rating,
      p.thumbnail,
      p.category
    );
  });

  showProducts(products);
};

//visa produkter
const showProducts = (list: Product[]) => {
  productsDiv.innerHTML = "";

  list.forEach((product) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.thumbnail}" width="150" />
      <p>Pris: ${product.price} kr</p>
      <p>Rating: ${product.rating}</p>
      <p>Status: ${product.getAvailabilityStatus()}</p>
    `;

    productsDiv.appendChild(div);
  });
};

//sök
searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(text)
  );

  showProducts(filtered);
});

//kategorier
const getCategories = async () => {
  const response = await axios.get<string[]>(
    "https://dummyjson.com/products/categories"
  );

  categorySelect.innerHTML = `<option value="all">All categories</option>`;

  response.data.forEach((cat) => {
    const option = document.createElement("option");

    option.value = cat;
    option.innerText = cat;

    categorySelect.appendChild(option);
  });
};


categorySelect.addEventListener("change", () => {
  const value = categorySelect.value;

  if (value === "all") {
    showProducts(products);
    return;
  }

  const filtered = products.filter((p) => p.category === value);

  showProducts(filtered);
});

//start

const init = async () => {
  await getProducts();
  await getCategories();
};

init();