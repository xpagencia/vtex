# Produto - Cálculo de frete

O controle atual <vtex.cmc:shippingValue /> no VTEX.CMS não é legal porque não se adaptou as novidades da VTEX após o seu lançamento.

Como exemplo, podemos citar o retirada em loja e exibir apenas as opções de Mais barato e Mais rápido.

## Objetivo

Ajustar as opções de retirada em loja para não exibir o ID e ter a opção de visualização por detalhado ou resumido.

Tipos de listas possíveis: 

- detalhado: Irá exibir todas as opções de retirada em loja e de entrega.
- resumido: Irá exibir todas as opções de retirada em loja, a opção mais barata de entrega e a opção mais rápida de entrega.

### Funcionamento

Passos para instalação do arquivo JS:

- Faça o clone do arquivo para o seu CMS da VTEX.
- Faça a chamada do arquivo JS no template do produto.
- Em outro arquivo js ou no próprio template, utilize o script abaixo ou algo similar conforme a sua necessidade:

```
<script>
calculoFrete.init({ btnOk: ".freight-btn", tipoLista: "resumido", el: ".freight-values" });  
</script>
```
