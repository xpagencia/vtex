# Impedir qualquer pixel de reprocessar no orderPlaced

<p>Para que o analytics, purchase do facebook ou qualquer outro pixel não reprocesse na tela de orderplaced da VTEX, criamos um conjunto de comandos (tags, acionadores e variáveis) no GTM (Google Tag Manager).</p>
<p>Esses "comandos", farão com que os pixels sejam processados sempre que não haja na url o hash #processado=true. Porém, quando esse hash não estiver na url, uma tag do GTM irá incluíla.</p>
<p>Assim, qualquer uma dessas operações não irão mais reprocessar os pixels da tela de orderForm:</p>
- Copiar a url para abrir em outro navegador
- Atualizar a página
- Reabrir o navegador direto na tela de orderPlaced
- Compartilhar a url com outra pessoa
- Outras opções que não seja o processo padrão de compra na VTEX.

## Criar os comandos no GTM

Para você criar os comandos no GTM, basta importar o arquivo "GTM-orderplaced-processado.json" para o GTM pela aba de administrador, seguindo os passos abaixo:

- abra o GTM https://marketingplatform.google.com/intl/pt-BR_br/about/tag-manager/;
- Vá na aba Administrador;
- Na seção "Contêiner", clique em "Importar contêiner";
- Clique em "Escolher arquivo do contêiner" e selecione o arquivo json que você baixou aqui do repositório;
- Clique em "Escolher área de trabalho" Existente e selecione "Default workspace";
- Clique em "Escolher uma opção de importação" e marque como "Combinar";
- Clique em Substituir acionadores, tags e variáveis em conflito;
- Avalie se não está ferrando nada :);
- Clique em Confirmar e "cante como se ninguém estivesse ouvindo".

Não funcionou? Então abra um Issue em https://github.com/xpagencia/vtex/issues

Funcionou? Então marque a opção Star na direita acima do repositório e ajude a disseminar o conhecimento.
