document.addEventListener('DOMContentLoaded', () => {
    //sidenav
    let menu = document.querySelector(".toggle");
        let nav = document.querySelector("ul");
        let before = document.querySelector("nav");
        menu.addEventListener("change", () => {
            nav.classList.toggle("show");
            before.classList.toggle("show");
        });
    //cart
    const cart_icon = document.querySelector(".cart-icon");
    const cart = document.querySelector(".cart");
    const cart_empty = document.querySelector(".cart-empty");
    const checkout = document.querySelector(".checkout");
    const cart_list = document.querySelector(".cart-list");
    const cart_Item_num = document.querySelector(".current-num");

    cart_icon.addEventListener("click", (e) => {
        e.preventDefault();
        cart.classList.toggle("show");
    });

    document.querySelectorAll(".product-item").forEach((item, index) => {
        let main_img = item.querySelector(".main-product img");
        let thumbs = item.querySelectorAll(".product-carousel img");
        let currentIndex = 0;

        thumbs.forEach((thumb, idx) => {
            thumb.addEventListener("click", (e) => {
                e.preventDefault();
                removeCurrent();
                currentIndex = idx;
                updateMainImage();
                thumb.classList.add("current");
            });
        });

        function removeCurrent() {
            thumbs.forEach(thumb => thumb.classList.remove("current"));
        }

        function updateMainImage() {
            let num = thumbs[currentIndex].getAttribute("src").substring(20, 21);
            main_img.src = `./img/image-product-${num}.jpg`;
        }

        item.querySelector(".next").addEventListener("click", (e) => {
            e.preventDefault();
            removeCurrent();
            currentIndex = (currentIndex + 1) % thumbs.length;
            updateMainImage();
            thumbs[currentIndex].classList.add("current");
        });

        item.querySelector(".previous").addEventListener("click", (e) => {
            e.preventDefault();
            removeCurrent();
            currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
            updateMainImage();
            thumbs[currentIndex].classList.add("current");
        });

        let num = 0;
        const count = item.querySelector(".count");
        const removeBtn = item.querySelector(".remove");
        const addBtn = item.querySelector(".add");
        const addToCart = item.querySelector(".addCart");
        const price = item.querySelector(".price");
        const prod_name = item.querySelector(".name");
        removeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (num > 0) {
                num -= 1;
                count.innerHTML = num;
            }
        });

        addBtn.addEventListener("click", (e) => {
            e.preventDefault();
            num += 1;
            count.innerHTML = num;
        });
        let itemnum = 0;
        addToCart.addEventListener("click", (e) => {
            e.preventDefault();
            if (num > 0) {
                cart_empty.classList.add("hide");
                let existingItem = Array.from(cart_list.children).find(cartItem => {
                    return cartItem.querySelector(".cart-item-name").innerHTML === prod_name.textContent;
                });

                if (existingItem) {
                    let multiplier = existingItem.querySelector(".curr");
                    let add_up = existingItem.querySelector(".addUp");
                    let newQuantity = parseInt(multiplier.innerHTML) + num;
                    multiplier.innerHTML = newQuantity;
                    add_up.innerHTML = (Number(price.textContent) * newQuantity).toFixed(2);
                } else {
                    let cart_item = document.createElement("div");
                    cart_item.classList.add("cart-item");

                    let cart_img = document.createElement("img");
                    cart_img.classList.add("img");
                    cart_img.src = main_img.src;
                    cart_item.appendChild(cart_img);

                    let cart_details = document.createElement("div");
                    cart_details.classList.add("cart-item-details");

                    let cart_name = document.createElement("p");
                    cart_name.classList.add("cart-item-name");
                    cart_name.innerHTML = prod_name.textContent;
                    cart_details.appendChild(cart_name);

                    let cart_item_price = document.createElement("p");
                    cart_item_price.classList.add("cart-item-price");

                    let cart_price = document.createElement("span");
                    cart_price.classList.add("cart-price");
                    cart_price.innerHTML = price.textContent;

                    let multiplier = document.createElement("span");
                    multiplier.classList.add("curr");
                    multiplier.innerHTML = count.textContent;
                    cart_price.appendChild(multiplier);
                    cart_item_price.appendChild(cart_price);

                    let add_up = document.createElement("span");
                    add_up.classList.add("addUp");
                    add_up.innerHTML = (Number(cart_price.textContent) * Number(multiplier.textContent)).toFixed(2);
                    cart_item_price.appendChild(add_up);
                    cart_details.appendChild(cart_item_price);
                    cart_item.appendChild(cart_details);

                    let del = document.createElement("button");
                    del.classList.add("del");

                    let del_icon = document.createElement("img");
                    del_icon.src = "./img/icon-delete.svg";
                    del.appendChild(del_icon);
                    cart_item.appendChild(del);

                    cart_list.appendChild(cart_item);

                    del.addEventListener("click", (e) => {
                        e.preventDefault();
                        let itemQuantity = parseInt(cart_item.querySelector(".curr").innerHTML);
                        itemnum -= itemQuantity;
                        cart_Item_num.innerHTML = itemnum;
                        cart_item.remove();
                        if (cart_list.children.length === 0) {
                            cart_empty.classList.remove("hide");
                            checkout.classList.remove("block");
                        }
                    });
                }
                
                itemnum += num;
                cart_Item_num.innerHTML = itemnum;
                checkout.classList.add("block");
            }
        });
    });
});

