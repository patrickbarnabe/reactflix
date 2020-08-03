import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import FormField from '../../../components/FormField';
import Button from '../../../components/Menu/components/ButtonLink';

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [dadosCategoria, setDadosCategoria] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setDadosCategoria({
      ...dadosCategoria,
      [chave]: valor,
    });
  }

  function handlerChange(infoEvent) {
    setValue(
      infoEvent.target.getAttribute('name'),
      infoEvent.target.value,
    );
  }

  function handlerSubmit(form) {
    form.preventDefault();
    setCategorias([
      ...categorias,
      dadosCategoria,
    ]);

    setDadosCategoria(valoresIniciais);
  }

  useEffect(() => {
    if (window.location.href.includes('localhost')) {
      const URL = 'http://localhost:8080/categorias';
      fetch(URL)
        .then(async (respostaDoServer) => {
          if (respostaDoServer.ok) {
            const resposta = await respostaDoServer.json();
            setCategorias(resposta);
            return;
          }
          throw new Error('Não foi possível pegar os dados');
        });
    }
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {dadosCategoria.nome}
      </h1>

      <form onSubmit={handlerSubmit}>
        <FormField
          label="Nome da Categoria"
          type="input"
          name="nome"
          value={dadosCategoria.nome}
          onChange={handlerChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={dadosCategoria.descricao}
          onChange={handlerChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={dadosCategoria.cor}
          onChange={handlerChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0
        && (
        <div>
          Loading...
        </div>
        )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
