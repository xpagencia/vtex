## Gravar Utms no orderForm da VTEX.
<p>Olá meu amigo(a),</p>
<p>Se você chegou aqui, provavelmente está com problemas para identificar as UTMS no checkout da VTEX. </p>
<p>Pensando nisso, criei esse script do arquivo gtm.txt para de forma bem simples você conseguir resolver essa sua dor.</p>

Problema
---------
<p>Quando eu possuo um botão de carrinho no meu site que não é o controle nativo da VTEX, as UTMs não estão sendo armazeneadas no checkout e consequentemente não gravadas no meu pedido.</p>

Motivo
--------
<p>A VTEX quando recebe as UTMs, ela grava num cookie chamado IPS.</p>
<p>As UTMs só são armazenadas no orderForm quando o produto vai para o carrinho pelos controles nativos da VTEX.</p>
<p>Quando você envia o produto para o carrinho da VTEX sem usar o controle nativo, você está esquecendo de enviar os dados do marketingData (utms) para o orderForm da VTEX.</p>


Solução
--------
<p>Copiar o conteúdo do arquivo gtm.txt no seu Google Tag Manager e associá-lo a todas as páginas.</p>
<p>Fabio, eu posso associá-lo apenas na tela do carrinho? Sim você pode, porque o cookie IPS é mantido a todo momento. </p>

<ul>
  <caption>Passo a passo:</caption>
<li>Abra o Google Tag Manager pelo link https://marketingplatform.google.com/intl/pt-BR_br/about/tag-manager/</li>
<li>Na lista de containers, clique no seu e em Espaço de trabalho</li>
<li>na aba Tags, clique em Nova</li>
<li>No título, preecha "xp-utms" ou outro nome qualquer</li>
<li>Na caixa "Configuração da tag", escolha "HTML personalizado"</li>
<li>Na caixa HTML, cole o conteúdo do arquivo gtm.txt que está aqui no repositório em https://github.com/xpagencia/vtex/blob/master/gravarUtms/gtm.txt</li>
<li>Na caixa Acionamento, escolha a opção ALL Pages</li>
<li>Clique em Salvar</li>
<li>Clique em enviar e preencha os dados</li>
<li>Cante como se ninguém tivesse ouvindo</li>
</ul>
<p>Espero que ajude e fique com Deus.</p>
