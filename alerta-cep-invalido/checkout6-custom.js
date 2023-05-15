/* 
* Atenção para as configurações iniciais, que constam no readme.md, antes da chamada xpCep.Init() 
*/

const xpAlerta = {
  alertaCarrinho:function(msg, titulo, adicional) {
    if (msg == undefined || msg == ""){
      this.close();
      return;
    }
    var obj = $(".xp-alerta");
    if (obj.length == 0) {
  
      var html = '<div class="xp-alerta alert alert-warning" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="content"><i class="icon-exclamation-sign icon-3x fa fa-exclamation-triangle"></i>';
      if(titulo != undefined){
        html += '<h3 class="alert-heading">' + titulo + '</h3>';
      }
      html+= '<p class="texto">' + msg + '</p>';
      if(adicional != undefined && adicional != ""){
        html += '<div class="adicional"><hr><p class="mb-0">' + adicional + '</p></div>';
      }
      html += '</div></div>';
      $(".container-main").prepend(html)
    } else {
        obj.find(".texto").html(msg);
        obj.show('slow')
      }
    if (obj.length > 0){
      if (obj.find(".texto").text() == ""){
        obj.hide()
      }
    }
  },
  close:function(){
    $(".xp-alerta").alert("close");
  }
}

const xpCep = {
  data:{
    mensagens:{
      alerta:{
        titulo: "CEP não encontrado",
        mensagem: `O CEP ##cepinvalido## digitado é inválido ou possui restrições.<br/>Para maiores esclarecimentos, favor consultar a nossa equipe de atendimento.`,
        adicional: ""
      }
    }
  },
  alertaCepInvalido: function(orderForm){
    function Executar(orderForm){
      if(orderForm.shippingData != null && orderForm.shippingData.selectedAddresses != null && orderForm.shippingData.selectedAddresses.length > 0){
        let selectedAddress = orderForm.shippingData.selectedAddresses[0];
        if(selectedAddress != null  && selectedAddress.state == null || selectedAddress.city == null){
          let mensagemAlerta = xpCep.data.mensagens.alerta;
          xpAlerta.alertaCarrinho(mensagemAlerta.mensagem.replace("##cepinvalido##", selectedAddress.postalCode), mensagemAlerta.titulo, mensagemAlerta.adicional);
          return;
        }
      }
      xpAlerta.close();
    }
    if(orderForm != undefined){
      Executar(orderForm);
    }else{
      vtexjs.checkout.getOrderForm().then((orderForm)=> {
        Executar(orderForm);
      });
    }    
  },
  events: function(){
    $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
      this.alertaCepInvalido(orderForm);
    });
  },
  init: function(){
    this.alertaCepInvalido();
    this.events();
  },
  
}
  
$(window).load(function(){
  xpCep.init();
});