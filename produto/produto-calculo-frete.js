$(function () {
  if ($('body.categoria').length) {
    $('.filtrarpor').on('click', function () {
      console.log(".filtrarpor click");
      $('.filtrarpor.submenu-departamento').toggleClass('-active');
    });

    $("#filtrarpor [data-filtro]").on("click", function () {
      let url = window.location.href;
      url += (window.location.href.indexOf("?") == -1) ? "?" : (window.location.href.length - 1 == window.location.href.indexOf("?")) ? "" : "&";
      if (url.indexOf("?O=") > -1 || url.indexOf("&O=") > -1) {
        let urlVet = url.split("?");
        let posRemove = -1;
        if (urlVet.length == 2) {
          urlVet = urlVet[1].split("&");
          for (i = 0; i < urlVet.length; urlVet++) {
            let item = urlVet[i];
            item = item.split("=");
            if (item[0] == "O") {
              posRemove = i;
              break;
            }
          }
          if (posRemove > -1) {
            urlVet.splice(posRemove, 1);
          }
          url = url.substr(0, url.indexOf("?") + 1) + urlVet.join("&");
        }
      }
      url += "O=" + $(this).attr("data-filtro");
      window.location.href = url;
    });
  }
});

$(function () {
  $('[id^="helperComplement_"]').remove();
  var e = $('.button-buy-add-cart'),
    t = $('.shelf-btn-menos'),
    o = $('.shelf-btn-mais');
  function a() {
    vtexjs.checkout.getOrderForm({ cache: !1 }).done(function (e) {
      let t = document.querySelector('.mini-cart-itens'),
        o = new Object();
      if (e.items.length > 0) {
        $('.mini-cart-qty-admake').html(e.items.length), (t.innerHTML = '');
        let a,
          s = 0,
          i = e.value / 100;
        e.items.forEach(function (e, i) {
          let n = (e.price / 100).toString().replace('.', ',');
          (a = `\n                  <div class="mini-cart-item">\n                      <span class="imagem">\n                          <a class="sku-imagem" href="${e.detailUrl}">\n                              <img src="${e.imageUrl}"/>\n                          </a>\n                      </span>\n                      <span class="detalhes">\n                          <p class="nome-produto">\n                              <a href="${e.detailUrl}">${e.name}</a>\n                          </p>\n                          <span class="qtd-valor">\n                              <span class="qtd">${e.quantity}x</span>\n                              <span class="preco">${n}</span>\n                          </span>\n                      </span>\n                  </div>\n                `),
            (t.innerHTML += a),
            (a = ''),
            (o[i] = { price: parseInt(e.price), qtd: e.quantity }),
            ++s;
        }),
          $('#mini-cart-admake-total').html(
            i.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );
      }
    });
  }
  e.length &&
    e.on('click', function () {
      var e = $(this).siblings().attr('item-id'),
        t = $(this).siblings().find('.shelf-qtd').val();
      vtexjs.checkout.getOrderForm({ cache: !1 }).done(function () {
        var o = { id: e, quantity: t, seller: '1' };
        vtexjs.checkout.addToCart([o]).done(function (e) {
          $('.cart-loading').show(),
            $('.mini-cart-message').addClass('show'),
            setTimeout(function () {
              $('.cart-loading').hide(), $('.sucess').addClass('active-show');
            }, 800),
            setTimeout(function () {
              $('.mini-cart-message').removeClass('show'),
                $('.sucess').removeClass('active-show');
            }, 2500),
            a();
        });
      });
    }),
    a(),
    (function () {
      const e =
        '/api/catalog_system/pub/products/search' + window.location.pathname;
      $.ajax(e, 'GET', 'jsonp').then((e) => {
        if (e[0].Validade) {
          const t = e[0].Validade;
          $('.validate-box').append('<p>validade do produto ' + t + '</p>');
        }
      });
    })();
}),
  $(function () {
    $('.menu-burger').on('click', function () {
      $('.nav-mobile').addClass('-active');
    }),
      $('.submenu-mobile').hide(),
      $('.link-main-menu-mobile').on('click', function () {
        $(this).next('.submenu-mobile').toggle(), $(this).toggleClass('-open');
      }),
      $('.js-toggle-menu').on('click', function () {
        $('.nav-mobile').removeClass('-active');
      }),
      $(window).width() < 1199 &&
      ($('.bar-top').addClass('-scroll'), $('.header').addClass('-scroll')),
      $(window).scroll(function () {
        $(window).scrollTop() > 150
          ? ($('.bar-top').addClass('-scroll'),
            $('.header').addClass('-scroll'))
          : ($('.bar-top').removeClass('-scroll'),
            $('.header').removeClass('-scroll'));
      });
  }),
  $(function () {
    $('.home').length &&
      ($('.banner-desk, .banner-mob').slick({
        dots: !0,
        arrows: !0,
        infinite: !0,
        autoplay: !0,
        autoplaySpeed: 3e3,
        slidesToShow: 1,
        slidesToScroll: 1,
      }),
        $('.prateleira ul').slick({
          dots: !1,
          arrows: !0,
          infinite: !0,
          autoplay: !1,
          autoplaySpeed: 3e3,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: !0,
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: !0,
                autoplay: !1,
                autoplaySpeed: 3e3,
                dots: !1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                arrows: !0,
                slidesToShow: 2,
                autoplay: !0,
                infinite: !0,
                autoplaySpeed: 3e3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                arrows: !0,
                slidesToShow: 2,
                infinite: !0,
                autoplay: !0,
                autoplaySpeed: 3e3,
                slidesToScroll: 1,
              },
            },
          ],
        }),
        $('.partners .parceiros').slick({
          dots: !1,
          arrows: !0,
          infinite: !1,
          speed: 300,
          autoplay: !0,
          slidesToShow: 5,
          slidesToScroll: 1,
          autoplay: !0,
          autoplaySpeed: 3e3,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                arrows: !0,
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: !0,
                autoplay: !0,
                autoplaySpeed: 3e3,
                dots: !1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                arrows: !0,
                slidesToShow: 1,
                infinite: !0,
                autoplay: !0,
                autoplaySpeed: 3e3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                arrows: !0,
                slidesToShow: 2,
                infinite: !0,
                autoplay: !0,
                autoplaySpeed: 3e3,
                slidesToScroll: 1,
              },
            },
          ],
        }),
        $(window).width() < 500 &&
        ($('.badges .wrapper').slick({
          dots: !1,
          arrows: !0,
          infinite: !0,
          speed: 300,
          slidesToShow: 1,
          autoplay: !0,
          autoplaySpeed: 3e3,
          slidesToScroll: 1,
        }),
          $('.destaques-mobile').slick({
            dots: !1,
            arrows: !0,
            infinite: !0,
            speed: 300,
            slidesToShow: 1,
            autoplay: !0,
            autoplaySpeed: 3e3,
            slidesToScroll: 1,
          })));
  }),
  $(function () {
    if ($('.produto').length) {
      $('.prateleira ul').slick({
        dots: !1,
        arrows: !0,
        infinite: !0,
        autoplay: !1,
        autoplaySpeed: 3e3,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: !0,
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: !0,
              autoplay: !1,
              autoplaySpeed: 3e3,
              dots: !1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: !0,
              slidesToShow: 2,
              autoplay: !1,
              infinite: !0,
              autoplaySpeed: 3e3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: !0,
              slidesToShow: 2,
              infinite: !0,
              autoplay: !1,
              autoplaySpeed: 3e3,
              slidesToScroll: 1,
            },
          },
        ],
      });
      const t = $('#image-main'),
        o = $('.image-zoom');
      if (t.length) {
        const e = t.attr('src').replace('-292-292', '-400-400');
        t.attr('src', e),
          o.on('click', function (e) {
            e.preventDefault();
          });
      }
      var e = $('.buy-button-box');
      e.length &&
        (e.prepend(
          '<div class="pull-left box-qtd">\t<div class="bts pull-left">\t\t<button class="btn btn-menos">-</button>\t  <input type="text" class="qtd pull-left" value="1" />\t\t<button class="btn btn-mais">+</button> \t</div></div>'
        ),
          $(document).on(
            'keypress',
            '.buy-button-box .box-qtd .qtd',
            function (e) {
              var t = window.event ? event.keyCode : e.which;
              return (t > 47 && t < 58) || 8 == t || 0 == t;
            }
          ),
          $(document).on('keyup', '.buy-button-box .box-qtd .qtd', function (e) {
            $('.buy-button-box .box-qtd .qtd').val($(this).val());
          }),
          $(document).on('blur', '.buy-button-box .box-qtd .qtd', function (e) {
            var t = $(this);
            '' === t.val() || parseInt(t.val()) < 1
              ? $('.buy-button-box .box-qtd .qtd').val(1)
              : $('.buy-button-box .box-qtd .qtd').val(t.val());
          }),
          $(document).on('click', '.buy-button-box .box-qtd .btn', function () {
            var e = $(this),
              t = $('.buy-button-box .box-qtd .qtd'),
              o = parseInt(t.val());
            e.hasClass('btn-mais')
              ? t.val(o + 1)
              : e.hasClass('btn-menos') && o > 1 && t.val(o - 1);
          })),
        setTimeout(() => {
          $('.freight-zip-box').attr('placeholder', '00000-000');
        }, 500);

      calculoFrete.init({ btnOk: ".freight-btn", tipoLista: "resumido", el: ".freight-values" });
    }
  });

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
      let freteItemPadrao = { preco: null, descricao: null, tempo: null, delivery: true }
      let freteItemsMaisRapido = { ...freteItemPadrao };
      let freteItemsMaisBarato = { ...freteItemPadrao };

      let freteItems = $(dataResult).find("tbody tr").map((posicao, item) => {
        let $item = $(item);
        let descricao = $($item.find("td")[1]).text();
        let tempo = descricao;
        let freteItem = { ...freteItemPadrao };

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

        if (!freteItem.delivery) {
          descricao = descricao.substr(0, descricao.indexOf("(") - 1);
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

        return freteItem;
      });

      if (objData.tipoLista == "resumido") {
        //inclui todas as retiradas em loja
        freteLista = freteItems.filter(x => x.delivery == false);
        for (let i = 0; i < freteItems.length; i++) {
          let item = freteItems[i];
          if (!item.delivery) {
            freteLista.push(item);
          }
        }

        if (freteItemsMaisBarato.preco != null) {
          freteItemsMaisBarato.descricao = "Frete mais barato";
          freteLista.push(freteItemsMaisBarato);
        }

        if (freteItemsMaisRapido.tempo != null && freteItemsMaisBarato.tempo != null && freteItemsMaisBarato.descricao != freteItemsMaisRapido.descricao && (freteItemsMaisRapido.tempo <= freteItemsMaisBarato.tempo)) {
          freteItemsMaisRapido.descricao = "Frete mais rápido";
          freteLista.push(freteItemsMaisRapido);
        }
      } else {
        freteLista = freteItems;
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
