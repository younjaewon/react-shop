import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartProductArrayToJson,
  handleCountCart,
} from '../module/CartProductModule';
import BreadCrumb from './common/BreadCrumb';

interface IbuyButtonProps {
  price: number;
}

interface IBuyModalProp {
  handleBuyProduct: () => void;
}

const BuyProductionButton = ({ price }: IbuyButtonProps) => {
  return (
    <div className="self-start shrink-0 flex items-center mt-10 mb-20">
      <span className="text-xl md:text-2xl">총 : ${price}</span>
      <label
        htmlFor="confirm-modal"
        className="modal-button btn btn-primary ml-5"
      >
        구매하기
      </label>
    </div>
  );
};

const BuyModal = ({ handleBuyProduct }: IBuyModalProp) => {
  return (
    <>
      <input id="confirm-modal" type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">정말로 구매하시겠습니까?</h3>
          <p className="py-4">장바구니의 모든 상품들이 삭제됩니다.</p>
          <div className="modal-action">
            <label
              htmlFor="confirm-modal"
              className="btn btn-primary"
              onClick={handleBuyProduct}
            >
              네
            </label>
            <label htmlFor="confirm-modal" className="btn btn-outline">
              아니오
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const EmptyCart = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
        <Link to="/" className="btn btn-primary mt-10">
          담으러 가기
        </Link>
      </div>
      <div className="lg:flex justify-between mb-20">
        <div></div>
      </div>
    </>
  );
};

const Cart = () => {
  const { data, totalPrice } = useRecoilValue(cartProductArrayToJson);
  const handleCountProduct = useSetRecoilState(handleCountCart);

  const handleCartProductCount = (id: string, type: 'plus' | 'minus') => {
    return handleCountProduct({ id, type });
  };

  const handleCartProductBuy = () => {
    console.log('buy');
  };

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb name="홈" title="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {!data.length ? (
          <EmptyCart />
        ) : (
          <div className="lg:flex justify-between mb-20">
            <div>
              {data.map((item) => (
                <div
                  key={item.id}
                  className="lg:flex lg:items-center mt-4 px-2 lg:px-0"
                >
                  <Link to={`product/${item.id}`}>
                    <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
                      <img
                        src={item.image}
                        alt="title"
                        className="object-contain w-full h-48"
                      />
                    </figure>
                  </Link>
                  <div className="card-body px-1 lg:px-12">
                    <h2 className="card-title">
                      <Link to={`product/${item.id}`}>{item.title}</Link>
                    </h2>
                    <p className="mt-2 mb-4 text-3xl">${item.totalPrice}</p>
                    <div className="card-actions">
                      <div className="btn-group">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleCartProductCount(item.id, 'minus')
                          }
                        >
                          -
                        </button>
                        <button className="btn btn-ghost no-animation">
                          {item.count}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleCartProductCount(item.id, 'plus')
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <BuyProductionButton price={totalPrice} />
          </div>
        )}
      </div>
      <BuyModal handleBuyProduct={handleCartProductBuy} />
    </section>
  );
};

export default Cart;
