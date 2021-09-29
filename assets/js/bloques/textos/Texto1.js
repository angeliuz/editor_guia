class Texto1 extends Titulo {
  id = "te_001";

  data = {
    nombre: "Título con clase",
    data: {
      plantilla_id: this.id,
      categoria: 0,
      indice: 1,
      texto: "Lorem ipsum dolor sit, elit, sed do tempor ut labore et dolore magna. Ut enim ad minim, quis exercitation laboris nisi ut ex ea. Aute dolor in in esse dolore eu nulla pariatur. Sint non, sunt in culpa qui officia mollit anim id est.",
    },
  };
  static getId() {
    return this.id;
  }
  constructor() {
    super();
  }

  setData(data) {
    this.data.data.texto = data.texto;
  }

  render() {
    let html = Plantilla.renderDrag();
    html += '<div class="msp-70 mep-20 d-flex justify-start f-nunito fsp-13 fw-300 color-2E">';
    html += '  <div data-texto="texto" class="px-4 text-input">' + this.data.data.texto + "</div>";
    html += "</div>";
    return html;
  }
}
