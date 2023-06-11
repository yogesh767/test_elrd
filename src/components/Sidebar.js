import React, { useState } from "react";

export default function Sidebar({product}) {
  console.log("product",product);
  const [activeMenu, setActiveMenu] = useState("product");
  console.log("activeMenu", activeMenu);
  return (
    <div className={`sidebar ${product && "h-100"}`}>
      <ul class="nav flex-column ">
        <li
          class={`nav-item ${activeMenu == "dashbord" && "menuactive"}`}
          onClick={() => setActiveMenu("dashbord")}
        >
          <a class="nav-link active" aria-current="page" href="#">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-border-all mr-5"
              viewBox="0 0 16 16"
            >
              <path d="M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z" />
            </svg>
            Dashbord
          </a>
        </li>
        <li
          class={`nav-item ${activeMenu == "product" && "menuactive"}`}
          onClick={() => setActiveMenu("product")}
        >
          <a class="nav-link active" aria-current="page" href="#">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-border-all mr-5"
              viewBox="0 0 16 16"
            >
              <path d="M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z" />
            </svg>
            All Products
          </a>
        </li>
        <li
          class={`nav-item ${activeMenu == "Orders" && "menuactive"}`}
          onClick={() => setActiveMenu("Orders")}
        >
          <a class="nav-link" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-border-all mr-5"
              viewBox="0 0 16 16"
            >
              <path d="M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z" />
            </svg>
            Orders
          </a>
        </li>
        <li
          class={`nav-item ${activeMenu == "Favoraties" && "menuactive"}`}
          onClick={() => setActiveMenu("Favoraties")}
        >
          <a class="nav-link" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-border-all mr-5"
              viewBox="0 0 16 16"
            >
              <path d="M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z" />
            </svg>
            Favoraties
          </a>
        </li>
        <li
          class={`nav-item ${activeMenu == "New Arival" && "menuactive"}`}
          onClick={() => setActiveMenu("New Arival")}
        >
          <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-border-all mr-5"
              viewBox="0 0 16 16"
            >
              <path d="M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z" />
            </svg>
            New Arival
          </a>
        </li>
      </ul>
    </div>
  );
}
