import type { Document } from '@/lib/typesense/typesense_type';
import { classnames } from '@/utlis/classnames';
import Image from '@/components/image/Image';
import Link from 'next/link';
import { FloatStarRating } from '@/components/ui/InputRating';
import Deal from '@/components/labels/Deal';
import AddToCart from './AddToCart';

const Hit = ({ hit, className }: {
  hit: Document,
  className?: string,
}) => {
  const image =
    hit.images.length > 0
      ? hit.images[0]!.src
      : '';

  return (
    <div className={classnames(
      "product-card text-start",
      {
        [`${className}`]: !!className,
      }
    )}>
      <div className="pc__img-wrapper">
        <Link href={`/product/${hit.slug}`}>
          <Image
            loading="lazy"
            src={image}
            width="330"
            height="400"
            alt="Cropped Faux leather Jacket"
            className="pc__img background-img"
          />
        </Link>
        <AddToCart product={hit} />
      </div>

      <div className="pc__info position-relative">
        {/* <p className="pc__category">{elm.category}</p> */}
        {/* <p className="pc__category" dangerouslySetInnerHTML={{__html: hit.categories?.map((c: any) => c.name).join(" | ")}}/> */}
        <h6 className="pc__title">
          <Link
            href={`/product/${hit.slug}`}
            className="hover:text-red-700 text-ellipsis overflow-hidden line-clamp-2"
            dangerouslySetInnerHTML={{ __html: hit.name }}
          />
        </h6>
        <div className="product-card__price d-flex">
          {/* {elm.priceOld ? (
              <>
                {" "}
                <span className="money price price-old">
                  ${elm.priceOld}
                </span>
                <span className="money price price-sale">
                  ${elm.price}
                </span>
              </>
            ) : (
              <span className="money price">${elm.price}</span>
            )} */}
          <span className="current-price" dangerouslySetInnerHTML={{ __html: hit.price_html }} />
        </div>
        {/* {elm.colors && (
            <div className="d-flex align-items-center mt-1">
              {" "}
              <ColorSelection />{" "}
            </div>
          )} */}
        <div className="product-card__review d-flex align-items-center gap-1 mb-1">
          <div className="reviews-group">
            <FloatStarRating value={parseFloat(hit.average_rating)} />
          </div>
          {hit.review_count > 0 &&
            <span className="reviews-note text-lowercase text-secondary ms-1">
              {hit.review_count}
            </span>}

        </div>
        <Deal deal={hit.extensions['deal-price']} currencyCode={hit.prices.currency_code} currencySymbol={hit.prices.currency_symbol} />
        <button
          // className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${isAddedtoWishlist(elm.id) ? "active" : ""
          //   }`}
          className={classnames(
            "pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlis",
            {
              "active": true
            }
          )}
          // onClick={() => toggleWishlist(elm.id)}
          title="Add To Wishlist"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_heart" />
          </svg>
        </button>
      </div>
      {/* {elm.discont && (
          <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
            <div className="pc-labels__right ms-auto">
              <span className="pc-label pc-label_sale d-block text-white">
                -{elm.discont}%
              </span>
            </div>
          </div>
        )}
        {elm.isNew && (
          <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
            <div className="pc-labels__left">
              <span className="pc-label pc-label_new d-block bg-white">
                NEW
              </span>
            </div>
          </div>
        )} */}
    </div>
  );
};

export default Hit;
