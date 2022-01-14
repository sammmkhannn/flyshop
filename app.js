//the text element
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
    });
    img.addEventListener("mouseout", () => {
      img.style.transition = "all 0.5s ease-in-out";
      img.style.height = "80px";
      img.style.width = "100px";
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
  let btn = Button("Add to Cart", styles.button);
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    //store the image, price, style,color,size in local storage
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
      cart = [];
    }
    cart.push({
      src: src,
      images: images,
      price: styles.price,
      style: styles.style,
      color: styles.color,
      size: styles.size,
    });
    alert("saved to local storage");
    localStorage.setItem("cart", JSON.stringify(cart));
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
let text = "price:";
$(document).ready(function () {
  $.getJSON("boots.json", function (jd) {
    for (let j in jd) {
      let stage = document.querySelector(".products");
      let card = Card(
        jd[j][Object.keys(jd[j])[4]],
        text + jd[j].price,
        jd[j].images.slice(0, 5),
        styles
      );
      stage.appendChild(card);
    }
  });
});
$("#srch").click((event) => {
  let search = document.querySelector("#search").value;
  let container = document.querySelector(".products");
  if (search == "") {
    alert("Please enter a size,style,price or gender");
  } else {
    $.getJSON("boots.json", function (jd) {
      jd = jd.filter((j) => {
        return (
          j.style === search ||
          j.size === toString(search) ||
          j.price === search ||
          j.gender === search
        );
      });
      while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
      }

      if (jd.length > 0) {
        for (let j in jd) {
          let stage = document.querySelector(".products");
          let card = Card(
            jd[j][Object.keys(jd[j])[4]],
            text + jd[j].price,
            jd[j].images.slice(0, 5),
            styles
          );
          stage.appendChild(card);
        }
      } else {
        document.querySelector("products").innerHTML = document.createElement(
          "h2"
        ).innerText = "No matches found!";
      }
    });
  }
});

function searchByGender(event, gender) {
  let container = document.querySelector(".products");
  event.preventDefault();
  $.getJSON("boots.json", function (jd) {
    jd = jd.filter((j) => {
      return j.gender === gender;
    });

    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    if (jd.length > 0) {
      for (let j in jd) {
        let stage = document.querySelector(".products");
        let card = Card(
          jd[j][Object.keys(jd[j])[4]],
          text + jd[j].price,
          jd[j].images.slice(0, 5),
          styles
        );
        stage.appendChild(card);
      }
    } else {
      document.querySelector("products").innerHTML = document.createElement(
        "h2"
      ).innerText = "No matches found!";
    }
  });
}

//search by style
function searchByStyle(event, brand) {
  let container = document.querySelector(".products");
  event.preventDefault();
  $.getJSON("boots.json", function (jd) {
    jd = jd.filter((j) => {
      return j.style === brand;
    });

    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    if (jd.length > 0) {
      for (let j in jd) {
        let stage = document.querySelector(".products");
        let card = Card(
          jd[j][Object.keys(jd[j])[4]],
          text + jd[j].price,
          jd[j].images.slice(0, 5),
          styles
        );
        stage.appendChild(card);
      }
    } else {
      document.querySelector("products").innerHTML = document.createElement(
        "h2"
      ).innerText = "No matches found!";
    }
  });
}

//searchBySize
function searchBySize(event, size) {
  let container = document.querySelector(".products");
  event.preventDefault();
  $.getJSON("boots.json", function (jd) {
    jd = jd.filter((j) => {
      return j.size === size;
    });

    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    if (jd.length > 0) {
      for (let j in jd) {
        let stage = document.querySelector(".products");
        let card = Card(
          jd[j][Object.keys(jd[j])[4]],
          text + jd[j].price,
          jd[j].images.slice(0, 5),
          styles
        );
        stage.appendChild(card);
      }
    } else {
      document.querySelector("products").innerHTML = document.createElement(
        "h2"
      ).innerText = "No matches found!";
    }
  });
}

//searchByColor

function searchByColor(event, color) {
  let container = document.querySelector(".products");
  event.preventDefault();
  $.getJSON("boots.json", function (jd) {
    jd = jd.filter((j) => {
      return j.colors.indexOf(`${color}`) > 0;
    });

    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    if (jd.length > 0) {
      for (let j in jd) {
        let stage = document.querySelector(".products");
        let card = Card(
          jd[j][color],
          text + jd[j].price,
          jd[j].images.slice(0, 5),
          styles
        );
        stage.appendChild(card);
      }
    } else {
      document.querySelector("products").innerHTML = document.createElement(
        "h2"
      ).innerText = "No matches found!";
    }
  });
}

//searchByPrice
function searchByPrice(event, price) {
  let container = document.querySelector(".products");
  event.preventDefault();
  $.getJSON("boots.json", function (jd) {
    jd = jd.filter((j) => {
      return j.price === price;
    });

    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    if (jd.length > 0) {
      for (let j in jd) {
        let stage = document.querySelector(".products");
        let card = Card(
          jd[j][Object.keys(jd[j])[4]],
          text + jd[j].price,
          jd[j].images.slice(0, 5),
          styles
        );
        stage.appendChild(card);
      }
    } else {
      document.querySelector("products").innerHTML = document.createElement(
        "h2"
      ).innerText = "No matches found!";
    }
  });
}
