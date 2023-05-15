# Alerta CEP inválido - Plataforma VTEX

Esse script foi criado para gerar um alerta no checkout da VTEX quando houver qualquer tipo de restrição de entrega para o Correios no CEP informado pelo usuário no site.

A consulta ao Correios é feita de forma online e assíncrona. Sendo assim, mesmo que o Correios esteja fora do ar ou lento, o script não afeta o desempenho do restante do site.

----------

## Instalação

1. Copie o código do checkout6-custom.css e checkout6-custom.js para dentro dos seus respectivos na pasta [https://cpad.myvtex.com/admin/portal/#/sites/default/code]https://cpad.myvtex.com/admin/portal/#/sites/default/code.

* Salve tudo e seja feliz

Depois de instalado, basta testar a ferramenta no carrinho usando o CEP 22793-141 como exemplo de inválido.

## Avançado

Após feita a instalação, o sistema já pode ser usado normalmente. Mas, se você desejar, pode personaliza-lo um pouco.
Configurações completas do plugin:

### CSS

Todo o CSS do alerta, pode ser ajustado no checkout6-custom.css.
  
### Configurações Javascript

É possível informar alguns parâmetros durante o tempo de execução do script.

* xpCep.data.mensagens.alerta.mensagem = mensagem que aparecerá para o caso de cep inválido.
* xpCep.data.mensagens.alerta.titulo = título que aparecerá para o caso de cep inválido.
* xpCep.data.mensagens.alerta.adicional = mensagem que aparecerá abaixo da mensagem principal para o caso de cep inválido.

### Ex de chamada Inicial:

```javascript
$(window).load(function(){
  xpCep.Init();
})
```

----------

## Métodos

### xpAlerta.AlertaCarrinho(msg, titulo, adicional)

Esse método é utilizado para abrir a mensagem de alerta.

**Parâmetros:**

1. msg: Campo obrigatório. String do texto principal a ser exibido;
2. titulo: Campo opcional. String para informar o título do texto principal;
3. adicional: Campo opcional. String para informar um texto a mais. Esse parâmetro se for preenchido irá ativar uma linha (hr) abaixo do texto principal e colocará o texto do parâmetro abaixo da linha criada.

### xpAlerta.Close()

Esse método é utilizado para fechar a janela de alerta.

### xpCep.Init()

Esse método é utilizado para inicializar o script de validação de restrição.

Nesse método ele cria as chamadas do evento orderFormUpdated.vtex.

### xpCep.alertaCepInvalido(orderForm)

Esse é o método principal do sistema e é chamado através do xpCep.events() ou de um script personalizado do programador que estiver usando o script.

Ele serve para fazer a consulta na VTEX e retornar para o xpAlerta.AlertaCarrinho() a mensagem de observação caso o CEP seja inválido. 

Ele também serve para retirar a mensagem de alerta caso o cep seja válido.

**Parâmetros:**

1. orderForm: Campo opcional. Objeto VTEX que serve para indicar o orderForm da tela. Se não for informado, o método irá fazer um getOrderForm() para localizar o orderForm atual.

----------

### Atenção

> As extensões da plataforma VTEX são plugins javascript criados por desenvolvedores de interface ou pelo VTEX Lab (Laboratório de Inovações da VTEX) que podem ser inseridas em sua loja. Existem extensões gratuitas com código aberto - Open Source - e extensões pagas.
> Recomendamos que a instalação seja realizada pelos profissionais e empresas certificados pela VTEX. Porém, qualquer profissional de CSS, JavaScript e HTML pode executar esta tarefa.

> Esta extensão é mantida por [XP Agência](http://www.xpagencia.com.br) e não possui suporte gratuito.  
> O código fonte deste componente não pode ser vendido ou comercializado, ele esta livre para uso comercial mas só podem haver cobranças com relação à mão de obra necessária a sua instalação e não por sua utilização.  

> O correto funcionamento deste script não é de responsabilidade do seu desenvolvedor, mantenedor ou constribuidores.  

> Caso queira contribuir com o desenvolvimento fique a vontade para fazer um `Fork` e posteriormente um `pull request`.

> O método xpFrete.AlertaCarrinho() está ofuscado para proteger a inteligência do software para uso da XP Agência e por acharmos que não há necessidade de edição.

**O uso desta extensão esta sob as regras da lincença: <a href="http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT" target="_blank">[MIT]</a>**
