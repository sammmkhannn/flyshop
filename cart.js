//the text element
// let cartText = document.querySelector("#wishlist");
// cartText.innerText = Json.parse(localStorage.getItem("cart")).length;

const Text = (text, styles) => {
  let txt = document.createElement("p");
  txt.innerHTML = text;
  for (let stl in styles) {
    txt.style[stl] = styles[stl];
  }
  return txt;
};

//the button element
const Button = (text, styles) => {
  let button = document.createElement("button");
  for (let stl in styles) {
    button.style[stl] = styles[stl];
  }
  button.innerHTML = text;
  return button;
};

//the view element
const View = (text, styles) => {
  let view = document.createElement("div");
  view.innerHTML = text;
  for (let stl in styles) {
    view.style[stl] = styles[stl];
  }
  return view;
};

//the card element
const Card = (src, text, images, styles) => {
  let card = document.createElement("div");
  let container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.height = "100%";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  let img = Image(src, styles.image);
  //add a class to the image element
  img.classList.add("image");
  //  card.appendChild(img);
  container.appendChild(img);
  let gallery = document.createElement("div");
  gallery.style.display = "flex";
  gallery.style.flexDirection = "row";
  gallery.style.justifyContent = "center";
  gallery.style.alignItems = "center";
  gallery.style.columnGap = "5px";
  gallery.style.flexWrap = "wrap";
  gallery.style.height = "250px";
  gallery.style.backgroundColor = "skyblue";
  gallery.style.width = "250px";
  gallery.style.position = "absolute";
  gallery.zIndex = "1";
  gallery.style.opacity = "0";
  for (let image of images) {
    let img = Image(image, styles.gImage);
    img.addEventListener("mouseover", () => {
      img.style.transition = "all 0.5s ease-in-out";
      img.style.height = "100%";
      img.style.width = "100%";
      img.style.position = "relate";
    });
    img.addEventListener("mouseout", () => {
      img.style.transition = "all 0.5s ease-in-out";
      img.style.height = "80px";
      img.style.width = "100px";
      img.style.position = "static";
    });
    gallery.appendChild(img);
  }
  //set opacity to 1 on hover
  gallery.addEventListener("mouseover", () => {
    gallery.style.opacity = "1";
  });
  //set opacity to 0.1 on mouseout
  gallery.addEventListener("mouseout", () => {
    gallery.style.opacity = "0";
  });

  //add a class to the gallery element
  gallery.classList.add("gallery");
  container.appendChild(gallery);
  card.appendChild(container);
  let details = document.createElement("div");
  let paragraph = Text(text, styles.text);
  paragraph.innerHTML = text;
  details.appendChild(paragraph);
  let btn = Button("Remove", styles.button);
  btn.addEventListener("click", (event) => {
    //hide the card
    card.style.display = "none";
    event.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart.length > 0) {
      for (let item of cart) {
        if (item.id === img.src) {
          let index = cart.indexOf(item);
          cart.splice(index, 1);
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      render();
    }
  });

  details.appendChild(btn);
  details.style.display = "flex";
  details.style.justifyContent = "space between";
  card.appendChild(details);

  for (let stl in styles.card) {
    card.style[stl] = styles.card[stl];
  }

  return card;
};

// the image element
const Image = (src, styles) => {
  let image = document.createElement("img");
  image.src = src;
  for (let stl in styles) {
    image.style[stl] = styles[stl];
  }
  return image;
};

let styles = {
  image: {
    height: "240px",
    width: "200px",
    objectFit: "cover",
    boxShadow: "2px 4px 8px rgba(255,255,255,255,1)",
  },
  text: {
    color: "black",
  },
  card: {
    borderRadius: "20px",
    backgroundColor: "#d1d2d3",
    width: "250px",
    height: "auto",
    object: "relative",
    padding: "20px 20px",
  },
  button: {
    backgroundColor: "plum",
    zIndex: 1,
    marginTop: "20px",
    borderRadius: "8px",
    color: "black",
  },
  gImage: {
    height: "80px",
    width: "100px",
    objectFit: "cover",
    //    position: "absolute",
  },
};

function render() {
  let cartList = document.querySelector("#cartList");
  //remove all the children
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length > 0) {
    cart.map((el) => {
      cartList.appendChild(Card(el.src, el.price, el.images, el.style));
    });
  } else {
    let noJobs = document.createElement("h1");
    noJobs.innerHTML = "Your Cart is Empty!";
    noJobs.style.textAlign = "center";
    noJobs.style.borderRadius = "20px";
    noJobs.style.backgroundColor = "white";
    noJobs.style.padding = "20px 20px";
    //add border and box shadow
    noJobs.style.boxShadow = "2px 4px 8px rgba(255,255,255,255,1)";
    noJobs.style.border = "1px solid black";
    //add margin top
    noJobs.style.marginTop = "100px";
    cartList.appendChild(noJobs);
  }
}
render();
