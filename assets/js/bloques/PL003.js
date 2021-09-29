class PL003 {
  page_id = null;
  bloque_id = null;
  id = 'pl_003';
  bloque=null;
  bloques_db = null;
  bloque_db = null;
  range = null;
  form = null;
  nav = null;
  image = null;
  btn_file = null;
  align ={
    left:null,
    center:null,
    right:null,
  };
  alignToAbsolute = {
    'justify-content-start':'left',
    'justify-content-center':'center',
    'justify-content-end':'right',
  }

  path = '../php/uploads/';
  procesando = false;
  data = {
        nombre:'Imagen',
        data:{
            ruta:'../assets/images/images.svg',
            porcentaje:'40',
            alineacion:'justify-content-center',
            plantilla_id:'pl_003'
        }
  };

  getActiveButton(btn){
    if(this.data.data.alineacion=='justify-content-start' && btn=='left'){
      return 'active';
    }
    if(this.data.data.alineacion=='justify-content-center' && btn=='center'){
      return 'active';
    }
    if(this.data.data.alineacion=='justify-content-end' && btn=='right'){
      return 'active';
    }
    return '';
  }
  constructor (){

  };
  setData(data){

    this.data.data.ruta = data.ruta;
    this.data.data.porcentaje = data.porcentaje;
    this.data.data.alineacion = data.alineacion;

  };
  activar(page_id,bloque){
    this.page_id = page_id;
    this.bloque = bloque;
    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection('bloques');
    this.bloque_db = this.bloques_db.doc(bloque[0].id);
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
    this.firestoreSave(function(doc){
        parent.bloque_db = parent.bloques_db.doc(doc.id);
        parent.bloque.attr('data-docid',doc.id);
        parent.bloque.attr('data-pageid',parent.page_id);
        parent.bloque.removeAttr('data-plantilla_id');
        parent.bloque.removeAttr('data-indice');
        parent.bloque.html(parent.render());

        parent.elementos()
        parent.initListeners();

        cb();
    });

  };

  elementos(){
    this.range = this.bloque.find('.input-range')[0];
    this.image = this.bloque.find('.img-main')[0];
    this.form = this.bloque.find('.form-upload')[0];
    this.nav = this.bloque.find('.nav-image')[0];
    this.btn_file = this.bloque.find('.btn-file')[0];
    this.align.left = this.bloque.find('.btn-left')[0];
    this.align.center = this.bloque.find('.btn-center')[0];
    this.align.right = this.bloque.find('.btn-right')[0];
  }
  initListeners(){
    let parent = this;

    let myDropzone = new Dropzone(this.form, { 
       url: "../php/upload.php",
       dictDefaultMessage: "",
       multiple: false
    });

    myDropzone.on("success", function(file) {
        let response = file.xhr.responseText;
        let ruta = parent.path+response
        $(parent.image).attr('src',parent.path+response);
        this.removeFile(file);
        let data = {
          'ruta':ruta
        }
        parent.bloque_db.update(data);
    })

    $(this.btn_file).click(function(){
      $(parent.form).get(0).dropzone.hiddenFileInput.click();
    })

    
   
    //$(this.form).css('width',$(this.image).width());
    //$(this.form).css('height',$(this.image).height());

    function limpiar(container,li){
      container.removeClass('justify-content-start');
      container.removeClass('justify-content-center');
      container.removeClass('justify-content-end');
      $(parent.nav).removeClass('left');
      $(parent.nav).removeClass('center');
      $(parent.nav).removeClass('right');
      let lis  = li.parent().find('li');
      for(let i=0; i<lis.length; i++){
        $(lis[i]).removeClass('active')
      }
    }

    $(this.image).mouseover(function(){
        $(parent.nav).show();
        
        $(parent.image).css('border','1px dotted #cccccc');

    })
    $(this.image).mouseout(function(){
        $(parent.nav).hide();
        $(parent.image).css('border','none');
    })
    $(this.nav).mouseover(function(){
        $(parent.nav).show();
        $(parent.image).css('border','1px dotted #cccccc');
    })
   
    
    this.range.addEventListener('input', function () {
      
      let porcentaje = this.value+'%';
      let valor = this.value;

      $(parent.image).css('width',porcentaje)


    }, false);

    this.range.addEventListener('change', function () {
      
      
      let porcentaje = this.value+'%';


      $(parent.image).css('width',porcentaje)
      let valor = this.value;

       let data = {
        'porcentaje':valor
       }
       console.log('grabando');
       parent.bloque_db.update(data)

    }, false);

    $(this.align.left).click(function(){
      let container = $(parent.image).parent();
      let li = $(this).parent();
      limpiar(container,li);
      let alineacion = 'justify-content-start';
      container.addClass(alineacion);
      
      li.addClass('active');
      $(parent.nav).addClass('left');
      let data = {
        'alineacion':alineacion
       }
       

    })
    $(this.align.center).click(function(){
      let container = $(parent.image).parent();
      let li = $(this).parent();
      limpiar(container,li)
      let alineacion = 'justify-content-center';
      container.addClass(alineacion);
      li.addClass('active');
      $(parent.nav).addClass('center');
      let data = {
        'alineacion':alineacion
       }
       parent.bloque_db.update(data)
    })
    $(this.align.right).click(function(){
      let container = $(parent.image).parent();
      let li = $(this).parent();
      limpiar(container,li)
      let alineacion = 'justify-content-end';
      li.addClass('active');
      container.addClass(alineacion);
      $(parent.nav).addClass('right');
      let data = {
        'alineacion':alineacion
       }
       parent.bloque_db.update(data)
    })

    
  }

  

  firestoreSave(cb){
    let parent = this
    this.bloques_db.add(this.data.data).then((doc) =>{
      let doc_item = doc;
      parent.bloque.attr('id',doc.id)
      parent.bloque.addClass(parent.id);
      parent.bloque_id = doc.id;
      cb(doc_item);
    });
  }
  renderForm(){
    let html = '<form action="/file-upload" class="dropzone form-upload">';
    html+= '<div class="fallback">';
    html+= '<input name="file" type="file"/>';
    html+= '</div>';
    html+= '</form>';
    return html;
  }
  renderRange(){
    let html = '<div class="range-imagen">';
    html+= '<input type="range" class="form-range input-range" value="'+this.data.data.porcentaje+'"></div>';
    return html;
  }
  renderAlign(){
    let html = '<div class="justicar-imagen">';
    html+=  '<ul>';
    html+=  '<li><a href="javascript:void(0)" class="btn-left"><i class="fas fa-align-left"></i></a></li>';
    html+= '<li><a href="javascript:void(0)" class="btn-center"><i class="fas fa-align-center"></i></a></li>';
    html+=  '<li><a href="javascript:void(0)" class="btn-right"><i class="fas fa-align-right"></i></a></li>';
    html+=  '</ul>';
    html+= '</div>';
    return html;
  }
  renderNav(){
    let html = '';
    html += '<nav class="nav-image '+this.alignToAbsolute[this.data.data.alineacion]+'" aria-label="Page navigation">';
    html += '<ul class="menu">';
    html += '  <li class="menu-item"><a class="menu-link btn-file" href="javascript:void(0)"><i class="fas fa-image"></i></a></li>';
    html += '  <li class="menu-item '+this.getActiveButton('left')+'"><a class="menu-link btn-left" href="javascript:void(0)"><i class="fas fa-align-left"></i></a></li>';
    html += '  <li class="menu-item '+this.getActiveButton('center')+'"><a class="menu-link btn-center" href="javascript:void(0)"><i class="fas fa-align-center"></i></a></li>';
    html += '  <li class="menu-item '+this.getActiveButton('right')+'"><a class="menu-link btn-right" href="javascript:void(0)"><i class="fas fa-align-right"></i></a></li>';
    html += '</ul>';
    html += this.renderRange();
    html += '</nav>';
    return html;
  }
  render(){
    let html = Plantilla.renderDrag();

    html+= this.renderForm();
    //html+= this.renderAlign();
    //html+= this.renderRange();
   html+='<div class="p-0 w-100">';
    html+='     <div class="d-block ms-70">';
    html+='         <div class="row p-0 m-0">';
    html+='             <div class="col p-0 d-flex '+this.data.data.alineacion+'" style="position:relative;">';
    html+= this.renderNav();
    html+='                 <img class="img-main" src="'+this.data.data.ruta+'" width="'+this.data.data.porcentaje+'%">';
    html+='             </div>';
    html+='         </div>';
    html+='     </div>';
    html+='</div>';
    /*html+='     <div class="d-block">';
    html+='         <div class="p-0 m-0 w-100">';
    html+='             <div class="image-contenedor" style="position:relative;width:'+this.data.data.porcentaje+'%;">';
    html+= this.renderNav();
    html+='                 <img class="img-main" src="'+this.data.data.ruta+'">';
    html+='             </div>';
    html+='         </div>';
    html+='     </div>';*/
    return  html;
  }


  
}