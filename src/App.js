import React, { useState } from 'react'
import './App.css'
import styled from 'styled-components'

import Form from './form'
import GridTreeView from './treeview/grid-tree-view'

const Container = styled.div`
  margin: 60px;
`

const Total = styled.div`
  display: flex;
  margin: 40px;
  color: #696969;
`

function App() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || [])

  const countItems = (item) => {
    let count = 1
    if (item.children) {
      item.children.forEach((child) => {
        count += countItems(child)
      })
    }
    return count
  }

  const totalItems = products.reduce((count, item) => {
    return count + countItems(item)
  }, 0)

  const updateProductInTree = (tree, newProduct) => {
    return tree.map((product) => {
      if (product.id === newProduct.parentId) {
        return {
          ...product,
          children: [...product.children, newProduct],
        }
      }
      if (product.children && product.children.length > 0) {
        return {
          ...product,
          children: updateProductInTree(product.children, newProduct),
        }
      }
      return product
    })
  }

  const handleSave = (newProduct) => {
    if (newProduct.parentId) {
      const updatedProducts = products.map((product) => {
        if (product.id === newProduct.parentId) {
          return {
            ...product,
            children: [...product.children, newProduct],
          }
        }
        if (product.children && product.children.length > 0) {
          return {
            ...product,
            children: updateProductInTree(product.children, newProduct),
          }
        }
        return product
      })

      setProducts(updatedProducts)

      localStorage.setItem('products', JSON.stringify(updatedProducts))
    } else {
      setProducts([...products, newProduct])

      localStorage.setItem('products', JSON.stringify([...products, newProduct]))
    }
  }

  const updateItem = (id, attrs, state) => {
    return state.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...attrs,
        }
      }
      if (item?.children.length) {
        return {
          ...item,
          children: updateItem(id, attrs, item.children),
        }
      }
      return item
    })
  }

  const handleUpdate = (updatedProduct) => {
    const newData = updateItem(updatedProduct.id, updatedProduct, products)

    setProducts(newData)

    localStorage.setItem('products', JSON.stringify(newData))
  }

  const deleteItem = (data, rowId) => {
    return data
      .map((item) => item.id !== rowId && { ...item, children: deleteItem(item.children, rowId) })
      .filter(Boolean)
  }

  const handleDelete = (rowId) => {
    const newData = deleteItem(products, rowId)

    setProducts(newData)

    localStorage.setItem('products', JSON.stringify(newData))
  }

  return (
    <div className="App">
      <Container>
        <Form onSubmit={handleSave} />
      </Container>

      <GridTreeView
        data={products}
        onSave={handleSave}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <Total>Total de itens: {totalItems}</Total>
    </div>
  )
}

export default App
