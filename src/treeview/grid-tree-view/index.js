import React from 'react'
import styled from 'styled-components'

import GridRow from '../grid-row'

const Container = styled.div`
  margin-left: 40px;
`

const GridTreeView = ({ data, onSave, onDelete, onUpdate }) => {
  return (
    <Container>
      {data.map((item) => (
        <GridRow
          key={item.id}
          data={item}
          onSave={onSave}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </Container>
  )
}

export default GridTreeView
