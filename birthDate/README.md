Script para incluir o campo de Data de Nascimento no checkout.
Não é o melhor código do mundo, mas é funcional.
O objetivo é ler a entidade CL e atualizar o campo birthDate com o que está no formulário.
O campo é atualizado tanto na inclusão de cliente quanto alteração.
A edição do campo ocorre no updateForm.
É necessário que a entidade possua os campos 'birthDate' como leitura publica e 'email' como filtro publico.
