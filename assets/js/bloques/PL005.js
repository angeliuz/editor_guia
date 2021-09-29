class PL005 {
  page_id = null;
  bloque_id = null;
  id = 'pl_005';
  bloque=null;
  bloques_db = null;
  bloque_db = null;
  columnas_db = null;
  btn_add = null;
  row_column = null;
  col_img = null;
  procesando = false;
  path = '../php/uploads/';
  estilos_titulos = {
    'checked':'display:inherit',
    '':'display:none',
  }
  data = {
        nombre:'Columnas imagen',
        data:{
           plantilla_id:'pl_005'
        },
        columnas:[
                {   
                    titulo:'Titulo 1', 
                    porcentaje:'100',  
                    ruta:'pagina_003/img1.svg',
                    orden:0,
                    is_texto:'checked'
                }/*,
                {
                    titulo:'Titulo 2',
                    porcentaje:'100',    
                    ruta:'pagina_003/img1.svg',
                }*/
                /*{
                    titulo:'Titulo 3',  
                    ruta:'./assets/images/images.svg',
                }*/
        ]
  };

  
  constructor (){


   
  

  };
  setData(data){
    this.data.columnas = data.columnas;

  };
  activar(page_id,bloque){
    this.page_id = page_id;
    this.bloque = bloque;
    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection('bloques');
    this.bloque_db = this.bloques_db.doc(bloque[0].id);
    this.columnas_db = this.bloque_db.collection('columnas');
    this.elementos()
    this.initListeners();

  }
  add(page_id,bloque,cb){

    this.page_id = page_id;
    this.bloque = bloque;

    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection('bloques');
    this.save(cb);
  };

  save(cb){
    this.bloque.addClass('item');
    this.bloque.removeClass('item-plantilla');
    this.bloque.html(Render.renderLoadingItem());
    let parent = this;
    this.firestoreSave(function(doc,col){
        parent.bloque_db = parent.bloques_db.doc(doc.id);
        parent.bloque.attr('data-docid',doc.id);
        parent.bloque.attr('data-pageid',parent.page_id);
        parent.bloque.removeAttr('data-plantilla_id');
        parent.bloque.removeAttr('data-indice');
        parent.data.columnas[0].doc_id = col.id;
        parent.bloque.html(parent.render());

        parent.elementos()
        parent.initListeners();

        cb();
    });

  };

  elementos(){
      this.col_img = this.bloque.find('.col-img');
      this.btn_add = this.bloque.find('.btn_add')[0];
      this.row_column = this.bloque.find('.row-column')[0];
  }
  initListeners(){
    let parent = this;
    for(let i=0; i<this.col_img.length; i++){

          this.columnasChildren(this.col_img[i]);

    }

    $(this.btn_add).click(function(){


       
       let data = parent.data.columnas[0];
       data.orden = parent.col_img.length;
       $(parent.row_column).append(parent.renderColumna(data,-1)); 
       parent.col_img = parent.bloque.find('.col-img');
       let indice = parent.col_img.length-1;

       let columna = parent.col_img[indice];
       let loading =  $(columna).find('.loading_005')[0];

      
       $(loading).show();
       parent.columnas_db.add(data).then((op)=>{
          $(loading).hide();
          $(columna).attr('data-docid',op.id)
           parent.columnasChildren(columna);
          parent.colBorder();

       });
    

    })
   
   

    
  }

  colBorder(){
      for(let i=0; i<this.col_img.length; i++){

        console.log(i);
        let border = 'border-color-CC border-3 border-right-dashed';
        if(i!=this.col_img.length-1){
          $(this.col_img[i]).addClass(border);
        }
        else{
          $(this.col_img[i]).removeClass(border);
        }
        
      }
  }

  columnasChildren(columna){
        let parent = this;
        let input_number = $(columna).find('.input-number')[0];
        let img = $(columna).find('.img-columna')[0];
        let nav = $(columna).find('.nav-image')[0];
        let range = $(columna).find('.input-range')[0];
        let form = $(columna).find('.form-upload')[0];
        let btn_file = $(columna).find('.btn-file')[0];
        let loading =  $(columna).find('.loading_005')[0];
        let btn_delete =  $(columna).find('.btn_delete')[0];
        let doc_id = $(columna).data('docid');
        let text_input = $(columna).find('.text-input')[0];
        let check_input = $(columna).find('.form-check-input')[0];
        let titulo_div = $(columna).find('.titulo-div')[0];
        

        let dropzone = new Dropzone(form, { 
           url: "../php/upload.php",
           dictDefaultMessage: "",
           uploadMultiple: false,
           imageUpload :{
            maxFilesize:10,
            maxFiles: 1,
            acceptedFiles: ".jpeg,.jpg,.png,.gif",
           }
        });

        new MediumEditor($(text_input),EditorTexto.optionsEditor);

        dropzone.on("addedfile", function(file) {
          $(loading).show();
        });

        dropzone.on("success", function(file) {
            let response = file.xhr.responseText;
            let ruta = parent.path+response
           
            this.removeFile(file);
            let data = {
              'ruta':ruta
            }
             //$(img).hide();
            
            parent.columnas_db.doc(doc_id).update(data).then((doc)=>{
                $(loading).hide();
                 $(img).attr('src',parent.path+response);
                //$(img).show();
            });
            //parent.bloque_db.update(data);
        })

       
        $(btn_delete).click(function(){

            let col = $(this).parents('.col-img');
            $(loading).show();
            parent.columnas_db.doc(doc_id).delete().then((doc) =>{
                col.remove();

                parent.ordenar(parent.bloque.find('.col-img'),function(){

                  $(loading).hide();
                    parent.col_img = parent.bloque.find('.col-img');
                    parent.colBorder();
                  });

                
            });

            //col.remove();
            //parent.col_img = parent.bloque.find('.col-img');
            //parent.colBorder();

        })
        

        $(btn_file).click(function(){
          $(form).get(0).dropzone.hiddenFileInput.click();
        })

        $(img).mouseover(function(){
            $(nav).show();
            $(img).css('border','1px dotted #cccccc');
        })
        $(img).mouseout(function(){
            $(nav).hide();
            $(img).css('border','none');
        })
        $(nav).mouseover(function(){
            $(nav).show();
            $(img).css('border','1px dotted #cccccc');
        })
        $(nav).mouseout(function(){
            $(nav).hide();
            $(img).css('border','none');
        })

        check_input.addEventListener("input", function() {
          let valor = 'checked';
          if($(this).is(":"+valor)){
            $(titulo_div).show();
          }
          else{
            $(titulo_div).hide();
            valor = '';
          }
          let data = {
            'is_texto':valor
          }
          
          parent.columnas_db.doc(doc_id).update(data);

          

        }, false);

        text_input.addEventListener("input", function() {

        
          let texto = $(this).data("texto");


          if(!texto){
            return;
          }
    
          let data = {};
          data[texto] = $(this).html();

          parent.columnas_db.doc(doc_id).update(data);
         


        }, false);

        input_number.addEventListener('input', function () {

            if(!this.value){
              return;
            }
            if(this.value>100){
              this.value = 100;
            }
            if(this.value<0){
              this.value = 0;
            }
            let porcentaje = this.value+'%';

            let data = {
              'porcentaje':this.value
            }
            parent.columnas_db.doc(doc_id).update(data);

            $(range).val(this.value);
            $(img).css('width',porcentaje)

        });
        range.addEventListener('input', function () {
    
          let porcentaje = this.value+'%';
          let valor = this.value;
          $(input_number).val(valor)

          $(img).css('width',porcentaje)


        }, false);

        range.addEventListener('change', function () {
    
          let porcentaje = this.value+'%';
          let valor = this.value;
          $(input_number).val(valor)

          $(img).css('width',porcentaje)
          let data = {
            'porcentaje':valor
          }
          parent.columnas_db.doc(doc_id).update(data);

         

        }, false);
  }

  

  firestoreSave(cb){
    let parent = this
    this.bloques_db.add(this.data.data).then((doc) =>{
      let doc_item = doc;
      parent.bloque.attr('id',doc.id)
      parent.bloque.addClass(parent.id);
      parent.bloque_id = doc.id;
      parent.columnas_db = parent.bloques_db.doc(doc.id).collection('columnas');
      parent.columnas_db.add(this.data.columnas[0]).then((col)=>{
        cb(doc_item,col);
      });
      
    });
  }

  renderForm(){
    let html = '<form action="" class="dropzone form-upload">';
    html+= '<div class="fallback">';
    html+= '<input name="file" type="file"/>';
    html+= '</div>';
    html+= '</form>';
    return html;
  }
  renderLoading(){
        return '<div class="loading_005"><img src="../assets/images/loaders/loader-02.svg"></div>';
  }

  renderAdd(){
        return '<div class="btn_add"><i class="fas fa-plus"></i></div>';
  }

  renderDelete(){
        return '<div class="btn_delete"><i class="fas fa-trash-alt"></i></div>';
  }

  renderCheck(data){

      let html ='<div class="ck_visible">';
      html +='<div class="form-check">';
      html +='  <input class="form-check-input" type="checkbox" value="" '+data.is_texto+'>';
      html +='</div>';
      html +='</div>';
      return html;
      
  }

  renderRange(data){
    let html = '<div class="range-imagen">';
    html+= '<input type="range" class="form-range input-range" value="'+data.porcentaje+'"></div>';
    return html;
  }
  renderNav(data){
    let html = '';
    html += '<nav class="nav-image" aria-label="Page navigation">';
    html += '<ul class="menu">';
    html += '  <li class="menu-item"><a class="menu-link btn-file" href="javascript:void(0)"><i class="fas fa-image"></i></a></li>';
    html += '  <li class="menu-item"><a class="menu-link " href="javascript:void(0)"><input class="input-number form-control" min="0" max="100" value="'+data.porcentaje+'" type="number"></a></li>';
    html += '</ul>';
    html += this.renderRange(data);
    html += '</nav>';
    return html;
  }
  renderColumna(data,i){

    let border = '';
    
    if(i!=this.data.columnas.length-1 && i!=-1){
      border = 'border-color-CC border-3 border-right-dashed';
    }

    let html = '';
    html+='<div data-docid="'+data.doc_id+'" class="col p-0 mb-2 mt-2 d-flex justify-content-center f-nunito color-2E ps-20 '+border+' col-img">';
    html+=' <div class="row p-0 m-0" style="position:relative;">';
    html+=this.renderDelete();
    html+=this.renderCheck(data);
    html+='   <div class="col-12 p-0 m-0 titulo-div" style="'+this.estilos_titulos[data.is_texto]+'">';
    html+='     <div data-texto="titulo" class="d-flex w-100 p-2 justify-content-center f-nunito fs-5 color-2F text-input">'+data.titulo+'</div>';
    html+='   </div>';
    html+='   <div class="col-12 p-2 m-0">';
    html+='     <div class="d-flex w-100 justify-content-center p-0" style="position:relative;">';
    html+=this.renderLoading()
    html+=this.renderNav(data);
    html+=this.renderForm()
    html+='       <img src="'+data.ruta+'" class="img-columna" width="'+data.porcentaje+'%">';
    html+='     </div>';
    html+='   </div>';
    html+=' </div>';
    html+='</div>';
    return html;
  }

 
  
  
  render(){
    let html = Plantilla.renderDrag();


    html+='<div class="p-2 w-100" >';
    html+=' <div class="row  p-0 m-0">';
    html+='   <div class="col  p-0 m-0">';
    html+=      '<div class="d-block p-0 ms-90 me-50 border border-3 rounded-10 border-color-CC" style="position:relative;">';
     html+=this.renderAdd();
    html+='         <div class="row p-0 m-0 row-column">';

    console.log(this.data.columnas);
    for(let i=0; i<this.data.columnas.length; i++){

      html+= this.renderColumna(this.data.columnas[i],i);    

    }

    html+='         </div>';
    html+='      </div>';
    html+='   </div>';
    html+='  </div>';
    html+='</div>';
    return  html;
  }

  ordenar(lis,cb){

    if(lis.length==0){
      cb();
      return;
    }

    let bloques_db = this.bloques_db;
    let columnas_db = this.columnas_db;
    let indice = 0;
    
    let orden = 0;

    update();

    function update(){

      let data = {
        "orden": orden,
      };
      let op_id = $(lis[indice]).data('docid');
      columnas_db.doc(op_id).update(data).then((doc) =>{
         
         if(indice<lis.length-1){
            orden++;
             indice++;
             update();
         }
         else{
          cb();
          return;
         }
        
      });
    } 


  }




  
}