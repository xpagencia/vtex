# Restrição de Entrega - Correios - Plataforma VTEX

<p>Esse script foi criado para gerar um alerta no checkout da VTEX quando houver qualquer tipo de restrição de entrega para o Correios no CEP informado pelo usuário no site.</p>
<p>A consulta ao Correios é feita de forma online e assíncrona. Sendo assim, mesmo que o Correios esteja fora do ar ou lento, o script não afeta o desempenho do restante do site.</p>

----------
## Instalação
Crie 1 tag no Google Tag Manager:
* Abra o GTM em <a href="https://tagmanager.google.com/#/home">https://tagmanager.google.com/#/home</a> e acesso o seu workspace de trabalho
* Clique na seção de TAGS a esquerda da tela
* Clique no botão Nova Tag
* Dê um nome qualquer
* Escolha a opção Tipo da tag : HTML Personalizado
* Cole o código do GTM.txt
* Em acionamento: selecione o evento personalizado "cart" (talvez seja necessário criá-lo).
* Salve tudo e seja feliz

Depois de instalado, basta testar a ferramenta no carrinho usando o CEP 26380-044 como exemplo de restrição.

## Avançado

Após feita a instalação, o sistema já pode ser usado normalmente. Mas, se você desejar, pode personaliza-lo um pouco.
Configurações completas do plugin:

### CSS
Todo o CSS do alerta, pode ser ajustado em arquivo independente ou direto no <style> do arquivo GTM.TXT
  
### Configurações Javascript
É possível informar alguns parâmetros durante o tempo de execução do script.
* xpFrete.cepOrigem = "89211-465": o cep de origem é o que será considerado como origem na consulta do webservice do Corrreios. Sendo assim, é bom usá-lo com o CEP do local do seu estoque.
* xpFrete.selectedSlaAtivos = [{id:'Pac',tabelaCorreio:'04596'},{id:'Sedex',tabelaCorreio:'04553'}]: É um vetor de opções que serão exibidas no site. Esse item precisa ser ajustado de acordo com as suas configurações na VTEX. Se a seleção do frete não for uma das informadas no vetor, a mensagem não vai aparecer.

### Ex de chamada Inicial:
```javascript
$(window).load(function(){
  xpFrete.cepOrigem = "13525-000";
  xpFrete.selectedSlaAtivos = [{id:'Pac',tabelaCorreio:'04596'},{id:'Sedex',tabelaCorreio:'04553'}];
  xpFrete.Init();
})
```
----------

## Métodos

### xpAlerta.AlertaCarrinho(msg, titulo, adicional);

Esse método é utilizado para abrir a mensagem de alerta.

**Parâmetros:**

1. msg: Campo obrigatório. String do texto principal a ser exibido;
2. titulo: Campo opcional. String para informar o título do texto principal;
3. adicional: Campo opcional. String para informar um texto a mais. Esse parâmetro se for preenchido irá ativar uma linha (hr) abaixo do texto principal e colocará o texto do parâmetro abaixo da linha criada.

### xpAlerta.Close();

Esse método é utilizado para fechar a janela de alerta.

### xpFrete.Init();

<p>Esse método é utilizado para inicializar o script de validação de restrição. É aconselhável fazer as chamadas de cepOrigem e selectedSlaAtivos antes da chamada desse método.</p>
<p>Nesse método ele cria as chamadas do método xpFrete.AlertaRestricao() através do window.load() e do evento orderFormUpdated.vtex.

### xpFrete.AlertaRestricao(orderForm);

<p>Esse é o método principal do sistema e é chamado através do xpFrete.Init() ou de um script personalizado do programador que estiver usando o script.</p>
<p>Ele serve para fazer a consulta no Correios e retornar para o xpAlerta.AlertaCarrinho() a mensagem de observação que o Correios retornar.</p>

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
