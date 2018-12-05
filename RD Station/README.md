<h1>Script para integrar a RD Station com a loja da VTEX</h1>
<p>O objetivo é ler todos os leads que cadastram o e-mail na newsletter da loja para serem considerados leads, leads qualificados, oportunidades e vendas na RD Station.</p>
<p>É importante entender que se o lead não se cadastrar na newsletter, não tem como saber qual o e-mail dele. Então, eu só conseguirei levá-lo para a RDStation se ele se cadastrar na loja pelo link "Minha conta" ou passar do carrinho para dar fluxo no cadastro dentro da RD Station.</p>
<p><b><font color="#ff0000">Todo o script é criado diretamente no seu GTM (Google Tag Manager). Não há nenhuma necessidade de abrir o admin da loja.</font></b></p>
<h2>Pré requisitos</h2>
<p>Os acionadores "All Pages", "ProductView", "cart" e "orderPlaced" precisam já existir no GTM.</p>
<p>Só é necessário editar a tag xpRDStation-Init para por os respectivos Tokens. O restante é só copiar e colar.</p>
<h2>Funcionalidades</h2>
<ul>
	<li>Lead: É quando o usuário se cadastra na newsletter ou faz o cadastro da loja. </li>
	<li>Lead qualificado: É quando um usuário cadastrado na RD Station, acessa um produto.</li>
	<li>Oportunidade: É quando um usuário que se cadastrou na na RD Station, acessa o carrinho.</li>
	<li>Venda: É quando um usuário, que se cadastrou na RD Station, realiza um pedido na loja.</li>
</ul>
