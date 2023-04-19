import React, { useState } from 'react'
import { Dialog, IconButton } from 'evergreen-ui'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

const Button = styled.div`
  border-radius: 4px;
  color: #808080;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  padding: 8px;
  right: 0;
  top: 0;

  &:hover {
    background-color: #f5f5f5;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  height: 28px;
  margin-bottom: 12px;
`

const Label = styled.label`
  margin-bottom: 4px;
`

const Form = ({ icon, children, parentId, onSubmit, rowId }) => {
  const [vis, setVis] = useState(false)

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')

  const validation = name !== '' && quantity !== '' && description !== ''

  const product = {
    parentId: parentId,
    id: rowId ? rowId : uuid(),
    name,
    quantity,
    description,
    children: children ? children : [],
  }

  return (
    <div>
      {icon ? (
        <IconButton appearance="minimal" icon={icon} onClick={() => setVis(true)} />
      ) : (
        <Button onClick={() => setVis(true)}>Adicionar Produto</Button>
      )}
      {vis && (
        <Dialog
          cancelLabel="Cancelar"
          confirmLabel="Salvar"
          isConfirmDisabled={!validation}
          isShown={vis}
          preventBodyScrolling
          title="Cadastrar Produto"
          onCloseComplete={() => setVis(false)}
          onConfirm={(close) => {
            close()
            onSubmit(product)
            alert('produto salvo com sucesso!')
          }}
        >
          <ModalContent>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" onChange={(e) => setName(e.target.value)} />

            <Label htmlFor="quantity">Quantidade</Label>
            <Input id="quantity" type="text" onChange={(e) => setQuantity(e.target.value)} />

            <Label htmlFor="description">Descrição</Label>
            <Input id="description" type="text" onChange={(e) => setDescription(e.target.value)} />
          </ModalContent>
        </Dialog>
      )}
    </div>
  )
}

export default Form
