import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

import { getItemSelect, getSizesSelect } from '../../store/select'
import { actionClearItem } from '../../store/slice'
import { getItemThunk } from '../../store/thunk'

import 'swiper/css'
import 'swiper/css/pagination'

import styles from './styles.module.css'

export const ItemCard = () => {
  const dispatch = useDispatch()
  const { product } = useParams()

  // eslint-disable-next-line no-unused-vars
  const [ind, setInd] = useState(1)

  const items = useSelector(getItemSelect)
  const item = useSelector(getItemSelect)?.colors?.filter((product) => product.id === ind)[0]
  const sizes = useSelector(getSizesSelect)
  const colors = useSelector(getItemSelect)?.colors?.map((prod) => ({
    id: prod.id,
    color: prod.name,
  }))

  const handleClearItem = () => {
    dispatch(actionClearItem())
  }

  const getSize = (id) => {
    return sizes?.filter((size) => size.id === id)[0]
  }

  useEffect(() => {
    dispatch(getItemThunk(product))
  }, [])

  if (!item) return <h2>Loading...</h2>

  return (
    <section className={styles.itemCard}>
      <NavLink to={'/'}>
        <button className={styles.buttonBack} onClick={handleClearItem}>
          Back
        </button>
      </NavLink>
      {item && (
        <div className={styles.itemWrapper}>
          <h2>{items.name}</h2>
          <Swiper
            className='container image_container'
            modules={[Pagination]}
            spaceBetween={2}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {item.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={items.name} className={styles.image} />
              </SwiperSlide>
            ))}
          </Swiper>
          <p>Цена: {item.price} грн</p>
          <p>Описание: {item.description}</p>
          <div>
            <p>Цвет: </p>
            <select onChange={(e) => setInd(Number(e.target.value))}>
              {colors &&
                colors.map((name, index) => (
                  <option key={index} value={name.id} selected={item.id === name.id}>
                    {name.color}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <p>Размер: </p>
            {item.sizes.length === 0 ? (
              'Размеров нет'
            ) : (
              <select>
                {item.sizes.map((size, index) => (
                  <option value={size} key={index} selected={index === 0}>
                    {sizes ? `${getSize(size).label} (${getSize(size).number})` : size}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
