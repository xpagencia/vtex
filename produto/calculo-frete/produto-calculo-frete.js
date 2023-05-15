var calculoFrete = {
  data: {
    btnOk: '.freight-btn',
    tipoLista: "resumido",
    tipoTempo: "dias",
    lista: [],
    el: ".freight-values",
    mensagens: {
      erro: "Ocorreu um erro ao calcular o frete",
      semRegistro: "Não foi encontrado meio de entrega para o CEP informado."
    }
  },
  methods: {
    shippinOnButtomOkClick: function () {
      //console.log("desativei a função shippinOnButtomOkClick da VTEX.")            
    },
    ajaxShipping: function (method, url, postData, target, callback) {
      $.ajax({
        type: method,
        url: url,
        data: postData,
        success: function (dataResult) {
          if (callback != "" && callback != undefined) {
            callback(dataResult);
          } else {
            $(target).html(dataResult.trim());
            $(target).show();
          }
        },
        error: function (xhr, status, error) {
          $(target).html(status.trim());
          $(target).show();
          if (callback != "" && callback != undefined) {
            callback(status);
          }
        }
      });
    },
    montaLista: function (dataResult) {
      let obj = calculoFrete;
      let objData = obj.data;
      let freteLista = [];
      let freteItemPadrao = { id: null, preco: null, descricao: null, tempo: null, delivery: true }
      let freteItemsMaisRapido = { ...freteItemPadrao };
      let freteItemsMaisBarato = { ...freteItemPadrao };
      let freteItems = [];

      for (let posicao = 0; posicao < $(dataResult).find("tbody tr").length; posicao++) {
        let $item = $($(dataResult).find("tbody tr")[posicao]);
        let descricao = $($item.find("td")[1]).text();
        let tempo = descricao;
        let freteItem = { ...freteItemPadrao };

        freteItem.id = posicao;

        freteItem.preco = $($item.find("td")[0]).text().replace("R$", "").replace(",", ".");
        if (freteItem.preco.indexOf("Frete Grátis") > -1) {
          freteItem.preco = 0;
        } else {
          freteItem.preco = parseFloat(freteItem.preco);
        }

        tempo = tempo.split(",");
        if (tempo.length > 1) {
          tempo = tempo[1].replace("entrega em ", "");
          tempo = tempo.substr(0, tempo.indexOf("para o CEP") - 1).trim();
        } else {
          tempo = -1;
        }
        if (tempo.indexOf("dias úteis") > 0) {
          objData.tipoTempo = "dias úteis";
        }
        freteItem.tempo = parseFloat(tempo.replace("dias úteis", "").trim());

        freteItem.delivery = descricao.indexOf("(") == -1 && descricao.indexOf(")") == -1;

        if (freteItem.delivery) {
          descricao = descricao.substr(0, descricao.indexOf(",") - 1).trim();
        } else {
          descricao = descricao.substr(0, descricao.indexOf("(") - 1).trim();
        }
        freteItem.descricao = descricao;

        if (freteItem.delivery) {
          if (freteItemsMaisBarato.preco == null || freteItemsMaisBarato.preco > freteItem.preco) {
            freteItemsMaisBarato = { ...freteItem };
          }
          if (freteItemsMaisRapido.tempo == null || freteItemsMaisRapido.tempo > freteItem.tempo) {
            freteItemsMaisRapido = { ...freteItem };
          }
        }

        freteItems.push(freteItem);
      }

      //inclui todas as retiradas em loja
      let freteListaRetirada = freteItems.filter(x => x.delivery == false);
      for (let i = 0; i < freteListaRetirada.length; i++) {
        let item = freteListaRetirada[i];
        if (freteLista.find(x => x.descricao == item.descricao && x.preco == item.preco && x.tempo == item.tempo) == undefined) {
          freteLista.push(item);
        }
      }

      if (objData.tipoLista == "resumido") {
        if (freteItemsMaisBarato.preco != null) {
          freteItemsMaisBarato.descricao = "Frete mais barato";
          freteLista.push(freteItemsMaisBarato);
        }

        if (freteItemsMaisRapido.tempo != null && freteItemsMaisBarato.tempo != null && freteItemsMaisBarato.descricao != freteItemsMaisRapido.descricao && (freteItemsMaisRapido.tempo <= freteItemsMaisBarato.tempo)) {
          freteItemsMaisRapido.descricao = "Frete mais rápido";
          freteLista.push(freteItemsMaisRapido);
        }
      } else {
        let freteListaDelivery = freteItems.filter(x => x.delivery == true);
        for (let i = 0; i < freteListaDelivery.length; i++) {
          let item = freteListaDelivery[i];
          if (freteLista.find(x => x.descricao == item.descricao && x.preco == item.preco && x.tempo == item.tempo) == undefined) {
            freteLista.push(item);
          }
        }
      }

      $(objData.el).addClass((freteLista.length > 0) ? "resultado-ok" : "resultado-vazio");

      objData.lista = freteLista;
      return true;
    },
    formataRetorno: function () {
      let obj = calculoFrete;
      let objData = obj.data;
      let lista = objData.lista;
      let el = $(objData.el).find(".resultado");
      el.empty();
      el.append("<thead>");
      el.append("<tbody>");
      if (lista.length > 0) {
        el.find("thead").append("<tr><td>Valor</td><td>Tempo</td><td>Descrição</td></tr>");
        for (let i = 0; i < lista.length; i++) {
          let item = lista[i];
          let preco = "Frete grátis";
          if (item.preco > 0) {
            preco = item.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }
          let $item = $("<tr></tr>");
          $item.append(`<td>${preco}</td>`);
          $item.append(`<td>${item.tempo} ${objData.tipoTempo}</td>`);
          $item.append(`<td>${item.descricao}</td>`);
          el.find("tbody").append($item);
        }
      } else {
        el.find("thead").append("<tr><td>Erro</td></tr>");
        el.find("tbody").append(`<tr><td>${objData.mensagens.semRegistro}</td></tr>`);
      }
    }
  },
  events: function () {
    $(window).load(function () {
      var script = document.createElement("script");
      script.innerHTML = "function shippinOnButtomOkClick(){calculoFrete.methods.shippinOnButtomOkClick();}";
      document.body.appendChild(script);


      //preciso recriar a ajaxShippin da VTEX para uma minha, porque quero rodar a shippingValue() da VTEX e ela chama internamente uma ajaxShippin dela.
      var script2 = document.createElement("script");
      script2.innerHTML = "function ajaxShippin(method, url, postData, target, callback){calculoFrete.methods.ajaxShipping(method, url, postData, target, callback);}";
      document.body.appendChild(script2);

      ShippingValue();
    });
    $('body').on('click', this.data.btnOk, function () {
      let obj = calculoFrete;
      let objData = calculoFrete.data;
      let idSku = $("div#calculoFrete").attr("skuCorrente"); //Sku pode ter sido alterado
      let cep = $('.freight-zip-box').val().replace("-", "");
      let quantidade = $('.quantity input[name=quantity]').val();
      if (cep == "") {
        alert($('#CEPObrigatorio').val());
        return false;
      }
      if (cep == "00000000") {
        alert($('#CEPInvalido').val());
        return false;
      }
      if (quantidade == "" || parseInt(quantidade) <= 0) {
        alert($('#ProdutoQuantidadeObrigatorio').val());
        return false;
      }
      let dataToPost = { shippinCep: cep, quantity: quantidade };
      let url = '/frete/calcula/' + idSku;
      if ($(objData.el).find(".resultado").length == 0) {
        $(objData.el).show();
        $(objData.el).append(`<div class="resultado"></div>`);
      }
      ajaxShippin('GET', url, dataToPost, `${objData.el} .resultado`, function (dataResult) {
        if (calculoFrete.methods.montaLista(dataResult))
          calculoFrete.methods.formataRetorno();
      });
    });
  },
  init: function (options) {
    if (options != undefined) {
      if (options.btnOk != undefined) {
        this.data.btnOk = options.btnOk;
      }
      if (options.el != undefined) {
        this.data.el = options.el;
      }
      if (options.tipoLista != undefined) {
        this.data.tipoLista = options.tipoLista;
      }
    }
    this.events();
  }
}
