$(document).on("ready", function () {
  // initialization of go to
  // $.HSCore.components.HSGoTo.init(".js-go-to");
  // Example menu definititon:
  const menu = [
    {
      title: "Títulos (Claudia)",
      enlace: "index.html",
    },
    {
      title: "Textos (Claudia)",
      enlace: "shortcode-textos.html",
    },
    {
      title: "Imágenes (Tamara)",
      enlace: "shortcode-imagenes.html",
    },
    {
      title: "Listas (Erik)",
      enlace: "#",
      submenus: [
        { title: "Listas agrupadas", enlace: "shortcode-listas.html" },
        {
          title: "Elementos de listas",
          enlace: "shortcode-listaselementos.html",
        },
      ],
    },
    {
      title: "Rótulos (Claudia)",
      enlace: "shortcode-rotulos.html",
    },
    {
      title: "Columnas con imagenes (David)",
      enlace: "shortcode-col-img.html",
    },
    {
      title: "Columnas con textos (David)",
      enlace: "shortcode-col-text.html",
    },
    {
      title: "Cajas de respuestas (Cristián)",
      enlace: "shortcode-respuestas.html",
    },
    {
      title: "Cajas de contenidos (Jorge)",
      enlace: "shortcode-cajascontenidos.html",
    },
    {
      title: "Tablas (Jorge)",
      enlace: "shortcode-tablas.html",
    },
    {
      title: "Iconos ()",
      enlace: "shortcode-iconos.html",
    },
    {
      title: "Elementos ()",
      enlace: "shortcode-elementos.html",
    },
  ];
  function populateMenu(menu) {
    console.log(menu.length);

    for (let i = 0; i < menu.length; i++) {
      let botonSolo = "";
      if (menu[i].submenus) {
        console.log(menu[i].submenus);
      } else {
        botonSolo =
          '<li class="js-shortcode-filter__item nav-item bases"><a href="' +
          menu[i].enlace +
          '" class="nav-link ">' +
          menu[i].title +
          "</a></li>";
        $(".menu").append(botonSolo);
      }
    }
  }

  // Provide the DOM element where the menu should be inserted:
  populateMenu(menu);
});
