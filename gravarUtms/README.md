## Gravar Utms no orderForm da VTEX.
Olá meu amigo(a),

Se você chegou aqui, provavelmente está com problemas para identificar as UTMS no checkout da VTEX. 
Pensando nisso, criei esse script do arquivo gtm.txt para de forma bem simples você conseguiu resolver essa sua dor.

Problema
---------
Quando eu possuo um botão de carrinho no meu site que não é o controle nativo da VTEX, as UTMs não estão sendo armazeneadas no checkout e consequentemente não gravadas no meu pedido.

Motivo
--------
A VTEX quando recebe as UTMs, ela grava num cookie chamado IPS. Elas só são armazenadas no orderForm quando o produto vai para o carrinho pelos controles nativos da VTEX.
Quando você envia o produto para o carrinho da VTEX sem usar o controle nativo, você está esquecendo de enviar os dados do marketingData (utms) para o orderForm da VTEX.


Solução
--------
Copiar o conteúdo do arquivo gtm.txt no seu Google Tag Manager e associá-lo a todas as páginas.
Fabio, eu posso associá-lo apenas na tela do carrinho? Sim você pode, porque o cookie IPS é mantido a todo momento. 

Passo a passo:
- Abra o Google Tag Manager pelo link https://marketingplatform.google.com/intl/pt-BR_br/about/tag-manager/
- Na lista de containers, clique no seu e em Espaço de trabalho
- na aba Tags, clique em Nova
- No título, preecha "xp-utms" ou outro nome qualqquer
- Na caixa "Configuração da tag", escolha "HTML personalizado"
- Na caixa HTML, cole o conteúdo do arquivo gtm.txt que está aqui no repositório em https://github.com/xpagencia/vtex/blob/master/gravarUtms/gtm.txt
- Na caixa Acionamento, escolha a opção ALL Pages
- Clique em Salvar
- Clique em enviar e preencha os dados
- Cante como se ninguém tivesse ouvindo

Espero que ajud e fique com Deus.
