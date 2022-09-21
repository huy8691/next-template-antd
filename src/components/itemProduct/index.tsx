import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Rate } from 'antd'
import { formatMoney } from 'src/utils/money.utils'
// import defaultImage from "/image/ProductImageComingSoon.png";
import classes from './styles.module.scss'
interface ImgProductType {
  url: string
}
type Props = {
  dataProduct: {
    id: number
    name: string
    thumbnails: Array<ImgProductType>
    prices: Array<{ price: number }>
    unit?: string
    minQuantity?: number
    rating?: number
    isShowRating?: boolean
  }
}
const ItemProduct: React.FC<Props> = (props: Props) => {
  return (
    <div className={classes.itemProduct}>
      <Link href={`/chi-tiet-san-pham/${props.dataProduct.id}`}>
        <a>
          <div className={classes.image}>
            <Image
              alt={props.dataProduct.name}
              src={
                props.dataProduct.thumbnails[0]
                  ? props.dataProduct.thumbnails[0].url
                  : 'https://via.placeholder.com/200x200?text=vuarausach.com'
              }
              width="200"
              height="200"
              objectFit="cover"
            />
          </div>
          <div className={classes.name}>{props.dataProduct.name}</div>
        </a>
      </Link>
      <div className={classes.priceUnit}>
        <span className={classes.price}>
          {formatMoney(props.dataProduct.prices[0].price)}
        </span>{' '}
        / {props.dataProduct.minQuantity}
        {props.dataProduct.unit}
      </div>
      {props.dataProduct.isShowRating && (
        <div className={classes.rating}>
          <Rate disabled defaultValue={props.dataProduct.rating} />
        </div>
      )}

      <div className={classes.addToCart}>
        <Button type="primary" className={classes.addToCartButton}>
          Thêm Giỏ Hàng
          <span className={`${classes.iconCart} icon-cart`}></span>
        </Button>
      </div>
    </div>
  )
}

export default ItemProduct
