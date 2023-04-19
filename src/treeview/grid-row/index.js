import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, EditIcon, IconButton, TrashIcon, PlusIcon } from 'evergreen-ui'

import GridTreeView from '../grid-tree-view'
import Form from '../../form'

const Td = styled.td`
  cursor: pointer;
  padding: 20px;
  color: #4f4f4f;
`

const DivIcons = styled.div`
  align-items: center;
  padding-left: 20px;
  display: flex;
`

const Labels = styled.div`
  align-items: center;
  display: flex;
`

const Row = styled.div`
  align-items: center;
  border-top: solid 1px #c0c0c0;
  display: flex;
  justify-content: space-between;
  margin-right: 40px;
`

const GridRow = ({ data, onSave, onDelete, onUpdate }) => {
  const [vis, setVis] = useState(false)

  const handleToggle = () => {
    setVis(!vis)
  }

  return (
    <>
      <Row onClick={handleToggle}>
        <Labels>
          <ChevronDownIcon color="#A9A9A9" />
          <Td>{data.name}</Td>
          <Td>{data.description}</Td>
          <Td>{data.quantity}</Td>
        </Labels>
        <DivIcons>
          <Form
            onSubmit={onUpdate}
            children={data.children}
            icon={EditIcon}
            rowId={data.id}
            parentId={data.parentId}
          />
          <IconButton
            appearance="minimal"
            icon={TrashIcon}
            onClick={() => {
              onDelete(data.id)
              alert('produto excluído com sucesso!')
            }}
          />

          <Form parentId={data.id} onSubmit={onSave} icon={PlusIcon} />
        </DivIcons>
      </Row>
      {vis && data.children && data.children.length > 0 && (
        <GridTreeView
          data={data.children}
          onSave={onSave}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </>
  )
}
export default GridRow
