# Integração do Pixel do Facebook com a VTEX
------------------------------------------

A configuração do pixel do Facebook para integração com a VTEX é toda feita através do Google Tag Manager(GTM).
Não há a necessidade de executar nada no admin da VTEX.

## Importação manual
Aqui, dividi a configuração do GTM em 3 partes: Variáveis.txt, Acionadores.txt e Tags.txt.
Em cada arquivo txt tem todas as tags necessárias para criação do ambiente com todos os campos a serem preenchidos. Basta seguir um processo de ctrl+c, ctrl+v.
Essa opção é boa para quem tem medo de usar processos automáticos ou deseja fazer muitas modificações em nomes de tags.

## Importar automática
O JSON GTM-facebook.json é completo para importação. Basta ajustar o valor da variável FB-id.
Ótima opção para quem quer velocidade e não tem medo de se arriscar. Nada que um voltar versão não resolva kkkk.

## Atenção
Muitas variáveis e acionadores, pode ser que você já tenha configurado no GTM com outros nomes para outras integrações. Se for esse o seu caso, não há a necessidade de recria-los. Basta usar os mesmos e adaptar as chamadas de códigos para os nomes que você já utiliza.
