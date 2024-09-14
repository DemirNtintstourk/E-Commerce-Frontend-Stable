import React from 'react'
import { Welcome } from '../Components/Welcome/Welcome'
import { Popular } from '../Components/Popular/Popular'
import { NewCollections } from '../Components/NewCollections/NewCollections'



export const Shop = () => {
  return (
    <div>
      <Welcome/>
      <Popular/>
      <NewCollections/>
    </div>
  )
}
