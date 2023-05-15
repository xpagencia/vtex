/* 
mexer apenas nas linhas 5 e 36 para adaptação do motivo do bloqueio.
*/

function AtivarBtnBlocked() {

  function pagamentoLiberado(){
    return true;
  }
    
  function processarForm(mensagem) {
        if (mensagem == undefined || mensagem.length == 0) {
            $("#payment-data-submit").trigger("click");
        } else {
            vtex.checkout.MessageUtils.showMessage({ status: false, text: mensagem });
        }
    }

    if ($("#payment-data-submit-blocked").length == 0) {
        $btnBlocked = $('<button id="payment-data-submit-blocked" class="submit btn btn-success btn-large btn-block" tabindex="200"><i class="icon-spinner icon-spin" style="display: none;"></i><span>Finalizar compra</span></button>');
        $(".payment-submit-wrap").append($btnBlocked);

        $(window).on('checkoutRequestBegin.vtex', function (e) {
            e.preventDefault();
            $("#payment-data-submit-blocked").find(".icon-lock").hide();
            $("#payment-data-submit-blocked").find(".icon-spin").show();
        });
        $(window).on('checkoutRequestEnd.vtex', function (e) {
            e.preventDefault();
            $("#payment-data-submit-blocked").find(".icon-spin").hide();
            $("#payment-data-submit-blocked").find(".icon-lock").show();
        });

        $("body").on("click", "#payment-data-submit-blocked", function () {
            //valida as possibilidades de bloqueios.

            if (pagamentoLiberado()) {
                processarForm();
            } else {
                processarForm("Mensagem explicando porque você não pode seguir com o pagamento.");
            }
        });
    }
}

$(window).on('hashchange', function (e) {
    if (e.originalEvent.newURL.indexOf("/checkout/#/payment") > -1) {
        AtivarBtnBlocked();
    }
});
$(window).load(function () {
    AtivarBtnBlocked();
});


$(document).ready(function () {
    AtivarBtnBlocked();
});
