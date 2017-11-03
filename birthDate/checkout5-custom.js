$(document).ready(function(){
	$(".box-client-info-pf").append('<p class="birthdate input pull-left text mask"><label for="birthDate" data-bind="text: documentLabel">Data de aniversário</label><input type="date" id="birthDate" class="input-small"></p>');

  $(window).on("orderFormUpdated.vtex", function(e,_orderForm){
    birthDate = $("#birthDate");
  	if(birthDate.val().length == 0){
      var _email = ((_orderForm.clientProfileData != null) ? _orderForm.clientProfileData.email : $("#client-email").val());
      	if(_email.length == 0) _email = $("#client-pre-email").val();
      if(_email.length > 0){
          $.ajax({
          url: "https://api.vtexcrm.com.br/" + vtex.accountName + "/dataentities/CL/search/?_fields=birthDate&_where=email=" + _email,
          dataType: "json",
          type: "GET",
          crossDomain: !0,
          headers: {
            Accept: "application/vnd.vtex.ds.v10 json",
            "Content-Type": "application/json; charset=utf-8"
          },
            success: function(o) {
              if(o.length > 0) {
                birthDate.val(o[0].birthDate.split("T")[0]);
              } 
              console.log("get birthDate")
            },
          fail: function(e){console.log(e);console.log("erro get birthDate");}
        })
      }
    }
  });
}),
$(window).on("componentDone.vtex", function() {
  birthDate = $("#birthDate");
  if(birthDate.length>0 && vtexjs.checkout.orderForm.clientProfileData != null && birthDate.val().length > 0){
    $.ajax({
      url: "https://api.vtexcrm.com.br/" + vtex.accountName + "/dataentities/CL/documents/",
      dataType: "json",
      type: "PATCH",
      crossDomain: !0,
      data: JSON.stringify({email: vtexjs.checkout.orderForm.clientProfileData.email, birthDate: birthDate.val()}),
      headers: {
        Accept: "application/vnd.vtex.ds.v10 json",
        "Content-Type": "application/json; charset=utf-8"
      },
      success: function(e) {console.log(e), console.log("salvei birthDate")},
      fail: function(e){console.log(e);console.log("erro patch birthDate");}
    })
  }
})
