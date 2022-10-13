import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Produto from '../../../models/Produto';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/TokensReducer';

function ListaProdutos() {

    let navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto[]>([])
    const token = useSelector<TokenState, TokenState['tokens']>(
    (state)=> state.tokens
) 

useEffect(() => {
  if (token === ''){
    alert('Erro de conexão, realize o Login novamente')
    navigate('/login')
  }
}, [token])

async function getProdutos() {
  await busca("/produtos", setProdutos, {
      headers: {'Authorization': token}
    })
}

useEffect(() => {
  getProdutos()
}, [produtos.length])
  return (
    <Grid>
       {
        produtos.map(produtos => (
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Produtos
            </Typography>
            <Typography variant="h5" component="h2">
            {produtos.nome}
            </Typography>
            <Typography variant="body2" component="p">
            {produtos.descricao}
            </Typography>
            <Typography variant="body2" component="p">
            {produtos.quantidade}
            <Typography variant="body2" component="p">
            {produtos.preco}
            </Typography>
            <Typography variant="body2" component="p">
            {produtos.categoria?.tipo}
            </Typography>
            <Typography variant="body2" component="p">
            {produtos.usuario?.nome}
            </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>

              <Link to={`/atualizarProduto/${produtos.id}`}>
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    Atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarProduto/${produtos.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    Deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
              ))
            }
      </Grid>)
}

export default ListaProdutos