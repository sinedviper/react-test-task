import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { getItemsThunk, getSizesThunk } from '../../store/thunk'
import { getItemsSelect, getSizesSelect } from '../../store/select'

import styles from './styles.module.css'

export const Items = () => {
  const dispatch = useDispatch()
  const items = useSelector(getItemsSelect)
  const sizes = useSelector(getSizesSelect)

  useEffect(() => {
    if (!items) dispatch(getItemsThunk())
    if (!sizes) dispatch(getSizesThunk())
  }, [])

  if (!items) return <h2>Loading...</h2>

  return (
    <section className={styles.items}>
      {items.map((val) => (
        <NavLink to={`/${val.id}`} key={val.id} className={styles.itemsCard}>
          <h2>{val.name}</h2>
          <img src={val.colors[0].images[0]} alt={val.name} />
          <p>Цена: {val.colors[0].price} грн</p>
        </NavLink>
      ))}
    </section>
  )
}
