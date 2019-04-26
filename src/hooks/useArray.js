import React from 'react'

function useArray(init = []) {
  const [array, setArray] = React.useState(init)
  const remove = id => setArray(list => list.filter(item => item !== id))
  const add = id => setArray(list => [...list, id])
  const toggle = id => {
    return array.includes(id) ? remove(id) : add(id)
  }

  return [array, toggle, add, remove]
}

export default useArray
