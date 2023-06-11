import React from "react";
import home from "../home.svg";
import defailtProduct from "../defailtProduct.svg";
export default function Footer({
  subcategories,
  setseleSubCategory,
  setproducts,
}) {
  return (
    <div className="footer">
      <div
        className="footerButtons"
        onClick={() => {
          setseleSubCategory();
          setproducts();
        }}
      >
        <img src={home} />
      </div>
      {
        subcategories && subcategories.length ?
        subcategories.map((sub,index)=>{
            return(
                <div className="footerButtons" key={sub.subCategoryId} onClick={()=>setseleSubCategory(sub.subCategoryId)}>
                <img src={ sub.subCategoryImageURL.length
                                ? sub.subCategoryImageURL
                                : defailtProduct} />
                </div>

            )
        })

        :<></>
      }
    </div>
  );
}
