let Plantilla = {
  objetos: {},
  rutaCssBloques: "../../../../assets/css/bloques/",
  rutaScriptBloques: "../../../../assets/js/bloques/",
  _arrScript: {},
  _arrCss: {},
  cargarObjetos: function (cb) {
    let version = App.version;
    let css_titulo_padre = Plantilla.rutaCssBloques + "padres/titulo_padre_clase.css?v=" + version;
    let css_listado_padre = Plantilla.rutaCssBloques + "padres/listado_padre_clase.css?v=" + version;
    let css_imagen_padre = Plantilla.rutaCssBloques + "padres/col_imagen_clase.css?v=" + version;

    function cargarPadres(cb) {
      let contador_css = 0;
      let contador_script = 0;
      let total = 3;
      Plantilla.loadCss(css_titulo_padre, function () {
        contador_css++;
        finalizar();
      });
      Plantilla.loadCss(css_listado_padre, function () {
        contador_css++;
        finalizar();
      });

      Plantilla.loadCss(css_imagen_padre, function () {
        contador_css++;
        finalizar();
      });

      Plantilla.loadScript(Plantilla.rutaScriptBloques + "padres/Titulo.js?v=" + version, function () {
        contador_script++;
        finalizar();
      });

      Plantilla.loadScript(Plantilla.rutaScriptBloques + "padres/Listado.js?v=" + version, function () {
        contador_script++;
        finalizar();
      });

      Plantilla.loadScript(Plantilla.rutaScriptBloques + "padres/Imagen.js?v=" + version, function () {
        contador_script++;
        finalizar();
      });

      function finalizar() {
        if (contador_css == total && contador_script == total) {
          cb();
          return;
        }
        return;
      }
    }

    function cargarHijos() {
      let menus = {};
      for (let i = 0; i < Render.menu.length; i++) {
        menus[Render.menu[i].id] = Render.menu[i];
      }

      let dataPlantillas = [
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo1.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 1",
            imagen: "titulos/img_001.png",
            obj: function () {
              return new Titulo1();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo2.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 2",
            imagen: "titulos/img_002.png",
            obj: function () {
              return new Titulo2();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo3.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 3",
            imagen: "titulos/img_003.png",
            obj: function () {
              return new Titulo3();
            },
          },
        },
        // {
        //   css: css_titulo_padre,
        //   script: Plantilla.rutaScriptBloques + "titulos/Titulo12.js?v=" + version,
        //   menu: menus["ti"],
        //   data: {
        //     nombre: "Título 12",
        //     imagen: "titulos/img_012.png",
        //     obj: function () {
        //       return new Titulo12();
        //     },
        //   },
        // },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo5.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 5",
            imagen: "titulos/img_005.png",
            obj: function () {
              return new Titulo5();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo6.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 6",
            imagen: "titulos/img_006.png",
            obj: function () {
              return new Titulo6();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo7.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 7",
            imagen: "titulos/img_007.png",
            obj: function () {
              return new Titulo7();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo8.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 8",
            imagen: "titulos/img_008.png",
            obj: function () {
              return new Titulo8();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo9.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 9",
            imagen: "titulos/img_009.png",
            obj: function () {
              return new Titulo9();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo10.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 10",
            imagen: "titulos/img_010.png",
            obj: function () {
              return new Titulo10();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "titulos/Titulo11.js?v=" + version,
          menu: menus["ti"],
          data: {
            nombre: "Título 11",
            imagen: "titulos/img_011.png",
            obj: function () {
              return new Titulo11();
            },
          },
        },
        ///////////////////////LISTADOS
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado1.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 1",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado1();
            },
          },
        },
        {
          css: Plantilla.rutaCssBloques + "listados/li_002.css?v=" + version,
          script: Plantilla.rutaScriptBloques + "listados/Listado2.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 2",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado2();
            },
          },
        },
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado3.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 3",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado3();
            },
          },
        },
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado4.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 4",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado4();
            },
          },
        },
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado5.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 5",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado5();
            },
          },
        },
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado6.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 6",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado6();
            },
          },
        },
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado7.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 7",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado7();
            },
          },
        },
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado8.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 8",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado8();
            },
          },
        },
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado9.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 9",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado9();
            },
          },
        },

        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado10.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 10",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado10();
            },
          },
        },

        {
          css: Plantilla.rutaCssBloques + "listados/li_011.css?v=" + version,
          script: Plantilla.rutaScriptBloques + "listados/Listado11.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 11",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado11();
            },
          },
        },
        {
          css: css_listado_padre,
          script: Plantilla.rutaScriptBloques + "listados/Listado12.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 12",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado12();
            },
          },
        },
        {
          css: Plantilla.rutaCssBloques + "listados/li_013.css?v=" + version,
          script: Plantilla.rutaScriptBloques + "listados/Listado13.js?v=" + version,
          menu: menus["li"],
          data: {
            nombre: "Listado 13",
            imagen: "titulo_1.png",
            obj: function () {
              return new Listado13();
            },
          },
        },
        /////////////Textos
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "textos/Texto1.js?v=" + version,
          menu: menus["te"],
          data: {
            nombre: "Texto1",
            imagen: "textos/img_001.png",
            obj: function () {
              return new Texto1();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "textos/Texto2.js?v=" + version,
          menu: menus["te"],
          data: {
            nombre: "Texto2",
            imagen: "textos/img_002.png",
            obj: function () {
              return new Texto2();
            },
          },
        },
        /////////////Imagenes
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "imagenes/Imagen1.js?v=" + version,
          menu: menus["im"],
          data: {
            nombre: "Imagen1",
            imagen: "titulo_1.png",
            obj: function () {
              return new Imagen1();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "imagenes/Imagen2.js?v=" + version,
          menu: menus["im"],
          data: {
            nombre: "Imagen2",
            imagen: "titulo_1.png",
            obj: function () {
              return new Imagen2();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "imagenes/Imagen3.js?v=" + version,
          menu: menus["im"],
          data: {
            nombre: "Imagen3",
            imagen: "titulo_1.png",
            obj: function () {
              return new Imagen3();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "imagenes/Imagen4.js?v=" + version,
          menu: menus["im"],
          data: {
            nombre: "Imagen4",
            imagen: "titulo_1.png",
            obj: function () {
              return new Imagen4();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "imagenes/Imagen5.js?v=" + version,
          menu: menus["im"],
          data: {
            nombre: "Imagen5",
            imagen: "titulo_1.png",
            obj: function () {
              return new Imagen5();
            },
          },
        },
        /////////////Col Imágenes
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen1.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 1",
            imagen: "col_img/titulo_001.png",
            obj: function () {
              return new Colimagen1();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen2.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 2",
            imagen: "col_img/titulo_002.png",
            obj: function () {
              return new Colimagen2();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen3.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 3",
            imagen: "col_img/titulo_003.png",
            obj: function () {
              return new Colimagen3();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen4.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 4",
            imagen: "col_img/titulo_004.png",
            obj: function () {
              return new Colimagen4();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen5.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 5",
            imagen: "col_img/titulo_005.png",
            obj: function () {
              return new Colimagen5();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen6.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 6",
            imagen: "col_img/titulo_006.png",
            obj: function () {
              return new Colimagen6();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen7.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 7",
            imagen: "col_img/titulo_007.png",
            obj: function () {
              return new Colimagen7();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen8.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 8",
            imagen: "col_img/titulo_008.png",
            obj: function () {
              return new Colimagen8();
            },
          },
        },
        {
          css: css_imagen_padre,
          script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen9.js?v=" + version,
          menu: menus["co"],
          data: {
            nombre: "Col Imagen 9",
            imagen: "col_img/titulo_009.png",
            obj: function () {
              return new Colimagen9();
            },
          },
        },
        //////////////cabeceras
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "cabeceras/Cabecera1.js?v=" + version,
          menu: menus["ca"],
          data: {
            nombre: "Cabecera 1",
            imagen: "titulo_1.png",
            obj: function () {
              return new Cabecera1();
            },
          },
        },
        //////////////Rotulos
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo1.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 1",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo1();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo2.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 2",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo2();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo3.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 3",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo3();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo4.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 4",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo4();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo5.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 5",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo5();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo6.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 6",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo6();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo7.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 7",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo7();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo8.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 8",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo8();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo9.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 9",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo9();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo10.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 10",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo10();
            },
          },
        },
        {
          css: css_titulo_padre,
          script: Plantilla.rutaScriptBloques + "rotulos/Rotulo11.js?v=" + version,
          menu: menus["ro"],
          data: {
            nombre: "Rotulo 11",
            imagen: "titulo_1.png",
            obj: function () {
              return new Rotulo11();
            },
          },
        },
      ];

      let procesados = 0;
      let procesados_css = 0;
      for (let i = 0; i < dataPlantillas.length; i++) {
        let data = dataPlantillas[i];
        Plantilla.loadCss(data.css, function () {
          procesados_css++;
          finalizar(cb);
        });
        Plantilla.loadScript(data.script, function () {
          Plantilla.objetos[data.data.obj().id] = data.data.obj;
          data.menu.plantillas.push(data.data);
          procesados++;
          finalizar(cb);
        });
      }
      function finalizar(cb) {
        if (procesados == dataPlantillas.length && procesados_css == dataPlantillas.length) {
          cb();
          return;
        }
        return;
      }
      /*let indice = 0
                function cargar(){
                    let data = dataPlantillas[indice]
                    Plantilla.loadCss(data.css,function(){

                         Plantilla.loadScript(data.script,function(){
                            Plantilla.objetos[data.data.obj().id] = data.data.obj;
                            data.menu.plantillas.push(data.data);
                            indice++;
                            if(indice<dataPlantillas.length){
                                console.log('cargando')
                                cargar();
                            }else{
                                cb();
                                return;
                            }
                            
                         });

                    });
                }

                cargar();*/
    }

    cargarPadres(function () {
      cargarHijos();
    });
  },
  renderDrag: function () {
    //return '<div class="item_handle drag_handler"><i class="fas fa-th"></i></div>'
    return '<div class="drag_handler" title="Arrastrar"><i class="fas fa-th"></i></div><div class="remove_item" title="Eliminar"><i class="fas fa-trash-alt"></i></div>';
    //return '<div class="item_handle drag_handler"><i class="item_handle drag_handler_icon"></i></div>';
  },

  getPlantilla: function (data) {
    console.log(data);
    let plantilla = null;

    try {
      //plantilla = Plantilla.categorias[data.categoria].plantillas[data.indice].obj();

      console.log(Plantilla.objetos);
      plantilla = Plantilla.objetos[data.plantilla_id]();
    } catch (err) {}

    if (plantilla == null) {
      return;
    }

    plantilla.setData(data);
    return plantilla;
  },
  loadScript: function (scriptName, callback) {
    if (!Plantilla._arrScript[scriptName]) {
      Plantilla._arrScript[scriptName] = true;
      var body = document.getElementsByTagName("body")[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = scriptName;
      // then bind the event to the callback function
      // there are several events for cross browser compatibility
      // script.onreadystatechange = callback;
      script.onload = callback;
      // fire the loading
      body.appendChild(script);
    } else if (callback) {
      callback();
    }
  },
  loadCss: function (scriptCss, callback) {
    if (!Plantilla._arrCss[scriptCss]) {
      Plantilla._arrCss[scriptCss] = true;
      var head = document.getElementsByTagName("head")[0];
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = scriptCss;
      // then bind the event to the callback function
      // there are several events for cross browser compatibility
      // script.onreadystatechange = callback;
      css.onload = callback;
      // fire the loading
      head.appendChild(css);
    } else if (callback) {
      callback();
    }
  },
};
